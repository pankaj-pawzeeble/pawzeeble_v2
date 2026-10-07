import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';

export default function EcosystemScene() {
  const v = useSite();
  return (
    <div ref={v.ecoWrapRef} data-r="ecowrap" style={{ position: "relative" }}>
      <div ref={v.ecoStageRef} data-r="ecostage" style={{ position: "sticky", top: "0", height: "100vh", overflow: "hidden" }}>
        <div data-eco="hud" style={{ position: "absolute", top: "22px", right: "22px", zIndex: "6", background: "rgba(255,255,255,.92)", border: "1px solid #E9E2F6", borderRadius: "14px", padding: "10px 16px", fontSize: "12.5px", fontWeight: "700", color: "#6351A1", opacity: "0", backdropFilter: "blur(6px)" }}>
          <span data-eco="hud-text" />
        </div>
        <div data-eco="travel-card" style={{ position: "absolute", left: "50%", top: "50%", opacity: "0", pointerEvents: "none", transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0", background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "20px", padding: "12px 18px", boxShadow: "0 20px 44px rgba(43,35,66,.22)", zIndex: "5", whiteSpace: "nowrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#F0EBFA", display: "grid", placeItems: "center", color: "#6351A1", fontWeight: "800", fontSize: "14px" }}>B</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "800", color: "#2B2342" }}>Bruno</div>
            </div>
          </div>
          <div data-eco="tc-dots" style={{ display: "flex", gap: "6px", paddingLeft: "2px", opacity: "0", maxHeight: "0", marginTop: "0", overflow: "hidden" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#6351A1" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#CA5C00" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2F9E80" }} />
          </div>
        </div>
        <div data-eco="beat1" style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", opacity: "0" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "-70px", top: "-50px", width: "280px", height: "280px", borderRadius: "50%", background: "#EFE6FB", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", right: "-40px", bottom: "-60px", width: "200px", height: "200px", borderRadius: "46% 54% 58% 42%/54% 46% 42% 58%", background: "#FFEFDD", pointerEvents: "none" }} />
          <div data-eco="b1-flat" style={{ position: "relative", marginBottom: "8vh", height: "min(660px,88vh)", width: "auto", aspectRatio: "268/540", borderRadius: "46px", background: "#2B2342", padding: "11px", boxShadow: "0 34px 68px rgba(43,35,66,.28)" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "34px", overflow: "hidden" }}>
              <ImageSlot id="pz-img-eco-profile" shape="rect" src="/images/journey/pet-profile-screen.webp" placeholder="Bruno's pet profile in the Pawzeeble app" align="top" style={{ display: "block", width: "100%", height: "100%" }} />
            </div>
            <div data-eco="b1-ripple" style={{ position: "absolute", left: "50%", top: "38%", width: "56px", height: "56px", margin: "-28px 0 0 -28px", borderRadius: "50%", border: "3px solid #FFC24B", opacity: "0" }} />
            <div style={{ position: "absolute", left: "-80px", bottom: "-30px", width: "132px", height: "132px", borderRadius: "26px", overflow: "hidden", transform: "rotate(-8deg)", boxShadow: "0 16px 30px rgba(43,35,66,.2)", border: "4px solid #fff" }}>
              <ImageSlot id="eco-b1-paw" shape="rect" placeholder="A real paw resting near the phone" />
            </div>
          </div>
        </div>
        <div data-eco="beat2" style={{ position: "absolute", inset: "0", opacity: "0" }}>
          <div aria-hidden="true" style={{ position: "absolute", right: "-100px", top: "-70px", width: "320px", height: "320px", borderRadius: "46% 54% 58% 42%/54% 46% 42% 58%", background: "#FBEDE2", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", left: "-60px", bottom: "6%", width: "160px", height: "160px", borderRadius: "50%", background: "#E4F4EF", pointerEvents: "none" }} />
          <div data-eco="b2-type1" style={{ position: "absolute", left: "6%", top: "16%", fontSize: "clamp(28px,5vw,58px)", fontWeight: "800", color: "#DCD1F5", letterSpacing: "-.02em" }}>ONE PROFILE.</div>
          <div data-eco="b2-type2" style={{ position: "absolute", right: "6%", top: "28%", fontSize: "clamp(28px,5vw,58px)", fontWeight: "800", color: "#DCD1F5", letterSpacing: "-.02em", textAlign: "right" }}>EVERY PRODUCT.</div>
          <div style={{ position: "absolute", left: "50%", top: "44%", width: "0", height: "0" }} aria-hidden="true">
            <div data-eco="b2-trail" style={{ position: "absolute", left: "-72px", top: "36px", width: "8px", height: "8px", borderRadius: "50%", background: "#6351A1", opacity: "0" }} />
            <div data-eco="b2-trail" style={{ position: "absolute", left: "-104px", top: "58px", width: "7px", height: "7px", borderRadius: "50%", background: "#6351A1", opacity: "0" }} />
            <div data-eco="b2-trail" style={{ position: "absolute", left: "-134px", top: "78px", width: "6px", height: "6px", borderRadius: "50%", background: "#6351A1", opacity: "0" }} />
            <div data-eco="b2-trail" style={{ position: "absolute", left: "-160px", top: "94px", width: "5px", height: "5px", borderRadius: "50%", background: "#6351A1", opacity: "0" }} />
          </div>
          <div style={{ position: "absolute", bottom: "7%", left: "0", right: "0", overflow: "hidden", padding: "0 6%" }}>
            <div data-eco="b2-track" style={{ display: "flex", gap: "18px", width: "max-content" }}>
              <div style={{ position: "relative", width: "260px", height: "176px", boxSizing: "border-box", background: "#fff", border: "2px solid #BFE3E1", borderRadius: "22px", padding: "20px 22px", flex: "none", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: "-22px", bottom: "-26px", width: "118px", height: "118px", borderRadius: "34px", background: "#E0F2F1", transform: "rotate(-14deg)" }} />
                <svg style={{ position: "absolute", right: "22px", bottom: "20px" }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#00827C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
                <div style={{ position: "relative", fontSize: "21px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.01em", color: "#00827C", maxWidth: "190px" }}>Digital Records</div>
                <div style={{ position: "relative", marginTop: "8px", fontSize: "14px", lineHeight: "1.45", fontWeight: "600", color: "#6B6878", maxWidth: "150px" }}>Full medical history, always current</div>
              </div>
              <div style={{ position: "relative", width: "260px", height: "176px", boxSizing: "border-box", background: "#fff", border: "2px solid #F6C2D3", borderRadius: "22px", padding: "20px 22px", flex: "none", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: "-22px", bottom: "-26px", width: "118px", height: "118px", borderRadius: "34px", background: "#FDE3EC", transform: "rotate(-14deg)" }} />
                <svg style={{ position: "absolute", right: "22px", bottom: "20px" }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#CE0049" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
                </svg>
                <div style={{ position: "relative", fontSize: "21px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.01em", color: "#CE0049", maxWidth: "190px" }}>Auto-Synced Documents</div>
                <div style={{ position: "relative", marginTop: "8px", fontSize: "14px", lineHeight: "1.45", fontWeight: "600", color: "#6B6878", maxWidth: "150px" }}>Vaccine slips and reports, filed for you</div>
              </div>
              <div style={{ position: "relative", width: "260px", height: "176px", boxSizing: "border-box", background: "#fff", border: "2px solid #FFDFAE", borderRadius: "22px", padding: "20px 22px", flex: "none", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: "-22px", bottom: "-26px", width: "118px", height: "118px", borderRadius: "34px", background: "#FFF1DC", transform: "rotate(-14deg)" }} />
                <svg style={{ position: "absolute", right: "22px", bottom: "20px" }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFAC33" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <div style={{ position: "relative", fontSize: "21px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.01em", color: "#FFAC33", maxWidth: "190px" }}>Appointment History</div>
                <div style={{ position: "relative", marginTop: "8px", fontSize: "14px", lineHeight: "1.45", fontWeight: "600", color: "#6B6878", maxWidth: "150px" }}>Every visit, one running timeline</div>
              </div>
              <div style={{ position: "relative", width: "260px", height: "176px", boxSizing: "border-box", background: "#fff", border: "2px solid #BCDDF0", borderRadius: "22px", padding: "20px 22px", flex: "none", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: "-22px", bottom: "-26px", width: "118px", height: "118px", borderRadius: "34px", background: "#E1F0F9", transform: "rotate(-14deg)" }} />
                <svg style={{ position: "absolute", right: "22px", bottom: "20px" }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0179B9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                </svg>
                <div style={{ position: "relative", fontSize: "21px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.01em", color: "#0179B9", maxWidth: "190px" }}>Vet Dashboard Access</div>
                <div style={{ position: "relative", marginTop: "8px", fontSize: "14px", lineHeight: "1.45", fontWeight: "600", color: "#6B6878", maxWidth: "150px" }}>Your vet sees it the moment you arrive</div>
              </div>
              <div style={{ position: "relative", width: "260px", height: "176px", boxSizing: "border-box", background: "#fff", border: "2px solid #BFE3E1", borderRadius: "22px", padding: "20px 22px", flex: "none", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: "-22px", bottom: "-26px", width: "118px", height: "118px", borderRadius: "34px", background: "#E0F2F1", transform: "rotate(-14deg)" }} />
                <svg style={{ position: "absolute", right: "22px", bottom: "20px" }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#00827C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                  <path d="m15 9-6 6" />
                  <circle cx="10" cy="10" r=".5" />
                  <circle cx="14" cy="14" r=".5" />
                </svg>
                <div style={{ position: "relative", fontSize: "21px", lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.01em", color: "#00827C", maxWidth: "190px" }}>Savings on My Pawz Mart</div>
                <div style={{ position: "relative", marginTop: "8px", fontSize: "14px", lineHeight: "1.45", fontWeight: "600", color: "#6B6878", maxWidth: "150px" }}>Member discounts on food, meds and toys</div>
              </div>
            </div>
          </div>
        </div>
        <div data-eco="beat3" style={{ position: "absolute", inset: "0", opacity: "0" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "56%", transform: "translate(-50%,-50%)", width: "min(80vw,640px)", height: "min(80vw,640px)", borderRadius: "50%", background: "radial-gradient(circle,#F0EBFA 0%,transparent 68%)", pointerEvents: "none" }} />
          <div data-eco="b3-ring" aria-hidden="true" style={{ position: "absolute", left: "50%", top: "62%", transform: "translate(-50%,-50%)", width: "260px", height: "260px", border: "2px dashed #C9BCEC", borderRadius: "50%", pointerEvents: "none" }} />
          <div data-eco="b3-node" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "0", height: "0" }}>
            <div style={{ position: "absolute", left: "50%", top: "0", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#6351A1", margin: "0 auto", boxShadow: "0 0 0 6px rgba(99,81,161,.15)" }} />
              <div style={{ marginTop: "10px", fontSize: "13px", fontWeight: "800", color: "#2B2342", whiteSpace: "nowrap" }}>Pawzeeble App</div>
            </div>
            <div data-eco="b3-call" style={{ position: "absolute", left: "50%", top: "44px", opacity: "0", width: "186px", display: "flex", flexDirection: "column", gap: "12px", background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "20px", padding: "16px", boxShadow: "0 16px 36px rgba(43,35,66,.14)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#F0EBFA", display: "grid", placeItems: "center" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </div>
              <div style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.35", color: "#2B2342", textWrap: "pretty" }}>Real-time record sync</div>
            </div>
          </div>
          <div data-eco="b3-node" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "0", height: "0" }}>
            <div style={{ position: "absolute", left: "50%", top: "0", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#CA5C00", margin: "0 auto", boxShadow: "0 0 0 6px rgba(202,92,0,.15)" }} />
              <div style={{ marginTop: "10px", fontSize: "13px", fontWeight: "800", color: "#2B2342", whiteSpace: "nowrap" }}>Skale</div>
            </div>
            <div data-eco="b3-call" style={{ position: "absolute", left: "50%", bottom: "44px", opacity: "0", width: "186px", display: "flex", flexDirection: "column", gap: "12px", background: "#fff", border: "1.5px solid #F2E3D6", borderRadius: "20px", padding: "16px", boxShadow: "0 16px 36px rgba(43,35,66,.14)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#FBEDE2", display: "grid", placeItems: "center" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#CA5C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="8" y="2" width="8" height="4" rx="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
              </div>
              <div style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.35", color: "#2B2342", textWrap: "pretty" }}>No re-entering pet history</div>
            </div>
          </div>
          <div data-eco="b3-node" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "0", height: "0" }}>
            <div style={{ position: "absolute", left: "50%", top: "0", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#2F9E80", margin: "0 auto", boxShadow: "0 0 0 6px rgba(47,158,128,.15)" }} />
              <div style={{ marginTop: "10px", fontSize: "13px", fontWeight: "800", color: "#2B2342", whiteSpace: "nowrap" }}>My Pawz Mart</div>
            </div>
            <div data-eco="b3-call" style={{ position: "absolute", left: "50%", top: "44px", opacity: "0", width: "186px", display: "flex", flexDirection: "column", gap: "12px", background: "#fff", border: "1.5px solid #D9EEE7", borderRadius: "20px", padding: "16px", boxShadow: "0 16px 36px rgba(43,35,66,.14)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#E4F4EF", display: "grid", placeItems: "center" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#2F9E80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15.5 7.5 3.4-3.4a2.1 2.1 0 0 1 3 3L18.5 10.5" />
                  <circle cx="7.5" cy="15.5" r="5.5" />
                  <path d="m21 2-9.6 9.6" />
                </svg>
              </div>
              <div style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.35", color: "#2B2342", textWrap: "pretty" }}>One login everywhere</div>
            </div>
          </div>
        </div>
        <div data-eco="beat4" style={{ position: "absolute", inset: "0", opacity: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "-60px", bottom: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "#E4F4EF", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", right: "-50px", top: "-40px", width: "220px", height: "220px", borderRadius: "44% 56% 50% 50%/50% 44% 56% 50%", background: "#FBEDE2", pointerEvents: "none" }} />
          <div style={{ position: "relative", width: "0", height: "0" }}>
            <div data-eco="b4-sat" style={{ position: "absolute", left: "0", top: "0", width: "50px", height: "50px", margin: "-25px 0 0 -25px", borderRadius: "16px", background: "#fff", border: "1.5px solid #EBE4F7", display: "grid", placeItems: "center", boxShadow: "0 12px 22px rgba(43,35,66,.16)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div data-eco="b4-sat" style={{ position: "absolute", left: "0", top: "0", width: "50px", height: "50px", margin: "-25px 0 0 -25px", borderRadius: "16px", background: "#fff", border: "1.5px solid #EBE4F7", display: "grid", placeItems: "center", boxShadow: "0 12px 22px rgba(43,35,66,.16)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CA5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v8M9 10.5c0-1 1-1.5 3-1.5s3 .5 3 1.5-1 1.5-3 1.5-3 .5-3 1.5 1 1.5 3 1.5 3-.5 3-1.5" />
              </svg>
            </div>
            <div data-eco="b4-sat" style={{ position: "absolute", left: "0", top: "0", width: "50px", height: "50px", margin: "-25px 0 0 -25px", borderRadius: "16px", background: "#fff", border: "1.5px solid #EBE4F7", display: "grid", placeItems: "center", boxShadow: "0 12px 22px rgba(43,35,66,.16)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F9E80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.6 9.6 14.4 3.4a2 2 0 0 0-2.8 0L3.4 11.6a2 2 0 0 0 0 2.8l6.2 6.2a2 2 0 0 0 2.8 0l8.2-8.2a2 2 0 0 0 0-2.8Z" />
                <circle cx="8.5" cy="8.5" r="1.5" />
              </svg>
            </div>
          </div>
          <div data-eco="b4-call" style={{ opacity: "0", position: "absolute", left: "6%", top: "16%", width: "200px", display: "flex", flexDirection: "column", gap: "12px", background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "20px", padding: "16px", boxShadow: "0 16px 36px rgba(43,35,66,.14)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#F0EBFA", display: "grid", placeItems: "center", overflow: "hidden" }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="6" y="2" width="12" height="20" rx="2" />
                <path d="M11 18h2" />
                <path d="M12 7v6M9.5 10.5 12 13l2.5-2.5" />
              </svg>
            </div>
            <div style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.35", color: "#2B2342", textWrap: "pretty" }}>Order history feeds straight into the app</div>
          </div>
          <div data-eco="b4-call" style={{ opacity: "0", position: "absolute", right: "6%", top: "20%", width: "200px", display: "flex", flexDirection: "column", gap: "12px", background: "#fff", border: "1.5px solid #F7E3C2", borderRadius: "20px", padding: "16px", boxShadow: "0 16px 36px rgba(43,35,66,.14)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#FFF6E3", display: "grid", placeItems: "center", overflow: "hidden" }}>
              <img src="/images/brand/pzb-coin.png" alt="" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </div>
            <div style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.35", color: "#2B2342", textWrap: "pretty" }}>PZB Coins earned on every purchase</div>
          </div>
          <div data-eco="b4-call" style={{ opacity: "0", position: "absolute", left: "6%", bottom: "14%", width: "200px", display: "flex", flexDirection: "column", gap: "12px", background: "#fff", border: "1.5px solid #D9EEE7", borderRadius: "20px", padding: "16px", boxShadow: "0 16px 36px rgba(43,35,66,.14)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#E4F4EF", display: "grid", placeItems: "center", overflow: "hidden" }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#2F9E80" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.6 9.6 14.4 3.4a2 2 0 0 0-2.8 0L3.4 11.6a2 2 0 0 0 0 2.8l6.2 6.2a2 2 0 0 0 2.8 0l8.2-8.2a2 2 0 0 0 0-2.8Z" />
                <circle cx="8.5" cy="8.5" r="1.5" />
              </svg>
            </div>
            <div style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.35", color: "#2B2342", textWrap: "pretty" }}>Cross-sell tags, tuned to your pet</div>
          </div>
          <div data-eco="b4-call" style={{ opacity: "0", position: "absolute", right: "6%", bottom: "14%", width: "200px", display: "flex", flexDirection: "column", gap: "12px", background: "#fff", border: "1.5px solid #F6C2D3", borderRadius: "20px", padding: "18px", boxShadow: "0 14px 30px rgba(43,35,66,.08)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#FDE3EC", display: "grid", placeItems: "center", overflow: "hidden" }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#CE0049" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m18 2 4 4" />
                <path d="m17 7 3-3" />
                <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
                <path d="m9 11 4 4" />
                <path d="m5 19-3 3" />
                <path d="m14 4 6 6" />
              </svg>
            </div>
            <div style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.35", color: "#2B2342", textWrap: "pretty" }}>Track vaccinations and get reminders</div>
          </div>
        </div>
        <div data-eco="beat5" style={{ position: "absolute", inset: "0", opacity: "0", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg,#F3EEFD,#E7DEFB)" }}>
          <div data-eco="b5-text" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", textAlign: "center", opacity: "0", fontSize: "clamp(24px,3.2vw,36px)", color: "#2B2342", maxWidth: "520px", fontWeight: "800" }}>One ecosystem. Every touchpoint.</div>
        </div>
      </div>
    </div>
  );
}
