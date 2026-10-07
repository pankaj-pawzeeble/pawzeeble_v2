import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import styles from './HomeHero.module.css';

export default function HomeHero() {
  const v = useSite();
  return (
    <section data-r="hero" style={{ maxWidth: "1260px", margin: "0 auto", padding: "44px 22px 30px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))", gap: "40px", alignItems: "flex-start" }}>
      <div data-r="hero-copy" style={{ position: "relative", zIndex: "1" }}>
        <div style={{ display: "none", alignItems: "center", gap: "9px", background: "#fff", border: "1px solid #E7E1F4", padding: "7px 15px 7px 9px", borderRadius: "999px", fontSize: "13px", fontWeight: "600", color: "#4A3E78" }}>
          <span style={{ background: "rgb(47, 158, 128)", color: "rgb(255, 255, 255)", padding: "3px 9px", borderRadius: "999px", fontSize: "11.5px", fontWeight: "700" }}>LIVE</span>
          In The City You Live In
        </div>
        <h1 style={{ marginTop: "20px", fontSize: "clamp(42px,5.6vw,68px)", color: "#2B2342", textWrap: "balance" }}>
          Everything your pet needs,
          <br />
          in one app.
        </h1>
        <p style={{ marginTop: "20px", fontSize: "18px", lineHeight: "1.62", color: "#5A5177", maxWidth: "500px", textWrap: "pretty" }}>
          Find and book verified pet services, manage your pet&apos;s life, and protect it all — with Pawzeeble.
        </p>
        <div style={{ display: "flex", gap: "12px", marginTop: "30px", flexWrap: "wrap" }}>
          <button onClick={v.goDownload} style={{ background: "#CA5C00", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "17px 32px", borderRadius: "999px", boxShadow: "0 12px 26px rgba(202,92,0,.28)" }} className={styles.h1}>Download Pawzeeble App</button>
          <button onClick={v.goEco} style={{ background: "transparent", color: "#6351A1", fontSize: "16px", fontWeight: "700", padding: "17px 30px", borderRadius: "999px", border: "2px solid #D8CFF0" }} className={styles.h2}>See the ecosystem</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "34px", flexWrap: "wrap" }}>
          <div style={{ display: "flex" }}>
            <span style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", border: "3px solid #FFFCF6" }}>
              <ImageSlot id="pz-av1" shape="circle" placeholder="Pet parent" />
            </span>
            <span style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", border: "3px solid #FFFCF6", marginLeft: "-14px" }}>
              <ImageSlot id="pz-av2" shape="circle" placeholder="Pet parent" />
            </span>
            <span style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", border: "3px solid #FFFCF6", marginLeft: "-14px" }}>
              <ImageSlot id="pz-av3" shape="circle" placeholder="Pet parent" />
            </span>
          </div>
          <div style={{ fontSize: "14.5px", lineHeight: "1.45", color: "#5A5177", textAlign: "left" }}>
            <strong style={{ color: "rgb(43, 35, 66)" }}>2 lakh+ pet parents</strong>
            <br />
            already part of Pawzeeble
          </div>
        </div>
      </div>
      <div data-r="hero-art" style={{ position: "relative", minHeight: "560px" }}>
        <div style={{ position: "absolute", right: "max(0px, min(262px, 100% - 300px))", top: "80px", width: "min(74%,300px)", aspectRatio: "1/1", borderRadius: "50% 50% 46% 54% / 52% 46% 54% 48%", backgroundColor: "#B19EF4" }} />
        <div data-r="hide-sm" style={{ position: "absolute", left: "360px", top: "81px", width: "min(52%,215px)", height: "250px", borderRadius: "26px", overflow: "hidden", transform: "rotate(12deg)" }}>
          <ImageSlot id="pz-hero-a" shape="rect" placeholder="Pet parent with dog" style={{ position: "absolute" }} />
        </div>
        <div data-r="hide-sm" style={{ position: "absolute", left: "4%", bottom: "20px", width: "min(46%,190px)", height: "190px", borderRadius: "50%", overflow: "hidden", border: "7px solid #FFFCF6", boxShadow: "0 16px 34px rgba(43,35,66,.14)", zIndex: "3" }}>
          <ImageSlot id="pz-hero-b" shape="circle" placeholder="Vet with cat" />
        </div>
        <div data-r="hero-phone" style={{ position: "absolute", top: "-11px", width: "min(58%,244px)", borderRadius: "32px", padding: "8px", background: "#2B2342", zIndex: "2", left: "154px" }}>
          <div style={{ borderRadius: "25px", overflow: "hidden", background: "#fff", aspectRatio: "1440 / 3204" }}>
            <ImageSlot id="pz-img-home-hero" shape="rect" src="/images/home/hero-phone-screen.webp" placeholder="Pawzeeble app home screen" align="top" style={{ display: "block", width: "100%", height: "100%" }} />
          </div>
        </div>
        <div data-r="hide-sm" style={{ position: "absolute", zIndex: "4", background: "#fff", borderRadius: "18px", padding: "13px 17px", display: "flex", alignItems: "center", gap: "11px", left: "400px", top: "387px" }}>
          <span style={{ width: "34px", height: "34px", borderRadius: "11px", background: "#E4F4EF", color: "#2F9E80", display: "grid", placeItems: "center", fontSize: "16px", fontWeight: "700" }}>✓</span>
          <div style={{ fontSize: "12.5px", lineHeight: "1.35", color: "#5A5177" }}>
            <strong style={{ color: "#2B2342", fontSize: "13.5px" }}>Vet booked</strong>
            <br />
            Wed, 8:00 PM
          </div>
        </div>
      </div>
    </section>
  );
}
