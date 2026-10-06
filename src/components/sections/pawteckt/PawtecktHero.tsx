import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import styles from './PawtecktHero.module.css';

export default function PawtecktHero() {
  const v = useSite();
  return (
    <section data-r="pt-hero" style={{ maxWidth: "1260px", margin: "0 auto", padding: "50px 22px 0", display: "flex", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: "44px", alignItems: "center", flexDirection: "column", marginTop: "0px" }}>
      <div data-r="pt-hero-copy" style={{ alignItems: "center" }}>
        <img src="/images/brand/pawteckt-logo.png" alt="Pawteckt" style={{ width: "58px", display: "block" }} />
        <p style={{ marginTop: "18px", fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", color: "#CA5C00" }}>PET CARE PLANS · INSURANCE BY HDFC ERGO</p>
        <h1 style={{ marginTop: "12px", fontSize: "clamp(38px,5vw,58px)", lineHeight: "1.06", color: "#2B2342", textWrap: "balance" }}>Care for every day. Cover for the big ones.</h1>
        <p style={{ marginTop: "18px", fontSize: "17.5px", lineHeight: "1.62", color: "#5A5177", maxWidth: "520px" }}>
          Free vet chat whenever you need it, up to half off vet visits and grooming, and help with the bills if your pet needs surgery or treatment. From ₹45 a month.
        </p>
        <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
          <button onClick={v.ptToPlans} style={{ background: "#CA5C00", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "17px 32px", borderRadius: "999px" }} className={styles.h1}>Find the right plan</button>
          <button onClick={v.ptToCover} style={{ background: "transparent", color: "#6351A1", fontSize: "16px", fontWeight: "700", padding: "17px 30px", borderRadius: "999px", border: "2px solid #D8CFF0" }} className={styles.h2}>What&apos;s covered</button>
        </div>
      </div>
      <div data-r="art-sm" style={{ position: "relative", display: "none", justifyContent: "center", alignItems: "center", minHeight: "520px" }}>
        <div style={{ position: "absolute", width: "min(74%,300px)", aspectRatio: "1/1", background: "#F0EBFA", borderRadius: "48% 52% 44% 56% / 54% 46% 54% 46%", display: "none" }} />
        <div style={{ position: "absolute", left: "2%", bottom: "6%", width: "150px", height: "184px", borderRadius: "24px", overflow: "hidden", transform: "rotate(-6deg)", boxShadow: "0 18px 36px rgba(43,35,66,.16)", zIndex: "3", display: "none" }}>
          <ImageSlot id="pz-pt-photo" shape="rect" placeholder="Dog wearing a Pet QR tag" style={{ display: "none" }} />
        </div>
        <div style={{ position: "relative", zIndex: "2", width: "252px", borderRadius: "32px", padding: "8px", background: "#2B2342", boxShadow: "0 26px 54px rgba(43,35,66,.24)", transform: "rotate(2deg)", marginTop: "32px", display: "none" }}>
          <div style={{ borderRadius: "25px", overflow: "hidden", background: "#fff" }}>
            <ImageSlot id="pz-img-pt-select" shape="rect" src="/images/content/select-plan.png" placeholder="Pawteckt plan selection screen" style={{ display: "block", width: "100%", aspectRatio: "360/800" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
