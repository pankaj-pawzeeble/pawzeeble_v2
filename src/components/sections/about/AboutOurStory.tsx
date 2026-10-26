import styles from './About.module.css';

const eyebrow = { marginBottom: "12px", color: "#CA5C00", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" } as const;

export default function AboutOurStory() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "clamp(80px,10vw,128px) 22px 0" }}>
      <div className={styles.story}>
        <div className={styles.storyPhoto}>
          <div style={{ aspectRatio: "4 / 5", borderRadius: "32px", overflow: "hidden", background: "#F0EBFA" }}>
            <img src="/images/about/founder-leaya.webp" alt="Yashh Sathe with Leaya" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className={styles.storyPill} style={{ background: "#fff", borderRadius: "999px", padding: "8px 16px 8px 10px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 10px 26px rgba(43,35,66,.14)", color: "#CA5C00", fontSize: "13.5px", fontWeight: "700" }}>
            <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#FFF1E4", display: "grid", placeItems: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5.5" cy="10" r="2.2" /><circle cx="9.5" cy="5.5" r="2.2" /><circle cx="14.5" cy="5.5" r="2.2" /><circle cx="18.5" cy="10" r="2.2" /><path d="M12 11c-3 0-6.5 4.6-6.5 7.2 0 1.8 1.4 2.8 3.2 2.8 1.4 0 2.2-.8 3.3-.8s1.9.8 3.3.8c1.8 0 3.2-1 3.2-2.8C18.5 15.6 15 11 12 11z" /></svg>
            </span>
            <span style={{ color: "#2B2342" }}>Leaya</span>
          </div>
        </div>
        <div className={styles.storyText}>
          <p style={eyebrow}>Our story</p>
          <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342", textWrap: "balance" }}>It started with Leaya</h2>
          <p style={{ marginTop: "18px", fontSize: "17.5px", lineHeight: "1.7", color: "#5A5177", maxWidth: "560px", textWrap: "pretty" }}>
            In 2018, while doing his MBA at SIBM Pune, Yashh Sathe rescued a paralyzed pup named Leaya. Finding her proper care was a struggle, and he realized India had no tech-driven pet care ecosystem. So he set out to build one.
          </p>
          <div className={styles.pun} style={{ marginTop: "32px", background: "#FFC24B", borderRadius: "28px", padding: "clamp(22px,3vw,32px)", transform: "rotate(-1.2deg)", maxWidth: "560px", boxShadow: "0 16px 36px rgba(202,92,0,.16)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", fontSize: "clamp(22px,2.6vw,30px)", fontWeight: "800", letterSpacing: "-.025em", color: "#2B2342", lineHeight: "1.1" }}>
              <span style={{ background: "#fff", borderRadius: "999px", padding: "6px 16px", color: "#6351A1" }}>Paw</span>
              <span>+</span>
              <span style={{ background: "#fff", borderRadius: "999px", padding: "6px 16px", color: "#CA5C00" }}>Possible</span>
              <span>=</span>
              <span>Pawzeeble.</span>
            </div>
            <p style={{ marginTop: "16px", fontSize: "15.5px", lineHeight: "1.62", color: "#2B2342", textWrap: "pretty" }}>
              Yes, it&apos;s a pun, and we&apos;re proud of it. &quot;Paw&quot; is for the pets who run our lives. &quot;Zeeble&quot; is for our belief that great pet care should be possible for every pet in India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
