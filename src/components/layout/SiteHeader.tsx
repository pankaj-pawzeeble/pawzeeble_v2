import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const v = useSite();
  return (
    <header style={{ position: "sticky", top: "0", zIndex: "60", background: "rgba(255,252,246,.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid #EFE9F8" }}>
      <div data-r="hdr" style={{ margin: "0 auto", padding: "12px 22px", display: "flex", alignItems: "center", gap: "20px", width: "100%", paddingLeft: "100px", paddingRight: "100px", justifyContent: "space-between", paddingTop: "12px" }}>
        <button onClick={v.goHome} style={{ flex: "none", background: "none", padding: "0", display: "flex", alignItems: "center" }}>
          <img src="/images/brand/pawzeeble-logo.png" alt="Pawzeeble" style={{ height: "28px", display: "block" }} />
        </button>
        <nav data-r="navpill" style={{ flex: "0 1 auto", minWidth: "0", display: "flex", justifyContent: "center", overflowX: "auto", scrollbarWidth: "none" }}>
          <div style={{ display: "flex", gap: "2px", flexWrap: "nowrap", justifyContent: "center", background: "#fff", border: "1px solid #EFE9F8", borderRadius: "999px", padding: "4px" }}>
            {v.navItems.map((item: SiteItem, index: number) => (
              <button onClick={item.go} style={item.style} key={index}>{item.label}</button>
            ))}
          </div>
        </nav>
        <div data-r="hdr-cta" style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", gap: "20px", justifyContent: "normal", alignItems: "center" }}>
          <button onClick={v.goPawteckt} style={{ flex: "none", whiteSpace: "nowrap", background: "#F2EEFA", color: "#6351A1", fontSize: "14.5px", fontWeight: "700", padding: "12px 20px", borderRadius: "999px", border: "1.5px solid #E0D8F1" }} className={styles.h1}>Pawteckt</button>
          <button onClick={v.goDownload} style={{ flex: "none", whiteSpace: "nowrap", background: "#CA5C00", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "12px 24px", borderRadius: "999px", boxShadow: "0 8px 20px rgba(202,92,0,.26)" }} className={styles.h2}>Get the app</button>
        </div>
        <button onClick={v.toggleMenu} data-r="burger" aria-label="Open menu" aria-expanded={v.menuOpen} style={{ display: "none", flex: "none", width: "44px", height: "44px", alignItems: "center", justifyContent: "center", background: "#F2EEFA", border: "1.5px solid #E0D8F1", borderRadius: "14px", color: "#6351A1" }}>
          {v.menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : null}
          {" "}
          {v.menuClosed ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          ) : null}
        </button>
      </div>
    </header>
  );
}
