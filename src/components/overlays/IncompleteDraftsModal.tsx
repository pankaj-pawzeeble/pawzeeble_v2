import { useEffect } from 'react';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';

/** "Continue your Pawteckt Lite subscription": paid Lite drafts that still have no pet. */
export default function IncompleteDraftsModal() {
  const v = useSite();

  // Esc closes the dialog, except while a draft is being resumed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') v.closeDrafts();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [v]);

  return (
    <div onClick={v.closeDrafts} style={{ position: "fixed", inset: "0", zIndex: "190", background: "rgba(30,27,75,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div data-r="drafts-dialog" role="dialog" aria-modal="true" aria-labelledby="pz-drafts-title" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "100%", maxWidth: "680px", maxHeight: "92vh", background: "#fff", borderRadius: "20px", padding: "28px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "18px", boxShadow: "0 30px 80px rgba(30,27,75,.35)", fontFamily: "Inter, system-ui, sans-serif" }}>
        <button onClick={v.closeDrafts} disabled={v.draftsBusy} aria-label="Close" style={{ position: "absolute", right: "16px", top: "16px", width: "32px", height: "32px", borderRadius: "50%", background: "#F1F5F9", color: "#475569", display: "grid", placeItems: "center", opacity: v.draftsBusy ? 0.5 : 1, cursor: v.draftsBusy ? "not-allowed" : "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <div style={{ display: "flex", gap: "14px", alignItems: "center", paddingRight: "36px" }}>
          <span style={{ flex: "none", width: "46px", height: "46px", borderRadius: "50%", background: "#FDECD8", color: "#D97706", display: "grid", placeItems: "center", fontSize: "22px" }} aria-hidden="true">🐾</span>
          <div>
            <h3 id="pz-drafts-title" style={{ fontSize: "20px", lineHeight: "1.25", color: "#1E1B4B" }}>Continue your Pawteckt Lite subscription</h3>
            <p style={{ marginTop: "4px", fontSize: "14px", lineHeight: "1.5", color: "#666666" }}>
              {v.draftsMany
                ? "You've already paid for these — just finish adding your pet to activate them."
                : "You've already paid for this — just finish adding your pet to activate it."}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", maxHeight: v.draftsMany ? "380px" : "none" }}>
          {v.drafts.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#666666" }}>No incomplete drafts found.</p>
          ) : null}
          {v.drafts.map((d: SiteItem) => (
            <div data-r="drafts-card" key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", flexWrap: "wrap", border: "1.5px solid #E5E7EB", borderRadius: "16px", padding: "16px 18px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <strong style={{ fontSize: "16px", color: "#1E1B4B" }}>Pawteckt Lite</strong>
                  <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", background: d.monthly ? "#EFF6FF" : "#ECFDF5", color: d.monthly ? "#2563EB" : "#1E9E5A" }}>{d.freq}</span>
                </div>
                <span style={{ fontSize: "13.5px", color: "#666666" }}>{d.paidLabel}</span>
                {d.amount ? <span style={{ fontSize: "15px", fontWeight: "700", color: "#1E1B4B" }}>{d.amount}</span> : null}
              </div>
              <button data-r="drafts-continue" onClick={d.pick} disabled={d.disabled} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", minWidth: "128px", padding: "11px 20px", borderRadius: "999px", fontSize: "14.5px", fontWeight: "700", background: "#EDE9FE", color: "#4338CA", opacity: d.disabled && !d.continuing ? 0.5 : 1, cursor: d.disabled ? "not-allowed" : "pointer" }}>
                {d.continuing ? (
                  <span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2.5px solid #C4B5FD", borderTopColor: "#4338CA", animation: "pzspin .8s linear infinite" }} />
                ) : (
                  "Continue →"
                )}
              </button>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "#666666" }}>ⓘ You can continue any of your incomplete paid drafts.</p>
      </div>
    </div>
  );
}
