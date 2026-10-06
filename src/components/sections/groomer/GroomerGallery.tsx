import ImageSlot from '@/components/ui/ImageSlot';

export default function GroomerGallery() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "18px 22px 0" }}>
      <div data-r="cl-gallery" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "200px 200px", gap: "10px", borderRadius: "28px", overflow: "hidden" }}>
        <div style={{ gridRow: "1 / span 2", background: "#F2EEFA" }}>
          <ImageSlot id="pz-gr-photo-1" shape="rect" placeholder="Salon front" />
        </div>
        <div style={{ background: "#F2EEFA" }}>
          <ImageSlot id="pz-gr-photo-2" shape="rect" placeholder="Grooming station" />
        </div>
        <div style={{ background: "#F2EEFA" }}>
          <ImageSlot id="pz-gr-photo-3" shape="rect" placeholder="Dog after a bath" />
        </div>
        <div style={{ background: "#F2EEFA" }}>
          <ImageSlot id="pz-gr-photo-4" shape="rect" placeholder="Cat being groomed" />
        </div>
        <div style={{ background: "#F2EEFA" }}>
          <ImageSlot id="pz-gr-photo-5" shape="rect" placeholder="Waiting lounge" />
        </div>
      </div>
    </section>
  );
}
