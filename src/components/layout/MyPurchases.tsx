import Router from 'next/router';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as api from '@/lib/pawteckt/api';
import { isNewUser, validatePhone } from '@/lib/pawteckt/lite';
import { MY_PURCHASES_PATH } from '@/lib/pawteckt/purchases';

type MyPurchases = {
  /** Straight to the page when a session exists, otherwise the verify-number modal. */
  openMy: () => void;
  /** Straight to the page (number just verified). */
  goMy: () => void;
  openLookup: () => void;
};

const Ctx = createContext<MyPurchases>({ openMy: () => undefined, goMy: () => undefined, openLookup: () => undefined });
export const useMyPurchases = () => useContext(Ctx);

const BLANK = ['', '', '', '', '', ''];
const RESEND_SECONDS = 60;

export function MyPurchasesProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openLookup = useCallback(() => setOpen(true), []);
  const goMy = useCallback(() => void Router.push(MY_PURCHASES_PATH).then(() => window.scrollTo(0, 0)), []);
  const openMy = useCallback(() => (api.hasStoredToken() ? goMy() : setOpen(true)), [goMy]);

  const value = useMemo(() => ({ openMy, goMy, openLookup }), [openMy, goMy, openLookup]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {open ? <LookupModal onClose={() => setOpen(false)} /> : null}
    </Ctx.Provider>
  );
}

const card = { display: 'flex', flexDirection: 'column', gap: 14 } as const;
const closeBtn = { flex: 'none', width: 32, height: 32, borderRadius: '50%', background: '#F2EEFA', color: '#4A3E78', display: 'grid', placeItems: 'center' } as const;
const btnStyle = (on: boolean) => ({ width: '100%', padding: '15px 20px', borderRadius: 999, fontSize: 15.5, fontWeight: 700, background: on ? '#CA5C00' : '#E6E3EC', color: on ? '#fff' : '#A39DB3', cursor: on ? 'pointer' : 'not-allowed' }) as const;

function LookupModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState<string[]>(BLANK);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(0);
  const phoneRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const phoneOk = !validatePhone(phone);
  const otpOk = otp.every((d) => d !== '');

  // lock page scroll while open and focus the phone field once
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    phoneRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Esc closes, except while a request is in flight
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !busy && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [busy, onClose]);
  useEffect(() => () => clearInterval(timer.current), []);

  const focusBox = (i: number) =>
    setTimeout(() => {
      const el = document.getElementById(`pz-otp-${i}`) as HTMLInputElement | null;
      el?.focus();
      el?.select?.();
    }, 0);

  const startTimer = () => {
    clearInterval(timer.current);
    setLeft(RESEND_SECONDS);
    timer.current = setInterval(() => setLeft((s) => (s <= 1 ? (clearInterval(timer.current), 0) : s - 1)), 1000);
  };

  const sendOtp = async () => {
    if (!phoneOk || busy) return;
    setBusy(true);
    setErr('');
    try {
      const res = await api.generateOtp(phone);
      if (!res.success) throw new Error(res.message || 'Unable to send OTP');
      setStep('otp');
      setOtp(BLANK);
      startTimer();
      focusBox(0);
    } catch (e) {
      setErr(api.errorMessage(e, 'Unable to send OTP'));
    } finally {
      setBusy(false);
    }
  };

  const verify = async () => {
    if (!otpOk || busy) return;
    setBusy(true);
    setErr('');
    try {
      const res = await api.verifyOtp(phone, otp.join(''));
      const details = res.data?.userDetails;
      if (!res.success || !details?.token) throw new Error('mismatch');
      api.storeToken(details.token);
      api.setIsNewCookie(isNewUser(details));
      const me = await api.getMe();
      if (!me.success || !me.data?._id) {
        api.clearToken();
        throw new Error('mismatch');
      }
      clearInterval(timer.current);
      // a full load so the rest of the site picks up the new session too
      window.location.assign(MY_PURCHASES_PATH);
    } catch {
      setErr("That code didn't match. Try again or resend.");
      setOtp(BLANK);
      focusBox(0);
      setBusy(false);
    }
  };

  const resend = () => {
    if (left > 0 || busy) return;
    setOtp(BLANK);
    void sendOtp();
  };

  const setDigit = (i: number, d: string) => setOtp((o) => o.map((v, k) => (k === i ? d : v)));

  return (
    <div data-r="sub-wrap" role="dialog" aria-modal="true" aria-label="View my purchases" onClick={() => !busy && onClose()} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(43,35,66,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div data-r="sub-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 440, maxHeight: '92vh', background: '#fff', borderRadius: 28, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(43,35,66,.35)' }}>
        <div style={{ padding: '22px 22px 16px', borderBottom: '1.5px solid #F2EEFA', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 22, color: '#2B2342' }}>View my purchases</h3>
            <div style={{ marginTop: 4, fontSize: 14, color: '#6F6590' }}>Verify your number to see your Pawteckt plans</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={closeBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 22, ...card, gap: 0 }}>
          <label htmlFor="pz-my-phone" style={{ fontSize: 13, fontWeight: 600, color: '#5A5177' }}>Mobile Number</label>
          <div style={{ marginTop: 8, display: 'flex', border: '1.5px solid #D9D1EE', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
            <span style={{ padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: 700, color: '#2B2342', borderRight: '1.5px solid #E9E2F6' }}>+91</span>
            <input
              id="pz-my-phone"
              ref={phoneRef}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                setErr('');
                if (step === 'otp') {
                  clearInterval(timer.current);
                  setStep('phone');
                  setOtp(BLANK);
                }
              }}
              onKeyDown={(e) => e.key === 'Enter' && step === 'phone' && void sendOtp()}
              style={{ flex: 1, minWidth: 0, border: 0, outline: 'none', padding: '14px 12px', fontSize: 16, color: '#2B2342', background: 'transparent', fontFamily: 'inherit' }}
            />
          </div>

          {step === 'otp' ? (
            <>
              <h4 style={{ marginTop: 26, fontSize: 21, color: '#2B2342' }}>Verify OTP</h4>
              <div style={{ marginTop: 4, fontSize: 13.5, color: '#6F6590' }}>Sent to +91 {phone}</div>
              <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 8 }}>
                {otp.map((v, i) => (
                  <input
                    key={i}
                    id={`pz-otp-${i}`}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    aria-label={`OTP digit ${i + 1}`}
                    value={v}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, '').slice(-1);
                      setDigit(i, d);
                      if (d && i < 5) focusBox(i + 1);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && i > 0) {
                        setDigit(i - 1, '');
                        focusBox(i - 1);
                      }
                      if (e.key === 'Enter') void verify();
                    }}
                    onPaste={(e) => {
                      const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                      if (!t) return;
                      e.preventDefault();
                      setOtp(BLANK.map((_, k) => t[k] ?? ''));
                      focusBox(Math.min(t.length, 5));
                    }}
                    style={{ width: '100%', aspectRatio: '1 / 1.1', boxSizing: 'border-box', textAlign: 'center', fontSize: 20, fontWeight: 700, color: '#2B2342', border: `1.5px solid ${v ? '#6351A1' : '#D9D1EE'}`, borderRadius: 12, background: '#fff', outline: 'none', fontFamily: 'inherit', padding: 0 }}
                  />
                ))}
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <button onClick={resend} disabled={left > 0 || busy} style={{ background: 'transparent', padding: '4px 0', fontSize: 14, fontWeight: 700, color: left > 0 ? '#B3ADC4' : '#6351A1', cursor: left > 0 ? 'default' : 'pointer' }}>Resend OTP</button>
                <span style={{ fontSize: 13, color: '#5A5177' }}>
                  Time left: <strong style={{ color: '#2B2342' }}>{String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}</strong>
                </span>
              </div>
            </>
          ) : null}
          {err ? <div role="alert" style={{ marginTop: 12, fontSize: 13, color: '#CE0049' }}>{err}</div> : null}
        </div>

        <div style={{ padding: '16px 22px 22px', borderTop: '1.5px solid #F2EEFA', ...card }}>
          <p style={{ fontSize: 12.5, lineHeight: 1.5, color: '#6F6590', textAlign: 'center' }}>
            By continuing, you agree to our<br />
            <a href="#" style={{ color: '#2B2342', fontWeight: 700 }}>Terms &amp; Conditions</a> · <a href="#" style={{ color: '#2B2342', fontWeight: 700 }}>Privacy Policy</a>
          </p>
          {step === 'phone' ? (
            <button onClick={() => void sendOtp()} disabled={!phoneOk || busy} style={btnStyle(phoneOk && !busy)}>{busy ? 'Sending…' : 'Confirm & Send OTP'}</button>
          ) : (
            <button onClick={() => void verify()} disabled={!otpOk || busy} style={btnStyle(otpOk && !busy)}>{busy ? 'Verifying…' : 'Verify & Continue'}</button>
          )}
        </div>
      </div>
    </div>
  );
}
