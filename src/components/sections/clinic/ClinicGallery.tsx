import ImageSlot from '@/components/ui/ImageSlot';

export default function ClinicGallery() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "18px 22px 0" }}>
      <div data-r="cl-gallery" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "200px 200px", gap: "10px", borderRadius: "28px", overflow: "hidden" }}>
        <div style={{ gridRow: "1 / span 2", background: "#F2EEFA" }}>
          <ImageSlot id="pz-cl-photo-1" shape="rect" placeholder="Clinic front / reception" />
        </div>
        <div style={{ background: "#F2EEFA" }}>
          <ImageSlot id="pz-cl-photo-2" shape="rect" placeholder="Consultation room" />
        </div>
        <div style={{ background: "#F2EEFA" }}>
          <ImageSlot id="pz-cl-photo-3" shape="rect" placeholder="Pet with vet" />
        </div>
        <div style={{ background: "#F2EEFA" }}>
          <ImageSlot id="pz-cl-photo-4" shape="rect" placeholder="Diagnostics lab" />
        </div>
        <div style={{ background: "#F2EEFA" }}>
          <ImageSlot id="pz-cl-photo-5" shape="rect" placeholder="Waiting area" />
        </div>
      </div>
    </section>
  );
}
