import ImageSlot from '@/components/ui/ImageSlot';

export default function CareCategories() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "34px 22px 0", paddingTop: "24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(268px,1fr))", gap: "18px" }}>
        <div style={{ position: "relative", background: "#fff", borderRadius: "26px", padding: "22px", overflow: "hidden", display: "flex", gap: "8px", minHeight: "186px", boxShadow: "0 8px 26px rgba(43,35,66,.07)", width: "100%", boxSizing: "border-box" }}>
          <div style={{ position: "relative", zIndex: "2", flex: "1", minWidth: "0", textAlign: "left" }}>
            <span style={{ display: "inline-block", background: "#0E7C6B", color: "#fff", padding: "6px 12px", borderRadius: "8px", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".04em" }}>50% OFF</span>
            <h3 style={{ marginTop: "14px", fontSize: "25px", color: "#0E7C6B", letterSpacing: "-.025em" }}>Vet Clinics</h3>
            <p style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.45", color: "#5A5177" }}>Find trusted vets near you</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "124px", alignSelf: "stretch" }}>
            <div style={{ position: "absolute", right: "-8px", top: "14px", bottom: "0", left: "6px", background: "#D8EDE8", borderRadius: "30px 8px 34px 10px", transform: "rotate(-4deg)" }} />
            <div style={{ position: "absolute", inset: "0", zIndex: "2" }}>
              <ImageSlot id="pz-cc-vet" shape="rect" placeholder="Vet holding a puppy" />
            </div>
          </div>
        </div>
        <div style={{ position: "relative", background: "#fff", borderRadius: "26px", padding: "22px", overflow: "hidden", display: "flex", gap: "8px", minHeight: "186px", boxShadow: "0 8px 26px rgba(43,35,66,.07)", width: "100%", boxSizing: "border-box" }}>
          <div style={{ position: "relative", zIndex: "2", flex: "1", minWidth: "0", textAlign: "left" }}>
            <span style={{ display: "inline-block", background: "#D9536E", color: "#fff", padding: "6px 12px", borderRadius: "8px", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".04em" }}>50% OFF</span>
            <h3 style={{ marginTop: "14px", fontSize: "25px", color: "#C0405A", letterSpacing: "-.025em" }}>Groomers</h3>
            <p style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.45", color: "#5A5177" }}>Find groomers near you</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "124px", alignSelf: "stretch" }}>
            <div style={{ position: "absolute", right: "-8px", top: "14px", bottom: "0", left: "6px", background: "#FBD6DF", borderRadius: "30px 8px 34px 10px", transform: "rotate(-4deg)" }} />
            <div style={{ position: "absolute", inset: "0", zIndex: "2" }}>
              <ImageSlot id="pz-cc-groom" shape="rect" placeholder="Groomer brushing a dog" />
            </div>
          </div>
        </div>
        <div style={{ position: "relative", background: "#fff", borderRadius: "26px", padding: "22px", overflow: "hidden", display: "flex", gap: "8px", minHeight: "186px", boxShadow: "0 8px 26px rgba(43,35,66,.07)", width: "100%", boxSizing: "border-box" }}>
          <div style={{ position: "relative", zIndex: "2", flex: "1", minWidth: "0", textAlign: "left" }}>
            <span style={{ display: "inline-block", background: "transparent", color: "#6351A1", border: "1.5px solid #6351A1", padding: "4.5px 11px", borderRadius: "8px", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".04em" }}>COMING SOON</span>
            <h3 style={{ marginTop: "14px", fontSize: "25px", color: "#0E7C6B", letterSpacing: "-.025em" }}>Boarders</h3>
            <p style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.45", color: "#5A5177" }}>Verified boarder near you</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "124px", alignSelf: "stretch" }}>
            <div style={{ position: "absolute", right: "-8px", top: "14px", bottom: "0", left: "6px", background: "#D8EDE8", borderRadius: "30px 8px 34px 10px", transform: "rotate(-4deg)" }} />
            <div style={{ position: "absolute", inset: "0", zIndex: "2" }}>
              <ImageSlot id="pz-cc-board" shape="rect" placeholder="Pet parent with a dog and cat" />
            </div>
          </div>
        </div>
        <div style={{ position: "relative", background: "#fff", borderRadius: "26px", padding: "22px", overflow: "hidden", display: "flex", gap: "8px", minHeight: "186px", boxShadow: "0 8px 26px rgba(43,35,66,.07)", width: "100%", boxSizing: "border-box" }}>
          <div style={{ position: "relative", zIndex: "2", flex: "1", minWidth: "0", textAlign: "left" }}>
            <span style={{ display: "inline-block", background: "transparent", color: "#6351A1", border: "1.5px solid #6351A1", padding: "4.5px 11px", borderRadius: "8px", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".04em" }}>COMING SOON</span>
            <h3 style={{ marginTop: "14px", fontSize: "25px", color: "#8A4B2A", letterSpacing: "-.025em" }}>Trainers</h3>
            <p style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.45", color: "#5A5177" }}>Certified trainers near you</p>
          </div>
          <div style={{ position: "relative", flex: "none", width: "124px", alignSelf: "stretch" }}>
            <div style={{ position: "absolute", right: "-8px", top: "14px", bottom: "0", left: "6px", background: "#FCE3CB", borderRadius: "30px 8px 34px 10px", transform: "rotate(-4deg)" }} />
            <div style={{ position: "absolute", inset: "0", zIndex: "2" }}>
              <ImageSlot id="pz-cc-train" shape="rect" placeholder="Trainer with a German Shepherd" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
