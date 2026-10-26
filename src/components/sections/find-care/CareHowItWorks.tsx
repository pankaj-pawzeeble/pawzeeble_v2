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
            <img src="/images/find-care/icons/verified-partners.svg" alt="" width="44" height="44" style={{ position: "relative", zIndex: "2", marginLeft: "16px" }} />
          </div>
        </div>
        <div style={{ position: "relative", background: "#fff", borderRadius: "22px", padding: "24px", overflow: "hidden", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 8px 24px rgba(43,35,66,.06)" }}>
          <div style={{ flex: "1", minWidth: "0" }}>
            <h3 style={{ fontSize: "19px", color: "#2B2342" }}>Easy booking</h3>
            <p style={{ marginTop: "7px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>No calls. No waiting. Just pick a slot.</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "92px", alignSelf: "stretch", display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: "-24px -24px -24px 0", background: "linear-gradient(135deg,#EFE9FE,#DCD1FB)", borderRadius: "60% 0 0 60% / 50% 0 0 50%" }} />
            <img src="/images/find-care/icons/easy-booking.svg" alt="" width="44" height="44" style={{ position: "relative", zIndex: "2", marginLeft: "16px" }} />
          </div>
        </div>
        <div style={{ position: "relative", background: "#fff", borderRadius: "22px", padding: "24px", overflow: "hidden", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 8px 24px rgba(43,35,66,.06)" }}>
          <div style={{ flex: "1", minWidth: "0" }}>
            <h3 style={{ fontSize: "19px", color: "#2B2342" }}>Extra savings</h3>
            <p style={{ marginTop: "7px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>Pawteckt members save on every visit.</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "92px", alignSelf: "stretch", display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: "-24px -24px -24px 0", background: "linear-gradient(135deg,#EFE9FE,#DCD1FB)", borderRadius: "60% 0 0 60% / 50% 0 0 50%" }} />
            <img src="/images/find-care/icons/extra-savings.svg" alt="" width="48" height="48" style={{ position: "relative", zIndex: "2", marginLeft: "16px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
