import { useSite } from '@/hooks/useSite';

export default function PawtecktCoverage() {
  const v = useSite();
  return (
    <section id="pt-cover" style={{ maxWidth: "1260px", margin: "0 auto", padding: "80px 22px 20px" }}>
      <div data-r="pt-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "22px", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", color: "#CA5C00" }}>PREMIUM · PET INSURANCE BY HDFC ERGO</p>
          <h2 style={{ marginTop: "10px", fontSize: "clamp(30px,3.8vw,44px)", color: "#2B2342", textWrap: "balance" }}>What’s covered, in plain words</h2>
        </div>
        <div role="tablist" style={{ display: "flex", gap: "4px", background: "#F7F4FD", border: "1.5px solid #EFEAF8", padding: "4px", borderRadius: "999px" }}>
          <button role="tab" onClick={v.ptShowIn} style={v.ptTabIn}>Covered</button>
          <button role="tab" onClick={v.ptShowOut} style={v.ptTabOut}>Not covered</button>
        </div>
      </div>
      {v.ptIsIn ? (
        <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ flex: "none", width: "42px", height: "42px", borderRadius: "13px", background: "#E4F4EF", color: "#0E7C6B", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2 22 6" />
                <path d="M17 7 7 17" />
                <path d="m7 11 6 6" />
                <path d="M4 20l3-3" />
                <path d="m14 4 6 6" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>Illness and injury</div>
              <div style={{ marginTop: "5px", fontSize: "14px", lineHeight: "1.55", color: "#5A5177" }}>Treatment when your pet falls sick or gets hurt.</div>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ flex: "none", width: "42px", height: "42px", borderRadius: "13px", background: "#F0EBFA", color: "#6351A1", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 2v2" />
                <path d="M5 2v2" />
                <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                <path d="M8 15a6 6 0 0 0 12 0v-3" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>Surgery</div>
              <div style={{ marginTop: "5px", fontSize: "14px", lineHeight: "1.55", color: "#5A5177" }}>Help with the cost of operations.</div>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ flex: "none", width: "42px", height: "42px", borderRadius: "13px", background: "#FFF3D9", color: "#8A6300", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>Vet visits</div>
              <div style={{ marginTop: "5px", fontSize: "14px", lineHeight: "1.55", color: "#5A5177" }}>Treatment at the vet that doesn’t need a hospital stay.</div>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ flex: "none", width: "42px", height: "42px", borderRadius: "13px", background: "#E4EEFA", color: "#2B5A96", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>If your pet hurts someone</div>
              <div style={{ marginTop: "5px", fontSize: "14px", lineHeight: "1.55", color: "#5A5177" }}>
                Up to ₹1,00,000 if your pet injures a person or damages their things, plus a payout if you lose your pet.
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {v.ptIsOut ? (
        <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ flex: "none", width: "42px", height: "42px", borderRadius: "13px", background: "#F2EEFA", color: "#6F6590", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m18 2 4 4" />
                <path d="m17 7 3-3" />
                <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
                <path d="m9 11 4 4" />
                <path d="m5 19-3 3" />
                <path d="m14 4 6 6" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>Routine check-ups</div>
              <div style={{ marginTop: "5px", fontSize: "14px", lineHeight: "1.55", color: "#5A5177" }}>Vaccines and regular visits. Your Lite discounts help with these.</div>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ flex: "none", width: "42px", height: "42px", borderRadius: "13px", background: "#F2EEFA", color: "#6F6590", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>Problems from before you joined</div>
              <div style={{ marginTop: "5px", fontSize: "14px", lineHeight: "1.55", color: "#5A5177" }}>Conditions your pet already had when you bought the plan.</div>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ flex: "none", width: "42px", height: "42px", borderRadius: "13px", background: "#F2EEFA", color: "#6F6590", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9.94 14.06 4 20" />
                <path d="M12 3v3" />
                <path d="M18.36 5.64 16.24 7.76" />
                <path d="M21 12h-3" />
                <path d="M6 12H3" />
                <path d="m7.76 7.76-2.12-2.12" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>Cosmetic treatments</div>
              <div style={{ marginTop: "5px", fontSize: "14px", lineHeight: "1.55", color: "#5A5177" }}>Procedures that aren’t medically needed.</div>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "22px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ flex: "none", width: "42px", height: "42px", borderRadius: "13px", background: "#F2EEFA", color: "#6F6590", display: "grid", placeItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: "16.5px", fontWeight: "700", color: "#2B2342" }}>Cancer</div>
              <div style={{ marginTop: "5px", fontSize: "14px", lineHeight: "1.55", color: "#5A5177" }}>Only non-cancerous (benign) tumours are covered.</div>
            </div>
          </div>
        </div>
      ) : null}
      <p style={{ marginTop: "16px", fontSize: "13.5px", lineHeight: "1.5", color: "#6F6590" }}>
        A short summary. The full HDFC ERGO policy wording applies and is shared with you before you pay.
      </p>
    </section>
  );
}
