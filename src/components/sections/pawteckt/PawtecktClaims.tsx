export default function PawtecktClaims() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "80px 22px 20px" }}>
      <div style={{ background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "36px", padding: "clamp(26px,3.6vw,48px)" }}>
        <div data-r="pt-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "22px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", color: "#CA5C00" }}>CLAIMS · PREMIUM</p>
            <h2 style={{ marginTop: "10px", fontSize: "clamp(26px,3.2vw,38px)", color: "#2B2342", textWrap: "balance" }}>Claiming in three steps</h2>
          </div>
          <span style={{ background: "#E4F4EF", border: "1.5px solid #C9E7DE", color: "#25795F", padding: "10px 16px", borderRadius: "14px", fontSize: "13.5px", fontWeight: "700" }}>Money within 15 working days</span>
        </div>
        <div style={{ marginTop: "26px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#F0EBFA", color: "#6351A1", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#CA5C00" }}>01</span>
            </div>
            <h3 style={{ fontSize: "18px", color: "#2B2342" }}>Tell HDFC ERGO</h3>
            <div style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#5A5177" }}>
              Email{" "}
              <a href="mailto:care@hdfcergo.com" style={{ color: "#6351A1", fontWeight: "700" }}>care@hdfcergo.com</a>
              {" "}or call{" "}
              <a href="tel:+9102261582020" style={{ color: "#6351A1", fontWeight: "700" }}>+91 022 6158 2020</a>
              .
            </div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#F0EBFA", color: "#6351A1", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
              </span>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#CA5C00" }}>02</span>
            </div>
            <h3 style={{ fontSize: "18px", color: "#2B2342" }}>Send the papers</h3>
            <div style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#5A5177" }}>Share the vet bills and prescription they ask for.</div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#F0EBFA", color: "#6351A1", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 22h18" />
                  <path d="M6 18v-7" />
                  <path d="M10 18v-7" />
                  <path d="M14 18v-7" />
                  <path d="M18 18v-7" />
                  <path d="m12 2 8 5H4Z" />
                </svg>
              </span>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#CA5C00" }}>03</span>
            </div>
            <h3 style={{ fontSize: "18px", color: "#2B2342" }}>Get paid</h3>
            <div style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#5A5177" }}>The approved amount reaches you within 15 working days.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
