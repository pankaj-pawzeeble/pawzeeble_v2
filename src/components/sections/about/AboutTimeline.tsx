import { useEffect, useRef, type ReactNode } from 'react';
import { useAppDownload } from '@/components/layout/AppDownload';
import styles from './About.module.css';

interface Milestone {
  year: string;
  title: string;
  body: string;
  /** Header: a logo image or a paw icon. */
  logo?: { src: string; alt: string; height: number };
  stats?: [string, string][];
  cta?: 'skale' | 'app' | 'pawzmart';
}

const MILESTONES: Milestone[] = [
  { year: '2018', title: 'Pawzeeble is born', body: 'While doing his MBA at SIBM Pune, Yashh Sathe rescued Leaya, a paralyzed pup. Finding her proper care was a struggle, so he set out to build a tech-driven pet care ecosystem for India.' },
  { year: '2019', title: 'Beta app launched', body: 'Our first app gave pet parents a place to share, connect and find pets to adopt.', logo: { src: 'pawzeeble-logo-final', alt: 'Pawzeeble', height: 36 }, stats: [['23,000', 'App downloads'], ['1,500+', 'Posts on the app'], ['100+', 'Adoption profiles']] },
  { year: '2021', title: 'Skale launches', body: 'A business management tool for vets and groomers, and the start of the new Pawzeeble ecosystem.', logo: { src: 'skale-logo', alt: 'Skale', height: 40 }, stats: [['500+', 'Service partners']], cta: 'skale' },
  { year: '2024', title: 'Partnership with HDFC ERGO', body: 'Together we built Pawteckt, a single subscription pack that insures dogs and cats of all breeds and weights.', logo: { src: 'hdfc-ergo-logo-2025', alt: 'HDFC ERGO', height: 56 }, stats: [['15+', 'Surgeries covered'], ['40+', 'Injuries and illnesses']] },
  { year: '2025', title: 'The new Pawzeeble app', body: 'Book verified vets and groomers, keep records and reminders in one place, and join breed Clans.', logo: { src: 'pawzeeble-logo-final', alt: 'Pawzeeble', height: 36 }, stats: [['150K+', 'Pet parents'], ['200K+', 'Pet profiles'], ['60,000+', 'Direct bookings']], cta: 'app' },
  { year: '2026', title: 'My Pawzmart opens', body: 'Our marketplace for pet products and merch for proud pet parents.', logo: { src: 'pawzmart-logo', alt: 'My Pawzmart', height: 40 }, stats: [['50+', 'Unique designs for pet lovers and pet parents'], ['100%', 'Of profits go to animal welfare']], cta: 'pawzmart' },
];

const pill = { flex: "none", background: "#F2EEFA", color: "#4A3E78", padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: "700" } as const;
const link = { display: "inline-flex", alignItems: "center", gap: "6px", color: "#CA5C00", fontSize: "15px", fontWeight: "700", textDecoration: "none" } as const;
const arrow = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
);

const isMobile = () => window.matchMedia('(max-width: 640px)').matches;

