import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './RelatedReads.module.css';

export default function RelatedReads() {
  const v = useSite();
  return (
    <section style={{ background: "#F7F4FD", padding: "56px 22px 70px" }}>
      <div style={{ maxWidth: "1260px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "18px", flexWrap: "wrap", paddingBottom: "14px", borderBottom: "2px solid #2B2342" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,34px)", color: "#2B2342" }}>Related reads</h2>
          <button onClick={v.backToBlog} style={{ background: "none", padding: "0", color: "#A44A00", fontSize: "14.5px", fontWeight: "700" }} className={styles.h1}>All articles</button>
        </div>
        <div style={{ marginTop: "26px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "30px" }}>
          {v.relatedPosts.map((a: SiteItem, index: number) => (
            <div onClick={a.open} style={{ cursor: "pointer" }} className={styles.h2} key={index}>
              <div style={{ height: "176px", borderRadius: "22px", overflow: "hidden" }}>
                <ImageSlot id={a.slotId} shape="rect" placeholder={a.photoHint} />
              </div>
              <div style={{ marginTop: "13px", fontSize: "12.5px", fontWeight: "700", color: "#A44A00" }}>{a.kicker}</div>
              <h3 style={{ marginTop: "6px", fontSize: "20px", color: "#2B2342", lineHeight: "1.24" }}>{a.title}</h3>
              <p style={{ marginTop: "8px", fontSize: "14.5px", lineHeight: "1.6", color: "#5A5177" }}>{a.dek}</p>
              <div style={{ marginTop: "10px", fontSize: "12.5px", color: "#6F6590" }}>{a.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
