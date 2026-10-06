import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './PostHeader.module.css';

export default function PostHeader() {
  const v = useSite();
  return (
    <article style={{ maxWidth: "820px", margin: "0 auto", padding: "36px 22px 0" }}>
      <button onClick={v.backToBlog} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #E4DDF3", color: "#4A3E78", padding: "10px 18px 10px 14px", borderRadius: "999px", fontSize: "14px", fontWeight: "700" }} className={styles.h1}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        All articles
      </button>
      <div style={{ marginTop: "28px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {v.post.tags.map((tag: SiteItem, index: number) => (
          <span style={{ background: "#F2EEFA", color: "#4A3E78", padding: "6px 13px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "700" }} key={index}>{tag}</span>
        ))}
      </div>
      <h1 style={{ marginTop: "16px", fontSize: "clamp(32px,4.4vw,50px)", lineHeight: "1.1", letterSpacing: "-.025em", color: "#2B2342", textWrap: "balance" }}>{v.post.title}</h1>
      <p style={{ marginTop: "14px", fontSize: "19px", lineHeight: "1.55", color: "#5A5177", textWrap: "pretty" }}>{v.post.dek}</p>
      <div style={{ marginTop: "22px", padding: "16px 0", borderTop: "1.5px solid #EFEAF8", borderBottom: "1.5px solid #EFEAF8", display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", flex: "none" }}>
          <ImageSlot id={`pz-post-author-${v.post.slotId}`} shape="circle" placeholder="Author" />
        </span>
        <div style={{ fontSize: "14px", lineHeight: "1.4", color: "#6F6590" }}>
          <strong style={{ color: "#2B2342", fontSize: "15px" }}>{v.post.author}</strong>
          <br />
          {v.post.date}{" · "}{v.post.readTime}
        </div>
      </div>
    </article>
  );
}
