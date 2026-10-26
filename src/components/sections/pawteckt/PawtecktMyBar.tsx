import { useMyPurchases } from '@/components/layout/MyPurchases';

/** Dark strip above the hero for returning members. */
export default function PawtecktMyBar() {
  const { openMy } = useMyPurchases();
  return (
    <div style={{ background: '#2B2342', color: '#fff' }}>
      <div style={{ maxWidth: 1260, margin: '0 auto', padding: '10px 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px 16px', flexWrap: 'wrap', fontSize: 14, lineHeight: 1.4 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#FFC24B', display: 'grid' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <span>Already a Pawteckt member? See your plans here, no app needed.</span>
        </span>
        <button onClick={openMy} className="pz-mybar-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: '#FFC24B', fontSize: 14, fontWeight: 800, padding: '4px 0' }}>
          View my purchases
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
