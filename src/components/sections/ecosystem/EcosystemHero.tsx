export default function EcosystemHero() {
  return (
    <section data-r="eco1-hero" style={{ margin: "0 auto", padding: "56px 22px 36px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", paddingBottom: "80px", backgroundColor: "#EAE4F9", paddingRight: "100px", paddingLeft: "100px", gap: "16px" }}>
      <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "flex-start", alignItems: "center", alignSelf: "auto" }}>
        <p style={{ marginTop: "18px", fontSize: "18px", lineHeight: "1.62", color: "#CA5C00", maxWidth: "800px", textAlign: "center", width: "100%", fontWeight: "600" }}>PAWZEEBLE ECOSYSTEM</p>
        <h1 style={{ fontSize: "clamp(40px,5.4vw,64px)", color: "#2B2342", textWrap: "balance", textAlign: "center" }}>
          Four products, one promise:{" "}
          <br />
          your pet is looked after.
        </h1>
      </div>
      <p style={{ marginTop: "18px", fontSize: "18px", lineHeight: "1.62", color: "#5A5177", maxWidth: "800px", textAlign: "center", width: "640px" }} data-r="eco1-lede">
        The app is where it starts. Behind it sits an insurance arm, a marketplace, and the software the clinics and salons themselves run on — built so nothing about caring for your pet falls through a gap.
      </p>
    </section>
  );
}
