import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

export default function PawtecktFaq() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "940px", margin: "0 auto", padding: "80px 22px 60px" }}>
      <h2 style={{ fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342", textWrap: "balance" }}>Quick answers</h2>
      <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {v.ptFaqs.map((q: SiteItem, index: number) => (
          <div style={q.wrapStyle} key={index}>
            <button onClick={q.toggle} style={{ width: "100%", textAlign: "left", background: "none", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>
              {q.question}
              <span style={q.iconStyle}>+</span>
            </button>
            {q.open ? (
              <p style={{ padding: "0 24px 22px", fontSize: "15.5px", lineHeight: "1.68", color: "#5A5177" }}>{q.answer}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
