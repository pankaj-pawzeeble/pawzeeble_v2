import Router from 'next/router';
import { useEffect, useState, type ReactNode } from 'react';
import { useAppDownload } from '@/components/layout/AppDownload';
import { useMyPurchases } from '@/components/layout/MyPurchases';
import * as api from '@/lib/pawteckt/api';
import {
  downloadReceipt,
  fmtDate,
  fmtInr,
  maskPhone,
  planLabel,
  plural,
  purchasesFromDrafts,
  statusOf,
  type Purchase,
  type PurchaseStatus,
} from '@/lib/pawteckt/purchases';
import { step1Url } from '@/lib/pawteckt/lite';
import styles from './MyPurchasesView.module.css';

type Load = { k: 'loading' } | { k: 'unverified' } | { k: 'error' } | { k: 'ready'; phone: string; purchases: Purchase[] };

const AVATARS: [string, string][] = [['#FFF1D6', '#A44A00'], ['#E4F4EF', '#25795F'], ['#F0EBFA', '#6351A1']];
const FALLBACK_AVATAR: [string, string] = ['#FFE7D6', '#CA5C00'];

const icon = (children: ReactNode, size = 20) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const lock = (size = 16) => icon(<><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>, size);
const shield = icon(<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>);

/** Session check, then the member's paid drafts. */
async function resolvePurchases(): Promise<Load> {
  if (!api.hasStoredToken()) return { k: 'unverified' };
  try {
    const me = await api.getMe();
    if (!me.success || !me.data?._id) {
      api.clearToken();
      return { k: 'unverified' };
    }
    const res = await api.getPaidDrafts();
    if (!res.success) throw new Error(res.message);
    return { k: 'ready', phone: maskPhone(me.data.mobileNumber), purchases: purchasesFromDrafts(Array.isArray(res.data) ? res.data : [], me.data) };
  } catch (e) {
    console.error('Could not load Pawteckt purchases', e);
    return { k: 'error' };
  }
}

