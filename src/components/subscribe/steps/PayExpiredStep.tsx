import { useSite } from '@/hooks/useSite';
import styles from './PayExpiredStep.module.css';

export default function PayExpiredStep() {
  const v = useSite();
  return (
    <>
      <div style={{ position: "relative", background: "#FDECF1", padding: "28px 22px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
        <button onClick={v.closeSub} aria-label="Close" style={{ position: "absolute", right: "16px", top: "16px", width: "32px", height: "32px", borderRadius: "50%", background: "#fff", color: "#4A3E78", display: "grid", placeItems: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <span style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#CE0049", color: "#fff", display: "grid", placeItems: "center", boxShadow: "0 0 0 5px #fff", fontSize: "26px", fontWeight: "800" }}>!</span>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#7A0B30" }}>Policy not activated</div>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h3 style={{ fontSize: "22px", lineHeight: "1.2", color: "#2B2342" }}>The 10-day window has closed</h3>
          <p style={{ marginTop: "8px", fontSize: "14.5px", lineHeight: "1.55", color: "#5A5177" }}>
            {"The policy form had to be submitted by "}{v.kycDeadline}{". Because it wasn’t, "}{v.subPetName}{"’s policy was not activated and the "}{v.subPrice}{" paid can’t be refunded."}
          </p>
        </div>
        <div style={{ border: "1.5px solid #F2EEFA", borderRadius: "18px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "#5A5177" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <span>Plan</span>
            <span style={{ color: "#2B2342", fontWeight: "600" }}>{"Pawteckt Premium · "}{v.subTierName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <span>Paid on</span>
            <span style={{ color: "#2B2342", fontWeight: "600" }}>{v.payDate}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <span>Form due by</span>
            <span style={{ color: "#CE0049", fontWeight: "700" }}>{v.kycDeadline}</span>
          </div>
        </div>
        <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>
          {"To protect "}{v.subPetName}, you can buy a new Premium plan and submit the form within 10 days of paying.
        </p>
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA", display: "flex", flexDirection: "column", gap: "8px" }}>
        <button onClick={v.closeSub} style={{ width: "100%", padding: "15px 20px", borderRadius: "999px", fontSize: "15.5px", fontWeight: "700", background: "#CA5C00", color: "#fff" }} className={styles.h1}>View Premium plans</button>
        <a href="mailto:support@pawzeeble.com" style={{ textAlign: "center", color: "#6351A1", fontSize: "14.5px", fontWeight: "700", padding: "8px 0", textDecoration: "none" }}>Contact support</a>
      </div>
    </>
  );
}
