import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './KycStep.module.css';

export default function KycStep() {
  const v = useSite();
  return (
    <>
      <div style={{ padding: "22px 22px 16px", borderBottom: "1.5px solid #F2EEFA", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <h3 style={{ fontSize: "22px", color: "#2B2342" }}>Complete your policy form</h3>
          <div style={{ marginTop: "4px", fontSize: "14px", color: "#6F6590" }}>{"Pawteckt Premium · "}{v.subTierName}{" · for "}{v.subPetName}</div>
        </div>
        <button onClick={v.closeSub} aria-label="Close" style={{ flex: "none", width: "32px", height: "32px", borderRadius: "50%", background: "#F2EEFA", color: "#4A3E78", display: "grid", placeItems: "center" }} className={styles.h1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "22px" }}>
        <div style={{ background: "#FFF6E2", border: "1.5px solid #F4DFA8", borderRadius: "16px", padding: "14px 16px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <span style={{ flex: "none", color: "#8A6300", marginTop: "1px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </span>
          <div>
            <div style={{ fontSize: "14.5px", fontWeight: "700", color: "#6B4D00" }}>{v.kycDaysLeft}{" left · submit by "}{v.kycDeadline}</div>
            <p style={{ marginTop: "4px", fontSize: "13px", lineHeight: "1.5", color: "#5A4410" }}>
              {"Your policy starts as soon as you submit this form. If it isn’t submitted by "}{v.kycDeadline}{", the policy won’t be activated and the "}{v.subPrice}{" you paid won’t be refunded."}
            </p>
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: "17px", color: "#2B2342" }}>{"Photos of "}{v.subPetName}</h4>
          <p style={{ marginTop: "4px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>
            Clear, well-lit photos. The insurer uses these to identify your pet at claim time.
          </p>
          <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "10px" }}>
            {v.kycPhotos.map((p: SiteItem, index: number) => (
              <label htmlFor={p.id} style={{ position: "relative", aspectRatio: "1/1", border: "1.5px dashed #CFC2F2", borderRadius: "16px", background: "#FAF8FE", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", textAlign: "center", overflow: "hidden", cursor: "pointer" }} className={styles.h2} key={index}>
                <input id={p.id} type="file" accept="image/*" capture={p.cap} onChange={p.change} style={{ position: "absolute", width: "1px", height: "1px", opacity: "0", pointerEvents: "none" }} />
                {p.empty ? (
                  <>
                    <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fff", color: "#6351A1", display: "grid", placeItems: "center" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                    </span>
                    {" "}
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#2B2342", lineHeight: "1.25" }}>{p.label}</span>
                    {" "}
                    <span style={{ fontSize: "12px", color: "#6F6590", lineHeight: "1.35" }}>{p.hint}</span>
                  </>
                ) : null}
                {p.has ? (
                  <>
                    <img src={p.url} alt={p.label} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                    {" "}
                    <span style={{ position: "absolute", left: "8px", right: "8px", bottom: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", background: "rgba(43,35,66,.78)", color: "#fff", borderRadius: "10px", padding: "6px 9px", fontSize: "12px", fontWeight: "700" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", minWidth: "0" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7FE0B5" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {p.label}
                      </span>
                      <span style={{ color: "#FFC24B" }}>Change</span>
                    </span>
                  </>
                ) : null}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: "17px", color: "#2B2342" }}>Permanent address</h4>
          <div style={{ marginTop: "6px" }}>
            <label htmlFor="pz-kyc-paddr" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>House, street, area, city</label>
            <textarea id="pz-kyc-paddr" rows={3} autoComplete="street-address" placeholder="e.g. Flat 4B, Palm Grove, Baner Road, Pune" value={v.kycPAddr} onChange={v.onKycPAddr} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit", resize: "vertical" }} />
          </div>
          <div style={{ marginTop: "12px" }}>
            <label htmlFor="pz-kyc-ppin" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Pin code</label>
            <input id="pz-kyc-ppin" type="tel" inputMode="numeric" autoComplete="postal-code" maxLength={6} placeholder="6-digit pin code" value={v.kycPPin} onChange={v.onKycPPin} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: "17px", color: "#2B2342" }}>Secondary address</h4>
          <button role="checkbox" aria-checked={v.kycSSame} onClick={v.toggleSSame} style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center", background: "transparent", padding: "0", fontSize: "14.5px", color: "#2B2342", fontFamily: "inherit" }}>
            <span style={v.sameBox}>
              {v.kycSSame ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : null}
            </span>
            Same as permanent address
          </button>
          {v.kycNotSame ? (
            <>
              <div style={{ marginTop: "12px" }}>
                <label htmlFor="pz-kyc-saddr" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>House, street, area, city</label>
                <textarea id="pz-kyc-saddr" rows={3} placeholder="Where else your pet stays, e.g. family home" value={v.kycSAddr} onChange={v.onKycSAddr} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit", resize: "vertical" }} />
              </div>
              <div style={{ marginTop: "12px" }}>
                <label htmlFor="pz-kyc-spin" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Pin code</label>
                <input id="pz-kyc-spin" type="tel" inputMode="numeric" maxLength={6} placeholder="6-digit pin code" value={v.kycSPin} onChange={v.onKycSPin} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "10px" }}>
        <button onClick={v.kycLater} style={{ padding: "15px 12px", borderRadius: "999px", fontSize: "15px", fontWeight: "700", background: "#fff", color: "#CA5C00", border: "2px solid #CA5C00" }} className={styles.h3}>Fill later</button>
        <button onClick={v.submitKyc} disabled={v.kycBad} style={v.subBtnKyc}>Submit &amp; start policy</button>
      </div>
    </>
  );
}
