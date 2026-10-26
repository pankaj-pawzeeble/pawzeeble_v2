import { useEffect, useMemo, useState } from 'react';
import { useAppDownload } from '@/components/layout/AppDownload';
import { bookingService, type SlotDay, type WorkingHourSlot } from '@/lib/findcare';
import { useClinicData } from './ClinicData';

const DOW = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** HHmm integer → "10:14 AM" */
export function formatHHmm(t: number): string {
  const h = Math.floor(t / 100);
  const m = t % 100;
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

const GROUPS: [string, (t: number) => boolean][] = [
  ['Morning', (t) => t < 1200],
  ['Afternoon', (t) => t >= 1200 && t < 1700],
  ['Evening', (t) => t >= 1700],
];

const card = { background: "#fff", border: "1.5px solid #EFEAF8", borderRadius: "28px", padding: "clamp(22px,3vw,32px)" } as const;

/** The selected doctor's own slots (GET v1/appointments/slots/docs/{doctorId}/ents/{clinicId}). Prompts for a doctor first. */
export default function ClinicSlots() {
  const d = useClinicData();
  const { dlApp } = useAppDownload();
  const doctorId = d.selectedDoctorId;
  const clinicId = d.clinic?._id;
  const doctor = d.doctors.find((x) => x._id === doctorId);

  /** Slots for the doctor they were loaded for. `loading` is derived: a doctor is selected but their slots have not arrived. */
  const [loaded, setLoaded] = useState<{ doctorId: string; days: SlotDay[]; error: string | null } | null>(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [picked, setPicked] = useState<WorkingHourSlot | null>(null);

  useEffect(() => {
    if (!doctorId || !clinicId) return;
    let cancelled = false;
    bookingService
      .getDoctorSlots(clinicId, doctorId)
      .then((days) => !cancelled && setLoaded({ doctorId, days: days ?? [], error: null }))
      .catch((e: unknown) => !cancelled && setLoaded({ doctorId, days: [], error: e instanceof Error ? e.message : 'Something Went Wrong' }));
    return () => {
      cancelled = true;
    };
  }, [doctorId, clinicId]);

  const ready = loaded && loaded.doctorId === doctorId ? loaded : null;
  const days = useMemo(() => (ready?.days ?? []).slice(0, 7), [ready]);
  const day = days[Math.min(dayIndex, Math.max(days.length - 1, 0))];

  const pick = (i: number) => {
    setDayIndex(i);
    setPicked(null);
  };

  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
        <h2 style={{ fontSize: "24px", color: "#2B2342" }}>Available slots</h2>
        <span style={{ fontSize: "14px", color: "#6F6590", fontWeight: "600" }}>{doctor ? doctor.name : "Next 7 days"}</span>
      </div>
      {!doctorId ? (
        <p style={{ marginTop: "18px", background: "#F5F1FC", border: "1.5px solid #E9E2F6", borderRadius: "18px", padding: "18px 20px", fontSize: "15px", color: "#4A3E78", fontWeight: "600" }}>
          Select a doctor above to see their available slots.
        </p>
      ) : !ready ? (
        <p style={{ marginTop: "18px", fontSize: "15px", color: "#6F6590" }}>Loading slots…</p>
      ) : ready.error ? (
        <p style={{ marginTop: "18px", fontSize: "15px", color: "#B3261E" }}>{ready.error}</p>
      ) : days.length === 0 ? (
        <p style={{ marginTop: "18px", fontSize: "15px", color: "#6F6590" }}>No slots are open for this doctor right now.</p>
      ) : (
        <>
          <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: `repeat(${days.length},minmax(64px,1fr))`, gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
            {days.map((sd, i) => {
              const dt = new Date(sd.date + 'T00:00:00');
              const free = sd.whSlots.filter((s) => s.available).length;
              const on = i === Math.min(dayIndex, days.length - 1);
              return (
                <button onClick={() => pick(i)} key={sd.date} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "12px 6px", borderRadius: "16px", background: on ? "#6351A1" : "#F7F4FD", color: on ? "#fff" : "#2B2342", border: "1.5px solid " + (on ? "#6351A1" : "#EAE4F6") }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".04em", opacity: ".8" }}>{DOW[dt.getDay()]}</span>
                  <span style={{ fontSize: "20px", fontWeight: "800", lineHeight: "1.1" }}>{dt.getDate()}</span>
                  <span style={{ fontSize: "11.5px", fontWeight: "600", opacity: ".8" }}>{free} slots</span>
                </button>
              );
            })}
          </div>
          {GROUPS.map(([label, inGroup]) => {
            const slots = (day?.whSlots ?? []).filter((s) => inGroup(s.st));
            if (!slots.length) return null;
            return (
              <div style={{ marginTop: "20px" }} key={label}>
                <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#6F6590" }}>{label}</div>
                <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: "8px" }}>
                  {slots.map((s) => {
                    const on = picked?.st === s.st && picked?.et === s.et;
                    return (
                      <button onClick={() => setPicked(s)} disabled={!s.available} key={s.st} style={{ padding: "11px 8px", borderRadius: "12px", fontSize: "13.5px", fontWeight: "700", background: !s.available ? "#F5F4F8" : on ? "#6351A1" : "#fff", color: !s.available ? "#B3ADC4" : on ? "#fff" : "#2B2342", border: "1.5px solid " + (!s.available ? "#F0EEF4" : on ? "#6351A1" : "#E4DDF3"), textDecoration: !s.available ? "line-through" : "none" }}>
                        {formatHHmm(s.st)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: "22px", paddingTop: "18px", borderTop: "1.5px solid #F2EEFA", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "15px", color: "#2B2342", fontWeight: "600" }}>
              {picked && day ? `${new Date(day.date + 'T00:00:00').getDate()} ${MON[new Date(day.date + 'T00:00:00').getMonth()]} · ${formatHHmm(picked.st)}` : "Pick a time"}
            </span>
            <button onClick={() => dlApp()} style={{ background: "#CA5C00", color: "#fff", fontSize: "15px", fontWeight: "700", padding: "14px 26px", borderRadius: "999px" }}>Continue in the app to book</button>
          </div>
        </>
      )}
    </div>
  );
}
