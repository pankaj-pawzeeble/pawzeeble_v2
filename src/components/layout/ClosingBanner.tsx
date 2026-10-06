import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import styles from './ClosingBanner.module.css';

export default function ClosingBanner() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "10px 22px 70px" }}>
      <div style={{ background: "#CA5C00", borderRadius: "40px", padding: "clamp(32px,4.6vw,58px)", position: "relative", overflow: "hidden", display: "none", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "36px", alignItems: "center", marginBottom: "80px" }}>
        <svg viewBox="0 0 100 100" style={{ position: "absolute", left: "-30px", bottom: "-40px", width: "230px", height: "230px", opacity: ".14", color: "#fff" }} fill="currentColor" aria-hidden="true">
          <ellipse cx="28" cy="30" rx="11" ry="15" />
          <ellipse cx="52" cy="21" rx="11" ry="15.5" />
          <ellipse cx="76" cy="32" rx="10.5" ry="14" />
          <path d="M52 46c14 0 24 11 24 21s-10 13-24 13-24-3-24-13 10-21 24-21z" />
        </svg>
        <div style={{ position: "relative" }}>
          <h2 style={{ fontSize: "clamp(30px,4.2vw,48px)", color: "#fff", textWrap: "balance" }}>Your pet&apos;s whole life, in your pocket.</h2>
          <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.58", color: "#FFE9D6", maxWidth: "440px" }}>Free to download. Free 24×7 vet chat on every Pawteckt plan.</p>
          <div style={{ display: "flex", gap: "11px", marginTop: "26px", flexWrap: "wrap" }}>
            <button onClick={v.goDownload} style={{ background: "#2B2342", color: "#fff", fontSize: "15.5px", fontWeight: "700", padding: "16px 28px", borderRadius: "999px" }} className={styles.h1}>Get it on Google Play</button>
            <button onClick={v.goDownload} style={{ background: "#fff", color: "#2B2342", fontSize: "15.5px", fontWeight: "700", padding: "16px 28px", borderRadius: "999px" }} className={styles.h2}>Download on the App Store</button>
          </div>
        </div>
        <div style={{ position: "relative", height: "300px", borderRadius: "30px", overflow: "hidden", boxShadow: "0 20px 44px rgba(0,0,0,.18)" }}>
          <ImageSlot id="pz-cta-photo" shape="rect" placeholder="Family with their dog" />
        </div>
      </div>
    </section>
  );
}
