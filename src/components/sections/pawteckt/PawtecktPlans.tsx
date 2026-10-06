import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './PawtecktPlans.module.css';

export default function PawtecktPlans() {
  const v = useSite();
  return (
    <section id="pt-plans" style={{ maxWidth: "1260px", margin: "0 auto", padding: "80px 22px 20px" }}>
      <div data-r="pt-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "22px", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", color: "#CA5C00" }}>PLANS</p>
          <h2 style={{ marginTop: "10px", fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342", textWrap: "balance" }}>Five plans. Start with your pet’s age.</h2>
        </div>
        <p style={{ fontSize: "15.5px", color: "#5A5177", maxWidth: "380px", lineHeight: "1.55" }}>
          Paid once a year. Prices include taxes. Every plan comes with the full set of everyday perks.
        </p>
      </div>
      <div data-r="pt-agebar" style={{ marginTop: "26px", background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "26px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px 20px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>How old is your pet?</span>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {v.ptAges.map((a: SiteItem, index: number) => (
            <button onClick={a.pick} style={a.style} key={index}>{a.label}</button>
          ))}
        </div>
        <span style={{ flex: "1 1 240px", fontSize: "14.5px", lineHeight: "1.45", color: "#4A3E78", fontWeight: "600" }}>{v.ptAgeNote}</span>
      </div>
      {v.liteResume.length > 0 ? (
        <div style={{ marginTop: "18px", background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "26px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Continue your subscription</span>
          {v.liteResume.map((d: SiteItem, index: number) => (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }} key={index}>
              <span style={{ fontSize: "14.5px", color: "#4A3E78", fontWeight: "600" }}>{d.label}</span>
              <button onClick={d.pick} style={{ background: "#CA5C00", color: "#fff", fontSize: "14px", fontWeight: "700", padding: "10px 20px", borderRadius: "999px" }}>Continue</button>
            </div>
          ))}
        </div>
      ) : null}
      <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: "18px", alignItems: "stretch" }}>
        {v.litePlanVisible ? (
        <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "32px", padding: "clamp(24px,3vw,34px)", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ background: "#FFF1E4", color: "#A44A00", padding: "6px 13px", borderRadius: "999px", fontSize: "12px", fontWeight: "800", letterSpacing: ".04em" }}>PAWTECKT LITE</span>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#25795F" }}>Any age · Any breed</span>
          </div>
          <h3 style={{ fontSize: "clamp(24px,2.6vw,30px)", lineHeight: "1.15", color: "#2B2342" }}>Everyday care</h3>
          <p style={{ fontSize: "15px", lineHeight: "1.55", color: "#5A5177" }}>For check-ups, baths and late-night questions. Medical bills are not covered.</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "clamp(40px,4.4vw,50px)", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1", color: "#2B2342" }}>₹45</span>
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#6F6590" }}>/month</span>
          </div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#A44A00" }}>{v.litePriceLabel}{" paid once a year"}</div>
          <ul style={{ margin: "4px 0 0", padding: "16px 0 0", borderTop: "1.5px solid #F2EEFA", listStyle: "none", display: "grid", gap: "11px" }}>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#2B2342" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>4 check-ups at 50% off</span>
            </li>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#2B2342" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>20% off vaccination, deworming and grooming packages</span>
            </li>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#2B2342" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>25% off spay or neuter</span>
            </li>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#2B2342" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>Free 24×7 vet chat and Sheru AI</span>
            </li>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#2B2342" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>Pet QR tag for lost and found</span>
            </li>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#2B2342" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>3% back in PZB coins on spends over ₹500</span>
            </li>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#2B2342" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>Unlimited storage for health records</span>
            </li>
          </ul>
          <button onClick={v.openSub} style={{ marginTop: "auto", background: "transparent", color: "#CA5C00", border: "2px solid #CA5C00", fontSize: "15.5px", fontWeight: "700", padding: "15px 24px", borderRadius: "999px" }} className={styles.h1}>Get Lite for {v.litePriceLabel}/year</button>
        </div>
        ) : null}
        <div style={{ position: "relative", background: "#6351A1", color: "#fff", borderRadius: "32px", padding: "clamp(24px,3vw,34px)", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ background: "#FFC24B", color: "#2B2342", padding: "6px 13px", borderRadius: "999px", fontSize: "12px", fontWeight: "800", letterSpacing: ".04em" }}>PAWTECKT PREMIUM</span>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#FFC24B" }}>Ages 6 months – 5 years</span>
          </div>
          <h3 style={{ fontSize: "clamp(24px,2.6vw,30px)", lineHeight: "1.15", color: "#fff" }}>Everything in Lite, plus medical bills</h3>
          <p style={{ fontSize: "15px", lineHeight: "1.55", color: "#E4DDF5" }}>Pet insurance by HDFC ERGO. Pick how much cover you want.</p>
          <div role="tablist" aria-label="Premium plans" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "4px", background: "rgba(255,255,255,.12)", padding: "5px", borderRadius: "18px" }}>
            {v.ptTiers.map((t: SiteItem, index: number) => (
              <button role="tab" onClick={t.pick} style={t.style} key={index}>{t.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "clamp(40px,4.4vw,50px)", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1" }}>{v.ptYear}</span>
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#D5CCEE" }}>/year</span>
            {v.ptHasSave ? (
              <s style={{ fontSize: "16px", fontWeight: "600", color: "#BDB2E0" }}>{v.ptWas}</s>
            ) : null}
          </div>
          {v.ptHasSave ? (
            <span style={{ alignSelf: "flex-start", background: "#FFC24B", color: "#2B2342", padding: "6px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "800" }}>{"Pre-release offer · Save "}{v.ptSave}</span>
          ) : null}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "10px" }}>
            <div style={{ background: "rgba(255,255,255,.10)", borderRadius: "16px", padding: "14px" }}>
              <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#D5CCEE" }}>Total cover</div>
              <div style={{ marginTop: "4px", fontSize: "21px", fontWeight: "800" }}>{v.ptTotal}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,.10)", borderRadius: "16px", padding: "14px" }}>
              <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#D5CCEE" }}>Injury, illness, surgery</div>
              <div style={{ marginTop: "4px", fontSize: "21px", fontWeight: "800" }}>
                {v.ptEach}{" "}
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#D5CCEE" }}>each</span>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,.10)", borderRadius: "16px", padding: "14px" }}>
              <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#D5CCEE" }}>If your pet hurts someone</div>
              <div style={{ marginTop: "4px", fontSize: "21px", fontWeight: "800" }}>₹1,00,000</div>
            </div>
            <div style={{ background: "rgba(255,255,255,.10)", borderRadius: "16px", padding: "14px" }}>
              <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#D5CCEE" }}>If you lose your pet</div>
              <div style={{ marginTop: "4px", fontSize: "21px", fontWeight: "800" }}>{v.ptMort}</div>
            </div>
          </div>
          <ul style={{ margin: "0", padding: "14px 0 0", borderTop: "1.5px solid rgba(255,255,255,.18)", listStyle: "none", display: "grid", gap: "11px" }}>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#fff" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#FFC24B", color: "#2B2342", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>All Lite perks included</span>
            </li>
            <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.45", color: "#fff" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#FFC24B", color: "#2B2342", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>Vet visits without a hospital stay covered too</span>
            </li>
          </ul>
          {v.ptPremOk ? (
            <button onClick={v.openPrem} style={{ marginTop: "auto", background: "#CA5C00", color: "#fff", fontSize: "15.5px", fontWeight: "700", padding: "15px 24px", borderRadius: "999px" }} className={styles.h2}>{"Get "}{v.ptTierName}{" for "}{v.ptYear}/year</button>
          ) : null}
          {v.ptPremNo ? (
            <div style={{ marginTop: "auto", background: "rgba(255,255,255,.12)", borderRadius: "18px", padding: "14px 16px", fontSize: "14px", lineHeight: "1.5", color: "#fff" }}>
              Premium is for pets aged 6 months to 5 years. Lite gives your pet everyday care today.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
