import styles from './About.module.css';

const BULLETS = [
  'Promoter of Pawzeeble since inception.',
  'Founder and Managing Director of Muraspec Distributors India Pvt. Ltd.',
  'Successfully guided Pawzeeble from concept to execution.',
  'Advises on business development and growth strategies.',
  'Ensures alignment with the company’s vision and goals.',
];

export default function AboutCofounder() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "clamp(40px,8vw,96px) 22px 0" }}>
      <div className={styles.cof} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", padding: "clamp(18px,3vw,36px)", boxShadow: "0 18px 48px -28px rgba(43,35,66,.28)" }}>
        <div className={styles.cofPhoto}>
          <img src="/images/team/mentor-girish.webp" alt="Mr. Girish Sathe" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px", minWidth: "0" }}>
          <p style={{ color: "#CA5C00", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" }}>Co-Founder</p>
          <h2 style={{ fontSize: "clamp(28px,3.4vw,40px)", color: "#2B2342", textWrap: "balance" }}>Mr. Girish Sathe</h2>
          <ul style={{ margin: "6px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {BULLETS.map((b) => (
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "16px", lineHeight: "1.55", color: "#5A5177" }} key={b}>
                <span aria-hidden="true" style={{ flex: "none", marginTop: "8px", width: "8px", height: "8px", borderRadius: "50%", background: "#CA5C00" }} />
                <span style={{ textWrap: "pretty" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
