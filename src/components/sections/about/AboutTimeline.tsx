import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

export default function AboutTimeline() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "70px 22px 20px" }}>
      <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342" }}>How we got here</h2>
      <div style={{ marginTop: "34px" }}>
        {v.timeline.map((t: SiteItem, index: number) => (
          <div style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: "20px", alignItems: "start" }} key={index}>
            <div style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-.03em", color: "#CA5C00", paddingTop: "13px" }}>{t.year}</div>
            <div style={{ borderLeft: "2px solid #E6DFF4", padding: "13px 0 32px 26px", position: "relative" }}>
              <span style={t.dotStyle} />
              <h3 style={{ fontSize: "20px", color: "#2B2342" }}>{t.title}</h3>
              <p style={{ marginTop: "8px", fontSize: "15.5px", lineHeight: "1.62", color: "#5A5177", maxWidth: "640px" }}>{t.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
