import ImageSlot from '@/components/ui/ImageSlot';
import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './ClinicDetail.module.css';

export default function ClinicDetail() {
  const v = useSite();
  return (
    <section data-r="cl-grid" style={{ maxWidth: "1260px", margin: "0 auto", padding: "32px 22px 90px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: "28px", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", minWidth: "0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", paddingBottom: "26px", borderBottom: "1.5px solid #EFEAF8" }}>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center", fontSize: "15px", color: "#5A5177" }}>
            <span style={{ background: "#E4F4EF", color: "#25795F", padding: "5px 11px", borderRadius: "999px", fontSize: "13.5px", fontWeight: "700" }}>★ 4.8</span>
            <span>312 reviews</span>
            <span>·</span>
            <span>Pashan, Pune</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", color: "#2B2342" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>
                <strong style={{ color: "#25795F" }}>Open now</strong>
                {" "}· 9:00 AM – 9:00 PM, all days
              </span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Sutarwadi Road, Pashan, Pune 411021</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
            <span style={{ background: "#fff", border: "1.5px solid #E9E2F6", color: "#4A3E78", padding: "7px 13px", borderRadius: "999px", fontSize: "13px", fontWeight: "600" }}>General consultation</span>
            <span style={{ background: "#fff", border: "1.5px solid #E9E2F6", color: "#4A3E78", padding: "7px 13px", borderRadius: "999px", fontSize: "13px", fontWeight: "600" }}>Vaccination</span>
            <span style={{ background: "#fff", border: "1.5px solid #E9E2F6", color: "#4A3E78", padding: "7px 13px", borderRadius: "999px", fontSize: "13px", fontWeight: "600" }}>Surgery</span>
            <span style={{ background: "#fff", border: "1.5px solid #E9E2F6", color: "#4A3E78", padding: "7px 13px", borderRadius: "999px", fontSize: "13px", fontWeight: "600" }}>Diagnostics</span>
            <span style={{ background: "#fff", border: "1.5px solid #E9E2F6", color: "#4A3E78", padding: "7px 13px", borderRadius: "999px", fontSize: "13px", fontWeight: "600" }}>Dental care</span>
          </div>
        </div>
        {v.clAssured ? (
          <div>
            <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", padding: "clamp(22px,3vw,34px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".06em", color: "#6351A1" }}>PAWZEEBLE ASSURED</p>
                  <h2 style={{ marginTop: "8px", fontSize: "clamp(24px,2.8vw,32px)", color: "#2B2342" }}>Discount coupons at this clinic</h2>
                </div>
                <p style={{ fontSize: "14.5px", color: "#5A5177", maxWidth: "360px", lineHeight: "1.5" }}>Apply coupons at checkout when you book in the Pawzeeble app.</p>
              </div>
              <div style={{ marginTop: "22px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: "16px" }}>
                <div style={{ position: "relative", display: "flex", minHeight: "176px", border: "1.5px solid #E3DDF6", borderRadius: "22px", background: "#F3F0FD" }}>
                  <div style={{ position: "relative", flex: "none", width: "38%", background: "linear-gradient(100deg,#8C78F0 0%,#AB9BF7 45%,#E4DEFC 100%)", borderRadius: "20px 0 0 20px", padding: "20px 18px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "2px dashed #CFC6F2" }}>
                    <span style={{ position: "absolute", top: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1.5px solid #E3DDF6", boxSizing: "border-box", zIndex: "1", borderWidth: "0px" }} />
                    <span style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1.5px solid #E3DDF6", boxSizing: "border-box", zIndex: "1", borderWidth: "0px" }} />
                    <span style={{ fontSize: "22px", fontWeight: "800", lineHeight: "1.05", color: "#fff", letterSpacing: "-.01em", textShadow: "0 1px 2px rgba(74,62,120,.25)" }}>
                      FLAT
                      <br />
                      50% OFF
                    </span>
                  </div>
                  <div style={{ flex: "1", minWidth: "0", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "21px", fontWeight: "800", lineHeight: "1.15", color: "#2B2342" }}>Consultation</span>
                    <span style={{ fontSize: "13.5px", color: "#5A5177" }}>In-clinic, any doctor | Use 4 times</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                      <s style={{ fontSize: "13.5px", color: "#9A91B5" }}>₹800</s>
                      <strong style={{ fontSize: "17px", color: "#2B2342" }}>₹400</strong>
                      <span style={{ fontSize: "12.5px", color: "#6F6590" }}>3 of 4 uses left</span>
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span title="Used" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #6351A1", display: "grid", placeItems: "center", background: "#6351A1", boxSizing: "border-box" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>2</span>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>3</span>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>4</span>
                    </div>
                  </div>
                </div>
                <div style={{ position: "relative", display: "flex", minHeight: "176px", border: "1.5px solid #E3DDF6", borderRadius: "22px", background: "#F3F0FD" }}>
                  <div style={{ position: "relative", flex: "none", width: "38%", background: "linear-gradient(100deg,#8C78F0 0%,#AB9BF7 45%,#E4DEFC 100%)", borderRadius: "20px 0 0 20px", padding: "20px 18px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "2px dashed #CFC6F2" }}>
                    <span style={{ position: "absolute", top: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1.5px solid #E3DDF6", boxSizing: "border-box", zIndex: "1", borderColor: "#f3f2f2", borderWidth: "0px" }} />
                    <span style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1.5px solid #E3DDF6", boxSizing: "border-box", zIndex: "1", borderWidth: "0px" }} />
                    <span style={{ fontSize: "22px", fontWeight: "800", lineHeight: "1.05", color: "#fff", letterSpacing: "-.01em", textShadow: "0 1px 2px rgba(74,62,120,.25)" }}>
                      FLAT
                      <br />
                      20% OFF
                    </span>
                  </div>
                  <div style={{ flex: "1", minWidth: "0", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "21px", fontWeight: "800", lineHeight: "1.15", color: "#2B2342" }}>Vaccination</span>
                    <span style={{ fontSize: "13.5px", color: "#5A5177" }}>Core and booster doses | Use once</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                      <s style={{ fontSize: "13.5px", color: "#9A91B5" }}>₹1,200</s>
                      <strong style={{ fontSize: "17px", color: "#2B2342" }}>₹960</strong>
                      <span style={{ fontSize: "12.5px", color: "#6F6590" }}>1 of 1 use left</span>
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>1</span>
                    </div>
                  </div>
                </div>
                <div style={{ position: "relative", display: "flex", minHeight: "176px", border: "1.5px solid #E3DDF6", borderRadius: "22px", background: "#F3F0FD" }}>
                  <div style={{ position: "relative", flex: "none", width: "38%", background: "linear-gradient(100deg,#8C78F0 0%,#AB9BF7 45%,#E4DEFC 100%)", borderRadius: "20px 0 0 20px", padding: "20px 18px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "2px dashed #CFC6F2" }}>
                    <span style={{ position: "absolute", top: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1.5px solid #E3DDF6", boxSizing: "border-box", zIndex: "1", borderWidth: "0px" }} />
                    <span style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1.5px solid #E3DDF6", boxSizing: "border-box", zIndex: "1", borderWidth: "0px" }} />
                    <span style={{ fontSize: "22px", fontWeight: "800", lineHeight: "1.05", color: "#fff", letterSpacing: "-.01em", textShadow: "0 1px 2px rgba(74,62,120,.25)" }}>
                      FLAT
                      <br />
                      20% OFF
                    </span>
                  </div>
                  <div style={{ flex: "1", minWidth: "0", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "21px", fontWeight: "800", lineHeight: "1.15", color: "#2B2342" }}>Deworming</span>
                    <span style={{ fontSize: "13.5px", color: "#5A5177" }}>Oral or spot-on dose | Use 4 times</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                      <s style={{ fontSize: "13.5px", color: "#9A91B5" }}>₹400</s>
                      <strong style={{ fontSize: "17px", color: "#2B2342" }}>₹320</strong>
                      <span style={{ fontSize: "12.5px", color: "#6F6590" }}>4 of 4 uses left</span>
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>1</span>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>2</span>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>3</span>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>4</span>
                    </div>
                  </div>
                </div>
                <div style={{ position: "relative", display: "flex", minHeight: "176px", border: "1.5px solid #E3DDF6", borderRadius: "22px", background: "#F3F0FD" }}>
                  <div style={{ position: "relative", flex: "none", width: "38%", background: "linear-gradient(100deg,#8C78F0 0%,#AB9BF7 45%,#E4DEFC 100%)", borderRadius: "20px 0 0 20px", padding: "20px 18px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "2px dashed #CFC6F2" }}>
                    <span style={{ position: "absolute", top: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1.5px solid #E3DDF6", boxSizing: "border-box", zIndex: "1", borderWidth: "0px" }} />
                    <span style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "#fff", border: "1.5px solid #E3DDF6", boxSizing: "border-box", zIndex: "1", borderWidth: "0px" }} />
                    <span style={{ fontSize: "22px", fontWeight: "800", lineHeight: "1.05", color: "#fff", letterSpacing: "-.01em", textShadow: "0 1px 2px rgba(74,62,120,.25)" }}>
                      FLAT
                      <br />
                      25% OFF
                    </span>
                  </div>
                  <div style={{ flex: "1", minWidth: "0", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "21px", fontWeight: "800", lineHeight: "1.15", color: "#2B2342" }}>Castration</span>
                    <span style={{ fontSize: "13.5px", color: "#5A5177" }}>Neutering surgery | Use once</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                      <s style={{ fontSize: "13.5px", color: "#9A91B5" }}>₹6,000</s>
                      <strong style={{ fontSize: "17px", color: "#2B2342" }}>₹4,500</strong>
                      <span style={{ fontSize: "12.5px", color: "#6F6590" }}>1 of 1 use left</span>
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px dashed #6351A1", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: "800", color: "#6351A1", background: "#fff", boxSizing: "border-box" }}>1</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "12px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.45", color: "#2B2342", background: "#fff", border: "1.5px solid #E3DDF6", borderRadius: "16px", padding: "12px 14px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "9px", background: "#FFF1E4", display: "grid", placeItems: "center", flex: "none" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A44A00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                  </span>
                  <span style={{ paddingTop: "4px" }}>
                    <strong>Pawteckt members only.</strong>
                    {" "}Valid for pets with an active Pawteckt subscription.
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.45", color: "#2B2342", background: "#fff", border: "1.5px solid #E3DDF6", borderRadius: "16px", padding: "12px 14px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "9px", background: "#F2EEFA", display: "grid", placeItems: "center", flex: "none" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                      <path d="M13 5v2" />
                      <path d="M13 17v2" />
                      <path d="M13 11v2" />
                    </svg>
                  </span>
                  <span style={{ paddingTop: "4px" }}>
                    <strong>Apply at checkout.</strong>
                    {" "}Select the coupon when booking. It isn&apos;t added automatically.
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", padding: "clamp(22px,3vw,32px)" }}>
          <h2 style={{ fontSize: "24px", color: "#2B2342" }}>About the clinic</h2>
          <p style={{ marginTop: "12px", fontSize: "16px", lineHeight: "1.7", color: "#5A5177", textWrap: "pretty" }}>
            PZB Vet Clinic has cared for pets in Pashan since 2016. Our team handles everything from first puppy vaccines to surgery and senior care, with in-house diagnostics so most results come back the same day. Every visit is logged to your pet&apos;s Pawzeeble profile, so your records stay complete wherever you go next.
          </p>
        </div>
        <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", padding: "clamp(22px,3vw,32px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "24px", color: "#2B2342" }}>Services at the clinic</h2>
            <span style={{ fontSize: "14px", color: "#6F6590", fontWeight: "600" }}>8 services</span>
          </div>
          <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "12px" }}>
            <div role="button" tabIndex={0} data-bk="svc" onClick={v.bookInApp} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border-color .15s,box-shadow .15s" }} className={styles.h1}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#F0EBFA", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 2v2" />
                  <path d="M5 2v2" />
                  <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                  <path d="M8 15a6 6 0 0 0 12 0v-3" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>General consultation</div>
              <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Check-ups, illness and follow-ups</div>
              <div style={{ marginTop: "auto", fontSize: "13px", color: "#6F6590" }}>
                From{" "}
                <strong style={{ fontSize: "15px", color: "#2B2342" }}>₹800</strong>
              </div>
            </div>
            <div role="button" tabIndex={0} data-bk="svc" onClick={v.bookInApp} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border-color .15s,box-shadow .15s" }} className={styles.h2}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#E4F4EF", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E7C6B" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m18 2 4 4" />
                  <path d="m17 7 3-3" />
                  <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
                  <path d="m9 11 4 4" />
                  <path d="m5 19-3 3" />
                  <path d="m14 4 6 6" />
                </svg>
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Vaccination</div>
              <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Core and booster doses on schedule</div>
              <div style={{ marginTop: "auto", fontSize: "13px", color: "#6F6590" }}>
                From{" "}
                <strong style={{ fontSize: "15px", color: "#2B2342" }}>₹1,200</strong>
              </div>
            </div>
            <div role="button" tabIndex={0} data-bk="svc" onClick={v.bookInApp} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border-color .15s,box-shadow .15s" }} className={styles.h3}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#FFF3D9", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8A6300" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                  <path d="m8.5 8.5 7 7" />
                </svg>
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Deworming</div>
              <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Oral or spot-on, every 3 months</div>
              <div style={{ marginTop: "auto", fontSize: "13px", color: "#6F6590" }}>
                From{" "}
                <strong style={{ fontSize: "15px", color: "#2B2342" }}>₹400</strong>
              </div>
            </div>
            <div role="button" tabIndex={0} data-bk="svc" onClick={v.bookInApp} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border-color .15s,box-shadow .15s" }} className={styles.h4}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#FDE3EC", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CE0049" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="6" cy="6" r="3" />
                  <path d="M8.12 8.12 12 12" />
                  <path d="M20 4 8.12 15.88" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M14.8 14.8 20 20" />
                </svg>
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Castration &amp; spaying</div>
              <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Neutering with overnight care</div>
              <div style={{ marginTop: "auto", fontSize: "13px", color: "#6F6590" }}>
                From{" "}
                <strong style={{ fontSize: "15px", color: "#2B2342" }}>₹6,000</strong>
              </div>
            </div>
            <div role="button" tabIndex={0} data-bk="svc" onClick={v.bookInApp} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border-color .15s,box-shadow .15s" }} className={styles.h5}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#E4EEFA", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B5A96" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
                  <path d="M6.453 15h11.094" />
                  <path d="M8.5 2h7" />
                </svg>
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Diagnostics</div>
              <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Blood work, X-ray and ultrasound</div>
              <div style={{ marginTop: "auto", fontSize: "13px", color: "#6F6590" }}>
                From{" "}
                <strong style={{ fontSize: "15px", color: "#2B2342" }}>₹900</strong>
              </div>
            </div>
            <div role="button" tabIndex={0} data-bk="svc" onClick={v.bookInApp} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border-color .15s,box-shadow .15s" }} className={styles.h6}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#F0EBFA", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5.5c-1.5-2-4-2.5-5.5-1.5S4 7 4.5 9.5c.4 2 1.2 3 1.5 5 .4 2.6.8 6 2.5 6 1.5 0 1.5-4 3.5-4s2 4 3.5 4c1.7 0 2.1-3.4 2.5-6 .3-2 1.1-3 1.5-5S19 5 17.5 4s-4-.5-5.5 1.5Z" />
                </svg>
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Dental care</div>
              <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>Scaling, polish and extractions</div>
              <div style={{ marginTop: "auto", fontSize: "13px", color: "#6F6590" }}>
                From{" "}
                <strong style={{ fontSize: "15px", color: "#2B2342" }}>₹3,000</strong>
              </div>
            </div>
            <div role="button" tabIndex={0} data-bk="svc" onClick={v.bookInApp} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border-color .15s,box-shadow .15s" }} className={styles.h7}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#FFF1E4", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A44A00" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 18v-6a5 5 0 1 1 10 0v6" />
                  <path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" />
                  <path d="M21 12h1" />
                  <path d="M18.5 4.5 18 5" />
                  <path d="M2 12h1" />
                  <path d="M12 2v1" />
                  <path d="m4.929 4.929.707.707" />
                </svg>
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Emergency care</div>
              <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>24 × 7 walk-in and critical care</div>
              <div style={{ marginTop: "auto", fontSize: "13px", color: "#6F6590" }}>
                From{" "}
                <strong style={{ fontSize: "15px", color: "#2B2342" }}>₹1,500</strong>
              </div>
            </div>
            <div role="button" tabIndex={0} data-bk="svc" onClick={v.bookInApp} style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border-color .15s,box-shadow .15s" }} className={styles.h8}>
              <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#E4F4EF", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E7C6B" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </span>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Home visit</div>
              <div style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#5A5177" }}>A vet comes to you within the city</div>
              <div style={{ marginTop: "auto", fontSize: "13px", color: "#6F6590" }}>
                From{" "}
                <strong style={{ fontSize: "15px", color: "#2B2342" }}>₹1,200</strong>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", padding: "clamp(22px,3vw,32px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "24px", color: "#2B2342" }}>Available slots</h2>
            <span style={{ fontSize: "14px", color: "#6F6590", fontWeight: "600" }}>Next 7 days</span>
          </div>
          <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: "repeat(7,minmax(64px,1fr))", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
            {v.clDays.map((d: SiteItem, index: number) => (
              <button onClick={d.pick} style={d.style} key={index}>
                <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".04em", opacity: ".8" }}>{d.dow}</span>
                {" "}
                <span style={{ fontSize: "20px", fontWeight: "800", lineHeight: "1.1" }}>{d.date}</span>
                {" "}
                <span style={{ fontSize: "11.5px", fontWeight: "600", opacity: ".8" }}>{d.count}</span>
              </button>
            ))}
          </div>
          {v.clSlotGroups.map((g: SiteItem, index: number) => (
            <div style={{ marginTop: "20px" }} key={index}>
              <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#6F6590" }}>{g.label}</div>
              <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: "8px" }}>
                {g.slots.map((t: SiteItem, index2: number) => (
                  <button onClick={t.pick} disabled={t.off} style={t.style} key={index2}>{t.time}</button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop: "22px", paddingTop: "18px", borderTop: "1.5px solid #F2EEFA", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "15px", color: "#2B2342", fontWeight: "600" }}>{v.clPicked}</span>
            <button onClick={v.bookInApp} style={{ background: "#CA5C00", color: "#fff", fontSize: "15px", fontWeight: "700", padding: "14px 26px", borderRadius: "999px" }} className={styles.h9}>Continue in the app to book</button>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "24px", color: "#2B2342" }}>Doctors at this clinic</h2>
            <span style={{ fontSize: "14px", color: "#6F6590", fontWeight: "600" }}>3 doctors</span>
          </div>
          <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "16px" }}>
            <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "24px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", flex: "none", background: "#F2EEFA" }}>
                  <ImageSlot id="pz-cl-doc-1" shape="circle" placeholder="Doctor photo" />
                </div>
                <div style={{ minWidth: "0" }}>
                  <h3 style={{ fontSize: "18px", color: "#2B2342", lineHeight: "1.25" }}>Dr. Ananya Kulkarni</h3>
                  <div style={{ marginTop: "4px", fontSize: "13.5px", color: "#5A5177", lineHeight: "1.4" }}>BVSc &amp; AH, MVSc (Surgery)</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ background: "#F2EEFA", color: "#4A3E78", padding: "6px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "700" }}>12 yrs experience</span>
                <span style={{ background: "#F7F4FD", color: "#5A5177", padding: "6px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "600" }}>English, Marathi, Hindi</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px", paddingTop: "14px", borderTop: "1.5px solid #F2EEFA" }}>
                <span style={{ fontSize: "13.5px", color: "#6F6590", fontWeight: "600" }}>Consultation</span>
                <strong style={{ fontSize: "17px", color: "#2B2342" }}>₹800</strong>
              </div>
              <button onClick={v.bookInApp} style={{ background: "#CA5C00", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "13px 20px", borderRadius: "999px", width: "100%" }} className={styles.h10}>Book appointment in the app</button>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "24px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", flex: "none", background: "#F2EEFA" }}>
                  <ImageSlot id="pz-cl-doc-2" shape="circle" placeholder="Doctor photo" />
                </div>
                <div style={{ minWidth: "0" }}>
                  <h3 style={{ fontSize: "18px", color: "#2B2342", lineHeight: "1.25" }}>Dr. Rohan Deshpande</h3>
                  <div style={{ marginTop: "4px", fontSize: "13.5px", color: "#5A5177", lineHeight: "1.4" }}>BVSc &amp; AH, MVSc (Medicine)</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ background: "#F2EEFA", color: "#4A3E78", padding: "6px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "700" }}>8 yrs experience</span>
                <span style={{ background: "#F7F4FD", color: "#5A5177", padding: "6px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "600" }}>English, Hindi</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px", paddingTop: "14px", borderTop: "1.5px solid #F2EEFA" }}>
                <span style={{ fontSize: "13.5px", color: "#6F6590", fontWeight: "600" }}>Consultation</span>
                <strong style={{ fontSize: "17px", color: "#2B2342" }}>₹800</strong>
              </div>
              <button onClick={v.bookInApp} style={{ background: "#CA5C00", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "13px 20px", borderRadius: "999px", width: "100%" }} className={styles.h11}>Book appointment in the app</button>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "24px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", flex: "none", background: "#F2EEFA" }}>
                  <ImageSlot id="pz-cl-doc-3" shape="circle" placeholder="Doctor photo" />
                </div>
                <div style={{ minWidth: "0" }}>
                  <h3 style={{ fontSize: "18px", color: "#2B2342", lineHeight: "1.25" }}>Dr. Sneha Patil</h3>
                  <div style={{ marginTop: "4px", fontSize: "13.5px", color: "#5A5177", lineHeight: "1.4" }}>BVSc &amp; AH</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ background: "#F2EEFA", color: "#4A3E78", padding: "6px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "700" }}>5 yrs experience</span>
                <span style={{ background: "#F7F4FD", color: "#5A5177", padding: "6px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "600" }}>English, Marathi</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px", paddingTop: "14px", borderTop: "1.5px solid #F2EEFA" }}>
                <span style={{ fontSize: "13.5px", color: "#6F6590", fontWeight: "600" }}>Consultation</span>
                <strong style={{ fontSize: "17px", color: "#2B2342" }}>₹800</strong>
              </div>
              <button onClick={v.bookInApp} style={{ background: "#CA5C00", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "13px 20px", borderRadius: "999px", width: "100%" }} className={styles.h12}>Book appointment in the app</button>
            </div>
          </div>
        </div>
      </div>
      <aside data-r="cl-aside" style={{ position: "sticky", top: "96px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", overflow: "hidden" }}>
          <div ref={v.clMapRef} style={{ height: "300px", background: "#EEF0F4" }} />
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#6351A1", border: "2px solid #fff", boxShadow: "0 0 0 1.5px #6351A1" }} />
                Clinic
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#CA5C00", border: "2px solid #fff", boxShadow: "0 0 0 1.5px #CA5C00" }} />
                You
              </span>
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>{v.clDistance}</div>
            <div style={{ fontSize: "14px", lineHeight: "1.5", color: "#5A5177" }}>Sutarwadi Road, Pashan, Pune 411021</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <a href="https://www.google.com/maps/dir/?api=1&destination=18.5382,73.7964" target="_blank" rel="noopener" style={{ flex: "1", textAlign: "center", background: "#CA5C00", color: "#fff", fontSize: "14px", fontWeight: "700", padding: "12px 16px", borderRadius: "999px", textDecoration: "none" }} className={styles.h13}>Get directions</a>
              <button onClick={v.clLocate} style={{ flex: "1", background: "transparent", color: "#6351A1", fontSize: "14px", fontWeight: "700", padding: "12px 16px", borderRadius: "999px", border: "2px solid #D8CFF0" }} className={styles.h14}>Use my location</button>
            </div>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "24px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", color: "#2B2342" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", color: "#6F6590" }}>
              <span style={{ width: "36px", height: "36px", borderRadius: "12px", background: "#F7F4FD", border: "1.5px solid #EFEAF8", display: "grid", placeItems: "center", flex: "none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
              </span>
              Phone
            </span>
            <span style={{ fontWeight: "700" }}>+91 20 4000 1234</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", color: "#6F6590" }}>
              <span style={{ width: "36px", height: "36px", borderRadius: "12px", background: "#F7F4FD", border: "1.5px solid #EFEAF8", display: "grid", placeItems: "center", flex: "none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                </svg>
              </span>
              Emergency
            </span>
            <span style={{ fontWeight: "700" }}>24 × 7</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", color: "#6F6590" }}>
              <span style={{ width: "36px", height: "36px", borderRadius: "12px", background: "#F7F4FD", border: "1.5px solid #EFEAF8", display: "grid", placeItems: "center", flex: "none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6351A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                </svg>
              </span>
              Parking
            </span>
            <span style={{ fontWeight: "700" }}>Available</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
