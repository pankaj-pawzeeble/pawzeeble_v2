import { useSite } from '@/hooks/useSite';
import FaqItem from '@/components/ui/FaqItem';
import type { SiteItem } from '@/types/site';

export default function HomeFaqSection() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "940px", margin: "0 auto", padding: "64px 22px 70px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }}>
        <p style={{ fontSize: "16.5px", lineHeight: "1.6", color: "#CA5C00", maxWidth: "330px", textAlign: "left", fontWeight: "600", paddingBottom: "16px" }}>FAQS</p>
        <h2 style={{ fontSize: "clamp(32px,4vw,48px)", color: "#2B2342", textAlign: "center" }}>Questions Answered</h2>
      </div>
      <div style={{ marginTop: "26px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {v.faqs.map((q: SiteItem, index: number) => (
          <FaqItem q={q} key={index} />
        ))}
      </div>
    </section>
  );
}
