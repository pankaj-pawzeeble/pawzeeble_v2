import { useState } from 'react';
import styles from './About.module.css';

/** Phones show the first 12, then "Show all". */
const TEAM: { name: string; role: string; photo?: string }[] = [
  { name: 'Yashh Sathe', role: 'Co-Founder', photo: 'team-yashh' },
  { name: 'Pooja Ambapkar', role: 'Product Lead & QA', photo: 'team-blue' },
  { name: 'Pankaj Shinde', role: 'Senior Developer - Web', photo: 'team-collar' },
  { name: 'Hamza Bandukwala', role: 'Senior Developer - App', photo: 'team-hamza' },
  { name: 'Divya Chaudhari', role: 'Senior Developer - Backend', photo: 'team-blazer' },
  { name: 'Atharva Deshpande', role: 'UI/UX & Marketing Lead', photo: 'team-stand' },
  { name: 'Sumeer Khokale', role: 'Business Development', photo: 'team-sumeer' },
  { name: 'Prathamesh Parab', role: 'Business Development', photo: 'team-specs' },
  { name: 'Ninad Kale', role: 'Market Research & Performance Marketing', photo: 'team-ninad-v2' },
  { name: 'Pranav Mohite', role: 'Business Consultant', photo: 'team-pranav' },
  // TODO: photo pending for Amey Deokar.
  { name: 'Amey Deokar', role: 'Business Consultant' },
  { name: 'Flash', role: 'Developer Freelance', photo: 'team-nishant' },
  { name: 'Spiderman', role: 'Developer Freelance', photo: 'team-aamez' },
  { name: 'Batman', role: 'Developer Freelance', photo: 'team-rafi' },
];

const BOSSES: { name: string; role: string; photo: string; position: string }[] = [
  { name: 'Vaayu', role: 'VP, Treats', photo: 'boss-vaayu', position: '72% 42%' },
  { name: 'Shadow', role: 'Director of Zoomies', photo: 'boss-shadow', position: '50% 30%' },
];

export default function AboutTeam() {
  const [all, setAll] = useState(false);
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "clamp(80px,10vw,128px) 22px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <p style={{ marginBottom: "12px", color: "#CA5C00", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" }}>The pack</p>
        <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342", textWrap: "balance" }}>Remote-first. Pet-always.</h2>
        <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.62", color: "#5A5177", maxWidth: "620px", textWrap: "pretty" }}>Headquartered in Pune, working from everywhere. Most of our meetings have at least one pet in attendance.</p>
      </div>
      <div className={styles.teamGrid} data-all={all ? "1" : undefined} style={{ marginTop: "40px" }}>
        {TEAM.map((m) => (
          <div style={{ minWidth: "0" }} key={m.name}>
            <div className={styles.teamPhoto} style={{ aspectRatio: "1 / 1", borderRadius: "22px", overflow: "hidden", position: "relative", background: "#F0EBFA" }}>
              {m.photo ? <img src={`/images/team/${m.photo}.webp`} alt={m.name} loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /> : null}
            </div>
            <h3 style={{ marginTop: "16px", fontSize: "19px", color: "#2B2342" }}>{m.name}</h3>
            <div style={{ marginTop: "4px", fontSize: "13.5px", fontWeight: "700", color: "#A44A00" }}>{m.role}</div>
          </div>
        ))}
      </div>
      <div className={styles.teamMore}>
        <button onClick={() => setAll((a) => !a)} style={{ background: "transparent", color: "#6351A1", fontSize: "14px", fontWeight: "700", padding: "12px 22px", borderRadius: "999px", border: "2px solid #D8CFF0" }}>{all ? "Show less" : "Show all"}</button>
      </div>
      <div style={{ marginTop: "64px", marginBottom: "120px" }}>
        <h3 style={{ fontSize: "clamp(24px,2.8vw,32px)", color: "#2B2342", textAlign: "center" }}>The real bosses</h3>
        <div className={styles.bosses} style={{ marginTop: "28px" }}>
          {BOSSES.map((b) => (
            <div className={styles.boss} key={b.name}>
              <div style={{ width: "100%", maxWidth: "132px", aspectRatio: "1 / 1", borderRadius: "50%", overflow: "hidden", border: "4px solid #fff", boxShadow: "0 10px 24px rgba(43,35,66,.12)", background: "#FFF1E4" }}>
                <img src={`/images/shared/${b.photo}.webp`} alt={b.name} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: b.position }} />
              </div>
              <div style={{ marginTop: "12px", fontSize: "16px", fontWeight: "800", color: "#2B2342" }}>{b.name}</div>
              <div style={{ marginTop: "4px", fontSize: "13px", fontWeight: "600", color: "#A44A00", lineHeight: "1.4" }}>{b.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
