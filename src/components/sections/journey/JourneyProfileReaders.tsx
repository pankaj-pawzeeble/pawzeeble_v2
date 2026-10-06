import { useSite } from '@/hooks/useSite';
import styles from './JourneyProfileReaders.module.css';

export default function JourneyProfileReaders() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "64px 22px", minHeight: "100vh", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "16.5px", color: "#CA5C00", fontWeight: "600" }}>HOW IT STAYS IN SYNC</p>
        <h2 style={{ marginTop: "10px", fontSize: "clamp(28px,3.6vw,40px)", color: "#2B2342", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", textWrap: "balance" }}>One profile, read by every product</h2>
      </div>
      <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "18px" }}>
        <div style={{ background: "#F0EBFA", borderRadius: "24px", padding: "24px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#fff", color: "#6351A1", display: "grid", placeItems: "center" }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
          </div>
          <div style={{ marginTop: "14px", fontSize: "16.5px", fontWeight: "800", color: "#2B2342" }}>Digital Records</div>
          <div style={{ marginTop: "6px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Always current, everywhere it&apos;s needed</div>
        </div>
        <div style={{ background: "#FBEDE2", borderRadius: "24px", padding: "24px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#fff", color: "#CA5C00", display: "grid", placeItems: "center" }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
            </svg>
          </div>
          <div style={{ marginTop: "14px", fontSize: "16.5px", fontWeight: "800", color: "#2B2342" }}>Auto-Synced Docs</div>
          <div style={{ marginTop: "6px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Vaccine slips, filed without you lifting a finger</div>
        </div>
        <div style={{ background: "#E4F4EF", borderRadius: "24px", padding: "24px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#fff", color: "#25795F", display: "grid", placeItems: "center" }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            </svg>
          </div>
          <div style={{ marginTop: "14px", fontSize: "16.5px", fontWeight: "800", color: "#2B2342" }}>Vet Dashboard</div>
          <div style={{ marginTop: "6px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Your vet sees it the moment you arrive</div>
        </div>
        <div style={{ background: "#F0EBFA", borderRadius: "24px", padding: "24px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#fff", color: "#6351A1", display: "grid", placeItems: "center" }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15.5 7.5 3.4-3.4a2.1 2.1 0 0 1 3 3L18.5 10.5" />
              <circle cx="7.5" cy="15.5" r="5.5" />
            </svg>
          </div>
          <div style={{ marginTop: "14px", fontSize: "16.5px", fontWeight: "800", color: "#2B2342" }}>One Login</div>
          <div style={{ marginTop: "6px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Sign in once, stay signed in across all three</div>
        </div>
      </div>
      <section style={{ maxWidth: "1260px", margin: "48px auto 96px", padding: "0 22px", display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
        <button onClick={v.retakeJourney} style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#CA5C00", color: "#fff", fontSize: "15.5px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} className={styles.h1}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Retake the journey
        </button>
        <button onClick={v.goEco} style={{ background: "transparent", color: "#2B2342", fontSize: "15.5px", fontWeight: "700", padding: "16px 28px", borderRadius: "999px", border: "2px solid #D9D1EE" }} className={styles.h2}>Back to Ecosystem</button>
      </section>
    </section>
  );
}
