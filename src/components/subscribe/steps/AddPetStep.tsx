import { useSite } from '@/hooks/useSite';
import type { SiteItem } from '@/types/site';
import styles from './AddPetStep.module.css';

export default function AddPetStep() {
  const v = useSite();
  return (
    <>
      <div style={{ padding: "22px 22px 16px", borderBottom: "1.5px solid #F2EEFA" }}>
        <h3 style={{ fontSize: "22px", color: "#2B2342" }}>Who are we protecting?</h3>
        <p style={{ marginTop: "6px", fontSize: "14.5px", lineHeight: "1.5", color: "#5A5177" }}>Add your pet to activate your Pet QR and start saving today</p>
      </div>
      <div style={{ flex: "1", overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label htmlFor="pz-np-type" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Select pet type</label>
          <select id="pz-np-type" value={v.npType} onChange={v.onNpType} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }}>
            <option value="">Select pet type</option>
            {v.npTypes.map((o: SiteItem, index: number) => (
              <option value={o.v} key={index}>{o.l}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pz-np-name" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Pet’s name</label>
          <input id="pz-np-name" type="text" autoComplete="off" placeholder="Enter pet’s name" value={v.npName} onChange={v.onNpName} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
        </div>
        <div>
          <label htmlFor="pz-np-uname" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Pet’s username</label>
          <input id="pz-np-uname" type="text" autoComplete="off" placeholder="Enter pet username" value={v.npUname} onChange={v.onNpUname} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
        </div>
        {v.npHasType ? (
          <div style={{ position: "relative" }}>
            <label htmlFor="pz-np-breed" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Select primary breed of your pet</label>
            {" "}
            <input id="pz-np-breed" role="combobox" aria-autocomplete="list" aria-controls="pz-np-breed-list" aria-expanded={v.npBrOpen} autoComplete="off" placeholder="Start typing a breed" value={v.npBreedQ} onChange={v.onNpBreedQ} onFocus={v.npBrFocus} onBlur={v.npBrBlur} onKeyDown={v.npBrKey} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 40px 13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
            {" "}
            <svg style={{ position: "absolute", right: "14px", top: "42px", pointerEvents: "none" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6F6590" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            {v.npBrOpen ? (
              <div id="pz-np-breed-list" role="listbox" style={{ position: "absolute", left: "0", right: "0", top: "calc(100% + 6px)", zIndex: "5", background: "#fff", border: "1.5px solid #E4DDF3", borderRadius: "14px", boxShadow: "0 14px 30px rgba(43,35,66,.14)", maxHeight: "220px", overflowY: "auto", padding: "6px" }}>
                {v.npBrOpts.map((o: SiteItem, index: number) => (
                  <div role="option" aria-selected={o.on} onMouseDown={o.pick} style={o.style} key={index}>{o.l}</div>
                ))}
                {v.npBrNone ? (
                  <div style={{ padding: "10px 12px", fontSize: "14px", color: "#6F6590" }}>No match. Pick “Other” to type it in.</div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        {v.npHasType ? (
          <div>
            <label htmlFor="pz-np-breed2" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Select secondary breed of your pet (Optional)</label>
            <input id="pz-np-breed2" list="pz-np-breedlist" autoComplete="off" placeholder="Search secondary breed…" value={v.npBreed2} onChange={v.onNpBreed2} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
            <datalist id="pz-np-breedlist">
              {v.npBreeds.map((o: SiteItem, index: number) => (
                <option value={o.l} key={index} />
              ))}
            </datalist>
          </div>
        ) : null}
        {v.npIsOther ? (
          <div>
            <label htmlFor="pz-np-other" style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Please specify the breed</label>
            <input id="pz-np-other" type="text" autoComplete="off" placeholder="Enter breed here" value={v.npOther} onChange={v.onNpOther} style={{ marginTop: "8px", width: "100%", boxSizing: "border-box", border: "1.5px solid #D9D1EE", borderRadius: "14px", padding: "13px 14px", fontSize: "15.5px", color: "#2B2342", background: "#fff", outline: "none", fontFamily: "inherit" }} />
          </div>
        ) : null}
        <div>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#5A5177" }}>Is your pet a male or a female?</div>
          <div role="radiogroup" style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <button onClick={v.npFemale} role="radio" style={v.npFemaleStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="9" r="6" />
                <path d="M12 15v7" />
                <path d="M9 19h6" />
              </svg>
              Female
            </button>
            <button onClick={v.npMale} role="radio" style={v.npMaleStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="10" cy="14" r="6" />
                <path d="m20 4-5.6 5.6" />
                <path d="M15 4h5v5" />
              </svg>
              Male
            </button>
          </div>
        </div>
        {v.petErr ? <div role="alert" style={{ marginTop: "10px", fontSize: "13px", color: "#CE0049" }}>{v.petErr}</div> : null}
      </div>
      <div style={{ padding: "16px 22px 22px", borderTop: "1.5px solid #F2EEFA", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "10px" }}>
        <button onClick={v.cancelPet} style={{ padding: "15px 16px", borderRadius: "999px", fontSize: "15.5px", fontWeight: "700", background: "#fff", color: "#CA5C00", border: "2px solid #CA5C00" }} className={styles.h1}>Cancel</button>
        <button onClick={v.savePet} disabled={v.npBad} style={v.subBtnAdd}>Add Pet</button>
      </div>
    </>
  );
}
