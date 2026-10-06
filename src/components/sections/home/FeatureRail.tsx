import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import styles from './FeatureRail.module.css';

export default function FeatureRail() {
  const v = useSite();
  return (
    <section data-r="pinwrap" style={{ position: "relative", paddingTop: "40px" }}>
      <div data-r="pinstage" ref={v.stageRef} style={{ position: "sticky", top: "0", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div data-r="pinscale" ref={v.scaleRef} style={{ position: "static", transform: "scale(1)", transformOrigin: "50% 50%", display: "flex", flexDirection: "column", height: "100%", perspective: "1400px" }}>
          <div ref={v.pinTitleRef} style={{ flex: "0 0 auto", maxWidth: "1260px", margin: "0 auto", padding: "clamp(28px,6vh,64px) 22px 0", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <p style={{ fontSize: "16.5px", lineHeight: "1.6", color: "#CA5C00", textAlign: "center", fontWeight: "600" }}>BUILT FOR PET PARENTS</p>
            <h2 style={{ fontSize: "clamp(30px,3.4vw,44px)", color: "#2B2342", maxWidth: "560px", textWrap: "balance", textAlign: "center" }}>One app for the whole of pet parenting</h2>
          </div>
          <div data-r="pinrow" ref={v.rowRef} style={{ flex: "1 1 auto", minHeight: "0", display: "flex", alignItems: "stretch", gap: "33px", paddingBottom: "28px", boxSizing: "border-box", paddingLeft: "80px", paddingRight: "80px", willChange: "transform", scrollbarWidth: "none", marginTop: "40px", position: "static", transform: "translateZ(0)" }}>
            <div data-r="pincard" onClick={v.tapCard} style={{ flexShrink: "0", width: "480px", maxWidth: "80vw", minHeight: "0", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: "#F0EBFA", border: "1.5px solid rgba(43,35,66,.06)", borderRadius: "28px", padding: "36px 36px 0", overflow: "hidden" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#fff", color: "#6351A1", display: "grid", placeItems: "center", fontSize: "20px", flex: "none" }}>⚕</div>
              <h3 style={{ marginTop: "18px", fontSize: "28px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#2B2342", whiteSpace: "nowrap", flex: "none" }}>Pet Services</h3>
              <p style={{ marginTop: "12px", height: "48px", fontSize: "15px", lineHeight: "1.6", color: "#5A5177", textWrap: "balance", maxWidth: "360px", overflow: "hidden", flex: "none" }}>Explore and book verified &amp; dependable pet services.</p>
              <div data-r="pinmedia" style={{ marginTop: "24px", width: "78%", flex: "1 1 0", minHeight: "0", overflow: "visible", background: "transparent" }}>
                <ImageSlot id="pz-img-pin-services" shape="rect" src="/images/content/iphone-15-1.webp" placeholder="Pet Services screen" style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "auto", aspectRatio: "5339/11100", display: "block" }} />
              </div>
            </div>
            <div data-r="pincard" onClick={v.tapCard} style={{ flexShrink: "0", width: "480px", maxWidth: "80vw", minHeight: "0", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: "#E4F4EF", border: "1.5px solid rgba(43,35,66,.06)", borderRadius: "28px", padding: "36px 36px 0", overflow: "hidden" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#fff", color: "#25795F", display: "grid", placeItems: "center", fontSize: "20px", flex: "none" }}>◎</div>
              <h3 style={{ marginTop: "18px", fontSize: "28px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#2B2342", whiteSpace: "nowrap", flex: "none" }}>Community Network</h3>
              <p style={{ marginTop: "12px", height: "48px", fontSize: "15px", lineHeight: "1.6", color: "#5A5177", textWrap: "balance", maxWidth: "360px", overflow: "hidden", flex: "none" }}>Join a network of pet parents and become part of your pet’s clan.</p>
              <div data-r="pinmedia" style={{ marginTop: "24px", width: "78%", flex: "1 1 0", minHeight: "0", overflow: "visible", background: "transparent" }}>
                <ImageSlot id="pz-img-pin-community" shape="rect" src="/images/content/community.webp" placeholder="Community screen" style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "auto", aspectRatio: "2670/5550", display: "block" }} />
              </div>
            </div>
            <div data-r="pincard" onClick={v.tapCard} style={{ flexShrink: "0", width: "480px", maxWidth: "80vw", minHeight: "0", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: "#FFF3D9", border: "1.5px solid rgba(43,35,66,.06)", borderRadius: "28px", padding: "36px 36px 0", overflow: "hidden" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#fff", color: "#8A6300", display: "grid", placeItems: "center", fontSize: "20px", flex: "none" }}>✦</div>
              <h3 style={{ marginTop: "18px", fontSize: "28px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#2B2342", whiteSpace: "nowrap", flex: "none" }}>Sheru AI</h3>
              <p style={{ marginTop: "12px", height: "48px", fontSize: "15px", lineHeight: "1.6", color: "#5A5177", textWrap: "balance", maxWidth: "360px", overflow: "hidden", flex: "none" }}>Ask Sheru AI anything about your pet, from fun ideas to serious guidance.</p>
              <div data-r="pinmedia" style={{ marginTop: "24px", width: "78%", flex: "1 1 0", minHeight: "0", overflow: "visible", background: "transparent" }}>
                <ImageSlot id="pz-img-pin-sheru" shape="rect" src="/images/content/iphone-15-2.webp" placeholder="Sheru AI screen" style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "auto", aspectRatio: "5339/11100", display: "block" }} />
              </div>
            </div>
            <div data-r="pincard" onClick={v.tapCard} style={{ flexShrink: "0", width: "480px", maxWidth: "80vw", minHeight: "0", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: "#F0EBFA", border: "1.5px solid rgba(43,35,66,.06)", borderRadius: "28px", padding: "36px 36px 0", overflow: "hidden" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#fff", color: "#6351A1", display: "grid", placeItems: "center", fontSize: "20px", flex: "none" }}>✉</div>
              <h3 style={{ marginTop: "18px", fontSize: "28px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#2B2342", whiteSpace: "nowrap", flex: "none" }}>Messenger</h3>
              <p style={{ marginTop: "12px", height: "48px", fontSize: "15px", lineHeight: "1.6", color: "#5A5177", textWrap: "balance", maxWidth: "360px", overflow: "hidden", flex: "none" }}>Consult verified vets free, 24/7, and connect with pet parents and providers.</p>
              <div data-r="pinmedia" style={{ marginTop: "24px", width: "78%", flex: "1 1 0", minHeight: "0", overflow: "visible", background: "transparent" }}>
                <ImageSlot id="pz-img-pin-chats" shape="rect" src="/images/content/iphone-15.webp" placeholder="Chats screen" style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "auto", aspectRatio: "5339/11100", display: "block" }} />
              </div>
            </div>
            <div data-r="pincard" onClick={v.tapCard} style={{ flexShrink: "0", width: "480px", maxWidth: "80vw", minHeight: "0", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: "#FFF1E4", border: "1.5px solid rgba(43,35,66,.06)", borderRadius: "28px", padding: "36px 36px 0", overflow: "hidden" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#fff", color: "#CA5C00", display: "grid", placeItems: "center", fontSize: "20px", flex: "none" }}>◈</div>
              <h3 style={{ marginTop: "18px", fontSize: "28px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#2B2342", whiteSpace: "nowrap", flex: "none" }}>Pawzeeble Academy</h3>
              <p style={{ marginTop: "12px", height: "48px", fontSize: "15px", lineHeight: "1.6", color: "#5A5177", textWrap: "balance", maxWidth: "360px", overflow: "hidden", flex: "none" }}>Improve as a pet parent through interactive learning.</p>
              <div data-r="pinmedia" style={{ marginTop: "24px", width: "78%", flex: "1 1 0", minHeight: "0", overflow: "visible", background: "transparent" }}>
                <ImageSlot id="pz-img-pin-academy" shape="rect" src="/images/content/iphone-15-4.webp" placeholder="Pawzeeble Academy screen" style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "auto", aspectRatio: "5339/11100", display: "block" }} />
              </div>
            </div>
            <div data-r="pincard" onClick={v.tapCard} style={{ flexShrink: "0", width: "480px", maxWidth: "80vw", minHeight: "0", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: "#E4EEFA", border: "1.5px solid rgba(43,35,66,.06)", borderRadius: "28px", padding: "36px 36px 0", overflow: "hidden" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#fff", color: "#2B5A96", display: "grid", placeItems: "center", fontSize: "20px", flex: "none" }}>▤</div>
              <h3 style={{ marginTop: "18px", fontSize: "28px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#2B2342", whiteSpace: "nowrap", flex: "none" }}>Pet Profile Management</h3>
              <p style={{ marginTop: "12px", height: "48px", fontSize: "15px", lineHeight: "1.6", color: "#5A5177", textWrap: "balance", maxWidth: "360px", overflow: "hidden", flex: "none" }}>Invoices, vaccine cycles and documents, managed in one consolidated space.</p>
              <div data-r="pinmedia" style={{ marginTop: "24px", width: "78%", flex: "1 1 0", minHeight: "0", overflow: "visible", background: "transparent" }}>
                <ImageSlot id="pz-img-pin-profile" shape="rect" src="/images/content/iphone-15-3.webp" placeholder="Pet profile screen" style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "auto", aspectRatio: "5339/11100", display: "block" }} />
              </div>
            </div>
            <div data-r="pincard" onClick={v.tapCard} style={{ flexShrink: "0", width: "480px", maxWidth: "80vw", minHeight: "0", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: "#FFF1E4", border: "1.5px solid rgba(43,35,66,.06)", borderRadius: "28px", padding: "36px 36px 0", overflow: "hidden" }}>
              <img data-r="pinlogo" src="/images/brand/pawteckt-logo.png" alt="Pawteckt" style={{ height: "44px", width: "auto", maxWidth: "180px", objectFit: "contain", display: "block", flex: "none" }} />
              <h3 style={{ marginTop: "18px", fontSize: "28px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#2B2342", whiteSpace: "nowrap", flex: "none" }}>Pawteckt</h3>
              <p style={{ marginTop: "12px", height: "48px", fontSize: "15px", lineHeight: "1.6", color: "#5A5177", textWrap: "balance", maxWidth: "360px", overflow: "hidden", flex: "none" }}>
                Pawzeeble Assurance Benefits + HDFC ERGO Pet Insurance from ₹45/month, billed annually.
              </p>
              <div data-r="pinmedia" style={{ marginTop: "24px", width: "78%", flex: "1 1 0", minHeight: "0", overflow: "visible", background: "transparent" }}>
                <ImageSlot id="pz-img-pin-pawteckt" shape="rect" src="/images/content/pawteckt-screenshot.webp" placeholder="Pawteckt screen" style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "auto", aspectRatio: "2205/4584", display: "block" }} />
              </div>
            </div>
          </div>
          <div data-r="pinmark" ref={v.markRef} aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", width: "132px", height: "132px", margin: "-66px 0 0 -66px", opacity: "0", pointerEvents: "none", display: "grid", placeItems: "center", background: "#FFFCF6", borderRadius: "50%", boxShadow: "0 18px 60px rgba(43,35,66,.16)" }}>
            <svg width="76" height="76" viewBox="0 0 120 120" aria-hidden="true">
              <g fill="#6351A1">
                <circle cx="40" cy="38" r="12" />
                <circle cx="80" cy="38" r="12" />
                <circle cx="25" cy="66" r="10.5" />
                <circle cx="95" cy="66" r="10.5" />
                <ellipse cx="60" cy="80" rx="26" ry="22" />
              </g>
              <circle cx="60" cy="80" r="7" fill="#CA5C00" />
            </svg>
          </div>
        </div>
        <div data-r="ptpanel" ref={v.panelRef} style={{ position: "absolute", inset: "0", opacity: "0", pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "clamp(10px, 2.2vh, 22px)", padding: "clamp(16px, 4vh, 48px) 22px", textAlign: "center", top: "72px" }}>
          <img ref={v.ptLogoRef} src="/images/brand/pawteckt-logo.png" alt="Pawteckt" style={{ width: "clamp(110px, 14vh, 200px)", maxWidth: "46vw", display: "block", transformOrigin: "50% 50%" }} />
          <h2 ref={v.ptTitleRef} style={{ fontSize: "clamp(24px, min(3.6vw, 5.2vh), 46px)", color: "#2B2342", maxWidth: "720px", textWrap: "balance", opacity: "0" }}>India&apos;s Smartest pet wellness plan, from ₹45/month, billed annually</h2>
          <p ref={v.ptSubRef} style={{ fontSize: "clamp(14px, 2.4vh, 17px)", lineHeight: "1.55", color: "#5A5177", maxWidth: "640px", textWrap: "pretty", opacity: "0" }}>
            One membership covers discounted services across the network, unlimited 24×7 vet chat, a Pet QR tag for safety, and an insurance plan underwritten by HDFC ERGO.
          </p>
          <div data-r="ptcards" ref={v.ptCardsRef} style={{ marginTop: "24px", width: "100%", maxWidth: "1000px", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "clamp(10px, 1.6vh, 14px)" }}>
            <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "22px", padding: "clamp(13px, 2vh, 20px) 18px", textAlign: "left", opacity: "0" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#FFF1E4", color: "#CA5C00", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 8.5-4.1-.9-7-4.2-7-8.5V6l7-3z" />
                  <path d="M9.2 12l2 2 3.6-3.8" />
                </svg>
              </div>
              <div style={{ marginTop: "clamp(8px, 1.4vh, 14px)", fontSize: "clamp(15px, 2.2vh, 17px)", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Pet Insurance</div>
              <div style={{ marginTop: "5px", fontSize: "clamp(12px, 1.9vh, 13.5px)", lineHeight: "1.45", color: "#6F6590" }}>Powered by HDFC ERGO</div>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "22px", padding: "clamp(13px, 2vh, 20px) 18px", textAlign: "left", opacity: "0" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#F0EBFA", color: "#6351A1", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.8L4 21l1.4-4.2A8.4 8.4 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
                  <path d="M8.5 11.5h7M8.5 8.5h7M8.5 14.5h4" />
                </svg>
              </div>
              <div style={{ marginTop: "clamp(8px, 1.4vh, 14px)", fontSize: "clamp(15px, 2.2vh, 17px)", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>24/7 Vet Support</div>
              <div style={{ marginTop: "5px", fontSize: "clamp(12px, 1.9vh, 13.5px)", lineHeight: "1.45", color: "#6F6590" }}>Unlimited Licensed Vet Chat</div>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "22px", padding: "clamp(13px, 2vh, 20px) 18px", textAlign: "left", opacity: "0" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#E4F4EF", color: "#25795F", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
                  <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
                  <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
                  <path d="M14 14h2m4 0h.01M14 18h.01M18 18h2m-2-4v.01" />
                </svg>
              </div>
              <div style={{ marginTop: "clamp(8px, 1.4vh, 14px)", fontSize: "clamp(15px, 2.2vh, 17px)", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>Pet QR</div>
              <div style={{ marginTop: "5px", fontSize: "clamp(12px, 1.9vh, 13.5px)", lineHeight: "1.45", color: "#6F6590" }}>For pet ID and tracking when lost</div>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #EBE4F7", borderRadius: "22px", padding: "clamp(13px, 2vh, 20px) 18px", textAlign: "left", opacity: "0" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#FFF3D9", color: "#8A6300", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.5 13.2l-7.3 7.3a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1-.6-1.6l.6-6.2a2 2 0 0 1 1.8-1.8l6.2-.6a2 2 0 0 1 1.6.6l7.5 7.5a2 2 0 0 1 0 2.8z" />
                  <circle cx="8.6" cy="8.6" r="1.4" />
                </svg>
              </div>
              <div style={{ marginTop: "clamp(8px, 1.4vh, 14px)", fontSize: "clamp(15px, 2.2vh, 17px)", fontWeight: "800", color: "#2B2342", letterSpacing: "-.02em" }}>50% OFF</div>
              <div style={{ marginTop: "5px", fontSize: "clamp(12px, 1.9vh, 13.5px)", lineHeight: "1.45", color: "#6F6590" }}>On pet care services</div>
            </div>
          </div>
          <button ref={v.ptCtaRef} onClick={v.goPawteckt} style={{ marginTop: "clamp(4px, 1vh, 10px)", background: "#CA5C00", color: "#fff", fontSize: "clamp(14px, 2.2vh, 16px)", fontWeight: "700", padding: "clamp(12px, 2vh, 16px) 32px", borderRadius: "999px", boxShadow: "0 12px 26px rgba(202,92,0,.24)", opacity: "0" }} className={styles.h1}>Explore Pawteckt</button>
        </div>
      </div>
    </section>
  );
}
