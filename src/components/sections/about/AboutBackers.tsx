import ImageSlot from '@/components/ui/ImageSlot';

export default function AboutBackers() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "40px 22px 20px" }}>
      <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ marginTop: "0px", fontSize: "16.5px", color: "#CA5C00", maxWidth: "520px", textAlign: "center", width: "100%", fontWeight: "600", marginBottom: "16px" }}>OUR MENTORS</p>
        <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342", textAlign: "center" }}>The people who backed us early</h2>
        <p style={{ marginTop: "12px", fontSize: "16.5px", color: "#5A5177", maxWidth: "560px", textAlign: "center", width: "100%" }}>Investors who took the first call, and stayed on the line for every one after.</p>
      </div>
      <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "24px" }}>
        <div>
          <div style={{ height: "291px", borderRadius: "22px", overflow: "hidden" }}>
            <ImageSlot id="pz-mentor-1" shape="rect" placeholder="Mentor Name" />
          </div>
          <h3 style={{ marginTop: "16px", fontSize: "19px", color: "#2B2342" }}>Mentor Name</h3>
          <div style={{ marginTop: "4px", fontSize: "13.5px", fontWeight: "700", color: "#A44A00" }}>Investor · Seed round</div>
          <p style={{ marginTop: "9px", fontSize: "14px", lineHeight: "1.58", color: "#5A5177" }}>Backed the first version when it was a spreadsheet of clinics in Kharghar.</p>
        </div>
        <div>
          <div style={{ height: "291px", borderRadius: "22px", overflow: "hidden" }}>
            <ImageSlot id="pz-mentor-2" shape="rect" placeholder="Mentor Name" />
          </div>
          <h3 style={{ marginTop: "16px", fontSize: "19px", color: "#2B2342" }}>Mentor Name</h3>
          <div style={{ marginTop: "4px", fontSize: "13.5px", fontWeight: "700", color: "#A44A00" }}>Investor · Angel</div>
          <p style={{ marginTop: "9px", fontSize: "14px", lineHeight: "1.58", color: "#5A5177" }}>
            Twenty years building consumer marketplaces in India. Keeps us honest on unit economics.
          </p>
        </div>
        <div>
          <div style={{ height: "291px", borderRadius: "22px", overflow: "hidden" }}>
            <ImageSlot id="pz-mentor-3" shape="rect" placeholder="Mentor Name" />
          </div>
          <h3 style={{ marginTop: "16px", fontSize: "19px", color: "#2B2342" }}>Mentor Name</h3>
          <div style={{ marginTop: "4px", fontSize: "13.5px", fontWeight: "700", color: "#A44A00" }}>Investor · Advisor</div>
          <p style={{ marginTop: "9px", fontSize: "14px", lineHeight: "1.58", color: "#5A5177" }}>
            Veterinary supply background. Opens the doors we would otherwise knock on for months.
          </p>
        </div>
      </div>
    </section>
  );
}
