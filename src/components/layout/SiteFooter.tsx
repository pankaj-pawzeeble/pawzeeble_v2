import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const v = useSite();
  return (
    <footer style={{ background: "#F5F1FC", borderTop: "1px solid #E9E2F6", color: "#5A5177", padding: "54px 22px 28px" }}>
      <div style={{ maxWidth: "1260px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "40px", alignItems: "start" }}>
        <div>
          <img src="/images/brand/pawzeeble-logo.png" alt="Pawzeeble" style={{ height: "28px", display: "block" }} />
          <p style={{ marginTop: "14px", fontSize: "14.5px", lineHeight: "1.62", maxWidth: "250px" }}>Built by pet lovers, for pet parents. Pune, Maharashtra, India.</p>
          <div style={{ marginTop: "18px", display: "flex", gap: "10px" }}>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Pawzeeble on Instagram" style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#fff", border: "1px solid #E9E2F6", display: "grid", placeItems: "center", color: "#6351A1" }} className={styles.h1}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="Pawzeeble on YouTube" style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#fff", border: "1px solid #E9E2F6", display: "grid", placeItems: "center", color: "#6351A1" }} className={styles.h2}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="M10.2 9.3l4.6 2.7-4.6 2.7z" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
          <div style={{ marginTop: "18px", height: "132px", borderRadius: "22px", overflow: "hidden", maxWidth: "250px", display: "none" }}>
            <ImageSlot id="pz-footer-photo" shape="rect" placeholder="Pet parent with their pet" style={{ display: "none" }} />
          </div>
        </div>
        {v.footerCols.map((col: SiteItem, index: number) => (
          <div key={index}>
            <h4 style={{ fontSize: "15px", color: "#2B2342" }}>{col.head}</h4>
            <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              {col.links.map((l: SiteItem, index2: number) => (
                <button onClick={l.go} style={{ background: "none", padding: "0", color: "#5A5177", fontSize: "14px", textAlign: "left" }} className={styles.h3} key={index2}>{l.label}</button>
              ))}
            </div>
          </div>
        ))}
        <div>
          <h4 style={{ fontSize: "15px", color: "#2B2342" }}>Get the app</h4>
          <div data-r="wrap" style={{ marginTop: "14px", display: "flex", flexDirection: "row", gap: "10px", alignItems: "flex-start" }}>
            <button onClick={v.goDownload} data-r="store" aria-label="Download on the App Store" style={{ display: "block", padding: "0", background: "none", borderRadius: "9px", transition: "opacity .15s", width: "160px" }} className={styles.h4}>
              <img src="/images/badges/badge-app-store.png" alt="Download on the App Store" style={{ display: "block", height: "48px", width: "auto" }} />
            </button>
            <button onClick={v.goDownload} data-r="store" aria-label="Get it on Google Play" style={{ display: "block", padding: "0", background: "none", borderRadius: "9px", transition: "opacity .15s", width: "160px" }} className={styles.h5}>
              <img src="/images/badges/badge-google-play.png" alt="Get it on Google Play" style={{ display: "block", height: "48px", width: "auto" }} />
            </button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: "1260px", margin: "36px auto 0", paddingTop: "20px", borderTop: "1px solid #E3DBF3", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "space-between", fontSize: "13px", color: "#6F6590" }}>
        <span>© 2026 Pawzeeble Infosol Private Limited</span>
        <span style={{ display: "none" }}>Insurance products underwritten by HDFC ERGO. IRDAI registered.</span>
      </div>
    </footer>
  );
}
