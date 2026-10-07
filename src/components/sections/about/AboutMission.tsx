export default function AboutMission() {
  return (
    <section style={{ maxWidth: "1260px", margin: "48px auto 0", padding: "0 22px" }}>
      <div style={{ position: "relative", overflow: "hidden", background: "#6351A1", borderRadius: "36px", padding: "clamp(30px,4.4vw,58px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/about/mission-card-india-paw-map.webp" alt="" aria-hidden="true" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", height: "130%", width: "auto", right: "clamp(-60px, -3vw, -20px)", opacity: ".35", pointerEvents: "none" }} />
        <p style={{ position: "relative", fontSize: "clamp(22px,2.9vw,34px)", lineHeight: "1.35", color: "#fff", fontWeight: "800", letterSpacing: "-.025em", maxWidth: "880px", textWrap: "pretty" }}>
          To make good pet care ordinary in India — verified, affordable and close enough to walk to.
        </p>
        <p style={{ position: "relative", marginTop: "16px", fontSize: "14.5px", fontWeight: "600", color: "#D5CCEE" }}>Our mission, unchanged since 2021</p>
      </div>
    </section>
  );
}
