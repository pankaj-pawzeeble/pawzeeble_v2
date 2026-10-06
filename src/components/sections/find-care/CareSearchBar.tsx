import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './CareSearchBar.module.css';

export default function CareSearchBar() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 22px 0", paddingTop: "40px" }}>
      <div style={{ background: "#fff", borderRadius: "30px", padding: "clamp(22px,3vw,34px)", boxShadow: "0 14px 38px rgba(43,35,66,.08)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px" }}>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontSize: "14.5px", fontWeight: "600", color: "#2B2342" }}>My Location</span>
            {" "}
            <span style={{ marginTop: "9px", display: "flex", alignItems: "center", gap: "10px", border: "1.5px solid #D9D2E6", borderRadius: "12px", padding: "0 14px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B2342" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <select onChange={v.pickCity} value={v.city} aria-label="Select location" style={{ flex: "1", appearance: "none", background: "none", border: "none", padding: "15px 0", fontFamily: "inherit", fontSize: "15.5px", color: "#2B2342" }}>
                {v.careCityNames.map((cn: SiteItem, index: number) => (
                  <option value={cn} key={index}>{cn}</option>
                ))}
              </select>
            </span>
          </label>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontSize: "14.5px", fontWeight: "600", color: "#2B2342" }}>Looking for</span>
            {" "}
            <span style={{ marginTop: "9px", display: "flex", alignItems: "center", gap: "10px", border: "1.5px solid #D9D2E6", borderRadius: "12px", padding: "0 14px" }}>
              <select onChange={v.pickService} value={v.service} aria-label="Select service" style={{ flex: "1", appearance: "none", background: "none", border: "none", padding: "15px 0", fontFamily: "inherit", fontSize: "15.5px", color: "#2B2342" }}>
                {v.careServiceNames.map((sn: SiteItem, index: number) => (
                  <option value={sn} key={index}>{sn}</option>
                ))}
              </select>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B2342" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </label>
        </div>
        <button onClick={v.scrollToResults} style={{ marginTop: "24px", width: "100%", color: "#FFFFFF", fontSize: "17px", fontWeight: "700", padding: "19px 24px", borderRadius: "999px", backgroundColor: "#CA5C00" }} className={styles.h1}>Search Services</button>
      </div>
    </section>
  );
}
