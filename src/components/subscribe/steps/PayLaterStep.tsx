import { useSite } from '@/hooks/useSite';
import styles from './PayLaterStep.module.css';

export default function PayLaterStep() {
  const v = useSite();
  return (
    <>
      <div style={{ position: "relative", background: "#ECE5FA", padding: "28px 22px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
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
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Payment received</div>
        <span style={{ background: "#FFF6E2", color: "#6B4D00", border: "1.5px solid #F4DFA8", padding: "5px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "700" }}>Policy not active yet</span>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h3 style={{ fontSize: "22px", lineHeight: "1.2", color: "#2B2342" }}>Finish your policy form within 10 days</h3>
          <p style={{ marginTop: "6px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>
            {"Download the Pawzeeble app and we’ll guide you through it step by step. "}{v.subPetName}’s policy starts the moment you submit.
          </p>
        </div>
        <div style={{ border: "1.5px solid #F2EEFA", borderRadius: "18px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#6F6590" }}>Submit by</div>
            <div style={{ marginTop: "2px", fontSize: "20px", fontWeight: "800", color: "#2B2342" }}>{v.kycDeadline}</div>
          </div>
          <span style={{ background: "#F3EEFF", color: "#4A3E78", padding: "7px 12px", borderRadius: "999px", fontSize: "13px", fontWeight: "700" }}>10 days left</span>
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>What you’ll need</div>
          <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", lineHeight: "1.45", color: "#5A5177" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: "800" }}>1</span>
              Photos of your pet from the front, left side and right side
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: "800" }}>2</span>
              A selfie of you with your pet
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center", fontSize: "12px", fontWeight: "800" }}>3</span>
              Your permanent and secondary address, with pin codes
            </div>
          </div>
        </div>
        <div style={{ background: "#FDECF1", border: "1.5px solid #F5C3D2", borderRadius: "16px", padding: "14px 16px", fontSize: "13.5px", lineHeight: "1.5", color: "#7A0B30" }}>
          If the form isn’t submitted by{" "}
          <strong>{v.kycDeadline}</strong>
          {", the policy won’t be activated and the "}{v.subPrice}{" you paid won’t be refunded."}
        </div>
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA", display: "flex", flexDirection: "column", gap: "8px" }}>
        <button onClick={v.getApp} style={{ width: "100%", padding: "15px 20px", borderRadius: "999px", fontSize: "15.5px", fontWeight: "700", background: "#CA5C00", color: "#fff" }} className={styles.h1}>Download the app</button>
        <button onClick={v.kycFillNow} style={{ background: "transparent", color: "#6351A1", fontSize: "14.5px", fontWeight: "700", padding: "8px 0" }} className={styles.h2}>Fill the form on the web instead</button>
      </div>
    </>
  );
}
