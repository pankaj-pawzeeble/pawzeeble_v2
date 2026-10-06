export default function JourneyProfileIntro() {
  return (
    <section style={{ padding: "150px 22px 20px", background: "#F7F4FD", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", left: "-80px", top: "60px", width: "280px", height: "280px", borderRadius: "44% 56% 58% 42%/54% 44% 56% 46%", background: "#EFE6FB", zIndex: "0" }} />
      <div style={{ position: "absolute", right: "-40px", top: "200px", width: "180px", height: "180px", borderRadius: "50%", background: "#FFEFDD", zIndex: "0" }} />
      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: "1", textAlign: "center" }}>
        <p style={{ color: "#CA5C00", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" }}>Pawzeeble Ecosystem</p>
        <h1 style={{ marginTop: "14px", fontSize: "clamp(36px,5vw,58px)", color: "#2B2342", textWrap: "balance", lineHeight: "63px", fontWeight: "800" }}>
          Universal Pet Profile.
          <br />
          One Profile for Every Product
        </h1>
        <p style={{ marginTop: "16px", fontSize: "17.5px", lineHeight: "1.6", color: "#5A5177", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
          Scroll to follow one pet profile as it moves across the App, Skale and My Pawz Mart — the same data, three products, zero re-entry.
        </p>
        <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #EBE4F7", padding: "9px 16px", borderRadius: "999px", fontSize: "13.5px", fontWeight: "700", color: "#4A3E78" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6351A1" }} />
            App
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #F2E3D6", padding: "9px 16px", borderRadius: "999px", fontSize: "13.5px", fontWeight: "700", color: "#4A3E78" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#CA5C00" }} />
            Skale
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #D9EEE7", padding: "9px 16px", borderRadius: "999px", fontSize: "13.5px", fontWeight: "700", color: "#4A3E78" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2F9E80" }} />
            My Pawz Mart
          </span>
        </div>
      </div>
    </section>
  );
}
