import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './AboutOpenRoles.module.css';

export default function AboutOpenRoles() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "20px 22px 80px" }}>
      <div style={{ background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "36px", padding: "clamp(26px,3.6vw,48px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "22px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342" }}>Open roles</h2>
            <p style={{ marginTop: "10px", fontSize: "16.5px", lineHeight: "1.6", color: "#5A5177", maxWidth: "520px" }}>
              We hire people who have sat in a waiting room at midnight with a scared animal. Bring your pet to the interview.
            </p>
          </div>
          <a href="mailto:careers@pawzeeble.com" style={{ background: "#CA5C00", color: "#fff", fontSize: "15px", fontWeight: "700", padding: "14px 26px", borderRadius: "999px" }} className={styles.h1}>careers@pawzeeble.com</a>
        </div>
        <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {v.roles.map((r: SiteItem, index: number) => (
            <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "18px", flexWrap: "wrap" }} key={index}>
              <div>
                <h3 style={{ fontSize: "19px", color: "#2B2342" }}>{r.title}</h3>
                <div style={{ marginTop: "7px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ background: "#F2EEFA", color: "#4A3E78", padding: "5px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "600" }}>{r.team}</span>
                  <span style={{ background: "#FFF4E9", color: "#A44A00", padding: "5px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "600" }}>{r.place}</span>
                  <span style={{ background: "#E4F4EF", color: "#25795F", padding: "5px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "600" }}>{r.type}</span>
                </div>
              </div>
              <a href="mailto:careers@pawzeeble.com" style={{ flex: "none", background: "transparent", color: "#6351A1", fontSize: "14.5px", fontWeight: "700", padding: "11px 22px", borderRadius: "999px", border: "2px solid #D8CFF0" }} className={styles.h2}>Apply</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
