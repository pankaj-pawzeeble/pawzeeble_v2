import type { ApiUser, LiteDraft } from './api';

/**
 * Returning-member purchases. Today the API only returns paid Lite drafts, so only Lite purchases are
 * produced. The Premium shapes and statuses below are the spec's, ready for when Premium data exists.
 */

export const MY_PURCHASES_PATH = '/pawteckt/my-purchases';

export type Tier = 'Starter' | 'Complete' | 'Guardian' | 'Ultimate';

export interface Purchase {
  /** Order shown to the member: the draft's orderId when the API sends one, else its id. */
  id: string;
  draftId: string;
  petId?: string;
  petName: string;
  plan: 'lite' | 'prem';
  tier?: Tier;
  frequency: 'ANNUAL' | 'MONTHLY';
  /** INR, taxes included. */
  price: number | null;
  cover?: number;
  paidAt: number;
  form?: 'pending' | 'done';
  polStart?: number;
  policyNo?: string;
}

export type PurchaseStatus =
  | { k: 'active'; end?: number }
  | { k: 'incomplete' }
  | { k: 'pending'; dl: number; left: number }
  | { k: 'insured'; start: number; end: number }
  | { k: 'lapsed'; dl: number };

const DAY = 864e5;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 2 Nov 2026 */
export const fmtDate = (ms: number) => {
  const d = new Date(ms);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};
/** ₹3,00,000 */
export const fmtInr = (n: number) => '₹' + n.toLocaleString('en-IN');
export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** +91 98••••3210 */
export function maskPhone(raw?: string | null): string {
  const d = String(raw ?? '').replace(/\D/g, '').slice(-10);
  return d.length === 10 ? `+91 ${d.slice(0, 2)}••••${d.slice(6)}` : '';
}

export function statusOf(p: Purchase, now = Date.now()): PurchaseStatus {
  if (p.plan === 'lite') {
    if (!p.petId) return { k: 'incomplete' };
    return { k: 'active', end: p.frequency === 'ANNUAL' ? p.paidAt + 364 * DAY : undefined };
  }
  if (p.form === 'done' && p.polStart) return { k: 'insured', start: p.polStart, end: p.polStart + 364 * DAY };
  const dl = p.paidAt + 10 * DAY;
  return now > dl ? { k: 'lapsed', dl } : { k: 'pending', dl, left: Math.max(1, Math.ceil((dl - now) / DAY)) };
}

/** Maps the paid-drafts response. Drafts of any other plan type are left out rather than shown as Lite. */
export function purchasesFromDrafts(drafts: LiteDraft[], user: ApiUser | null): Purchase[] {
  const petNames = new Map<string, string>();
  for (const up of user?.pets ?? []) if (up.petId?._id) petNames.set(up.petId._id, up.petId.name);

  return drafts
    .filter((d) => String(d.paymentDetails?.paymentStatus ?? '').toLowerCase() === 'success')
    .filter((d) => {
      const type = String((d as { planType?: unknown }).planType ?? 'LITE').toUpperCase();
      return type === 'LITE';
    })
    .map<Purchase>((d) => {
      const ta = Number(d.paymentDetails?.amountDetails?.ta);
      const orderId = (d as { orderId?: unknown }).orderId;
      return {
        id: String(orderId || d._id),
        draftId: d._id,
        petId: d.petId || undefined,
        petName: d.petDetails?.name || (d.petId ? petNames.get(d.petId) : '') || '',
        plan: 'lite',
        frequency: d.subscriptionFrequency === 'MONTHLY' ? 'MONTHLY' : 'ANNUAL',
        price: Number.isFinite(ta) ? ta : null,
        paidAt: Date.parse(String((d as { createdAt?: unknown }).createdAt ?? '')) || 0,
      };
    })
    .sort((a, b) => b.paidAt - a.paidAt);
}

export const planLabel = (p: Purchase) =>
  p.plan === 'prem' ? `Pawteckt Premium · ${p.tier ?? ''}`.trim() : `Pawteckt Lite · ${p.frequency === 'MONTHLY' ? 'Monthly' : 'Annual'}`;

export function receiptText(p: Purchase): string {
  return [
    'Pawzeeble · Pawteckt receipt',
    '',
    `Order: ${p.id}`,
    `Pet: ${p.petName || 'Not added yet'}`,
    `Plan: ${planLabel(p)}`,
    `Amount paid: ${p.price == null ? 'see your payment confirmation' : `Rs. ${p.price.toLocaleString('en-IN')} (taxes included)`}`,
    `Paid on: ${p.paidAt ? new Date(p.paidAt).toDateString() : '-'}`,
    '',
    'Questions? support@pawzeeble.com',
  ].join('\n');
}

/** Client-side receipt for now; a backend PDF invoice can replace this. */
export function downloadReceipt(p: Purchase): void {
  const url = URL.createObjectURL(new Blob([receiptText(p)], { type: 'text/plain' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `Pawteckt-receipt-${p.id}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
