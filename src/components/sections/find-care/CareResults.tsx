import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './CareResults.module.css';

export default function CareResults() {
  const v = useSite();
  return (
    <section id="pz-care-results" style={{ maxWidth: "1260px", margin: "0 auto", padding: "56px 22px 70px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
        <h2 style={{ fontSize: "clamp(24px,2.8vw,32px)", color: "#2B2342" }}>{v.careHeading}</h2>
        <span style={{ fontSize: "14px", color: "#6F6590", fontWeight: "600" }}>{v.careCount}</span>
      </div>
      <div style={{ marginTop: "22px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "18px" }}>
        {v.careResults.map((r: SiteItem, index: number) => (
          <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", overflow: "hidden", display: "flex", flexDirection: "column" }} key={index}>
            <div style={{ position: "relative", height: "184px" }}>
              <ImageSlot id={r.slotId} shape="rect" placeholder={r.photoHint} />
              <div style={{ position: "absolute", left: "12px", right: "12px", bottom: "12px", display: "flex", gap: "8px", flexWrap: "wrap", pointerEvents: "none" }}>
                {r.assured ? (
                  <img src="/images/badges/badge-pawzeeble-assured.svg" alt="Pawzeeble assured" width="163" height="28" style={{ display: "block", height: "28px", width: "auto" }} />
                ) : null}
                {r.instant ? (
                  <img src="/images/badges/badge-instant-booking.png" alt="Instant booking" width="141" height="28" style={{ display: "block", height: "28px", width: "auto", borderRadius: "5px" }} />
                ) : null}
              </div>
            </div>
            <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: "1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ minWidth: "0" }}>
                  <h3 style={{ fontSize: "19.5px", color: "#2B2342", lineHeight: "1.2", textWrap: "pretty" }}>{r.name}</h3>
                  <div style={{ marginTop: "6px", fontSize: "14px", color: "#5A5177" }}>{r.area}{" · "}{r.distance}</div>
                </div>
                <div style={{ flex: "none", width: "52px", height: "52px", borderRadius: "14px", border: "1.5px solid #EFEAF8", overflow: "hidden" }}>
                  <ImageSlot id={r.logoId} shape="rect" placeholder="Logo" />
                </div>
              </div>
              <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", fontSize: "14px" }}>
                <span style={{ fontWeight: "700", color: "#1E7A55" }}>{r.status}</span>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#A39CB8" }} />
                <span style={{ color: "#6F6590" }}>{r.hours}</span>
                <span style={{ marginLeft: "auto", fontSize: "16px", fontWeight: "800", color: "#2B2342" }}>{r.price}{" onwards"}</span>
              </div>
              {r.hasOffer ? (
                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "9px", background: "linear-gradient(90deg,#0E7C6B,#3DB3A3)", color: "#fff", padding: "10px 14px", borderRadius: "12px", fontSize: "14px", fontWeight: "700" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
                    <path d="M12 1.8l2.4 1.9 3-.3.9 2.9 2.7 1.4-.9 2.9.9 2.9-2.7 1.4-.9 2.9-3-.3L12 19.2l-2.4-1.9-3 .3-.9-2.9-2.7-1.4.9-2.9-.9-2.9 2.7-1.4.9-2.9 3 .3Z" transform="translate(0 1.5)" fill="#fff" />
                    <path d="M9.2 15.3l5.6-5.6" stroke="#0E7C6B" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="9.6" cy="10.1" r="1.1" fill="#0E7C6B" />
                    <circle cx="14.4" cy="14.9" r="1.1" fill="#0E7C6B" />
                  </svg>
                  <span style={{ flex: "1", minWidth: "0" }}>{r.offer}</span>
                  {r.hasMore ? (
                    <span style={{ flex: "none" }}>{r.moreLabel}</span>
                  ) : null}
                </div>
              ) : null}
              <div style={{ flex: "1" }} />
              <button onClick={r.open} style={{ marginTop: "14px", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "13px 20px", borderRadius: "999px", width: "100%", backgroundColor: "#CA5C00" }} className={styles.h1}>View details</button>
            </div>
          </div>
        ))}
      </div>
      {v.careEmpty ? (
        <div style={{ marginTop: "22px", background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "28px", padding: "34px" }}>
          <h3 style={{ fontSize: "21px", color: "#2B2342" }}>Nothing here yet</h3>
          <p style={{ marginTop: "9px", fontSize: "15.5px", lineHeight: "1.6", color: "#5A5177", maxWidth: "440px" }}>
            We haven&apos;t verified a provider for this combination yet. Tell us what you need and we&apos;ll prioritise it.
          </p>
        </div>
      ) : null}
    </section>
  );
}
