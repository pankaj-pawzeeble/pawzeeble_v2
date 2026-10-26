import styles from './About.module.css';

const photo = { display: "block", width: "100%", height: "100%", objectFit: "cover" } as const;

/** Hero: headline, lede and three overlapping photos. */
export default function AboutStory() {
  return (
    <section className={styles.hero} style={{ maxWidth: "1260px", margin: "0 auto", padding: "64px 22px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "48px", alignItems: "center" }}>
      <div>
        <h1 style={{ fontSize: "clamp(40px,5.6vw,66px)", color: "#2B2342", textWrap: "balance" }}>Better pet care? It&apos;s <span style={{ color: "#6351A1" }}>Pawzeeble.</span></h1>
        <p style={{ marginTop: "20px", fontSize: "18px", lineHeight: "1.66", color: "#5A5177", maxWidth: "500px", textWrap: "pretty" }}>We&apos;re making pet care in India simple, digital and within reach for every pet parent.</p>
      </div>
      <div className={styles.artSm}>
        <div style={{ position: "absolute", left: "0", top: "0", width: "58%", height: "260px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 42px rgba(43,35,66,.15)" }}>
          <img src="/images/about/hero-tee-v3.webp" alt="Pawzeeble T-shirt" style={photo} />
        </div>
        <div style={{ position: "absolute", right: "0", top: "50px", width: "calc(42% - 12px)", height: "210px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 42px rgba(43,35,66,.15)" }}>
          <img src="/images/about/hero-founder-booth.webp" alt="Founder at the Pawzeeble booth" style={photo} />
        </div>
        <div style={{ position: "absolute", left: "18%", top: "272px", width: "52%", height: "190px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 42px rgba(43,35,66,.15)" }}>
          <img src="/images/about/hero-team.webp" alt="The Pawzeeble team" style={photo} />
        </div>
      </div>
    </section>
  );
}
