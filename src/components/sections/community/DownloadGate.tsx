import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import styles from './Community.module.css';
import { CloseIcon } from './CommunityIcons';

/**
 * Every locked interaction funnels here: desktop opens the QR modal, mobile opens the
 * store directly. The store URLs below are search placeholders until the real listing
 * URLs (or a OneLink) are provided.
 */
const PLAY_STORE_URL = 'https://play.google.com/store/search?q=pawzeeble&c=apps';
const APP_STORE_URL = 'https://apps.apple.com/search?term=pawzeeble';

type Gate = { lock: (label: string) => void };
const GateContext = createContext<Gate>({ lock: () => undefined });
export const useDownloadGate = () => useContext(GateContext);

function isMobile(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.matchMedia('(max-width: 640px)').matches;
}

export function DownloadGateProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState<string | null>(null);

  const lock = useCallback((next: string) => {
    if (isMobile()) {
      const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      window.open(ios ? APP_STORE_URL : PLAY_STORE_URL, '_blank', 'noopener');
      return;
    }
    setLabel(next);
  }, []);

  useEffect(() => {
    if (label == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLabel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [label]);

  const value = useMemo(() => ({ lock }), [lock]);

  return (
    <GateContext.Provider value={value}>
      {children}
      {label != null ? (
        <div onClick={() => setLabel(null)} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(43,35,66,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div role="dialog" aria-modal="true" aria-labelledby="pz-gate-title" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '28px', boxShadow: '0 30px 80px rgba(43,35,66,.3)', padding: '22px 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
            <button onClick={() => setLabel(null)} aria-label="Close" className={styles.closeBtn} style={{ position: 'absolute', right: '16px', top: '16px', width: '32px', height: '32px', borderRadius: '50%', background: '#F2EEFA', color: '#4A3E78', display: 'grid', placeItems: 'center' }}>
              <CloseIcon />
            </button>
            <span style={{ marginTop: '10px', background: '#FFF1E4', color: '#A44A00', padding: '6px 13px', borderRadius: '999px', fontSize: '12.5px', fontWeight: 700 }}>View-only mode</span>
            <h3 id="pz-gate-title" style={{ fontSize: '24px', fontWeight: 800, color: '#2B2342', lineHeight: 1.2 }}>Download the app to {label}</h3>
            <p style={{ maxWidth: '320px', fontSize: '14.5px', lineHeight: 1.55, color: '#5A5177' }}>Scan with your phone camera to download Pawzeeble. Sign up to like, comment, share and join Clans.</p>
            <div style={{ border: '1.5px solid #EFEAF8', borderRadius: '22px', padding: '14px', background: '#fff' }}>
              <img src="/images/qr/app-download-qr.png" width={200} height={200} alt="QR code to download the Pawzeeble app" style={{ display: 'block', imageRendering: 'pixelated' }} />
            </div>
            <span style={{ fontSize: '13px', color: '#6F6590' }}>Available on Android and iOS</span>
          </div>
        </div>
      ) : null}
    </GateContext.Provider>
  );
}
