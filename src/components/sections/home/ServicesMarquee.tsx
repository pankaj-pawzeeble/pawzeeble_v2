import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

export default function ServicesMarquee() {
  const v = useSite();
  return (
    <section style={{ overflow: "hidden", padding: "14px 0 26px" }}>
      <div style={{ display: "flex", width: "max-content", animation: "pzmarquee 38s linear infinite", gap: "12px" }}>
        {v.marquee.map((m: SiteItem, index: number) => (
          <span style={m.style} key={index}>{m.text}</span>
        ))}
      </div>
    </section>
  );
}
