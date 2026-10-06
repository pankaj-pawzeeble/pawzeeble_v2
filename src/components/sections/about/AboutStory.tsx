import ImageSlot from '@/components/ui/ImageSlot';

export default function AboutStory() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "56px 22px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "44px", alignItems: "center" }}>
      <div>
        <h1 style={{ fontSize: "clamp(38px,5.2vw,60px)", color: "#2B2342", textWrap: "balance" }}>It started with one adopted Indie and no one to call.</h1>
        <p style={{ marginTop: "20px", fontSize: "17.5px", lineHeight: "1.68", color: "#5A5177", maxWidth: "520px", textWrap: "pretty" }}>
          In 2018, while doing his MBA at SIBM Pune, Yash Sathe rescued a paralyzed pup named Leah. Struggling to find proper care, he realized India lacked a tech-driven pet care ecosystem.
        </p>
        <p style={{ marginTop: "16px", fontSize: "17.5px", lineHeight: "1.68", color: "#5A5177", maxWidth: "520px", textWrap: "pretty" }}>
          That spark led to Pawzeeble — a platform uniting pet parents, vets, and services.
        </p>
      </div>
      <div data-r="art-sm" style={{ position: "relative", minHeight: "420px" }}>
        <div style={{ position: "absolute", left: "0", top: "0", width: "58%", height: "250px", borderRadius: "28px", overflow: "hidden", transform: "rotate(-4deg)", boxShadow: "0 20px 42px rgba(43,35,66,.15)" }}>
          <ImageSlot id="pz-ab-1" shape="rect" placeholder="Founder with his dog" />
        </div>
        <div style={{ position: "absolute", right: "0", top: "60px", width: "48%", height: "200px", borderRadius: "28px", overflow: "hidden", transform: "rotate(5deg)", boxShadow: "0 20px 42px rgba(43,35,66,.15)" }}>
          <ImageSlot id="pz-ab-2" shape="rect" placeholder="Team at the clinic" />
        </div>
        <div style={{ position: "absolute", left: "16%", bottom: "0", width: "50%", height: "180px", borderRadius: "28px", overflow: "hidden", transform: "rotate(2deg)", boxShadow: "0 20px 42px rgba(43,35,66,.15)" }}>
          <ImageSlot id="pz-ab-3" shape="rect" placeholder="Pet parents and pets" />
        </div>
      </div>
    </section>
  );
}
