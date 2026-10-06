import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './SheruAiSection.module.css';

export default function SheruAiSection() {
  const v = useSite();
  return (
    <section style={{ padding: "20px 22px 0", backgroundColor: "#FFFCF6", paddingTop: "40px", paddingBottom: "40px" }}>
      <div style={{ maxWidth: "1260px", margin: "0 auto", background: "#3A2B66", borderRadius: "44px", padding: "clamp(30px,4.2vw,60px)", display: "none", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "44px", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "rgba(255,255,255,.1)", border: "1.5px solid rgba(255,255,255,.18)", padding: "7px 15px", borderRadius: "999px", fontSize: "13px", fontWeight: "700", color: "#FFC24B" }}>Sheru AI</div>
          <h2 style={{ marginTop: "18px", fontSize: "clamp(32px,4vw,48px)", color: "#fff", textWrap: "balance" }}>Ask a pet health question, get a straight answer in seconds</h2>
          <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.62", color: "#C9C0E4", maxWidth: "460px", display: "none" }}>
            Sheru is the pet care assistant built into the Pawzeeble app. Describe a symptom, a behaviour or a feeding question in plain English or Hindi and Sheru answers instantly, drawing on guidance written by our veterinarians. When something needs a real vet, Sheru says so and opens the booking screen.
          </p>
          <ul style={{ margin: "22px 0 0", padding: "0", listStyle: "none", display: "grid", gap: "10px" }}>
            {v.sheruPoints.map((s: SiteItem, index: number) => (
              <li style={{ display: "flex", gap: "11px", alignItems: "flex-start", fontSize: "15.5px", color: "#EBE6F7", fontWeight: "500" }} key={index}>
                <span style={{ flex: "none", width: "20px", height: "20px", borderRadius: "50%", background: "#2F9E80", color: "#fff", display: "grid", placeItems: "center", fontSize: "11px", marginTop: "3px" }}>✓</span>
                {s}
              </li>
            ))}
          </ul>
          <button onClick={v.goDownload} style={{ marginTop: "26px", background: "#CA5C00", color: "#fff", fontSize: "15.5px", fontWeight: "700", padding: "15px 28px", borderRadius: "999px", display: "none" }} className={styles.h1}>Ask Sheru in the app</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ alignSelf: "flex-end", maxWidth: "min(420px,92%)", display: "flex", gap: "11px", alignItems: "flex-end" }}>
            <div style={{ background: "#fff", borderRadius: "24px 24px 6px 24px", padding: "18px 20px" }}>
              <p style={{ fontSize: "15.5px", lineHeight: "1.55", color: "#2B2342" }}>
                My 3-month-old Labrador puppy vomited twice tonight and won&apos;t eat. Should I take her to a vet?
              </p>
              <div style={{ marginTop: "8px", fontSize: "11.5px", color: "#8A80A8", textAlign: "right" }}>9:41 PM</div>
            </div>
            <span style={{ flex: "none", width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden" }}>
              <ImageSlot id="pz-sheru-user" shape="circle" placeholder="Pet parent" />
            </span>
          </div>
          <div style={{ alignSelf: "flex-start", maxWidth: "min(460px,96%)", display: "flex", gap: "11px", alignItems: "flex-end" }}>
            <span style={{ flex: "none", width: "56px", height: "56px", borderRadius: "50%", background: "#FFC24B", display: "grid", placeItems: "center", fontSize: "17px", fontWeight: "800" }}>S</span>
            <div style={{ background: "#6351A1", borderRadius: "24px 24px 24px 6px", padding: "18px 20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#FFC24B" }}>Sheru AI</div>
              <p style={{ marginTop: "8px", fontSize: "15.5px", lineHeight: "1.55", color: "#fff" }}>
                Two episodes of vomiting in a puppy this young is worth watching closely. Withhold food for four hours, keep water available in small sips, and check her gums — pale or tacky gums mean dehydration.
              </p>
              <p style={{ marginTop: "10px", fontSize: "15.5px", lineHeight: "1.55", color: "#fff" }}>
                Go to a vet tonight if you see any of these: blood in the vomit, a swollen or painful belly, repeated retching with nothing coming up, or no vaccination for parvovirus yet.
              </p>
              <div style={{ marginTop: "14px", display: "flex", gap: "9px", flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255,255,255,.16)", color: "#fff", padding: "8px 15px", borderRadius: "999px", fontSize: "13.5px", fontWeight: "600" }}>Book a vet near Kharghar</span>
                <span style={{ background: "rgba(255,255,255,.16)", color: "#fff", padding: "8px 15px", borderRadius: "999px", fontSize: "13.5px", fontWeight: "600" }}>Talk to a vet now</span>
              </div>
              <div style={{ marginTop: "10px", fontSize: "11.5px", color: "#D5CCEE" }}>
                Reviewed by Pawzeeble veterinarians · Not a substitute for an in-person examination
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
