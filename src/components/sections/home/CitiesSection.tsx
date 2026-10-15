import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import styles from './CitiesSection.module.css';

/** Seven staggered columns (outer two are hidden on mobile). The offsets form a valley the testimonials rise into. */
const grid = (file: string, alt: string): [string, string] => [`/images/grid/${file}.webp`, alt];
const PHOTO_COLUMNS: { top: string; edge?: boolean; tiles: [string, string][] }[] = [
  { top: "34%", edge: true, tiles: [grid("01-vet-examining-dog", "Vet examining a dog"), grid("02-dog-at-groomer", "Dog at the groomer")] },
  { top: "0%", tiles: [grid("03-groomer-at-work", "Groomer at work"), grid("04-pet-parent-at-home", "Pet parent at home")] },
  { top: "28%", tiles: [grid("05-cat-cuddled-at-home", "Cat being cuddled at home")] },
  { top: "0%", tiles: [grid("06-puppy-first-vaccination", "Puppy at its first vaccination")] },
  { top: "28%", tiles: [grid("07-dog-walker-morning", "Dog walker on a morning round")] },
  { top: "0%", tiles: [grid("08-pet-parent-and-indie", "Pet parent and their Indie"), grid("09-dog-car-ride", "Dog on a car ride")] },
  { top: "34%", edge: true, tiles: [grid("10-puppy-playing", "Puppy playing"), grid("11-dog-at-beach", "Dog at the beach")] },
];

export default function CitiesSection() {
  const v = useSite();
  return (
    <section style={{ marginTop: "0px", padding: "70px 22px 20px", backgroundColor: "#FFFFFF", paddingBottom: "40px", paddingRight: "0px", paddingLeft: "0px", paddingTop: "80px", display: "flex", flexDirection: "column" }}>
      <div data-r="col-pad" style={{ maxWidth: "1260px", margin: "0 auto", display: "flex", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "44px", alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(32px,4vw,48px)", color: "#2B2342", textWrap: "balance", textAlign: "center" }}>Built for India, city by city</h2>
          <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.62", color: "#5A5177", maxWidth: "440px", textAlign: "center" }}>
            We onboard vets and groomers street by street, verify them in person, and only switch a city on once the list is good enough for our own pets.
          </p>
          <button onClick={v.goCare} style={{ marginTop: "26px", background: "#CA5C00", color: "#fff", fontSize: "15.5px", fontWeight: "700", padding: "15px 28px", borderRadius: "999px" }} className={styles.h1}>Find care near you</button>
        </div>
        <div data-r="citygrid" style={{ display: "none", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "16px", justifyContent: "space-evenly" }}>
          <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "24px", padding: "22px 20px" }}>
            <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 42h36" />
              <path d="M9 42V20h30v22" />
              <path d="M19 42V30a5 5 0 0 1 10 0v12" />
              <path d="M24 8c4 0 7 3 7 7v5H17v-5c0-4 3-7 7-7z" />
              <path d="M11 20v-4m26 4v-4" />
              <path d="M24 4v4" />
              <path d="M13 28h2m18 0h2" />
            </svg>
            <div style={{ marginTop: "14px", fontSize: "19px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Mumbai</div>
            <div style={{ marginTop: "5px", fontSize: "13px", color: "#6F6590" }}>incl. Navi Mumbai &amp; Thane</div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "24px", padding: "22px 20px" }}>
            <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 42h38" />
              <path d="M8 42V18h32v24" />
              <path d="M8 18l2-4h28l2 4" />
              <path d="M18 42V29a6 6 0 0 1 12 0v13" />
              <path d="M12 24h3m18 0h3" />
              <path d="M13 14v-3m10 3V9m12 5v-3" />
            </svg>
            <div style={{ marginTop: "14px", fontSize: "19px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Pune</div>
            <div style={{ marginTop: "5px", fontSize: "13px", color: "#6F6590" }}>incl. Pimpri-Chinchwad</div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "24px", padding: "22px 20px" }}>
            <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 42h40" />
              <path d="M7 42V26h34v16" />
              <path d="M14 42V30m7 12V30m6 12V30m7 12V30" />
              <path d="M16 26V22h16v4" />
              <path d="M24 8c5 0 9 5 9 10v4H15v-4c0-5 4-10 9-10z" />
              <path d="M24 4v4" />
            </svg>
            <div style={{ marginTop: "14px", fontSize: "19px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Bengaluru</div>
            <div style={{ marginTop: "5px", fontSize: "13px", color: "#6F6590" }}>incl. Whitefield &amp; HSR</div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "24px", padding: "22px 20px" }}>
            <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 42h40" />
              <path d="M9 42V16h30v26" />
              <path d="M7 16h34" />
              <path d="M17 42V26a7 7 0 0 1 14 0v16" />
              <path d="M13 12h22" />
              <path d="M20 12V8h8v4" />
            </svg>
            <div style={{ marginTop: "14px", fontSize: "19px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Delhi NCR</div>
            <div style={{ marginTop: "5px", fontSize: "13px", color: "#6F6590" }}>incl. Gurugram &amp; Noida</div>
          </div>
        </div>
      </div>
      <div data-r="pg-grid" style={{ width: "100%", marginTop: "52px", display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", columnGap: "12px", alignItems: "start" }}>
        {PHOTO_COLUMNS.map((col, ci) => (
          <div data-r={col.edge ? "pg-hide" : undefined} style={{ paddingTop: col.top, display: "flex", flexDirection: "column", gap: "12px" }} key={ci}>
            {col.tiles.map(([src, hint]) => (
              <div data-r="pg-tile" style={{ position: "relative", aspectRatio: "4 / 5", borderRadius: "16px", overflow: "hidden", background: "#F2EEFA" }} key={src}>
                <ImageSlot src={src} shape="rect" placeholder={hint} style={{ position: "absolute", inset: "0", aspectRatio: "auto" }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
