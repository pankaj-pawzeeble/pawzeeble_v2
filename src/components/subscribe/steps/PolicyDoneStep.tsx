import { useSite } from '@/hooks/useSite';
import styles from './PolicyDoneStep.module.css';

export default function PolicyDoneStep() {
  const v = useSite();
  return (
    <>
      <div style={{ position: "relative", background: "#ECE5FA", padding: "28px 22px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
        <button onClick={v.closeSub} aria-label="Close" style={{ position: "absolute", right: "16px", top: "16px", width: "32px", height: "32px", borderRadius: "50%", background: "#fff", color: "#4A3E78", display: "grid", placeItems: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <span style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#1E9E6A", color: "#fff", display: "grid", placeItems: "center", boxShadow: "0 0 0 5px #fff" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div style={{ marginTop: "4px", fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>{v.subPetName}{" is now protected!"}</div>
        <div style={{ fontSize: "15px", fontWeight: "600", color: "#2B2342" }}>{"Policy start date: "}{v.polStart}</div>
        <div style={{ fontSize: "12.5px", color: "#6F6590" }}>{"Covered until: "}{v.polEnd}</div>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "16px", background: "#FAF8FE" }}>
        <div style={{ background: "#fff", border: "1.5px solid #F2EEFA", borderRadius: "18px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "#5A5177" }}>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#2B2342", paddingBottom: "8px", borderBottom: "1.5px solid #F2EEFA" }}>Policy summary</div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <span>Plan</span>
            <span style={{ color: "#2B2342", fontWeight: "600" }}>{"Pawteckt Premium · "}{v.subTierName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <span>Total cover</span>
            <span style={{ color: "#2B2342", fontWeight: "600" }}>{v.subCover}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <span>Insurer</span>
            <span style={{ color: "#2B2342", fontWeight: "600" }}>HDFC ERGO</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingTop: "8px", borderTop: "1.5px solid #F2EEFA", fontWeight: "700", color: "#2B2342" }}>
            <span>Paid</span>
            <span>{v.subPrice}</span>
          </div>
        </div>
        <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>
          Your policy document will be sent to your email and shown in the Pawzeeble app. Lite benefits like vet chat and Pet QR are active too.
        </p>
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA" }}>
        <button onClick={v.getApp} style={{ width: "100%", padding: "15px 20px", borderRadius: "999px", fontSize: "15.5px", fontWeight: "700", background: "#CA5C00", color: "#fff" }} className={styles.h1}>Download the app</button>
      </div>
    </>
  );
}
