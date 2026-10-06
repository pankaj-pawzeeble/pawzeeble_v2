import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

export default function AppQrCard() {
  const v = useSite();
  return (
    <aside id="pz-qr" style={{ position: "fixed", right: "22px", bottom: "22px", zIndex: "70", width: "148px" }}>
      <div style={{ position: "absolute", top: "-84px", width: "92px", height: "100px", borderRadius: "50% 50% 40% 40%", overflow: "hidden", boxShadow: "0 -6px 18px rgba(43,35,66,.12)", left: "24px" }}>
        <ImageSlot id="pz-qr-dog" shape="rect" placeholder="Dog peeking" />
      </div>
      <div style={{ position: "relative", border: "1.5px solid #E9E2F6", borderRadius: "24px", padding: "12px", boxShadow: "0 18px 40px rgba(43,35,66,.16)", backgroundColor: "#6351A1", paddingTop: "12px", paddingRight: "12px", paddingBottom: "12px", paddingLeft: "12px", animation: "float" }}>
        <div style={{ borderRadius: "12px", overflow: "hidden", background: "#fff", display: "grid", placeItems: "center", padding: "5px", height: "124px" }}>
          <svg width="114" height="114" viewBox="0 0 29 29" shapeRendering="crispEdges" aria-label="QR code to download the Pawzeeble app">
            <rect width="29" height="29" fill="#fff" />
            <g fill="#2B2342">
              {v.qrCells.map((c: SiteItem, index: number) => (
                <rect x={c.x} y={c.y} width="1" height="1" key={index} />
              ))}
            </g>
          </svg>
        </div>
        <div style={{ marginTop: "8px", fontSize: "12.5px", fontWeight: "700", color: "#f3f2f2", lineHeight: "1.3", textAlign: "center" }}>
          Scan to download{" "}
          <br />
          the Pawzeeble app
        </div>
        <div style={{ marginTop: "4px", fontSize: "12px", color: "#f3f2f2", display: "none" }}>iOS and Android</div>
      </div>
    </aside>
  );
}
