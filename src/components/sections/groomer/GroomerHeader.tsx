import { useSite } from '@/hooks/useSite';
import styles from './GroomerHeader.module.css';

export default function GroomerHeader() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "28px 22px 0" }}>
      <button onClick={v.goCare} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "#6351A1", fontSize: "14.5px", fontWeight: "700", padding: "8px 0" }} className={styles.h1}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back to Find Care
      </button>
      <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
        <h1 style={{ fontSize: "clamp(32px,4vw,48px)", lineHeight: "1.08", color: "#2B2342", letterSpacing: "-.02em" }}>Snip &amp; Sniff Grooming</h1>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {v.clAssured ? (
            <img src="/images/badges/pawzeeble-assured.svg" alt="Pawzeeble Assured" style={{ display: "block", height: "34px", width: "auto" }} />
          ) : null}
          <span style={{ background: "#F2EEFA", color: "#4A3E78", padding: "9px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "700" }}>Verified groomer</span>
        </div>
      </div>
    </section>
  );
}
