import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './EligibilityStep.module.css';

export default function EligibilityStep() {
  const v = useSite();
  return (
    <>
      <div style={{ padding: "22px 22px 16px", borderBottom: "1.5px solid #F2EEFA", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <h3 style={{ fontSize: "22px", color: "#2B2342" }}>Before you pay</h3>
          <div style={{ marginTop: "4px", fontSize: "14px", color: "#6F6590" }}>{v.subPlanLine}</div>
        </div>
        <button onClick={v.closeSub} aria-label="Close" style={{ flex: "none", width: "32px", height: "32px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center" }} className={styles.h1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h4 style={{ fontSize: "18px", color: "#2B2342" }}>Please read the eligibility criteria</h4>
          <p style={{ marginTop: "4px", fontSize: "14px", lineHeight: "1.5", color: "#5A5177" }}>
            Your pet must meet all of these for the policy to start and for claims to be paid.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {v.eligItems.map((e: SiteItem, index: number) => (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#2B2342" }} key={index}>
              <span style={{ flex: "none", marginTop: "1px", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#1E9E6A", display: "grid", placeItems: "center" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>{e.t}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#FFF6E2", border: "1.5px solid #F4DFA8", borderRadius: "16px", padding: "14px 16px" }}>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#6B4D00" }}>After you pay</div>
          <p style={{ marginTop: "4px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A4410" }}>
            You’ll have 10 days to share 3 photos of your pet, a selfie with your pet and your address. Your policy starts as soon as you submit them.
          </p>
        </div>
        <button role="checkbox" aria-checked={v.declOn} onClick={v.toggleDecl} style={{ display: "flex", gap: "12px", alignItems: "flex-start", textAlign: "left", background: "#FAF8FE", border: "1.5px solid #E4DDF3", borderRadius: "16px", padding: "14px", fontSize: "14px", lineHeight: "1.5", color: "#2B2342", fontFamily: "inherit" }}>
          <span style={v.declBox}>
            {v.declOn ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : null}
          </span>
          <span>
            <strong>Declaration.</strong>
            {" "}I declare that my pet satisfies all the eligibility criteria above and that the information I provide is true. I understand a claim can be rejected if it isn’t.
          </span>
        </button>
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA" }}>
        <button onClick={v.eligNext} disabled={v.eligBad} style={v.subBtnElig}>Agree &amp; continue to payment</button>
      </div>
    </>
  );
}
