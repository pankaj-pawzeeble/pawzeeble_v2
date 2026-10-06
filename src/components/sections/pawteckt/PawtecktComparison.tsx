import type { CSSProperties } from 'react';

export default function PawtecktComparison() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "80px 22px 20px" }}>
      <p style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", color: "#CA5C00" }}>SIDE BY SIDE</p>
      <h2 style={{ marginTop: "10px", fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342", textWrap: "balance" }}>Compare all five plans</h2>
      <div data-r="cmp" style={{ marginTop: "26px", background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", overflowX: "auto", overscrollBehaviorX: "contain", WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" } as CSSProperties}>
        <div style={{ minWidth: "820px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))", borderBottom: "1.5px solid #EFEAF8" }}>
            <div style={{ padding: "16px 18px" }} />
            <div style={{ padding: "16px 10px", textAlign: "center", fontSize: "14.5px", fontWeight: "800", color: "#A44A00" }}>Lite</div>
            <div style={{ padding: "16px 10px", textAlign: "center", fontSize: "14.5px", fontWeight: "800", color: "#fff", background: "#6351A1" }}>Starter</div>
            <div style={{ padding: "16px 10px", textAlign: "center", fontSize: "14.5px", fontWeight: "800", color: "#fff", background: "#6351A1" }}>Complete</div>
            <div style={{ padding: "16px 10px", textAlign: "center", fontSize: "14.5px", fontWeight: "800", color: "#fff", background: "#6351A1" }}>Guardian</div>
            <div style={{ padding: "16px 10px", textAlign: "center", fontSize: "14.5px", fontWeight: "800", color: "#fff", background: "#6351A1" }}>Ultimate</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))", borderBottom: "1.5px solid #F2EEFA" }}>
            <div style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#2B2342", display: "flex", flexDirection: "column", justifyContent: "center" }}>Price per year</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>₹539</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹4,999</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹6,999</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <s style={{ fontSize: "12.5px", fontWeight: "600", color: "#9A91B5" }}>₹9,999</s>
                <span>₹7,999</span>
              </span>
            </div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <s style={{ fontSize: "12.5px", fontWeight: "600", color: "#9A91B5" }}>₹13,999</s>
                <span>₹9,999</span>
              </span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))", borderBottom: "1.5px solid #F2EEFA" }}>
            <div style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#2B2342", display: "flex", flexDirection: "column", justifyContent: "center" }}>You save</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>—</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>—</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>—</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>
              <span style={{ color: "#25795F" }}>₹2,000</span>
            </div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>
              <span style={{ color: "#25795F" }}>₹4,000</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))", borderBottom: "1.5px solid #F2EEFA" }}>
            <div style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#2B2342", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              Injury, illness, surgery
              <span style={{ fontSize: "12.5px", fontWeight: "500", color: "#6F6590" }}>cover for each</span>
            </div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>—</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹30,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹50,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹1,00,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹2,00,000</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))", borderBottom: "1.5px solid #F2EEFA" }}>
            <div style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#2B2342", display: "flex", flexDirection: "column", justifyContent: "center" }}>Total cover</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>—</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹90,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹1,50,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹3,00,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹6,00,000</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))", borderBottom: "1.5px solid #F2EEFA" }}>
            <div style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#2B2342", display: "flex", flexDirection: "column", justifyContent: "center" }}>If your pet hurts someone</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>—</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹1,00,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹1,00,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹1,00,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹1,00,000</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))", borderBottom: "1.5px solid #F2EEFA" }}>
            <div style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#2B2342", display: "flex", flexDirection: "column", justifyContent: "center" }}>If you lose your pet</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>—</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹3,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹5,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹10,000</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>₹20,000</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))", borderBottom: "1.5px solid #F2EEFA" }}>
            <div style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#2B2342", display: "flex", flexDirection: "column", justifyContent: "center" }}>Everyday perks</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>
              <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "50%", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center", marginTop: "1px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.4fr) repeat(5,minmax(120px,1fr))" }}>
            <div style={{ padding: "14px 18px", fontSize: "14px", fontWeight: "600", color: "#2B2342", display: "flex", flexDirection: "column", justifyContent: "center" }}>Who can join</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342" }}>Any age</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>6 mo – 5 yrs</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>6 mo – 5 yrs</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>6 mo – 5 yrs</div>
            <div style={{ padding: "14px 10px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#2B2342", background: "#FAF8FE" }}>6 mo – 5 yrs</div>
          </div>
        </div>
      </div>
      <p style={{ marginTop: "14px", fontSize: "13.5px", lineHeight: "1.5", color: "#6F6590" }}>
        Injury, illness and surgery each have their own limit. Together they make up the total cover.
      </p>
    </section>
  );
}
