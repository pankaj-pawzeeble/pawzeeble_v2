import ImageSlot from '@/components/ui/ImageSlot';
import type { Doctor } from '@/lib/findcare';
import styles from './ClinicDetail.module.css';
import { useClinicData } from './ClinicData';

const rupees = (n: number) => '₹' + n.toLocaleString('en-IN');

function DoctorCard({ doc, selected, onSelect }: { doc: Doctor; selected: boolean; onSelect: () => void }) {
  const quals = doc.professionDetails?.qualifications?.filter(Boolean).join(', ') || doc.title;
  const years = doc.professionDetails?.experience;
  return (
    <div style={{ background: selected ? "#F7F4FD" : "#fff", border: "1.5px solid " + (selected ? "#6351A1" : "#EFEAF8"), borderRadius: "24px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", transition: "border-color .2s ease, background-color .2s ease" }}>
      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", flex: "none", background: "#F2EEFA" }}>
          <ImageSlot src={doc.profilePic || undefined} shape="circle" placeholder="Doctor photo" />
        </div>
        <div style={{ minWidth: "0" }}>
          <h3 style={{ fontSize: "18px", color: "#2B2342", lineHeight: "1.25" }}>{doc.name}</h3>
          {quals ? <div style={{ marginTop: "4px", fontSize: "13.5px", color: "#5A5177", lineHeight: "1.4" }}>{quals}</div> : null}
        </div>
      </div>
      {years ? (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ background: "#F2EEFA", color: "#4A3E78", padding: "6px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "700" }}>{years} yrs experience</span>
        </div>
      ) : null}
      {typeof doc.consultationFee === 'number' ? (
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px", paddingTop: "14px", borderTop: "1.5px solid #F2EEFA" }}>
          <span style={{ fontSize: "13.5px", color: "#6F6590", fontWeight: "600" }}>Consultation</span>
          <strong style={{ fontSize: "17px", color: "#2B2342" }}>{rupees(doc.consultationFee)}</strong>
        </div>
      ) : null}
      <button onClick={onSelect} aria-pressed={selected} style={{ marginTop: "auto", background: selected ? "#6351A1" : "#CA5C00", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "13px 20px", borderRadius: "999px", width: "100%" }} className={styles.h10}>{selected ? "✓ Selected" : "Select doctor"}</button>
    </div>
  );
}

/** Doctors list from the clinic API (doctorList, paginated). */
export default function ClinicDoctors() {
  const d = useClinicData();
  return (
    <div id="doctors" style={{ display: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
        <h2 style={{ fontSize: "24px", color: "#2B2342" }}>Doctors at this clinic</h2>
        {!d.loading && !d.error ? (
          <span style={{ fontSize: "14px", color: "#6F6590", fontWeight: "600" }}>{d.totalDoctors === 1 ? "1 doctor" : d.totalDoctors + " doctors"}</span>
        ) : null}
      </div>
      {d.loading ? <p style={{ marginTop: "16px", fontSize: "15px", color: "#6F6590" }}>Loading doctors…</p> : null}
      {d.error ? (
        <div style={{ marginTop: "16px", background: "#FFF1F1", border: "1.5px solid #F6CFCF", borderRadius: "24px", padding: "22px 26px" }}>
          <p style={{ fontSize: "15px", color: "#5A5177" }}>{d.error}</p>
          <button onClick={d.retry} style={{ marginTop: "12px", color: "#fff", fontSize: "14.5px", fontWeight: "700", padding: "10px 22px", borderRadius: "999px", backgroundColor: "#CA5C00" }}>Try again</button>
        </div>
      ) : null}
      {!d.loading && !d.error && d.doctors.length === 0 ? (
        <p style={{ marginTop: "16px", fontSize: "15px", color: "#6F6590" }}>No doctors are listed for this clinic yet.</p>
      ) : null}
      <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "16px" }}>
        {d.doctors.map((doc) => (
          <DoctorCard doc={doc} selected={d.selectedDoctorId === doc._id} onSelect={() => d.selectDoctor(d.selectedDoctorId === doc._id ? null : doc._id)} key={doc._id} />
        ))}
      </div>
      {d.hasMoreDoctors ? (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <button onClick={d.loadMoreDoctors} disabled={d.loadingMoreDoctors} style={{ color: "#CA5C00", fontSize: "15px", fontWeight: "700", padding: "12px 30px", borderRadius: "999px", background: "#fff", border: "1.5px solid #CA5C00", opacity: d.loadingMoreDoctors ? 0.6 : 1 }}>
            {d.loadingMoreDoctors ? "Loading…" : "Load more doctors"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
