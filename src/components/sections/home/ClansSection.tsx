import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './ClansSection.module.css';

export default function ClansSection() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "74px 22px 20px", display: "none", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "48px", alignItems: "center", paddingBottom: "40px" }}>
      <div>
        <h2 style={{ fontSize: "clamp(32px,4vw,48px)", color: "#2B2342" }}>Find your Clan</h2>
        <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.62", color: "#5A5177", maxWidth: "460px" }}>
          Every breed has its own corner. Labrador Clan swaps training notes, Indie Clan organises adoptions, and someone is always awake at 2am when your puppy won&apos;t settle.
        </p>
        <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "9px" }}>
          {v.clans.map((c: SiteItem, index: number) => (
            <span style={{ background: "#fff", border: "1.5px solid #E7E1F4", color: "#4A3E78", padding: "9px 17px", borderRadius: "999px", fontSize: "14px", fontWeight: "600" }} key={index}>{c}</span>
          ))}
        </div>
        <button onClick={v.goCommunity} style={{ marginTop: "26px", background: "transparent", color: "#6351A1", fontSize: "15.5px", fontWeight: "700", padding: "15px 28px", borderRadius: "999px", border: "2px solid #D8CFF0" }} className={styles.h1}>Browse the community</button>
      </div>
      <div style={{ position: "relative", display: "flex", justifyContent: "center", minHeight: "520px", alignItems: "center" }}>
        <div style={{ position: "absolute", left: "2%", top: "6%", width: "150px", height: "190px", borderRadius: "24px", overflow: "hidden", transform: "rotate(-7deg)", boxShadow: "0 18px 36px rgba(43,35,66,.15)" }}>
          <ImageSlot id="pz-clan-a" shape="rect" placeholder="Dog at home" />
        </div>
        <div style={{ position: "absolute", right: "0", bottom: "4%", width: "150px", height: "170px", borderRadius: "24px", overflow: "hidden", transform: "rotate(6deg)", boxShadow: "0 18px 36px rgba(43,35,66,.15)" }}>
          <ImageSlot id="pz-clan-b" shape="rect" placeholder="Cat with owner" />
        </div>
        <div style={{ position: "relative", zIndex: "2", width: "270px", borderRadius: "32px", padding: "8px", background: "#2B2342", boxShadow: "0 26px 54px rgba(43,35,66,.24)" }}>
          <div style={{ borderRadius: "25px", overflow: "hidden", background: "#fff", height: "520px" }}>
            <ImageSlot id="pz-img-clan-profile" shape="rect" src="/images/content/pet-profile.png" placeholder="Pawzeeble community profile" style={{ display: "block", width: "100%", aspectRatio: "804/4894" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
