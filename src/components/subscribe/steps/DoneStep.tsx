import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import styles from './DoneStep.module.css';

export default function DoneStep() {
  const v = useSite();
  return (
    <>
      <div style={{ position: "relative", background: "#ECE5FA", padding: "28px 22px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
        <button onClick={v.closeSub} aria-label="Close" style={{ position: "absolute", right: "16px", top: "16px", width: "32px", height: "32px", borderRadius: "50%", background: "#fff", color: "#4A3E78", display: "grid", placeItems: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <span style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#1E9E6A", color: "#fff", display: "grid", placeItems: "center", boxShadow: "0 0 0 5px #fff" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div style={{ marginTop: "4px", fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Pawteckt lite subscription is Activated!</div>
        <div style={{ fontSize: "15px", fontWeight: "600", color: "#2B2342" }}>{"Activation date: "}{v.subStart}</div>
        <div style={{ fontSize: "12.5px", color: "#6F6590" }}>{"Your plan will expire on: "}{v.subEnd}</div>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "16px", background: "#FAF8FE" }}>
        <div style={{ background: "#fff", border: "1.5px solid #F2EEFA", borderRadius: "18px", padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={{ fontSize: "16.5px", fontWeight: "800", color: "#2B2342", lineHeight: "1.25" }}>Welcome to the Pawteckt lite family!</div>
            <div style={{ marginTop: "4px", fontSize: "13px", color: "#6F6590" }}>Enjoy member benefits on bookings.</div>
          </div>
          <div style={{ width: "84px", height: "84px", flex: "none", borderRadius: "16px", overflow: "hidden" }}>
            <ImageSlot id="pz-sub-welcome" shape="rect" placeholder="Dog with shield" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px", background: "#fff", border: "1.5px solid #F2EEFA", borderRadius: "18px", padding: "14px 10px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "6px", minWidth: "0" }}>
            <span style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#FFE7D6", color: "#CA5C00", display: "grid", placeItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m15 9-6 6" />
                <path d="M9 9h.01" />
                <path d="M15 15h.01" />
              </svg>
            </span>
            <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#2B2342", lineHeight: "1.2" }}>Save upto 50%</span>
            <span style={{ fontSize: "11.5px", color: "#6F6590", lineHeight: "1.3" }}>on services &amp; products</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "6px", minWidth: "0" }}>
            <span style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#FFE7D6", color: "#CA5C00", display: "grid", placeItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </span>
            <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#2B2342", lineHeight: "1.2" }}>Free 24/7</span>
            <span style={{ fontSize: "11.5px", color: "#6F6590", lineHeight: "1.3" }}>licensed vet chat</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "6px", minWidth: "0" }}>
            <span style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#FFE7D6", color: "#CA5C00", display: "grid", placeItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="5" height="5" x="3" y="3" rx="1" />
                <rect width="5" height="5" x="16" y="3" rx="1" />
                <rect width="5" height="5" x="3" y="16" rx="1" />
                <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                <path d="M21 21v.01" />
                <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                <path d="M3 12h.01" />
                <path d="M12 3h.01" />
                <path d="M12 16v.01" />
                <path d="M16 12h1" />
                <path d="M21 12v.01" />
                <path d="M12 21v-1" />
              </svg>
            </span>
            <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#2B2342", lineHeight: "1.2" }}>Pet QR</span>
            <span style={{ fontSize: "11.5px", color: "#6F6590", lineHeight: "1.3" }}>for safety</span>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1.5px solid #F2EEFA", borderRadius: "18px", padding: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: "800", letterSpacing: ".06em", color: "#6F6590" }}>PROTECTED PET DETAILS</div>
          <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#FFF1D6", color: "#A44A00", display: "grid", placeItems: "center", fontSize: "14px", fontWeight: "800" }}>{v.subPetInitial}</span>
            <span style={{ fontSize: "15.5px", fontWeight: "700", color: "#2B2342" }}>{v.subPetName}</span>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1.5px solid #F2EEFA", borderRadius: "18px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "#5A5177" }}>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#2B2342", paddingBottom: "8px", borderBottom: "1.5px solid #F2EEFA" }}>Payment Summary</div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <span>Pawteckt lite annual plan</span>
            <span style={{ color: "#2B2342", fontWeight: "600" }}>₹539</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <span>Taxes (Inclusive)</span>
            <span style={{ color: "#2B2342", fontWeight: "600" }}>₹49</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingTop: "8px", borderTop: "1.5px solid #F2EEFA", fontWeight: "700", color: "#2B2342" }}>
            <span>Paid Now</span>
            <span>₹539</span>
          </div>
        </div>
        <div style={{ background: "#F3EEFF", border: "1.5px solid #CFC2F2", borderRadius: "18px", padding: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#fff", color: "#6351A1", display: "grid", placeItems: "center", flex: "none" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="5" height="5" x="3" y="3" rx="1" />
              <rect width="5" height="5" x="16" y="3" rx="1" />
              <rect width="5" height="5" x="3" y="16" rx="1" />
              <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
              <path d="M12 7v3a2 2 0 0 1-2 2H7" />
              <path d="M16 12h1" />
            </svg>
          </span>
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#4A3E78" }}>Your Pet QR is now active!</div>
            <div style={{ marginTop: "2px", fontSize: "12.5px", lineHeight: "1.4", color: "#6F6590" }}>A digital ID that helps reunite lost pets faster.</div>
          </div>
          <button onClick={v.getApp} style={{ flex: "none", background: "#fff", color: "#CA5C00", border: "1.5px solid #CA5C00", fontSize: "13px", fontWeight: "700", padding: "8px 14px", borderRadius: "999px" }} className={styles.h1}>View Pet QR</button>
        </div>
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA" }}>
        <button onClick={v.getApp} style={{ width: "100%", padding: "15px 20px", borderRadius: "999px", fontSize: "15.5px", fontWeight: "700", background: "#CA5C00", color: "#fff" }} className={styles.h2}>Download the app</button>
      </div>
    </>
  );
}
