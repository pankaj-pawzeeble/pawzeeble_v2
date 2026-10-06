export default function PawtecktEligibility() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "80px 22px 20px" }}>
      <p style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", color: "#CA5C00" }}>BEFORE YOU CHOOSE PREMIUM</p>
      <h2 style={{ marginTop: "10px", fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342", textWrap: "balance" }}>Is your pet ready?</h2>
      <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "12px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "16px" }}>
          <span style={{ flex: "none", width: "38px", height: "38px", borderRadius: "12px", background: "#FFF1E4", color: "#A44A00", display: "grid", placeItems: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
              <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
              <path d="M2 21h20" />
              <path d="M7 8v3" />
              <path d="M12 8v3" />
              <path d="M17 8v3" />
            </svg>
          </span>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#2B2342" }}>6 months to 5 years old</div>
            <div style={{ marginTop: "3px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Your pet needs to be in this age range when you buy.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "16px" }}>
          <span style={{ flex: "none", width: "38px", height: "38px", borderRadius: "12px", background: "#FFF1E4", color: "#A44A00", display: "grid", placeItems: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m18 2 4 4" />
              <path d="m17 7 3-3" />
              <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
              <path d="m9 11 4 4" />
              <path d="m5 19-3 3" />
              <path d="m14 4 6 6" />
            </svg>
          </span>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#2B2342" }}>Basic vaccines up to date</div>
            <div style={{ marginTop: "3px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Keep the vaccination record handy.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "16px" }}>
          <span style={{ flex: "none", width: "38px", height: "38px", borderRadius: "12px", background: "#FFF1E4", color: "#A44A00", display: "grid", placeItems: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            </svg>
          </span>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#2B2342" }}>Existing problems aren’t covered</div>
            <div style={{ marginTop: "3px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Anything your pet already has is left out.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "16px" }}>
          <span style={{ flex: "none", width: "38px", height: "38px", borderRadius: "12px", background: "#FFF1E4", color: "#A44A00", display: "grid", placeItems: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </span>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#2B2342" }}>Regular care at home</div>
            <div style={{ marginTop: "3px", fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Keep your pet cared for and safe.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
