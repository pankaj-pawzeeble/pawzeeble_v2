import styles from './About.module.css';

const eyebrow = { marginBottom: "12px", color: "#FFC24B", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" } as const;

const icon = (d: string[]) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d.map((p) => <path d={p} key={p} />)}
  </svg>
);

const VALUES: { title: string; body: string; bg: string; fg: string; icon: string[] }[] = [
  { title: 'Pets first. Always.', body: 'Every decision starts with the pet.', bg: '#F0EBFA', fg: '#6351A1', icon: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'] },
  { title: 'Make it Pawzeeble', body: 'We find a way, not an excuse.', bg: '#FFF1E4', fg: '#CA5C00', icon: ['M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z'] },
  { title: 'Earn trust daily', body: 'Verified care, clear prices, safe data.', bg: '#F0EBFA', fg: '#6351A1', icon: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'] },
  { title: 'Keep it simple', body: 'Easy enough for a worried parent at 2 a.m.', bg: '#FFF1E4', fg: '#CA5C00', icon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'] },
];

const card = (v: (typeof VALUES)[number], clone: boolean) => (
  <div className={clone ? styles.valuesClone : undefined} aria-hidden={clone || undefined} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", padding: "clamp(22px,2.4vw,28px)" }} key={v.title + (clone ? '-c' : '')}>
    <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: v.bg, color: v.fg, display: "grid", placeItems: "center" }}>{icon(v.icon)}</div>
    <h3 style={{ marginTop: "18px", fontSize: "20px", color: "#2B2342" }}>{v.title}</h3>
    <p style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.6", color: "#5A5177", textWrap: "pretty" }}>{v.body}</p>
  </div>
);

export default function AboutMission() {
  return (
    <section className={styles.valuesWrap} style={{ maxWidth: "1260px", margin: "0 auto", padding: "clamp(80px,10vw,128px) 22px 0" }}>
      <div style={{ background: "#6351A1", borderRadius: "36px", padding: "clamp(30px,5vw,64px)", position: "relative", overflow: "hidden", isolation: "isolate" }}>
        <img src="/images/shared/globe-paw-world2.webp" alt="" aria-hidden="true" style={{ position: "absolute", right: "clamp(-60px,-3vw,-20px)", top: "50%", transform: "translateY(-50%)", height: "125%", width: "auto", maxWidth: "none", opacity: ".35", zIndex: "-1", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ fontSize: "clamp(90px,11vw,150px)", lineHeight: ".7", fontWeight: "800", color: "#FFC24B", height: "clamp(48px,6vw,80px)" }}>“</div>
        <p style={eyebrow}>Our mission</p>
        <blockquote style={{ margin: "0", fontSize: "clamp(26px,3.6vw,44px)", lineHeight: "1.22", color: "#fff", fontWeight: "800", letterSpacing: "-.025em", maxWidth: "900px", textWrap: "balance" }}>
          Make great pet care simple and possible for every pet parent.
        </blockquote>
      </div>
      <div className={styles.values}>
        {VALUES.map((v) => card(v, false))}
        {VALUES.map((v) => card(v, true))}
      </div>
    </section>
  );
}
