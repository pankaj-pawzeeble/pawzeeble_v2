import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './PaymentStep.module.css';

export default function PaymentStep() {
  const v = useSite();
  return (
    <>
      <div style={{ padding: "16px 22px", background: "#F7F7FA", borderBottom: "1.5px solid #ECEBF1", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", fontWeight: "700", color: "#2B2342" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E9E6A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="18" height="11" x="3" y="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secure checkout · Cashfree Payments
        </span>
        <button onClick={v.closeSub} aria-label="Close" style={{ flex: "none", width: "32px", height: "32px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center" }} className={styles.h1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "16px", border: "1.5px solid #ECEBF1", borderRadius: "16px" }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#2B2342" }}>Pawzeeble</div>
            <div style={{ marginTop: "2px", fontSize: "13px", color: "#6F6590" }}>{v.subPlanName}</div>
          </div>
          <strong style={{ fontSize: "22px", color: "#2B2342" }}>{v.subPrice}</strong>
        </div>
        {v.payIdle ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Pay using</div>
            {v.payMethods.map((m: SiteItem, index: number) => (
              <button onClick={m.pick} style={m.style} key={index}>
                <span style={m.dot} />
                {m.label}
              </button>
            ))}
          </div>
        ) : null}
        {v.payBusy ? (
          <div style={{ padding: "30px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}>
            <span style={{ width: "40px", height: "40px", borderRadius: "50%", border: "4px solid #E6E3EC", borderTopColor: "#CA5C00", animation: "pzspin .8s linear infinite" }} />
            <span style={{ fontSize: "15px", fontWeight: "600", color: "#2B2342" }}>{v.payBusyText ?? "Confirming your payment…"}</span>
          </div>
        ) : null}
        {v.payMsg ? <div role="alert" style={{ fontSize: "14px", lineHeight: "1.5", fontWeight: "600", color: v.payMsgColor }}>{v.payMsg}</div> : null}
        <p style={{ fontSize: "12.5px", lineHeight: "1.5", color: "#6F6590" }}>
          Payment is handled by Cashfree. You&apos;ll return to Pawzeeble once it&apos;s done.
        </p>
      </div>
      {v.payShowBtn !== false ? (
        <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA" }}>
          <button onClick={v.payNow} disabled={v.payBusy} style={v.subBtnPay}>{v.payBtnLabel ? v.payBtnLabel : <>{"Pay "}{v.subPrice}</>}</button>
        </div>
      ) : null}
    </>
  );
}
