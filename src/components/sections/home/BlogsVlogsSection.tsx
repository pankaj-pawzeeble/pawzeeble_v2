import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './BlogsVlogsSection.module.css';

export default function BlogsVlogsSection() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "56px 22px 10px", paddingTop: "80px", marginTop: "40px", marginBottom: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "18px", flexWrap: "wrap", paddingBottom: "14px", borderBottom: "2px solid #2B2342" }}>
        <h2 style={{ fontSize: "clamp(26px,3vw,34px)", color: "#2B2342" }}>Blogs and Vlogs</h2>
        <button onClick={v.goBlog} style={{ background: "none", padding: "0", color: "#A44A00", fontSize: "14.5px", fontWeight: "700" }} className={styles.h1}>All articles and podcasts</button>
      </div>
      <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "34px", alignItems: "start" }}>
        <button onClick={v.goBlog} style={{ background: "none", padding: "0", textAlign: "left", display: "block", width: "100%" }}>
          <div style={{ height: "210px", borderRadius: "22px", overflow: "hidden" }}>
            <ImageSlot id="pz-blog-lead" shape="rect" placeholder="Vet examining a puppy" style={{ height: "210px" }} />
          </div>
          <div style={{ marginTop: "14px", fontSize: "12.5px", fontWeight: "700", color: "#A44A00" }}>{v.leadPost.kicker}</div>
          <h3 style={{ marginTop: "7px", fontSize: "23px", color: "#2B2342", lineHeight: "1.2" }}>{v.leadPost.title}</h3>
          <p style={{ marginTop: "9px", fontSize: "14.5px", lineHeight: "1.6", color: "#5A5177", maxWidth: "420px" }}>{v.leadPost.dek}</p>
          <div style={{ marginTop: "10px", fontSize: "13px", color: "#6F6590" }}>{v.leadPost.meta}</div>
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {v.homePosts.map((b: SiteItem, index: number) => (
            <button onClick={v.goBlog} style={b.rowStyle} key={index}>
              <div style={b.markStyle}>
                {b.isPlay ? (
                  <svg width="34" height="34" viewBox="2 2 20 20" aria-hidden="true" style={{ display: "block" }}>
                    <circle cx="12" cy="12" r="10" fill="#CA5C00" />
                    <path d="M10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z" fill="#fff" />
                  </svg>
                ) : null}
                {b.notPlay ? (
                  <>
                    {b.mark}
                  </>
                ) : null}
              </div>
              <div style={{ minWidth: "0" }}>
                <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#A44A00" }}>{b.kicker}</div>
                <h3 style={{ marginTop: "5px", fontSize: "17.5px", color: "#2B2342", lineHeight: "1.28" }}>{b.title}</h3>
                <div style={{ marginTop: "6px", fontSize: "12.5px", color: "#6F6590" }}>{b.meta}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