/** Pinned scroll timeline: scroll progress picks the active milestone card; clicking a year scrolls to it. */
export default function AboutTimeline() {
  const { dlApp } = useAppDownload();
  const wrapRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const years = useRef<(HTMLButtonElement | null)[]>([]);
  const active = useRef(-1);

  useEffect(() => {
    const w = wrapRef.current;
    const pin = pinRef.current;
    if (!w || !pin) return;
    const n = MILESTONES.length;

    const layoutPin = () => {
      if (isMobile()) {
        const hb = document.querySelector('[data-r="site-hdr"]');
        const hdr = hb ? Math.max(0, hb.getBoundingClientRect().bottom) : 64;
        const vh = window.innerHeight;
        const kids = Array.from(pin.children) as HTMLElement[];
        const gap = parseFloat(getComputedStyle(pin).rowGap) || 0;
        const ch = kids.reduce((s, k) => s + k.offsetHeight, 0) + gap * Math.max(0, kids.length - 1);
        const free = Math.max(0, vh - hdr - ch);
        pin.style.setProperty('height', vh + 'px', 'important');
        pin.style.setProperty('padding-top', Math.round(hdr + free / 2) + 'px', 'important');
        pin.style.setProperty('padding-bottom', '0px', 'important');
      } else {
        pin.style.removeProperty('padding-top');
        pin.style.removeProperty('padding-bottom');
        pin.style.removeProperty('height');
      }
    };

    const update = () => {
      layoutPin();
      const r = w.getBoundingClientRect();
      const span = Math.max(1, w.offsetHeight - window.innerHeight);
      const lead = isMobile() ? window.innerHeight * 0.35 : 0;
      const p = Math.min(1, Math.max(0, (-r.top - lead) / Math.max(1, span - lead)));
      const act = Math.min(n - 1, Math.floor(p * n));
      if (active.current === act) return;
      active.current = act;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const on = i === act;
        c.style.opacity = on ? '1' : '0';
        c.style.visibility = on ? 'visible' : 'hidden';
        c.style.transform = `translateY(${on ? 0 : i < act ? -16 : 16}px)`;
      });
      years.current.forEach((b, i) => {
        if (!b) return;
        const dot = b.querySelector<HTMLElement>('[data-dot]');
        const lbl = b.querySelector<HTMLElement>('[data-lbl]');
        const done = i <= act;
        if (dot) {
          dot.style.background = done ? '#6351A1' : '#fff';
          dot.style.borderColor = done ? '#6351A1' : '#E3DDF6';
        }
        if (lbl) lbl.style.color = done ? '#2B2342' : '#9A91B5';
        b.setAttribute('aria-current', i === act ? 'step' : 'false');
      });
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${act / (n - 1)})`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const goTo = (i: number) => {
    const w = wrapRef.current;
    if (!w) return;
    const n = MILESTONES.length;
    const r = w.getBoundingClientRect();
    const span = w.offsetHeight - window.innerHeight;
    const lead = isMobile() ? window.innerHeight * 0.35 : 0;
    window.scrollTo({ top: window.scrollY + r.top + lead + ((span - lead) * (i + 0.5)) / n, behavior: 'smooth' });
  };

  const cta = (c: Milestone['cta']): ReactNode => {
    if (c === 'skale') return <a href="https://skale.pawzeeble.com" target="_blank" rel="noopener" style={link}>Visit Skale{arrow}</a>;
    if (c === 'pawzmart') return <a href="https://mypawzmart.com" target="_blank" rel="noopener" style={link}>Visit My Pawzmart{arrow}</a>;
    if (c === 'app') return <button onClick={() => dlApp()} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#CA5C00", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "11px 20px", borderRadius: "999px" }}>Download app</button>;
    return null;
  };

  return (
    <section ref={wrapRef} className={styles.tlWrap}>
      <div ref={pinRef} className={styles.tlPin}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <p style={{ marginBottom: "12px", color: "#CA5C00", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" }}>Our journey</p>
          <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342", textWrap: "balance" }}>One ecosystem for your pet&apos;s whole life</h2>
          <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.62", color: "#5A5177", maxWidth: "620px", textWrap: "pretty" }}>Pawzeeble brings pet parents, vets and services together in one place.</p>
        </div>
        <div style={{ width: "100%", maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(24px,4vh,36px)" }}>
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr))" }}>
            <div aria-hidden="true" style={{ position: "absolute", left: "calc(100% / 12)", right: "calc(100% / 12)", top: "9px", height: "2px", background: "#E3DDF6" }} />
            <div ref={fillRef} aria-hidden="true" style={{ position: "absolute", left: "calc(100% / 12)", right: "calc(100% / 12)", top: "9px", height: "2px", background: "#6351A1", transformOrigin: "left", transform: "scaleX(0)", transition: "transform .45s ease" }} />
            {MILESTONES.map((m, i) => (
              <button ref={(el) => { years.current[i] = el; }} onClick={() => goTo(i)} aria-label={`Go to ${m.year}`} style={{ position: "relative", zIndex: "1", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", background: "transparent", padding: "0", cursor: "pointer" }} key={m.year}>
                <span data-dot="" style={{ width: "20px", height: "20px", borderRadius: "50%", boxSizing: "border-box", border: "4px solid " + (i === 0 ? "#6351A1" : "#E3DDF6"), background: i === 0 ? "#6351A1" : "#fff", transition: "background .3s,border-color .3s" }} />
                <span data-lbl="" style={{ fontSize: "clamp(13px,1.4vw,16px)", fontWeight: "800", color: i === 0 ? "#2B2342" : "#9A91B5", transition: "color .3s" }}>{m.year}</span>
              </button>
            ))}
          </div>
          <div className={styles.tlStage}>
            {MILESTONES.map((m, i) => (
              <div ref={(el) => { cards.current[i] = el; }} className={styles.tlCard} key={m.year}>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", minHeight: "56px" }}>
                  {m.logo ? (
                    <img src={`/images/shared/${m.logo.src}.webp`} alt={m.logo.alt} style={{ height: m.logo.height + "px", width: "auto", maxWidth: "200px", display: "block" }} />
                  ) : (
                    <span style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#F0EBFA", color: "#6351A1", display: "grid", placeItems: "center" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5.5" cy="10" r="2.2" /><circle cx="9.5" cy="5.5" r="2.2" /><circle cx="14.5" cy="5.5" r="2.2" /><circle cx="18.5" cy="10" r="2.2" /><path d="M12 11c-3 0-6.5 4.6-6.5 7.2 0 1.8 1.4 2.8 3.2 2.8 1.4 0 2.2-.8 3.3-.8s1.9.8 3.3.8c1.8 0 3.2-1 3.2-2.8C18.5 15.6 15 11 12 11z" /></svg>
                    </span>
                  )}
                  <span style={pill}>{m.year}</span>
                </div>
                <h3 style={{ fontSize: "clamp(24px,2.8vw,32px)", lineHeight: "1.15", letterSpacing: "-.02em", color: "#2B2342", textWrap: "balance" }}>{m.title}</h3>
                <p style={{ fontSize: "16.5px", lineHeight: "1.6", color: "#5A5177", textWrap: "pretty" }}>{m.body}</p>
                {m.stats ? (
                  <div className={styles.tlStats} style={{ gridTemplateColumns: `repeat(${m.stats.length},minmax(0,1fr))` }}>
                    {m.stats.map(([num, label]) => (
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }} key={num}>
                        <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-.02em", color: "#2B2342", lineHeight: "1.1" }}>{num}</span>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
                {m.cta ? <div style={{ marginTop: "4px" }}>{cta(m.cta)}</div> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
