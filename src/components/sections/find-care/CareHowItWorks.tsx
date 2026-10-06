export default function CareHowItWorks() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "56px 22px 0", paddingTop: "80px" }}>
      <h2 style={{ fontSize: "clamp(28px,3.4vw,40px)", color: "#2B2342", textAlign: "center" }}>It&apos;s Simple and Clear</h2>
      <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "18px" }}>
        <div style={{ position: "relative", background: "#fff", borderRadius: "22px", padding: "24px", overflow: "hidden", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 8px 24px rgba(43,35,66,.06)" }}>
          <div style={{ flex: "1", minWidth: "0" }}>
            <h3 style={{ fontSize: "19px", color: "#2B2342" }}>Verified partners</h3>
            <p style={{ marginTop: "7px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>Clinics and groomers you can trust.</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "92px", alignSelf: "stretch", display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: "-24px -24px -24px 0", background: "linear-gradient(135deg,#EFE9FE,#DCD1FB)", borderRadius: "60% 0 0 60% / 50% 0 0 50%" }} />
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: "2" }} aria-hidden="true">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>
        <div style={{ position: "relative", background: "#fff", borderRadius: "22px", padding: "24px", overflow: "hidden", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 8px 24px rgba(43,35,66,.06)" }}>
          <div style={{ flex: "1", minWidth: "0" }}>
            <h3 style={{ fontSize: "19px", color: "#2B2342" }}>Easy booking</h3>
            <p style={{ marginTop: "7px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>No calls. No waiting. Just pick a slot.</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "92px", alignSelf: "stretch", display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: "-24px -24px -24px 0", background: "linear-gradient(135deg,#EFE9FE,#DCD1FB)", borderRadius: "60% 0 0 60% / 50% 0 0 50%" }} />
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: "2" }} aria-hidden="true">
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="m9 16 2 2 4-4" />
            </svg>
          </div>
        </div>
        <div style={{ position: "relative", background: "#fff", borderRadius: "22px", padding: "24px", overflow: "hidden", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 8px 24px rgba(43,35,66,.06)" }}>
          <div style={{ flex: "1", minWidth: "0" }}>
            <h3 style={{ fontSize: "19px", color: "#2B2342" }}>Extra savings</h3>
            <p style={{ marginTop: "7px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>Pawteckt members save on every visit.</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "92px", alignSelf: "stretch", display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: "-24px -24px -24px 0", background: "linear-gradient(135deg,#EFE9FE,#DCD1FB)", borderRadius: "60% 0 0 60% / 50% 0 0 50%" }} />
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: "2" }} aria-hidden="true">
              <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
              <path d="M2 9v1c0 1.1.9 2 2 2h1" />
              <path d="M16 11h.01" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
