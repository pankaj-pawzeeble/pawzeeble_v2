import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './BookingDialog.module.css';

export default function BookingDialog() {
  const v = useSite();
  return (
    <div role="dialog" aria-modal="true" aria-label="Book in the Pawzeeble app" onClick={v.closeBk} style={{ position: "fixed", inset: "0", zIndex: "210", background: "rgba(43,35,66,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={v.stopBk} style={{ position: "relative", width: "100%", maxWidth: "420px", background: "#fff", borderRadius: "28px", boxShadow: "0 30px 80px rgba(43,35,66,.3)", padding: "22px 30px 30px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px" }}>
        <button onClick={v.closeBk} aria-label="Close" style={{ position: "absolute", right: "16px", top: "16px", width: "32px", height: "32px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center" }} className={styles.h1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <span style={{ marginTop: "14px", background: "#FFF1E4", color: "#A44A00", fontSize: "12.5px", fontWeight: "700", padding: "6px 12px", borderRadius: "999px" }}>{v.bkWhat}</span>
        <h3 style={{ fontSize: "24px", color: "#2B2342", textWrap: "balance" }}>Book this appointment in the app</h3>
        <p style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#5A5177", maxWidth: "320px" }}>
          Scan with your phone camera to download Pawzeeble. Pick your pet, choose a slot and confirm the booking in the app.
        </p>
        <div style={{ marginTop: "4px", padding: "14px", border: "1.5px solid #EFEAF8", borderRadius: "22px", background: "#fff" }}>
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
      </div>
    </div>
  );
}
