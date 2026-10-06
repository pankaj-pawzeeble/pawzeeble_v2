import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './PetStep.module.css';

export default function PetStep() {
  const v = useSite();
  return (
    <>
      <div style={{ position: "relative", background: "#ECE5FA", padding: "28px 22px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
        <span style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#1E9E6A", color: "#fff", display: "grid", placeItems: "center", boxShadow: "0 0 0 5px #fff" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#2B2342" }}>Payment Received</div>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h3 style={{ fontSize: "22px", color: "#2B2342" }}>Who are we protecting?</h3>
          <p style={{ marginTop: "6px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>{v.petSub}</p>
        </div>
        <div>
          <label htmlFor="pz-sub-pet" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Select Pet</label>
          {" "}
          <select id="pz-sub-pet" value={v.subPetId} onChange={v.onPickPet} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", fontFamily: "inherit" }}>
            <option value="">Select an existing pet</option>
            {v.subPets.map((p: SiteItem, index: number) => (
              <option value={p.id} key={index}>{p.name}</option>
            ))}
          </select>
          {" "}
          <button onClick={v.openAddPet} style={{ marginTop: "14px", background: "transparent", color: "#CA5C00", fontSize: "15px", fontWeight: "700", padding: "4px 0" }} className={styles.h1}>+ Add New Pet</button>
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
        {v.petErr ? <div role="alert" style={{ marginTop: "10px", fontSize: "13px", color: "#CE0049" }}>{v.petErr}</div> : null}
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA" }}>
        <button onClick={v.activate} disabled={v.petBad} style={v.subBtnPet}>Continue</button>
      </div>
    </>
  );
}
