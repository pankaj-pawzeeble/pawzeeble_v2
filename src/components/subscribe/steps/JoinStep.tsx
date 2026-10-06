import { useSite } from '@/hooks/useSite';

export default function JoinStep() {
  const v = useSite();
  return (
    <>
      <div style={{ background: "#ECE5FA", padding: "28px 22px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
        <span style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#1E9E6A", color: "#fff", display: "grid", placeItems: "center", boxShadow: "0 0 0 5px #fff" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Payment Confirmed</div>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h3 style={{ fontSize: "22px", lineHeight: "1.2", color: "#2B2342" }}>Join Pawzeeble to unlock Pawteckt perks</h3>
          <p style={{ marginTop: "6px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>Tell us a bit about yourself and the furry friend you’d like to cover</p>
        </div>
        <div>
          <label htmlFor="pz-jn-name" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Full Name</label>
          <input id="pz-jn-name" type="text" autoComplete="name" placeholder="Enter your full name" value={v.jnName} onChange={v.onJnName} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
        </div>
        <div>
          <label htmlFor="pz-jn-email" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Email Address</label>
          <input id="pz-jn-email" type="email" autoComplete="email" placeholder="you@email.com" value={v.jnEmail} onChange={v.onJnEmail} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
        </div>
        <div>
          <label htmlFor="pz-jn-user" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Choose a Username</label>
          <input id="pz-jn-user" type="text" disabled={!!v.jnUserLocked} autoComplete="username" placeholder="e.g. maya_and_coco" value={v.jnUser} onChange={v.onJnUser} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
        </div>
        <div style={{ marginTop: "-8px", fontSize: "12.5px", color: v.jnHintColor }}>{v.jnHint}</div>
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA" }}>
        <button onClick={v.joinNext} disabled={v.jnBad} style={v.subBtnJoin}>Continue &amp; Add Pet</button>
      </div>
    </>
  );
}
