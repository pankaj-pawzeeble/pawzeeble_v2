import { useSite } from '@/hooks/useSite';
import styles from './StubView.module.css';

export default function StubView() {
  const v = useSite();
  return (
    <main style={{ maxWidth: "940px", margin: "0 auto", padding: "100px 22px 120px" }}>
      <div style={{ background: "#fff", border: "1.5px solid #EAE4F6", borderRadius: "34px", padding: "clamp(30px,4vw,56px)" }}>
        <div style={{ display: "inline-block", background: "#FFF1E4", color: "#A44A00", padding: "7px 15px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "700" }}>Not built yet</div>
        <h1 style={{ marginTop: "18px", fontSize: "clamp(32px,4.4vw,48px)", color: "#2B2342" }}>{v.stubTitle}</h1>
        <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: "1.62", color: "#5A5177", maxWidth: "520px" }}>{v.stubBody}</p>
        <button onClick={v.goHome} style={{ marginTop: "26px", background: "#CA5C00", color: "#fff", fontSize: "15.5px", fontWeight: "700", padding: "15px 28px", borderRadius: "999px" }} className={styles.h1}>Back to home</button>
      </div>
    </main>
  );
}
