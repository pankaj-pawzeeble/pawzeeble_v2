import { useSite } from '@/hooks/useSite';
import styles from './PawtecktClosingCta.module.css';

export default function PawtecktClosingCta() {
  const v = useSite();
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto 90px", padding: "0 22px" }}>
      <div style={{ background: "#6351A1", borderRadius: "36px", padding: "clamp(34px,5vw,64px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
        <h2 style={{ fontSize: "clamp(30px,3.8vw,46px)", color: "#fff", textWrap: "balance", maxWidth: "640px" }}>Less worry for you. Better care for them.</h2>
        <p style={{ fontSize: "16.5px", lineHeight: "1.6", color: "#E4DDF5", maxWidth: "520px" }}>
          Start with Lite for everyday care, or choose Premium so the big vet bills are covered too.
        </p>
        <div style={{ marginTop: "8px", display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={v.ptToPlans} style={{ background: "#CA5C00", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} className={styles.h1}>Compare plans</button>
          <button onClick={v.openSub} style={{ background: "#fff", color: "#4A3E78", fontSize: "16px", fontWeight: "700", padding: "16px 28px", borderRadius: "999px" }} className={styles.h2}>Get Lite for ₹539</button>
        </div>
      </div>
    </section>
  );
}
