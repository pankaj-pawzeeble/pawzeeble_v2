import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './MobileDrawer.module.css';

/** Tapping a row slides the highlight there first; navigation (which closes the drawer) follows after this delay. */
const NAV_DELAY_MS = 340;

export default function MobileDrawer() {
  const v = useSite();
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [sel, setSel] = useState(() => v.drawerItems.findIndex((d: SiteItem) => d.active));
  const [hl, setHl] = useState<{ top: number; height: number; left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const el = rows.current[sel];
    setHl(el ? { top: el.offsetTop, height: el.offsetHeight, left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [sel]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (d: SiteItem, index: number) => {
    setSel(index);
    clearTimeout(timer.current);
    timer.current = setTimeout(d.go, NAV_DELAY_MS);
  };

  return (
    <div data-r="drawer" onClick={v.closeMenu} style={{ position: "fixed", inset: "0", zIndex: "55", background: "rgba(43,35,66,.42)", animation: "pzfadein .25s ease" }}>
      <div data-r="drawer-panel" onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "0", left: "0", width: "min(86%,330px)", height: "100%", background: "#FFFFFF", borderRight: "1px solid #EFE9F8", padding: "82px 18px 28px", display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto", animation: "pzdrawerin .32s cubic-bezier(.22,1,.36,1)" }}>
        <span aria-hidden="true" data-r="drawer-ind" style={{ position: "absolute", top: hl ? hl.top : 0, left: hl ? hl.left : 0, width: hl ? hl.width : 0, height: hl ? hl.height : 0, opacity: hl ? 1 : 0, borderRadius: "16px", background: "#F2EEFA", pointerEvents: "none", transition: "top .32s cubic-bezier(.22,1,.36,1), height .32s cubic-bezier(.22,1,.36,1)" }} />
        {v.drawerItems.map((d: SiteItem, index: number) => (
          <button ref={(el) => { rows.current[index] = el; }} onClick={() => pick(d, index)} style={{ ...d.style, color: index === sel ? "#6351A1" : "#2B2342" }} key={index}>{d.label}</button>
        ))}
        <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={v.goPawteckt} style={{ background: "#F2EEFA", color: "#6351A1", fontSize: "16px", fontWeight: "700", padding: "15px 20px", borderRadius: "999px", border: "1.5px solid #E0D8F1" }} className={styles.h1}>Pawteckt</button>
        </div>
      </div>
    </div>
  );
}
