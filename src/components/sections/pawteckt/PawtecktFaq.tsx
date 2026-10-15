import { useSite } from '@/hooks/useSite';
import FaqItem from '@/components/ui/FaqItem';
import type { SiteItem } from '@/types/site';

export default function PawtecktFaq() {
  const v = useSite();
  return (
    <section data-r="pt-sec" style={{ maxWidth: "940px", margin: "0 auto", padding: "80px 22px 60px" }}>
      <h2 style={{ fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342", textWrap: "balance" }}>Quick answers</h2>
      <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {v.ptFaqs.map((q: SiteItem, index: number) => (
          <FaqItem q={q} key={index} />
        ))}
      </div>
    </section>
  );
}
