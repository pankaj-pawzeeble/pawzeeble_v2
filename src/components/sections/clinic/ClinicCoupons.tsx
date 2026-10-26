import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useSite } from '@/hooks/useSite';
import type { EnterpriseService } from '@/lib/findcare';
import { useClinicData } from './ClinicData';
import styles from './ClinicCoupons.module.css';

interface Coupon {
  id: string;
  valueLines: [string, string];
  title: string;
  desc: string;
  mrp?: number;
  price?: number;
  usesPerPet?: number;
}

/** The design's sample coupons, shown on the static (non-live) clinic page. */
const SAMPLE: Coupon[] = [
  { id: 'consult', valueLines: ['FLAT', '50% OFF'], title: 'Consultation', desc: 'In-clinic, any doctor', mrp: 800, price: 400, usesPerPet: 4 },
  { id: 'vacc', valueLines: ['FLAT', '20% OFF'], title: 'Vaccination', desc: 'Core and booster doses', mrp: 1200, price: 960, usesPerPet: 1 },
  { id: 'deworm', valueLines: ['FLAT', '20% OFF'], title: 'Deworming', desc: 'Oral or spot-on dose', mrp: 400, price: 320, usesPerPet: 4 },
  { id: 'castr', valueLines: ['FLAT', '25% OFF'], title: 'Castration', desc: 'Neutering surgery', mrp: 6000, price: 4500, usesPerPet: 1 },
];

const rupees = (n: number) => '₹' + n.toLocaleString('en-IN');
const usesLabel = (n: number) => (n === 1 ? '1 coupon per subscribed pet' : `${n} coupons per subscribed pet`);

/** Coupons the API attaches to the clinic's services. The API does not send a per-pet use limit, so none is shown. */
function fromServices(services: EnterpriseService[]): Coupon[] {
  return services
    .filter((s) => s.coupon && (s.coupon.discountPercent > 0 || s.coupon.discountAmount > 0))
    .map((s) => {
      const c = s.coupon!;
      const pct = c.discountPercent > 0;
      const price = s.price > 0 ? (pct ? Math.round((s.price * (100 - c.discountPercent)) / 100) : Math.max(0, s.price - c.discountAmount)) : undefined;
      return {
        id: s._id,
        valueLines: ['FLAT', pct ? `${c.discountPercent}% OFF` : `${rupees(c.discountAmount)} OFF`] as [string, string],
        title: s.name,
        desc: s.description?.trim() || c.title || '',
        mrp: s.price > 0 ? s.price : undefined,
        price,
      };
    });
}

const shield = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#A44A00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);
const ticket = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

const SWIPE_PX = 50;
const LOCK_PX = 6;

/** "Discount coupons at this clinic": Assured clinics only. On phones the coupons form a swipeable deck. */
export default function ClinicCoupons() {
  const v = useSite();
  const data = useClinicData();
  const coupons = useMemo(() => (data.live ? fromServices(data.clinic?.services ?? []) : SAMPLE), [data.live, data.clinic]);
  const n = coupons.length;

  const [mobile, setMobile] = useState(false);
  const [idx, setIdx] = useState(0);
  const [dx, setDx] = useState(0);
  const [fling, setFling] = useState<1 | -1 | 0>(0);
  const drag = useRef<{ x: number; y: number; axis: 'x' | 'y' | null; id: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const on = () => {
      setMobile(mq.matches);
      if (!mq.matches) {
        setDx(0);
        setFling(0);
      }
    };
    on();
    mq.addEventListener('change', on);
    return () => {
      mq.removeEventListener('change', on);
      clearTimeout(timer.current);
    };
  }, []);

  if (!v.clAssured || n === 0) return null;

  const deck = mobile && n > 1;
  const front = ((idx % n) + n) % n;

  const onDown = (e: React.PointerEvent) => {
    if (!deck || fling) return;
    drag.current = { x: e.clientX, y: e.clientY, axis: null, id: e.pointerId };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    const my = e.clientY - d.y;
    if (!d.axis && (Math.abs(mx) > LOCK_PX || Math.abs(my) > LOCK_PX)) d.axis = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
    if (d.axis === 'x') setDx(mx);
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.axis !== 'x') return setDx(0);
    if (Math.abs(dx) > SWIPE_PX) {
      const dir = dx > 0 ? 1 : -1;
      setFling(dir);
      timer.current = setTimeout(() => {
        setIdx((i) => i + (dir === 1 ? -1 : 1));
        setFling(0);
        setDx(0);
      }, 230);
    } else {
      setDx(0);
    }
  };

  const cardStyle = (i: number): CSSProperties | undefined => {
    if (!deck) return undefined;
    const depth = (i - front + n) % n;
    if (depth === 0) {
      if (fling) return { zIndex: n, transform: `translateX(${fling * 115}%) rotate(${fling * 6}deg)`, opacity: 0 };
      return { zIndex: n, transform: dx ? `translateX(${dx}px) rotate(${dx / 40}deg)` : 'none', transition: dx ? 'none' : undefined };
    }
    return { zIndex: n - depth, opacity: depth > 2 ? 0 : 1, pointerEvents: 'none', transform: `translate(${-7 * depth}px, ${-7 * depth}px)` };
  };

  return (
    <section id="offers" className={styles.card}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>PAWZEEBLE ASSURED</p>
          <h2>Discount coupons at this clinic</h2>
        </div>
        <p className={styles.sub}>Apply coupons at checkout when you book in the Pawzeeble app.</p>
      </div>

      <div className={`${styles.grid} ${styles.deck}`} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        {coupons.map((c, i) => (
          <article className={styles.cpn} style={cardStyle(i)} key={c.id}>
            <div className={styles.stub}>
              <span className={`${styles.notch} ${styles.notchTop}`} />
              <span className={`${styles.notch} ${styles.notchBottom}`} />
              <span className={styles.value}>
                {c.valueLines[0]}
                <br />
                {c.valueLines[1]}
              </span>
            </div>
            <div className={styles.body}>
              <span className={styles.title}>{c.title}</span>
              {c.desc ? <span className={styles.desc}>{c.desc}</span> : null}
              {c.price != null ? (
                <div className={styles.price}>
                  {c.mrp != null && c.mrp !== c.price ? <s>{rupees(c.mrp)}</s> : null}
                  <strong>{rupees(c.price)}</strong>
                </div>
              ) : null}
              {c.usesPerPet ? (
                <div className={styles.foot}>
                  <span className={styles.uses}>{usesLabel(c.usesPerPet)}</span>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {deck ? (
        <div className={styles.dots} aria-hidden="true">
          {coupons.map((c, i) => (
            <span className={i === front ? styles.on : undefined} key={c.id} />
          ))}
        </div>
      ) : null}

      <div className={styles.notes}>
        <div className={styles.note}>
          <span className={`${styles.noteIc} ${styles.orange}`}>{shield}</span>
          <span><strong>Pawteckt members only.</strong> Valid for pets with an active Pawteckt subscription.</span>
        </div>
        <div className={styles.note}>
          <span className={`${styles.noteIc} ${styles.purple}`}>{ticket}</span>
          <span><strong>Apply at checkout.</strong> Select the coupon when booking. It isn&apos;t added automatically.</span>
        </div>
      </div>
    </section>
  );
}
