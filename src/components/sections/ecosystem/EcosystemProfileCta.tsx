import { useSite } from '@/hooks/useSite';
import styles from './EcosystemProfileCta.module.css';

export default function EcosystemProfileCta() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "60px 22px 80px" }}>
      <div style={{ background: "#6351A1", borderRadius: "36px", padding: "clamp(30px,4.4vw,58px)", color: "#fff", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "40px", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 100 100" style={{ position: "absolute", right: "-26px", bottom: "-40px", width: "250px", height: "250px", opacity: ".13", color: "#fff" }} fill="currentColor" aria-hidden="true">
          <ellipse cx="28" cy="30" rx="11" ry="15" />
          <ellipse cx="52" cy="21" rx="11" ry="15.5" />
          <ellipse cx="76" cy="32" rx="10.5" ry="14" />
          <path d="M52 46c14 0 24 11 24 21s-10 13-24 13-24-3-24-13 10-21 24-21z" />
        </svg>
        <div style={{ position: "relative" }}>
          <p style={{ fontSize: "13.5px", fontWeight: "700", letterSpacing: ".06em", textTransform: "uppercase", color: "#FFC24B" }}>Guided walkthrough</p>
          <h2 style={{ marginTop: "12px", fontSize: "clamp(28px,3.4vw,42px)", color: "#fff", maxWidth: "560px", textWrap: "pretty" }}>Experience the ecosystem through a pet&apos;s profile.</h2>
          <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.62", color: "#E4DDF5", maxWidth: "480px" }}>
            Follow one profile as it moves from the app to the clinic to the marketplace, and watch the four products hand it over to each other.
          </p>
          <button onClick={v.goJourney} style={{ marginTop: "28px", display: "inline-flex", alignItems: "center", gap: "10px", background: "#CA5C00", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px", boxShadow: "0 12px 26px rgba(0,0,0,.22)" }} className={styles.h1}>
            Explore the journey
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "210px", background: "#fff", borderRadius: "28px", padding: "18px", boxShadow: "0 24px 50px rgba(0,0,0,.26)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#F0EBFA", display: "grid", placeItems: "center", fontSize: "19px" }}>🐕</div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "#2B2342" }}>Sheru</div>
                <div style={{ fontSize: "12.5px", color: "#7A719A" }}>Indie · 3 yrs</div>
              </div>
            </div>
            <div style={{ marginTop: "16px", display: "grid", gap: "8px" }}>
              <div style={{ height: "9px", borderRadius: "999px", background: "#EDE8F8" }} />
              <div style={{ height: "9px", borderRadius: "999px", background: "#EDE8F8", width: "72%" }} />
              <div style={{ height: "9px", borderRadius: "999px", background: "#EDE8F8", width: "54%" }} />
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "6px" }}>
              <span style={{ flex: "1", height: "26px", borderRadius: "8px", background: "#F0EBFA" }} />
              <span style={{ flex: "1", height: "26px", borderRadius: "8px", background: "#FBEDE2" }} />
              <span style={{ flex: "1", height: "26px", borderRadius: "8px", background: "#E4F4EF" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
