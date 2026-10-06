import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

export default function BlogHero() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "52px 22px 0" }}>
      <h1 style={{ fontSize: "clamp(36px,4.8vw,56px)", color: "#2B2342" }}>The Pawzeeble Journal</h1>
      <p style={{ marginTop: "14px", fontSize: "17.5px", lineHeight: "1.62", color: "#5A5177", maxWidth: "540px" }}>
        Written by our veterinarians and the pet parents who have been through it. Read it, or listen on the podcast.
      </p>
      <div style={{ marginTop: "22px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {v.blogTabs.map((t: SiteItem, index: number) => (
          <button onClick={t.pick} style={t.style} key={index}>{t.label}</button>
        ))}
      </div>
    </section>
  );
}
