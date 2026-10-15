import type { SiteItem } from '@/types/site';

/** One accordion row. The answer is always rendered; a 0fr to 1fr grid row animates its height. */
export default function FaqItem({ q }: { q: SiteItem }) {
  return (
    <div style={q.wrapStyle}>
      <button onClick={q.toggle} aria-expanded={q.open} data-r="faq-q" style={{ width: "100%", textAlign: "left", background: "none", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>
        {q.question}
        <span style={q.iconStyle}>+</span>
      </button>
      <div aria-hidden={!q.open} style={{ display: "grid", gridTemplateRows: q.open ? "1fr" : "0fr", opacity: q.open ? 1 : 0, transition: "grid-template-rows .4s cubic-bezier(.22,1,.36,1), opacity .3s ease" }}>
        <div style={{ overflow: "hidden", minHeight: "0" }}>
          <p data-r="faq-a" style={{ padding: "0 24px 22px", fontSize: "15.5px", lineHeight: "1.68", color: "#5A5177" }}>{q.answer}</p>
        </div>
      </div>
    </div>
  );
}
