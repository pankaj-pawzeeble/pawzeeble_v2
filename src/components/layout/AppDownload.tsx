import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useSite } from '@/hooks/useSite';

/** Placeholders until the real listing URLs are available. */
const APP_STORE_URL = 'https://apps.apple.com/in/search?term=pawzeeble';
const PLAY_STORE_URL = 'https://play.google.com/store/search?q=pawzeeble&c=apps';

export type Store = 'ios' | 'android';
type Download = { dlApp: (store?: Store) => void };

const DownloadContext = createContext<Download>({ dlApp: () => undefined });
/** `dlApp()` for generic CTAs, `dlApp('ios')` / `dlApp('android')` for the store badges. */
export const useAppDownload = () => useContext(DownloadContext);

/**
 * Desktop opens a QR modal; handhelds open the store in a new tab (generic CTAs pick the store
 * for the device, store buttons always open their own store).
 */
export function AppDownloadProvider({ children }: { children: ReactNode }) {
  const v = useSite();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const dlApp = useCallback(
    (store?: Store) => {
      const ua = navigator.userAgent;
      // iPadOS 13+ reports as Macintosh; touch points tell it apart from a real Mac
      const ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
      const android = /Android/i.test(ua);
      const handheld = ios || android || (window.matchMedia('(pointer: coarse)').matches && window.innerWidth <= 1180);

      if (!handheld) {
        returnFocus.current = document.activeElement as HTMLElement | null;
        v.closeMenu?.();
        setOpen(true);
        return;
      }
      const target = store || (ios ? 'ios' : 'android');
      window.open(target === 'ios' ? APP_STORE_URL : PLAY_STORE_URL, '_blank', 'noopener');
    },
    [v],
  );

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      // the close button is the only focusable control, so keep focus on it
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const value = useMemo(() => ({ dlApp }), [dlApp]);

  return (
    <DownloadContext.Provider value={value}>
      {children}
      {open ? (
        <div onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 220, background: 'rgba(43,35,66,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div role="dialog" aria-modal="true" aria-label="Download the Pawzeeble app" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '28px', boxShadow: '0 30px 80px rgba(43,35,66,.3)', padding: '22px 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
            <button ref={closeRef} onClick={close} aria-label="Close" style={{ position: 'absolute', right: '16px', top: '16px', width: '32px', height: '32px', borderRadius: '50%', background: '#F2EEFA', color: '#4A3E78', display: 'grid', placeItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <h3 style={{ marginTop: '22px', fontSize: '24px', color: '#2B2342', textWrap: 'balance' }}>Download the Pawzeeble app</h3>
            <p style={{ maxWidth: '320px', fontSize: '14.5px', lineHeight: 1.55, color: '#5A5177' }}>Scan with your phone camera to download Pawzeeble.</p>
            <div style={{ padding: '14px', border: '1.5px solid #EFEAF8', borderRadius: '22px', background: '#fff' }}>
              <img src="/images/qr/app-download-qr.png" width={200} height={200} alt="QR code to download the Pawzeeble app" style={{ display: 'block', imageRendering: 'pixelated' }} />
            </div>
            <div style={{ fontSize: '13px', color: '#6F6590' }}>Available on Android and iOS</div>
          </div>
        </div>
      ) : null}
    </DownloadContext.Provider>
  );
}