export default function MyPurchasesView() {
  const { dlApp } = useAppDownload();
  const { openLookup } = useMyPurchases();
  const [state, setState] = useState<Load>({ k: 'loading' });

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    resolvePurchases().then((next) => alive && setState(next));
    return () => {
      alive = false;
    };
  }, [attempt]);

  const retry = () => {
    setState({ k: 'loading' });
    setAttempt((n) => n + 1);
  };

  // no session: ask for the number straight away, the page stays usable if they close it
  useEffect(() => {
    if (state.k === 'unverified') openLookup();
  }, [state.k, openLookup]);

  const signOut = () => {
    api.clearToken();
    // a full load clears the in-memory session everywhere
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign('/pawteckt');
  };

  const purchases = state.k === 'ready' ? state.purchases : [];
  // one banner: the Premium plan with the earliest form deadline
  const pending = purchases
    .map((p) => ({ p, s: statusOf(p) }))
    .filter((x): x is { p: Purchase; s: Extract<PurchaseStatus, { k: 'pending' }> } => x.s.k === 'pending')
    .sort((a, b) => a.s.dl - b.s.dl)[0];

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <button className={styles.back} onClick={() => void Router.push('/pawteckt')}>← Back to Pawteckt</button>

        <div className={styles.head}>
          <div>
            <h1>My Pawteckt</h1>
            {state.k === 'ready' && state.phone ? (
              <div className={styles.verified}>{lock()}Verified as {state.phone}</div>
            ) : null}
          </div>
          {state.k === 'ready' ? <button className={styles.signout} onClick={signOut}>Not you? Sign out</button> : null}
        </div>

        {state.k === 'loading' ? <div className={styles.note} role="status">Loading your purchases…</div> : null}
        {state.k === 'unverified' ? (
          <div className={styles.note}>
            <p>Verify your mobile number to see your Pawteckt plans.</p>
            <p style={{ marginTop: 14 }}><button className={styles.primary} onClick={openLookup}>Verify number</button></p>
          </div>
        ) : null}
        {state.k === 'error' ? (
          <div className={styles.note}>
            <p>We couldn’t load your purchases. Please try again.</p>
            <p style={{ marginTop: 14 }}><button className={styles.primary} onClick={retry}>Try again</button></p>
          </div>
        ) : null}

        {state.k === 'ready' ? (
          <>
            {pending ? (
              <section className={styles.banner}>
                <span className={styles.bannerIcon}>{icon(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>, 22)}</span>
                <div className={styles.bannerBody}>
                  <h3>{pending.p.petName || 'Your pet'}’s policy form is pending</h3>
                  <p>Submit it by {fmtDate(pending.s.dl)} ({plural(pending.s.left, 'day')} left) so {pending.p.petName || 'your pet'}’s insurance can start.</p>
                </div>
              </section>
            ) : null}

            <div className={styles.sectionHead}>
              <h2>Your purchases</h2>
              <span className={styles.count}>{plural(purchases.length, 'plan')}</span>
            </div>

            {purchases.length === 0 ? (
              <div className={styles.empty}>
                <h3>No Pawteckt purchases on this number</h3>
                <p>If you paid with a different number, sign out and try that one.</p>
              </div>
            ) : (
              <div className={styles.list}>
                {purchases.map((p, i) => (
                  <PurchaseCard key={p.draftId} p={p} i={i} onApp={() => dlApp()} />
                ))}
              </div>
            )}

            <div className={styles.tiles}>
              <div className={styles.tile}>
                <span className={styles.tileIcon}>{lock(20)}</span>
                <div><strong>Linked to your number.</strong> Come back anytime and verify with an OTP.</div>
              </div>
              <div className={styles.tile}>
                <span className={styles.tileIcon}>{shield}</span>
                <div><strong>Insured by HDFC ERGO.</strong> Premium policy documents are emailed once the form is in.</div>
              </div>
            </div>

            <section className={styles.app}>
              <div>
                <h3>Use your benefits in the Pawzeeble app</h3>
                <p>Book with member coupons, show your Pet QR and file claims. Sign in with the same number and your plans will be there.</p>
              </div>
              <button className={styles.dark} onClick={() => dlApp()}>Download the app</button>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

function PurchaseCard({ p, i, onApp }: { p: Purchase; i: number; onApp: () => void }) {
  const s = statusOf(p);
  const [bg, fg] = p.petName ? AVATARS[i % AVATARS.length] : FALLBACK_AVATAR;
  const paid = [p.price != null ? fmtInr(p.price) : null, p.paidAt ? fmtDate(p.paidAt) : null].filter(Boolean).join(' · ') || '-';

  let chip: { cls: string; text: string };
  let rows: [string, string][];
  let action: ReactNode;
  const idRow: [string, string] = ['Order ID', p.id];

  switch (s.k) {
    case 'active':
      chip = { cls: styles.ok, text: 'Lite active' };
      rows = [[s.end ? 'Valid' : 'Started', s.end ? `${fmtDate(p.paidAt)} – ${fmtDate(s.end)}` : fmtDate(p.paidAt)], ['Paid', paid], idRow];
      action = <button className={styles.primary} onClick={onApp}>View Pet QR</button>;
      break;
    case 'incomplete':
      chip = { cls: styles.warn, text: 'Add your pet' };
      rows = [['Paid', paid], idRow];
      action = <button className={styles.primary} onClick={() => void Router.push(step1Url(p.draftId, '&resume_draft=true'))}>Add your pet to activate</button>;
      break;
    case 'pending':
      chip = { cls: styles.warn, text: `Form pending · ${plural(s.left, 'day')} left` };
      rows = [['Submit form by', fmtDate(s.dl)], ['Total cover', `${fmtInr(p.cover ?? 0)} once active`], ['Paid', paid], idRow];
      action = <button className={styles.primary} onClick={onApp}>Complete policy form</button>;
      break;
    case 'insured':
      chip = { cls: styles.ok, text: 'Insured' };
      rows = [['Covered', `${fmtDate(s.start)} – ${fmtDate(s.end)}`], ['Total cover', fmtInr(p.cover ?? 0)], ...(p.policyNo ? ([['Policy no.', p.policyNo]] as [string, string][]) : []), ['Paid', paid], idRow];
      action = <button className={styles.primary} onClick={onApp}>View policy in the app</button>;
      break;
    default:
      chip = { cls: styles.bad, text: 'Not activated' };
      rows = [['Form was due', fmtDate(s.dl)], ['Paid', paid], idRow];
      action = <a className={styles.primary} href={`mailto:support@pawzeeble.com?subject=${encodeURIComponent(`Pawteckt ${p.id}`)}`}>Contact support</a>;
  }

  return (
    <article className={styles.buy}>
      <div className={styles.buyHead}>
        <span className={styles.av} style={{ background: bg, color: fg }}>{p.petName ? p.petName.charAt(0).toUpperCase() : '?'}</span>
        <div className={styles.who}>
          <div className={styles.pet}>{p.petName || 'Pet not added yet'}</div>
          <div className={styles.plan}>{planLabel(p)}</div>
        </div>
        <span className={`${styles.chip} ${chip.cls}`}>{chip.text}</span>
      </div>
      <dl className={styles.rows}>
        {rows.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <div className={styles.actions}>
        {action}
        <button className={styles.outline} onClick={() => downloadReceipt(p)}>Download receipt</button>
      </div>
    </article>
  );
}
