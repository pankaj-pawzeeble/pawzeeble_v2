import { useSite } from '@/hooks/useSite';
import styles from './JourneyCloseButton.module.css';

export default function JourneyCloseButton() {
  const v = useSite();
  return (
    <button onClick={v.goEco} aria-label="Close the journey" style={{ position: "fixed", top: "22px", right: "22px", zIndex: "120", display: "inline-flex", alignItems: "center", gap: "9px", background: "#2B2342", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "12px 20px", borderRadius: "999px", boxShadow: "0 12px 28px rgba(43,35,66,.3)" }} className={styles.h1}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
      Close
    </button>
  );
}
