import { useSite } from '@/hooks/useSite';
import styles from './ScrollTopButton.module.css';

export default function ScrollTopButton() {
  const v = useSite();
  return (
    <button ref={v.toTopRef} id="pz-top" onClick={v.toTop} aria-label="Scroll to top" style={{ position: "fixed", right: "190px", bottom: "22px", zIndex: "70", width: "52px", height: "52px", borderRadius: "50%", background: "#fff", color: "#6351A1", border: "1.5px solid #E1D8F5", boxShadow: "0 10px 28px rgba(43,35,66,.14)", display: "grid", placeItems: "center", cursor: "pointer", opacity: "0", pointerEvents: "none", transform: "translateY(10px)", transition: "opacity .25s, transform .25s, background .2s" }} className={styles.h1}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </svg>
    </button>
  );
}
