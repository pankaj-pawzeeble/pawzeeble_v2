import { useSite } from '@/hooks/useSite';
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
          <div style={q.wrapStyle} key={index}>
            <button onClick={q.toggle} style={{ width: "100%", textAlign: "left", background: "none", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>
              {q.question}
              <span style={{ textAlign: "center" }}>+</span>
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
