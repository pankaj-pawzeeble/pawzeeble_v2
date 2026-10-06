import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './EcosystemProducts.module.css';

export default function EcosystemProducts() {
  const v = useSite();
  return (
    <>
      {v.products.map((p: SiteItem, index: number) => (
        <section data-r="eco1-prod" style={{ paddingRight: "200px", paddingLeft: "200px", paddingTop: "80px", paddingBottom: "80px" }} key={index}>
          <div style={p.innerStyle}>
            <div style={p.textOrder}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={p.iconStyle}>{p.glyph}</div>
                <span style={p.taglineStyle}>{p.tagline}</span>
              </div>
              <h2 style={{ marginTop: "16px", fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342" }}>{p.title}</h2>
              <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.65", color: "#5A5177", maxWidth: "480px", textWrap: "pretty" }}>{p.body}</p>
              <ul style={{ margin: "22px 0 0", padding: "0", listStyle: "none", display: "grid", gap: "10px" }}>
                {p.points.map((pt: SiteItem, index2: number) => (
                  <li style={{ display: "flex", gap: "11px", alignItems: "flex-start", fontSize: "15.5px", color: "#2B2342", fontWeight: "600" }} key={index2}>
                    <span style={{ flex: "none", width: "20px", height: "20px", borderRadius: "50%", background: "#2F9E80", color: "#fff", display: "grid", placeItems: "center", fontSize: "11px", marginTop: "2px" }}>✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <button onClick={p.action} style={{ marginTop: "26px", background: "#CA5C00", color: "#fff", fontSize: "15.5px", fontWeight: "700", padding: "15px 28px", borderRadius: "999px", boxShadow: "0 10px 22px rgba(202,92,0,.22)" }} className={styles.h1}>{p.cta}</button>
            </div>
            <div style={p.visualOrder}>
              <div style={p.blobStyle} />
              <div style={{ position: "absolute", ...p.photoPos, width: "152px", height: "186px", borderRadius: "24px", overflow: "hidden", transform: p.photoTilt, boxShadow: "0 18px 36px rgba(43,35,66,.16)", zIndex: "3" }}>
                <ImageSlot id={p.slotId} shape="rect" placeholder={p.photoHint} />
              </div>
              <div style={p.frameStyle}>
                {p.hasShot ? (
                  <div style={p.screenStyle}>
                    <ImageSlot id={p.shotId} shape="rect" src={p.shot} placeholder={`${p.title} screen`} style={p.imgStyle} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
