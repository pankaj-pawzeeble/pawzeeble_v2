import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';

const AUTOPLAY_MS = 6000;
const ink = '#2B2342';
const now = () => Date.now();

const svg = (children: ReactNode, size = 20, sw = 1.9) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const qrIcon = (size: number, sw = 1.9) =>
  svg(
    <>
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </>,
    size,
    sw,
  );
const tick = (size = 10) => svg(<path d="M20 6 9 17l-5-5" />, size, 3.5);
const shield = (size = 19) =>
  svg(
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>,
    size,
    2.1,
  );

const label: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '.03em',
  textTransform: 'uppercase',
  color: '#6B6B6B',
};
const rule: CSSProperties = { height: 1, background: '#E6E2EE', margin: '14px 0' };
const outlineBtn: CSSProperties = {
  marginTop: 14,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  minHeight: 44,
  padding: '0 18px',
  border: '1.5px solid #CA5C00',
  borderRadius: 999,
  color: '#B45200',
  background: '#fff',
  fontSize: 14,
  fontWeight: 700,
};
const badge = (text: string) => (
  <span
    style={{
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: '#fff',
      border: '1px solid #CFE6D8',
      borderRadius: 999,
      padding: '4px 9px 4px 5px',
      fontSize: 11.5,
      fontWeight: 700,
      color: '#1F6B4F',
    }}
  >
    <span
      style={{
        flex: 'none',
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#3A8F5C',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {tick()}
    </span>
    {text}
  </span>
);
const snipBase: CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  padding: 16,
  boxShadow: '0 18px 44px rgba(43,35,66,.16)',
  fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif",
  color: ink,
  boxSizing: 'border-box',
};
const tint: CSSProperties = { background: 'linear-gradient(180deg,#E9E4F7 0%,#fff 62%)' };

/** App-style card snippets shown over each photo. */
function VetChat() {
  return (
    <div data-r="wpj-snip" style={{ ...snipBase, paddingTop: 8 }}>
      <div
        style={{
          marginTop: 12,
          background: '#E3FBE6',
          borderRadius: 12,
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ position: 'relative', flex: 'none', width: 32, height: 32 }}>
          <span style={{ display: 'block', width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
            <ImageSlot id="pz-wpj-vet" shape="circle" placeholder="" />
          </span>
          <span
            style={{
              position: 'absolute',
              right: -1,
              bottom: -1,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#1BA27A',
              border: '2px solid #E3FBE6',
            }}
          />
        </span>
        <span style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.3, color: '#1E2A20' }}>
          You are now connected with Dr. Ajay Rathi
        </span>
      </div>
      <div
        style={{
          marginTop: 10,
          background: 'linear-gradient(180deg,#F6F3FD,#ECE7FB)',
          borderRadius: 14,
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div
          style={{
            alignSelf: 'flex-end',
            background: '#6351A1',
            color: '#fff',
            padding: '9px 13px',
            borderRadius: '16px 16px 4px 16px',
            fontSize: 13,
            lineHeight: 1.4,
          }}
        >
          Not eating, Swollen belly
        </div>
        <div style={{ alignSelf: 'flex-end', fontSize: 10.5, color: '#6F6590' }}>2:04 AM</div>
        <div
          style={{
            marginTop: 4,
            alignSelf: 'flex-start',
            maxWidth: '88%',
            background: '#fff',
            padding: '9px 13px',
            borderRadius: '16px 16px 16px 4px',
            fontSize: 13,
            lineHeight: 1.4,
          }}
        >
          Thank you! Your veterinarian is reviewing Coco&apos;s information.
        </div>
        <div style={{ fontSize: 10.5, color: '#6F6590' }}>2:05 AM</div>
      </div>
    </div>
  );
}

function ClaimCard() {
  return (
    <div data-r="wpj-snip" style={{ ...snipBase, ...tint }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          data-r="wpj-lead"
          style={{
            flex: 'none',
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: '#fff',
            color: '#6351A1',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {shield()}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>Pawteckt claim</div>
          <div style={{ fontSize: 12, color: '#6F6590' }}>Bruno · Foreign-body surgery</div>
        </div>
        {badge('Approved')}
      </div>
      <div style={rule} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={label}>Claim amount</div>
          <div style={{ marginTop: 4, fontSize: 17, fontWeight: 800 }}>₹48,500</div>
        </div>
        <div>
          <div style={label}>Settled in</div>
          <div style={{ marginTop: 4, fontSize: 17, fontWeight: 800 }}>9 days</div>
        </div>
      </div>
      <div style={rule} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
        <span
          style={{
            flex: 'none',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#3A8F5C',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {tick()}
        </span>
        Paid to your bank account
      </div>
      <div style={outlineBtn}>View claim details</div>
    </div>
  );
}

function PetQrCard() {
  const pill: CSSProperties = {
    border: '1px solid #BDBDBD',
    borderRadius: 999,
    padding: '2px 10px',
    fontSize: 11.5,
    color: '#5F5F5F',
    background: '#fff',
  };
  return (
    <div data-r="wpj-snip" style={{ ...snipBase, ...tint }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          data-r="wpj-lead"
          style={{
            flex: 'none',
            width: 54,
            height: 54,
            borderRadius: '50%',
            border: '2px solid #B5A8E0',
            overflow: 'hidden',
          }}
        >
          <ImageSlot id="pz-wpj-qrpet" shape="circle" placeholder="" />
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>Simba</div>
          <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={pill}>Indie</span>
            <span style={pill}>Male</span>
          </div>
        </div>
        <span
          style={{
            flex: 'none',
            width: 46,
            height: 46,
            background: '#fff',
            color: '#111',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {qrIcon(40, 2)}
        </span>
      </div>
      <div style={rule} />
      <div style={label}>Pet parent details</div>
      <div style={{ marginTop: 6, fontSize: 15, fontWeight: 800, color: '#1E1E1E' }}>ATHARVA DESHPANDE</div>
      <div style={{ marginTop: 2, fontSize: 13, color: '#6B6B6B' }}>+91-91XXXXX921</div>
      <div style={outlineBtn}>
        {svg(
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />,
          16,
          2.2,
        )}
        Call pet parent
      </div>
    </div>
  );
}

function BookingCard() {
  return (
    <div data-r="wpj-snip" style={snipBase}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          data-r="wpj-lead"
          style={{ flex: 'none', width: 54, height: 54, borderRadius: 12, overflow: 'hidden' }}
        >
          <ImageSlot id="pz-wpj-groomer" shape="rounded" radius="12" placeholder="" />
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>Paws &amp; Claws Grooming</div>
          <div style={{ fontSize: 12, color: '#6F6590' }}>Full grooming · Mishti</div>
        </div>
        {badge('Booked')}
      </div>
      <div style={rule} />
      <div style={label}>Slot</div>
      <div
        style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700 }}
      >
        <span style={{ color: '#6351A1', display: 'flex' }}>
          {svg(
            <>
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </>,
            16,
            2.2,
          )}
        </span>
        Sat, 14 Jun · 11:00 AM
      </div>
      <div style={rule} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'line-through' }}>₹1,500</span>
        <span style={{ fontSize: 18, fontWeight: 800 }}>₹1,200</span>
        <span
          style={{
            background: '#E4F4EF',
            color: '#1F6B4F',
            borderRadius: 999,
            padding: '3px 9px',
            fontSize: 11.5,
            fontWeight: 700,
          }}
        >
          20% off with Pawteckt
        </span>
      </div>
      <div style={outlineBtn}>View booking</div>
    </div>
  );
}

interface Moment {
  icon: ReactNode;
  time: string;
  headline: string;
  worry: string;
  help: string;
  tag: string;
  tagStyle: CSSProperties;
  photo: { id: string; src: string; alt: string; caption: string };
  snippet: ReactNode;
}

const lite: CSSProperties = { background: '#FFF1E4', color: '#A44A00' };
const premium: CSSProperties = { background: '#F0EBFA', color: '#4A3E78' };

const MOMENTS: Moment[] = [
  {
    icon: svg(<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />),
    time: '2:00 a.m.',
    headline: '24/7 vet chat',
    worry: "It's 2 a.m. and she won't eat.",
    help: 'Chat with a certified vet in minutes, from home. Free, any time, as often as you need.',
    tag: 'Lite & Premium',
    tagStyle: lite,
    photo: {
      id: 'pz-wpj-coco',
      src: '/images/shared/worried-woman-cuddling-dog-at-night.webp',
      alt: 'Coco at 2 a.m.',
      caption: 'Coco · 2:00 a.m.',
    },
    snippet: <VetChat />,
  },
  {
    icon: svg(
      <>
        <path d="M11 2v2" />
        <path d="M5 2v2" />
        <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
        <path d="M8 15a6 6 0 0 0 12 0v-3" />
        <circle cx="20" cy="10" r="2" />
      </>,
    ),
    time: 'Surgery day',
    headline: 'Surgery, Injury & Illness cover',
    worry: 'He swallowed a toy and needs surgery.',
    help: 'Premium helps pay for the surgery, up to the cover you choose.',
    tag: 'Premium',
    tagStyle: premium,
    photo: {
      id: 'pz-wpj-bruno',
      src: '/images/shared/caring-veterinary-checkup-for-a-happy-dog.webp',
      alt: 'Bruno after surgery',
      caption: 'Bruno · Surgery day',
    },
    snippet: <ClaimCard />,
  },
  {
    icon: qrIcon(20),
    time: 'Gate left open',
    headline: 'Pet QR tag',
    worry: 'Someone left the gate open.',
    help: 'Whoever finds your pet scans their Pet QR tag and can call you straight away.',
    tag: 'Lite & Premium',
    tagStyle: lite,
    photo: {
      id: 'pz-wpj-simba',
      src: '/images/shared/golden-retriever-dashes-through-open-gate.webp',
      alt: 'Simba outside the gate',
      caption: 'Simba · Gate left open',
    },
    snippet: <PetQrCard />,
  },
  {
    icon: svg(
      <>
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
      </>,
    ),
    time: 'Bath day',
    headline: 'Assurance partner discounts',
    worry: 'Bath day comes round every month.',
    help: 'Up to 50% off grooming and vet visits at Pawzeeble partners, all year.',
    tag: 'Lite & Premium',
    tagStyle: lite,
    photo: {
      id: 'pz-wpj-mishti',
      src: '/images/shared/pampered-cat-spa-grooming-session.webp',
      alt: 'Mishti on bath day',
      caption: 'Mishti · Bath day',
    },
    snippet: <BookingCard />,
  },
];

export default function PawtecktWhyJoin() {
  const v = useSite();
  const [idx, setIdx] = useState(0);
  const [mob, setMob] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const last = useRef(0);

  const pick = (k: number) => {
    last.current = now();
    setIdx(k);
  };

  // desktop only: step through the moments until the visitor interacts or hovers
  useEffect(() => {
    last.current = now();
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 1025px)');
    const t = setInterval(() => {
      if (rm.matches || !desktop.matches || paused.current || document.hidden) return;
      if (now() - last.current >= AUTOPLAY_MS) {
        last.current = now();
        setIdx((i) => (i + 1) % MOMENTS.length);
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const onScroll = () => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first || window.innerWidth >= 768) return;
    const k = Math.max(0, Math.min(MOMENTS.length - 1, Math.round(el.scrollLeft / (first.offsetWidth + 12))));
    setMob((prev) => (prev === k ? prev : k));
  };

  const goDot = (k: number) => {
    const el = track.current;
    const c = el?.children[k] as HTMLElement | undefined;
    if (!el || !c) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: k * (c.offsetWidth + 12), behavior: rm ? 'auto' : 'smooth' });
  };

  const hold = () => {
    paused.current = true;
  };
  const release = () => {
    paused.current = false;
    last.current = now();
  };

  return (
    <section
      data-r="wpj-sec"
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
      style={{ color: ink }}
    >
      <div style={{ maxWidth: 1216, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '.07em',
            color: '#CA5C00',
            textAlign: 'center',
          }}
        >
          WHY PARENTS JOIN
        </p>
        <h2 data-r="wpj-h2" style={{ marginTop: 10, color: ink, textWrap: 'balance', textAlign: 'center' }}>
          For the moments you can&apos;t plan for
        </h2>
        <div data-r="wpj-grid" ref={track} onScroll={onScroll}>
          {MOMENTS.map((m, k) => (
            <article data-r="wpj-art" data-on={idx === k ? '1' : '0'} key={m.time}>
              <button type="button" data-r="wpj-item" onClick={() => pick(k)} aria-pressed={idx === k}>
                {/* <span data-r="wpj-ico">{m.icon}</span> */}
                <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span data-r="wpj-time">{m.time}</span>
                  <span data-r="wpj-hl">{m.headline}</span>
                  <span data-r="wpj-worry">{m.worry}</span>
                  <span data-r="wpj-more">
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        color: '#A44A00',
                      }}
                    >
                      HOW PAWTECKT HELPS
                    </span>
                    <span style={{ fontSize: 15, lineHeight: 1.55, color: ink }}>{m.help}</span>
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        marginTop: 4,
                        padding: '5px 11px',
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 800,
                        ...m.tagStyle,
                      }}
                    >
                      {m.tag}
                    </span>
                  </span>
                </span>
              </button>
              <div data-r="wpj-scene">
                <div data-r="wpj-photo">
                  <ImageSlot
                    id={m.photo.id}
                    shape="rect"
                    src={m.photo.src}
                    placeholder={m.photo.alt}
                    style={{ position: 'absolute', inset: 0, aspectRatio: 'auto' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: 16,
                      top: 16,
                      background: 'rgba(255,255,255,.94)',
                      color: ink,
                      fontSize: 13,
                      fontWeight: 800,
                      padding: '8px 14px',
                      borderRadius: 999,
                      boxShadow: '0 6px 16px rgba(43,35,66,.14)',
                    }}
                  >
                    {m.photo.caption}
                  </span>
                </div>
                {m.snippet}
              </div>
            </article>
          ))}
        </div>
        <div data-r="wpj-dots">
          {MOMENTS.map((m, k) => (
            <button
              type="button"
              data-r="wpj-dot"
              data-on={mob === k ? '1' : '0'}
              aria-label={`Show moment ${k + 1}`}
              onClick={() => goDot(k)}
              key={m.time}
            >
              <span data-r="wpj-dotv" />
            </button>
          ))}
        </div>
        <div data-r="wpj-close">
          <p style={{ fontSize: 17, lineHeight: 1.5, color: ink, fontWeight: 700 }}>
            Lite starts at ₹45 a month. Premium adds cover for big vet bills.
          </p>
          <button type="button" data-r="wpj-cta" onClick={v.ptToPlans}>
            Compare plans{' '}
            {svg(
              <>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </>,
              18,
              2.4,
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
