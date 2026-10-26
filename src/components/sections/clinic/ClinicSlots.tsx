import { useEffect, useMemo, useState } from 'react';
import { useAppDownload } from '@/components/layout/AppDownload';
import { bookingService, type Doctor, type SlotDay, type Weekday } from '@/lib/findcare';
import { useClinicData } from './ClinicData';
import styles from './ClinicSlots.module.css';

const DOW = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const DOW_LABEL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS: Weekday[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const AVATARS: [string, string][] = [['#F0EBFA', '#6351A1'], ['#FFF1E4', '#CA5C00'], ['#E4F4EF', '#25795F']];

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

const initials = (name: string) =>
  name
    .replace(/^dr\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

/** "Mon – Sat · Morning, Evening" from the doctor's working hours. */
function availabilityText(doc: Doctor): string {
  const worked = WEEKDAYS.map((w) => (doc.workingHours?.[w]?.length ?? 0) > 0);
  const count = worked.filter(Boolean).length;
  if (count === 0) return '';
  let days: string;
  if (count === 7) days = 'All days';
  else if (count === 6) days = `All days except ${DOW_LABEL[worked.indexOf(false)]}`;
  else {
    // Mon-first order; consecutive days collapse to a range
    const order = [1, 2, 3, 4, 5, 6, 0].filter((d) => worked[d]);
    const runs: number[][] = [];
    for (const d of order) {
      const last = runs[runs.length - 1];
      const prev = last?.[last.length - 1];
      if (last && prev !== undefined && (prev + 1) % 7 === d) last.push(d);
      else runs.push([d]);
    }
    days = runs.map((r) => (r.length > 2 ? `${DOW_LABEL[r[0]]} – ${DOW_LABEL[r[r.length - 1]]}` : r.map((d) => DOW_LABEL[d]).join(', '))).join(', ');
  }
  const ranges = WEEKDAYS.flatMap((w) => doc.workingHours?.[w] ?? []);
  const sessions = GROUPS.filter(([, inGroup]) => ranges.some((r) => inGroup(r.st) || (r.st < 1200 && r.et > 1200 && inGroup(1200)) || (r.st < 1700 && r.et > 1700 && inGroup(1700)))).map(([l]) => l);
  return sessions.length ? `${days} · ${sessions.join(', ')}` : days;
}

const isoToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const parse = (iso: string) => new Date(iso + 'T00:00:00');

type Loaded = { doctorId: string; days: SlotDay[]; error: string | null };

/** The API sends st/et as strings and no `available` flag: every returned slot is bookable unless it says otherwise. */
const normalise = (days: SlotDay[]): SlotDay[] =>
  days.map((sd) => ({
    ...sd,
    whSlots: (sd.whSlots ?? []).map((w) => ({ ...w, st: Number(w.st), et: Number(w.et), available: (w as { available?: boolean }).available !== false })),
  }));
type Pick = { doctorId: string; day: number | null; slot: number | null };

/** Doctor picker + the selected doctor's own slots (GET v1/appointments/slots/docs/{doctorId}/ents/{clinicId}). */
export default function ClinicSlots() {
  const d = useClinicData();
  const { dlApp } = useAppDownload();
  const doctorId = d.selectedDoctorId;
  const clinicId = d.clinic?._id;
  const doctor = d.doctors.find((x) => x._id === doctorId);

  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [pick, setPick] = useState<Pick | null>(null);

  // fetched whenever the selected doctor changes
  useEffect(() => {
    if (!doctorId || !clinicId) return;
    let cancelled = false;
    bookingService
      .getDoctorSlots(clinicId, doctorId)
      .then((days) => !cancelled && setLoaded({ doctorId, days: normalise(days ?? []), error: null }))
      .catch((e: unknown) => !cancelled && setLoaded({ doctorId, days: [], error: e instanceof Error ? e.message : 'Something Went Wrong' }));
    return () => {
      cancelled = true;
    };
  }, [doctorId, clinicId]);

  const ready = loaded && loaded.doctorId === doctorId ? loaded : null;
  const days = useMemo(() => (ready?.days ?? []).slice(0, 7), [ready]);
  const free = (sd: SlotDay) => sd.whSlots.filter((s) => s.available).length;
  const disabled = (i: number) => !days[i] || free(days[i]) === 0;
  const firstOpen = days.findIndex((_, i) => !disabled(i));
  const totalSlots = days.reduce((sum, sd) => sum + free(sd), 0);

  const mine = pick && pick.doctorId === doctorId ? pick : null;
  const dayIndex = mine?.day != null && !disabled(mine.day) ? mine.day : firstOpen; // -1 when none
  const day = dayIndex >= 0 ? days[dayIndex] : undefined;
  const slotSt = mine?.slot ?? null;
  const picked = day?.whSlots.find((s) => s.st === slotSt && s.available);

  const dayLabel = (sd: SlotDay) => {
    const dt = parse(sd.date);
    return `${sd.date === isoToday() ? 'Today' : DOW_LABEL[dt.getDay()]}, ${dt.getDate()} ${MON[dt.getMonth()]}`;
  };

  let footer = 'Select a doctor to continue';
  if (doctor && ready && !ready.error) {
    if (days.length > 0 && !day) footer = `${doctor.name} has no free slots this week`;
    else if (day && picked) footer = `${doctor.name} · ${dayLabel(day)} · ${formatHHmm(picked.st)}`;
    else if (day) footer = `Pick a time with ${doctor.name} for ${dayLabel(day)}`;
  }

  return (
    <section id="slots" className={styles.card}>
      <div className={styles.head}>
        <h2>Available slots</h2>
        <span>{ready && !ready.error && days.length > 0 ? `Next 7 days · ${totalSlots} ${totalSlots === 1 ? 'slot' : 'slots'}` : 'Next 7 days'}</span>
      </div>

      <div className={styles.step}>1. Select a doctor</div>
      {d.loading ? <p className={styles.msg}>Loading doctors…</p> : null}
      {!d.loading && d.doctors.length === 0 ? <p className={styles.msg}>No doctors are listed for this clinic yet.</p> : null}
      <div className={styles.drGrid}>
        {d.doctors.map((doc, i) => {
          const [bg, fg] = AVATARS[i % AVATARS.length];
          const on = doc._id === doctorId;
          const avail = availabilityText(doc);
          return (
            <button className={styles.dr} aria-pressed={on} onClick={() => d.selectDoctor(on ? null : doc._id)} key={doc._id}>
              <span className={styles.drAv} style={{ '--av-bg': bg, '--av-fg': fg } as React.CSSProperties}>
                {doc.profilePic ? <img src={doc.profilePic} alt="" loading="lazy" /> : initials(doc.name)}
              </span>
              <span className={styles.drTxt}>
                <span className={styles.drName}>{doc.name}</span>
                {avail ? <span className={styles.drDays}>{avail}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
      {d.hasMoreDoctors ? (
        <button className={styles.more} onClick={d.loadMoreDoctors} disabled={d.loadingMoreDoctors}>
          {d.loadingMoreDoctors ? 'Loading…' : 'Show more doctors'}
        </button>
      ) : null}

      {!doctorId ? (
        <div className={styles.empty}>
          <span className={styles.emptyIc}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </span>
          <div className={styles.emptyTitle}>Select a doctor to see slots</div>
          <p>Each doctor keeps their own schedule, so available dates and times depend on who you choose.</p>
        </div>
      ) : !ready ? (
        <p className={styles.msg} role="status">Loading slots…</p>
      ) : ready.error ? (
        <p className={`${styles.msg} ${styles.err}`}>{ready.error}</p>
      ) : days.length === 0 ? (
        <p className={styles.msg}>No slots available for this doctor</p>
      ) : (
        <>
          <div className={`${styles.step} ${styles.step2}`}>2. Pick a date and time</div>
          <div className={styles.dayStrip}>
            {days.map((sd, i) => {
              const dt = parse(sd.date);
              const n = free(sd);
              const off = sd.whSlots.length === 0;
              return (
                <button className={styles.day} aria-pressed={i === dayIndex} disabled={disabled(i)} onClick={() => setPick({ doctorId: doctorId!, day: i, slot: null })} key={sd.date}>
                  <span className={styles.dayDow}>{sd.date === isoToday() ? 'TODAY' : DOW[dt.getDay()]}</span>
                  <span className={styles.dayDate}>{dt.getDate()}</span>
                  <span className={styles.dayCount}>{off ? 'Off' : `${n} ${n === 1 ? 'slot' : 'slots'}`}</span>
                </button>
              );
            })}
          </div>
          {GROUPS.map(([label, inGroup]) => {
            const slots = (day?.whSlots ?? []).filter((s) => inGroup(s.st));
            if (!slots.length) return null;
            return (
              <div className={styles.group} key={label}>
                <div className={styles.groupLabel}>{label}</div>
                <div className={styles.slotGrid}>
                  {slots.map((s) => (
                    <button className={styles.slot} aria-pressed={slotSt === s.st} disabled={!s.available} onClick={() => setPick({ doctorId: doctorId!, day: dayIndex, slot: s.st })} key={s.st}>
                      {formatHHmm(s.st)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      <div className={styles.foot}>
        <span className={styles.footText}>{footer}</span>
        <button className={styles.book} onClick={() => dlApp()}>Continue in the app to book</button>
      </div>
    </section>
  );
}
