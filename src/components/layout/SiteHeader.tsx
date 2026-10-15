import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppDownload } from '@/components/layout/AppDownload';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const v = useSite();
  const { dlApp } = useAppDownload();
  const [scrolled, setScrolled] = useState(false);
  const [ind, setInd] = useState<{ left: number; width: number } | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = v.navItems.findIndex((n: SiteItem) => n.active);

  // bottom stroke fades in once the page has scrolled (always visible on mobile, see globals.css)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // the highlight is one element that slides to the active tab; re-measured on resize and after fonts load
  useLayoutEffect(() => {
    const measure = () => {
      const el = tabs.current[activeIndex];
      setInd((prev) => {
        if (!el) return prev ? null : prev;
        const next = { left: el.offsetLeft, width: el.offsetWidth };
        return prev && prev.left === next.left && prev.width === next.width ? prev : next;
      });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeIndex]);

  return (
    <header data-r="site-hdr" data-scrolled={scrolled ? "" : undefined} style={{ position: "sticky", top: "0", zIndex: "60", background: "rgba(255,255,255,.88)", backdropFilter: "blur(16px)" }}>
      <div data-r="hdr" style={{ margin: "0 auto", padding: "12px 22px", display: "flex", alignItems: "center", gap: "20px", width: "100%", paddingLeft: "100px", paddingRight: "100px", justifyContent: "space-between", paddingTop: "12px" }}>
        <div data-r="hdr-logo">
          <button onClick={v.goHome} style={{ flex: "none", background: "none", padding: "0", display: "flex", alignItems: "center" }}>
            <img src="/images/brand/pawzeeble-logo.png" alt="Pawzeeble" style={{ height: "28px", display: "block" }} />
          </button>
        </div>
        <nav data-r="navpill" style={{ flex: "0 1 auto", minWidth: "0", display: "flex", justifyContent: "center", overflowX: "auto", scrollbarWidth: "none" }}>
          <div style={{ position: "relative", display: "flex", gap: "2px", flexWrap: "nowrap", justifyContent: "center", background: "#fff", border: "1px solid #EFE9F8", borderRadius: "999px", padding: "4px" }}>
            <span aria-hidden="true" data-r="nav-ind" style={{ position: "absolute", top: "4px", bottom: "4px", left: ind ? ind.left : 0, width: ind ? ind.width : 0, opacity: ind ? 1 : 0, borderRadius: "999px", background: "#F2EEFA", pointerEvents: "none", transition: "left .38s cubic-bezier(.22,1,.36,1), width .38s cubic-bezier(.22,1,.36,1), opacity .2s" }} />
            {v.navItems.map((item: SiteItem, index: number) => (
              <button ref={(el) => { tabs.current[index] = el; }} onClick={item.go} style={item.style} key={index}>{item.label}</button>
            ))}
          </div>
        </nav>
        <div data-r="hdr-cta" style={{ boxSizing: "border-box", flexDirection: "row", gap: "20px" }}>
          <button data-r="hdr-pawteckt" onClick={v.goPawteckt} style={{ flex: "none", whiteSpace: "nowrap", background: "#F2EEFA", color: "#6351A1", fontSize: "14.5px", fontWeight: "700", padding: "12px 20px", borderRadius: "999px", border: "1.5px solid #E0D8F1" }} className={styles.h1}>Pawteckt</button>
          <button data-r="hdr-app" onClick={() => dlApp()} style={{ flex: "none", whiteSpace: "nowrap", background: "#FFF6EE", color: "#CA5C00", fontSize: "14.5px", fontWeight: "700", padding: "12px 24px", borderRadius: "999px", border: "1.5px solid #CA5C00" }} className={styles.h2}>Get the app</button>
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
