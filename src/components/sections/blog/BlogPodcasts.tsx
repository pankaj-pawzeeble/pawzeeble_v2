import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

export default function BlogPodcasts() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "34px 22px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px" }}>
        {v.podcasts.map((e: SiteItem, index: number) => (
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", overflow: "hidden" }} key={index}>
            <div style={{ position: "relative", height: "186px" }}>
              <ImageSlot id={e.slotId} shape="rect" placeholder={e.photoHint} />
              <span style={{ position: "absolute", left: "16px", bottom: "16px", width: "52px", height: "52px", borderRadius: "50%", display: "grid", placeItems: "center", pointerEvents: "none", boxShadow: "0 8px 20px rgba(43,35,66,.28)" }}>
                <svg width="52" height="52" viewBox="2 2 20 20" aria-hidden="true" style={{ display: "block" }}>
                  <circle cx="12" cy="12" r="10" fill="#CA5C00" />
                  <path d="M10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z" fill="#fff" />
                </svg>
              </span>
              {" "}
              <span style={{ position: "absolute", right: "16px", top: "16px", background: "rgba(16,16,20,.82)", color: "#fff", padding: "5px 11px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", pointerEvents: "none" }}>{e.length}</span>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#A44A00" }}>{"Episode "}{e.number}{" · YouTube"}</div>
              <h3 style={{ marginTop: "7px", fontSize: "20px", color: "#2B2342", lineHeight: "1.24" }}>{e.title}</h3>
              <p style={{ marginTop: "8px", fontSize: "14.5px", lineHeight: "1.6", color: "#5A5177" }}>{e.dek}</p>
              <div style={{ marginTop: "10px", fontSize: "12.5px", color: "#6F6590" }}>{"With "}{e.guest}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
