import ImageSlot from '@/components/ui/ImageSlot';

export default function AboutTeam() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "40px 22px 80px" }}>
      <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ marginTop: "0px", fontSize: "16.5px", color: "#CA5C00", maxWidth: "520px", textAlign: "center", width: "100%", fontWeight: "600", marginBottom: "16px" }}>OUR TEAM</p>
        <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342", textAlign: "center" }}>The people behind it</h2>
        <p style={{ marginTop: "12px", fontSize: "16.5px", color: "#5A5177", maxWidth: "520px", textAlign: "center", width: "100%" }}>Engineers, vets and two very opinionated office dogs.</p>
      </div>
      <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "24px" }}>
        <div>
          <div style={{ height: "291px", borderRadius: "22px", overflow: "hidden" }}>
            <ImageSlot id="pz-team-1" shape="rect" placeholder="Yashh Sathe" />
          </div>
          <h3 style={{ marginTop: "16px", fontSize: "19px", color: "#2B2342" }}>Yashh Sathe</h3>
          <div style={{ marginTop: "4px", fontSize: "13.5px", fontWeight: "700", color: "#A44A00" }}>Founder</div>
          <p style={{ marginTop: "9px", fontSize: "14px", lineHeight: "1.58", color: "#5A5177", display: "none" }}>
            Started Pawzeeble after one bad Saturday night in Kharghar. Beagle owner, which explains a lot.
          </p>
        </div>
        <div>
          <div style={{ height: "291px", borderRadius: "22px", overflow: "hidden" }}>
            <ImageSlot id="pz-team-2" shape="rect" placeholder="Employee Name" />
          </div>
          <h3 style={{ marginTop: "16px", fontSize: "19px", color: "#2B2342" }}>Employee Name</h3>
          <div style={{ marginTop: "4px", fontSize: "13.5px", fontWeight: "700", color: "#A44A00" }}>Head of Operations</div>
          <p style={{ marginTop: "9px", fontSize: "14px", lineHeight: "1.58", color: "#5A5177", display: "none" }}>
            Built the provider verification programme from the very first clinic visit onward.
          </p>
        </div>
        <div>
          <div style={{ height: "291px", borderRadius: "22px", overflow: "hidden" }}>
            <ImageSlot id="pz-team-3" shape="rect" placeholder="Employee Name" />
          </div>
          <h3 style={{ marginTop: "16px", fontSize: "19px", color: "#2B2342" }}>Employee Name</h3>
          <div style={{ marginTop: "4px", fontSize: "13.5px", fontWeight: "700", color: "#A44A00" }}>Head of Veterinary</div>
          <p style={{ marginTop: "9px", fontSize: "14px", lineHeight: "1.58", color: "#5A5177", display: "none" }}>Fifteen years in small animal practice. Reviews everything clinical we publish.</p>
        </div>
        <div>
          <div style={{ height: "291px", borderRadius: "22px", overflow: "hidden" }}>
            <ImageSlot id="pz-team-4" shape="rect" placeholder="Employee Name" />
          </div>
          <h3 style={{ marginTop: "16px", fontSize: "19px", color: "#2B2342" }}>Employee Name</h3>
          <div style={{ marginTop: "4px", fontSize: "13.5px", fontWeight: "700", color: "#A44A00" }}>Head of Engineering</div>
          <p style={{ marginTop: "9px", fontSize: "14px", lineHeight: "1.58", color: "#5A5177", display: "none" }}>Makes sure the app works on a two-bar connection in a clinic basement.</p>
        </div>
      </div>
    </section>
  );
}
