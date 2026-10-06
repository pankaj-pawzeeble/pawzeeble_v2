import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

export default function TestimonialsSection() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "56px 22px 10px", paddingTop: "80px", paddingBottom: "40px" }}>
      <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }}>
        <p style={{ fontSize: "16.5px", lineHeight: "1.6", color: "#CA5C00", maxWidth: "330px", textAlign: "left", fontWeight: "600", paddingBottom: "16px" }}>TESTIMONIALS</p>
        <h2 style={{ fontSize: "clamp(32px,4vw,48px)", color: "#2B2342", textAlign: "center" }}>What pet parents tell us</h2>
      </div>
      <div data-r="wrap" style={{ marginTop: "26px", display: "flex", gap: "14px", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "16px 22px" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#2B2342" aria-hidden="true">
            <path d="M16.4 12.7c0-2 1.1-3.2 2.4-3.9-1-1.4-2.5-1.6-3.3-1.6-1 0-1.9.5-2.5.5s-1.4-.5-2.4-.5c-1.8 0-3.7 1.5-3.7 4.4 0 1.8.6 3.7 1.5 5 .7 1.1 1.4 2 2.3 2s1.2-.5 2.3-.5 1.3.5 2.3.5 1.7-1 2.4-2.1c.4-.6.7-1.2.9-1.8-1.3-.5-2.2-1.7-2.2-2.5zM14.6 5.9c.5-.6.8-1.4.7-2.2-.8 0-1.6.5-2.1 1.1-.5.6-.8 1.4-.7 2.1.8.1 1.6-.4 2.1-1z" />
          </svg>
          <div>
            <div style={{ fontSize: "13px", color: "#6F6590", fontWeight: "600" }}>App Store</div>
            <div style={{ marginTop: "2px", display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ fontSize: "22px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>4.8</span>
              <span style={{ color: "#FFC24B", fontSize: "13px", letterSpacing: "1.5px" }}>★★★★★</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "16px 22px" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#2B2342" aria-hidden="true">
            <path d="M3.6 2.3c-.4.3-.6.8-.6 1.4v16.6c0 .6.2 1.1.6 1.4l9.1-9.7-9.1-9.7zM14.1 12.9l2.6 2.8-9.4 5.4c-.5.3-1 .2-1.4-.1l8.2-8.1zM14.1 11.1L5.9 3c.4-.3.9-.4 1.4-.1l9.4 5.4-2.6 2.8zM17.9 9.1l3 1.7c.7.4.7 1.6 0 2l-3 1.7-2.9-3.1 2.9-2.3z" />
          </svg>
          <div>
            <div style={{ fontSize: "13px", color: "#6F6590", fontWeight: "600" }}>Google Play</div>
            <div style={{ marginTop: "2px", display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ fontSize: "22px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>4.7</span>
              <span style={{ color: "#FFC24B", fontSize: "13px", letterSpacing: "1.5px" }}>★★★★★</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "18px", justifyContent: "flex-start", alignItems: "stretch" }}>
        {v.testimonials.map((t: SiteItem, index: number) => (
          <div style={t.style} key={index}>
            <div style={{ color: "#FFC24B", fontSize: "17px", letterSpacing: "2px" }}>★★★★★</div>
            <p style={{ marginTop: "14px", fontSize: "16.5px", lineHeight: "1.66", color: "#2B2342", textWrap: "pretty" }}>{t.quote}</p>
            <div style={{ marginTop: "auto", paddingTop: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ flex: "none", width: "46px", height: "46px", borderRadius: "50%", overflow: "hidden" }}>
                <ImageSlot id={t.slotId} shape="circle" placeholder="Photo" />
              </span>
              <div>
                <div style={{ fontSize: "14.5px", fontWeight: "700", color: "#2B2342" }}>{t.name}</div>
                <div style={{ fontSize: "13px", color: "#6F6590" }}>{t.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
