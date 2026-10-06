import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './MobileDrawer.module.css';

export default function MobileDrawer() {
  const v = useSite();
  return (
    <div onClick={v.closeMenu} style={{ position: "fixed", inset: "0", zIndex: "55", background: "rgba(43,35,66,.42)" }}>
      <div style={{ position: "absolute", top: "0", right: "0", width: "min(86%,330px)", height: "100%", background: "#FFFCF6", borderLeft: "1px solid #EFE9F8", padding: "82px 18px 28px", display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto" }}>
        {v.drawerItems.map((d: SiteItem, index: number) => (
          <button onClick={d.go} style={d.style} key={index}>{d.label}</button>
        ))}
        <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={v.goPawteckt} style={{ background: "#F2EEFA", color: "#6351A1", fontSize: "16px", fontWeight: "700", padding: "15px 20px", borderRadius: "999px", border: "1.5px solid #E0D8F1" }} className={styles.h1}>Pawteckt</button>
          <button onClick={v.goDownload} style={{ background: "#CA5C00", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "15px 20px", borderRadius: "999px" }} className={styles.h2}>Get the app</button>
        </div>
      </div>
    </div>
  );
}
