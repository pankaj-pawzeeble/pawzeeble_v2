import { useSite } from '@/hooks/useSite';
import styles from './PawtecktStaticPanel.module.css';

export default function PawtecktStaticPanel() {
  const v = useSite();
  return (
    <section data-r="ptstatic" style={{ padding: "56px 22px 20px", backgroundColor: "#FFFCF6", paddingTop: "40px", paddingBottom: "40px" }}>
      <div style={{ maxWidth: "1260px", margin: "0 auto", border: "1.5px solid #E9E2F6", borderRadius: "36px", padding: "clamp(28px,4vw,52px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "40px", alignItems: "flex-end", borderStyle: "none" }}>
        <div>
          <img src="/images/brand/pawteckt-logo.png" alt="Pawteckt" style={{ width: "52px", display: "block" }} />
          <h2 style={{ marginTop: "18px", fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342", textWrap: "balance" }} />
          <p style={{ fontSize: "16.5px", lineHeight: "1.6", color: "#CA5C00", maxWidth: "330px", textAlign: "left", fontWeight: "600", paddingBottom: "16px" }}>PAWTECKT POWERED BY HDFC ERGO</p>
          <h2 style={{ fontSize: "clamp(32px,4vw,48px)", color: "#2B2342" }}>{"India's Smartest pet wellness plan, from ₹45/month, billed annually "}</h2>
          <p style={{ marginTop: "14px", fontSize: "16.5px", lineHeight: "1.62", color: "#5A5177" }}>
            One membership covers discounted services across the network, unlimited 24×7 vet chat, a Pet QR tag for safety, and an insurance plan underwritten by HDFC ERGO.
          </p>
          <button onClick={v.goPawteckt} style={{ marginTop: "26px", background: "#CA5C00", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px", boxShadow: "0 12px 26px rgba(202,92,0,.24)" }} className={styles.h1}>Explore Pawteckt</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ height: "190px", borderRadius: "28px", background: "url(\"./pawteckt-family-mtx2bbna-mo7m.png\") center / contain no-repeat", display: "none" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "24px", padding: "22px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M24 5l14 5v12c0 9-6 16-14 21-8-5-14-12-14-21V10l14-5z" />
                <path d="M18 24l4 4 8-8" />
              </svg>
              <div style={{ boxSizing: "border-box" }}>
                <div style={{ marginTop: "14px", fontSize: "18px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Pet insurance</div>
                <div style={{ marginTop: "5px", fontSize: "13px", color: "#6F6590" }}>Underwritten by HDFC ERGO</div>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "24px", padding: "22px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M40 26c0 7-7 13-16 13-2 0-4-.2-6-.7L8 41l2.5-7C8.3 31.8 7 29 7 26c0-7 7-13 16-13" />
                <path d="M33 5v14M26 12h14" />
              </svg>
              <div style={{ boxSizing: "border-box" }}>
                <div style={{ marginTop: "14px", fontSize: "18px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>24×7 vet support</div>
                <div style={{ marginTop: "5px", fontSize: "13px", color: "#6F6590" }}>Unlimited licensed vet chat</div>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "24px", padding: "22px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="7" y="7" width="14" height="14" rx="2" />
                <rect x="27" y="7" width="14" height="14" rx="2" />
                <rect x="7" y="27" width="14" height="14" rx="2" />
                <path d="M27 27h6v6h-6zM37 27h4M27 37h6M37 33v8" />
              </svg>
              <div style={{ boxSizing: "border-box" }}>
                <div style={{ marginTop: "14px", fontSize: "18px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Pet QR tag</div>
                <div style={{ marginTop: "5px", fontSize: "13px", color: "#6F6590" }}>One scan and they reach you</div>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "24px", padding: "22px 20px", height: "189px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M36 12L12 36" />
                <circle cx="16" cy="16" r="5" />
                <circle cx="32" cy="32" r="5" />
              </svg>
              <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "normal", justifyContent: "space-between", alignItems: "normal" }}>
                <div style={{ marginTop: "14px", fontSize: "18px", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Up to 50% off</div>
                <div style={{ marginTop: "5px", fontSize: "13px", color: "#6F6590" }}>On&nbsp; pet care services</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
