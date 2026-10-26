import { useState } from 'react';
import styles from './About.module.css';

const TINTS: [string, string][] = [['#F0EBFA', '#6351A1'], ['#FFF1E4', '#CA5C00'], ['#E4F4EF', '#25795F'], ['#FFF3D9', '#8A6300']];

const PEOPLE: { name: string; initials: string; investor: boolean }[] = [
  { name: 'Mr. Chinmay Ranade', initials: 'CR', investor: true },
  { name: 'Mr. Hemant Karmarkar', initials: 'HK', investor: true },
  { name: 'Mrs. Anagha Gala', initials: 'AG', investor: true },
  { name: 'Mr. Suhas Atre', initials: 'SA', investor: true },
  { name: 'Mrs. Jayashree Atre', initials: 'JA', investor: true },
  { name: 'Mr. Kedar Joshi', initials: 'KJ', investor: true },
  { name: 'Mr. Anand Rao', initials: 'AR', investor: false },
  { name: 'Mr. Karan Bhandari', initials: 'KB', investor: false },
];

const tag = (bg: string, fg: string) => ({ background: bg, color: fg, padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "700" }) as const;

/** Phones show the first 4, then "Show all". */
export default function AboutCatalysts() {
  const [all, setAll] = useState(false);
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "clamp(80px,10vw,128px) 22px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <p style={{ marginBottom: "12px", color: "#CA5C00", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" }}>Our catalysts</p>
        <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342", textWrap: "balance" }}>In good company</h2>
        <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.62", color: "#5A5177", maxWidth: "620px", textWrap: "pretty" }}>The investors and mentors helping us make pet care Pawzeeble.</p>
      </div>
      <div className={styles.inv} data-all={all ? "1" : undefined}>
        {PEOPLE.map((p, i) => {
          const [bg, fg] = TINTS[i % TINTS.length];
          return (
            <div style={{ minWidth: "0", background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "18px", display: "flex", alignItems: "center", gap: "16px" }} key={p.name}>
              <span aria-hidden="true" style={{ flex: "none", width: "56px", height: "56px", borderRadius: "50%", background: bg, color: fg, display: "grid", placeItems: "center", fontSize: "19px", fontWeight: "800", letterSpacing: "-.02em" }}>{p.initials}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                <div style={{ fontSize: "16.5px", fontWeight: "800", color: "#2B2342" }}>{p.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.investor ? <span style={tag("#FFF1E4", "#A44A00")}>Investor</span> : null}
                  <span style={tag("#F2EEFA", "#4A3E78")}>Mentor</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.invMore}>
        <button onClick={() => setAll((a) => !a)} style={{ background: "transparent", color: "#6351A1", fontSize: "14px", fontWeight: "700", padding: "12px 22px", borderRadius: "999px", border: "2px solid #D8CFF0" }}>{all ? "Show less" : "Show all"}</button>
      </div>
    </section>
  );
}
