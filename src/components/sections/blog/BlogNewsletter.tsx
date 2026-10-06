import styles from './BlogNewsletter.module.css';

export default function BlogNewsletter() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "44px 22px 60px" }}>
      <div style={{ background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "32px", padding: "clamp(26px,3.6vw,44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "26px", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "clamp(24px,2.8vw,32px)", color: "#2B2342" }}>One careful email a month</h2>
          <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.6", color: "#5A5177", maxWidth: "420px" }}>
            Seasonal health reminders, new episodes, and what our vets are seeing in clinic. No offers dressed up as advice.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input type="email" placeholder="you@email.com" aria-label="Email address" style={{ flex: "1", minWidth: "190px", background: "#fff", border: "1.5px solid #E0D8F1", borderRadius: "999px", padding: "15px 22px", fontFamily: "inherit", fontSize: "15px", color: "#2B2342" }} />
          <button style={{ flex: "none", background: "#CA5C00", color: "#fff", fontSize: "15px", fontWeight: "700", padding: "15px 28px", borderRadius: "999px" }} className={styles.h1}>Subscribe</button>
        </div>
      </div>
    </section>
  );
}
