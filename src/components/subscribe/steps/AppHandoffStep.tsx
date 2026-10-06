import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './AppHandoffStep.module.css';

export default function AppHandoffStep() {
  const v = useSite();
  return (
    <>
      <div style={{ padding: "22px 22px 0", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={v.closeSub} aria-label="Close" style={{ flex: "none", width: "32px", height: "32px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center" }} className={styles.h1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "4px 30px 30px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px" }}>
        <h3 style={{ fontSize: "24px", color: "#2B2342" }}>Get the Pawzeeble app</h3>
        <p style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#5A5177", maxWidth: "320px" }}>{v.appLine}</p>
        <div style={{ marginTop: "6px", padding: "14px", border: "1.5px solid #EFEAF8", borderRadius: "22px", background: "#fff" }}>
          <svg width="200" height="200" viewBox="0 0 29 29" shapeRendering="crispEdges" aria-label="QR code to download the Pawzeeble app">
            <rect width="29" height="29" fill="#fff" />
            <g fill="#2B2342">
              {v.qrCells.map((c: SiteItem, index: number) => (
                <rect x={c.x} y={c.y} width="1" height="1" key={index} />
              ))}
            </g>
          </svg>
        </div>
        <div style={{ fontSize: "13px", color: "#6F6590" }}>Available on Android and iOS</div>
        <button onClick={v.backToDone} style={{ marginTop: "6px", background: "transparent", color: "#6351A1", fontSize: "14.5px", fontWeight: "700", padding: "8px 0" }} className={styles.h2}>Back to summary</button>
      </div>
    </>
  );
}
