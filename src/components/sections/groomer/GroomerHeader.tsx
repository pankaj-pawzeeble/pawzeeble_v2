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
            <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#0E7C6B", color: "#fff", padding: "9px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "800", letterSpacing: ".03em" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              PAWZEEBLE ASSURED
            </span>
          ) : null}
          <span style={{ background: "#F2EEFA", color: "#4A3E78", padding: "9px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "700" }}>Verified groomer</span>
        </div>
      </div>
    </section>
  );
}
