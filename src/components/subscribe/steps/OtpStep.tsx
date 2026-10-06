import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './OtpStep.module.css';

export default function OtpStep() {
  const v = useSite();
  return (
    <>
      <div style={{ padding: "22px 22px 16px", borderBottom: "1.5px solid #F2EEFA", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <h3 style={{ fontSize: "22px", color: "#2B2342" }}>Almost there</h3>
          <div style={{ marginTop: "4px", fontSize: "14px", color: "#6F6590" }}>{v.subPlanLine}</div>
        </div>
        <button onClick={v.closeSub} aria-label="Close" style={{ flex: "none", width: "32px", height: "32px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center" }} className={styles.h1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px" }}>
        <label htmlFor="pz-sub-phone" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Mobile Number</label>
        <div style={{ marginTop: "8px", display: "flex", border: "1.5px solid #D9D1EE", borderRadius: "14px", overflow: "hidden", background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 12px", borderRight: "1.5px solid #E9E2F6" }}>
            <span style={{ width: "24px", height: "16px", borderRadius: "3px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 0 0 1px #E9E2F6" }}>
              <span style={{ flex: "1", background: "#FF9933" }} />
              <span style={{ flex: "1", background: "#fff", display: "grid", placeItems: "center" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", border: "1px solid #1A237E" }} />
              </span>
              <span style={{ flex: "1", background: "#138808" }} />
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6F6590" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <span style={{ paddingLeft: "12px", display: "flex", alignItems: "center", fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>+91</span>
          <input id="pz-sub-phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="Enter Mobile Number" value={v.subPhone} onChange={v.onSubPhone} style={{ flex: "1", minWidth: "0", border: "0", outline: "none", padding: "14px 12px", fontSize: "16px", color: "#2B2342", background: "transparent", fontFamily: "inherit" }} />
        </div>
        <h4 style={{ marginTop: "26px", fontSize: "21px", color: "#2B2342" }}>Verify OTP</h4>
        <div style={{ marginTop: "4px", fontSize: "13.5px", color: "#6F6590" }}>{"Sent to +91 "}{v.subPhone}</div>
        <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr))", gap: "8px" }}>
          {v.otpBoxes.map((o: SiteItem, index: number) => (
            <input id={o.id} type="tel" inputMode="numeric" autoComplete="one-time-code" maxLength={1} aria-label={o.label} value={o.v} onChange={o.change} onKeyDown={o.key} onPaste={o.paste} style={o.style} key={index} />
          ))}
        </div>
        <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
          <button onClick={v.resendOtp} disabled={v.otpWait} style={v.resendStyle}>Resend OTP</button>
          <span style={{ fontSize: "13px", color: "#5A5177" }}>
            Time left:{" "}
            <strong style={{ color: "#2B2342" }}>{v.otpTimer}</strong>
          </span>
        </div>
        {v.otpErr ? <div role="alert" style={{ marginTop: "10px", fontSize: "13px", color: "#CE0049" }}>{v.otpErr}</div> : null}
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA", display: "flex", flexDirection: "column", gap: "14px" }}>
        <p style={{ fontSize: "12.5px", lineHeight: "1.5", color: "#6F6590", textAlign: "center" }}>
          By continuing, you agree to our
          <br />
          <a href="#" style={{ color: "#2B2342", fontWeight: "700" }}>Terms &amp; Conditions</a>
          {" "}·{" "}
          <a href="#" style={{ color: "#2B2342", fontWeight: "700" }}>Privacy Policy</a>
        </p>
        <button onClick={v.verifyOtp} disabled={v.otpBad} style={v.subBtnOtp}>Verify &amp; Continue</button>
      </div>
    </>
  );
}
