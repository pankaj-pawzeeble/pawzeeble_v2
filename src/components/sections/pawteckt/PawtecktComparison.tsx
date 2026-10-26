import styles from './PawtecktComparison.module.css';

const PLANS = [
  { name: 'Lite', premium: false },
  { name: 'Starter', premium: true },
  { name: 'Complete', premium: true },
  { name: 'Guardian', premium: true },
  { name: 'Ultimate', premium: true },
];

/** A cell is plain text, an included tick, a "not included" dash, a discounted price, or a saving. */
type Cell = string | { check: true } | { none: true } | { was: string; now: string } | { save: string };
const NONE: Cell = { none: true };
const CHECK: Cell = { check: true };
const rows: { label: string; sub?: string; cells: Cell[] }[] = [
  {
    label: 'Price per year',
    cells: ['₹539', '₹4,999', '₹6,999', { was: '₹9,999', now: '₹7,999' }, { was: '₹13,999', now: '₹9,999' }],
  },
  { label: 'You save', cells: [NONE, NONE, NONE, { save: '₹2,000' }, { save: '₹4,000' }] },
  {
    label: 'Injury, illness, surgery',
    sub: 'cover for each',
    cells: [NONE, '₹30,000', '₹50,000', '₹1,00,000', '₹2,00,000'],
  },
  { label: 'Total cover', cells: [NONE, '₹90,000', '₹1,50,000', '₹3,00,000', '₹6,00,000'] },
  { label: 'If your pet hurts someone', cells: [NONE, '₹1,00,000', '₹1,00,000', '₹1,00,000', '₹1,00,000'] },
  { label: 'If you lose your pet', cells: [NONE, '₹3,000', '₹5,000', '₹10,000', '₹20,000'] },
  { label: 'Everyday perks', cells: [CHECK, CHECK, CHECK, CHECK, CHECK] },
  {
    label: 'Who can join',
    cells: ['Any age', '6 mo – 5 yrs', '6 mo – 5 yrs', '6 mo – 5 yrs', '6 mo – 5 yrs'],
  },
];

function Value({ cell }: { cell: Cell }) {
  if (typeof cell === 'string') return <>{cell}</>;
  if ('check' in cell)
    return (
      <span className={styles.check}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span className={styles.srOnly}>Included</span>
      </span>
    );
  if ('none' in cell) return <span aria-label="Not included">—</span>;
  if ('was' in cell)
    return (
      <span className={styles.price}>
        <s>{cell.was}</s>
        <span>{cell.now}</span>
      </span>
    );
  return <span className={styles.save}>{cell.save}</span>;
}

export default function PawtecktComparison() {
  return (
    <section data-r="pt-sec" className={styles.section}>
      <p className={styles.eyebrow}>SIDE BY SIDE</p>
      <h2 className={styles.title}>Compare all five plans</h2>
      <div
        className={styles.scroll}
        tabIndex={0}
        aria-label="Plan comparison, scroll sideways for more plans"
      >
        <div className={styles.table} role="table" aria-label="Pawteckt plans compared">
          <div className={`${styles.row} ${styles.rowHead}`} role="row">
            <div className={styles.headLabel} role="columnheader">
              <span className={styles.srOnly}>Feature</span>
            </div>
            {PLANS.map((p) => (
              <div
                className={`${styles.head} ${p.premium ? styles.headPremium : styles.headLite}`}
                role="columnheader"
                key={p.name}
              >
                {p.name}
              </div>
            ))}
          </div>
          {rows.map((r) => (
            <div className={styles.row} role="row" key={r.label}>
              <div className={styles.label} role="rowheader">
                {r.label}
                {r.sub ? <small>{r.sub}</small> : null}
              </div>
              {r.cells.map((c, i) => (
                <div
                  className={`${styles.cell} ${PLANS[i].premium ? styles.cellPremium : ''}`}
                  role="cell"
                  key={PLANS[i].name}
                >
                  <Value cell={c} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className={styles.footnote}>
        Injury, illness and surgery each have their own limit. Together they make up the total cover.
      </p>
    </section>
  );
}
