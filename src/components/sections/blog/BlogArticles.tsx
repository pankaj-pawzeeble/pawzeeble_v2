import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './BlogArticles.module.css';

export default function BlogArticles() {
  const v = useSite();
  return (
    <>
      <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "34px 22px 0" }}>
        <div onClick={v.openLead} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "34px", alignItems: "start", paddingBottom: "34px", borderBottom: "2px solid #2B2342", cursor: "pointer" }} className={styles.h1}>
          <div style={{ height: "330px", borderRadius: "26px", overflow: "hidden" }}>
            <ImageSlot id="pz-journal-lead" shape="rect" placeholder="Vet examining a puppy" />
          </div>
          <div>
            <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#A44A00" }}>{v.leadPost.kicker}</div>
            <h2 style={{ marginTop: "10px", fontSize: "clamp(28px,3.4vw,40px)", color: "#2B2342", textWrap: "balance" }}>{v.leadPost.title}</h2>
            <p style={{ marginTop: "14px", fontSize: "16.5px", lineHeight: "1.65", color: "#5A5177", maxWidth: "480px" }}>{v.leadPost.dek}</p>
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "11px" }}>
              <span style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                <ImageSlot id="pz-journal-author" shape="circle" placeholder="Author" />
              </span>
              <div style={{ fontSize: "13.5px", lineHeight: "1.4", color: "#6F6590" }}>
                <strong style={{ color: "#2B2342" }}>{v.leadPost.author}</strong>
                <br />
                {v.leadPost.meta}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "34px 22px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "30px" }}>
          {v.articles.map((a: SiteItem, index: number) => (
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
      </section>
    </>
  );
}
