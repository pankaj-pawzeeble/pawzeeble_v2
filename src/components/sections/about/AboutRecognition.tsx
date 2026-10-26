import styles from './About.module.css';

const PRESS = [
  { img: 'press-ys', alt: 'YourStory', href: 'https://yourstory.com/2025/06/pawzeeble-pune-startup-creating-tech-based-pet-care', maxH: 56 },
  { img: 'press-g360', alt: 'Gadgets 360', href: 'https://www.gadgets360.com/apps/news/pawzeeble-is-building-a-pet-focused-social-networking-space-for-indian-users-indian-startup-yashh-sathe-11576385', maxH: 56 },
  { img: 'press-ie', alt: 'The Indian Express', href: 'https://indianexpress.com/article/technology/tech-news-technology/from-bark-to-byte-how-startups-are-reimagining-pet-parenting-10643127/', maxH: 34 },
];

export default function AboutRecognition() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "clamp(80px,10vw,128px) 22px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <p style={{ marginBottom: "12px", color: "#CA5C00", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" }}>Recognition</p>
        <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342", textWrap: "balance" }}>They found us first</h2>
      </div>
      <div className={styles.rec} style={{ marginTop: "40px", background: "#F7F4FD", border: "1.5px solid #EFEAF8", borderRadius: "28px", overflow: "hidden" }}>
        <div className={styles.recPhoto}>
          <img src="/images/about/ganguly-v2.webp" alt="Sourav Ganguly" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className={styles.recBody} style={{ padding: "clamp(24px,4vw,56px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "16px" }}>
          <span style={{ background: "#FFF1E4", color: "#A44A00", padding: "5px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "700" }}>Partnership offer</span>
          <h3 style={{ fontSize: "clamp(24px,2.8vw,34px)", lineHeight: "1.2", color: "#2B2342", letterSpacing: "-.02em", textWrap: "balance" }}>Sourav Ganguly personally reached out to partner with Pawzeeble.</h3>
          <p style={{ fontSize: "17px", lineHeight: "1.6", color: "#5A5177", maxWidth: "560px", textWrap: "pretty" }}>The former Indian cricket team captain and a pet lover found Pawzeeble on his own and expressed interest in partnering with the platform.</p>
          <p style={{ fontSize: "17px", lineHeight: "1.6", color: "#2B2342", fontWeight: "700", maxWidth: "560px", textWrap: "pretty" }}>That&apos;s not a testimonial we bought. That&apos;s someone finding us first.</p>
        </div>
      </div>
      <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "20px" }}>
        {PRESS.map((p) => (
          <a href={p.href} target="_blank" rel="noopener" className={styles.press} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", padding: "clamp(22px,2.4vw,28px)", display: "flex", flexDirection: "column", gap: "28px", textDecoration: "none", color: "#2B2342" }} key={p.img}>
            <span style={{ fontSize: "12.5px", fontWeight: "700", letterSpacing: ".06em", textTransform: "uppercase", color: "#5A5177" }}>Featured in</span>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px" }}>
              <span style={{ height: "56px", minWidth: "0", flex: "1", display: "flex", alignItems: "center" }}>
                <img src={`/images/shared/${p.img}.webp`} alt={p.alt} style={{ maxHeight: p.maxH + "px", maxWidth: "100%", width: "auto", display: "block" }} />
              </span>
              <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "50%", background: "#FFF1E4", color: "#CA5C00", display: "grid", placeItems: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
