export default function AboutStats() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "20px 22px 10px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "14px" }}>
        <div style={{ background: "#F0EBFA", color: "#2B2342", borderRadius: "26px", padding: "26px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "clamp(30px,3.6vw,42px)", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1" }}>1.2L+</div>
          <div style={{ marginTop: "8px", fontSize: "13.5px", fontWeight: "600", lineHeight: "1.45", opacity: ".75" }}>pet parents on the app</div>
        </div>
        <div style={{ background: "#6351A1", color: "#fff", borderRadius: "26px", padding: "26px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "clamp(30px,3.6vw,42px)", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1" }}>4</div>
          <div style={{ marginTop: "8px", fontSize: "13.5px", fontWeight: "600", lineHeight: "1.45", opacity: ".75" }}>cities live today</div>
        </div>
        <div style={{ background: "#FFF1E4", color: "#2B2342", borderRadius: "26px", padding: "26px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "clamp(30px,3.6vw,42px)", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1" }}>3,400+</div>
          <div style={{ marginTop: "8px", fontSize: "13.5px", fontWeight: "600", lineHeight: "1.45", opacity: ".75" }}>verified providers</div>
        </div>
        <div style={{ background: "#FFC24B", color: "#2B2342", borderRadius: "26px", padding: "26px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
          <div style={{ fontSize: "clamp(30px,3.6vw,42px)", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1" }}>2019</div>
          <div style={{ marginTop: "8px", fontSize: "13.5px", fontWeight: "600", lineHeight: "1.45", opacity: ".75" }}>founded in Pune</div>
        </div>
      </div>
    </section>
  );
}
