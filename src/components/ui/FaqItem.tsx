import type { SiteItem } from '@/types/site';

/** One accordion row. The answer is always rendered; a 0fr to 1fr grid row animates its height. */
export default function FaqItem({ q }: { q: SiteItem }) {
  return (
    <div style={q.wrapStyle}>
      <button onClick={q.toggle} aria-expanded={q.open} data-r="faq-q" style={{ width: "100%", textAlign: "left", background: "none", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>
        {q.question}
        <span style={q.iconStyle}>
          {/* images/icons/faq-close-x.svg with currentColor; rotated 45deg it reads as "+", upright it is "×" */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "block" }}>
            <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" />
          </svg>
        </span>
      </button>
      <div aria-hidden={!q.open} style={{ display: "grid", gridTemplateRows: q.open ? "1fr" : "0fr", opacity: q.open ? 1 : 0, transition: "grid-template-rows .4s cubic-bezier(.22,1,.36,1), opacity .3s ease" }}>
        <div style={{ overflow: "hidden", minHeight: "0" }}>
          <p data-r="faq-a" style={{ padding: "0 24px 22px", fontSize: "15.5px", lineHeight: "1.68", color: "#5A5177" }}>{q.answer}</p>
        </div>
      </div>
    </div>
  );
}
