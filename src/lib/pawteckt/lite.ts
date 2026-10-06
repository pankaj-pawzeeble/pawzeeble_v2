import type { ApiPet, ApiUser, LiteDraft, PlanPrice, PlanTypeItem } from './api';

export const GST_RATE = 0.18;
export const PHONE_RE = /^[6-9][0-9]{9}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Frequency = 'ANNUAL' | 'MONTHLY';

export interface LitePlans {
  loaded: boolean;
  annual: PlanPrice | null;
  monthly: PlanPrice | null;
}

/* ------------------------------------------------------------- plans */

/** Reads LITE_ANNUAL / LITE_MONTHLY out of the plan-types array. `price` may arrive as a string. */
export function parsePlanTypes(body: { data?: PlanTypeItem[] } | undefined): { annual: PlanPrice | null; monthly: PlanPrice | null } {
  const data = Array.isArray(body?.data) ? body.data : [];
  const find = (key: string): PlanPrice | null => {
    const item = data.find((p) => p?.planType === key);
    if (!item) return null;
    const price = Number(item.price);
    return Number.isFinite(price) && price > 0 ? { price, planType: item.planType } : null;
  };
  return { annual: find('LITE_ANNUAL'), monthly: find('LITE_MONTHLY') };
}

/** Annual is the only live option; monthly follows the spec's fallbacks if it is ever enabled. */
export function selectedPlan(plans: LitePlans, frequency: Frequency): { planKey: string; price: number | null } {
  if (frequency === 'MONTHLY') {
    const annual = plans.annual;
    const price = plans.monthly?.price ?? (annual ? Math.ceil(annual.price / 12) : null);
    const planKey = plans.monthly?.planType ?? annual?.planType ?? 'LITE_MONTHLY';
    return { planKey, price };
  }
  return { planKey: plans.annual?.planType ?? 'LITE_ANNUAL', price: plans.annual?.price ?? null };
}

/* ------------------------------------------------------------ users */

export const isNewUser = (user: ApiUser | null | undefined): boolean =>
  !!user && (user.mobileNumber === user.name || user.mobileNumber === user.username);

export const needsPetSelection = (draft: LiteDraft | null | undefined): boolean => !!draft && !draft.petId;

export const hasRealUsername = (user: ApiUser | null | undefined): boolean =>
  !!user?.username && user.username !== user.mobileNumber;

/* ------------------------------------------------------ validations */

export function validatePhone(phone: string): string {
  if (!phone) return 'Mobile number is Blanked';
  if (!PHONE_RE.test(phone)) return 'Mobile number is invalid';
  return '';
}

export const isValidProfileName = (v: string) => v.trim().length >= 3 && v.trim().length <= 50;
export const isValidEmail = (v: string) => EMAIL_RE.test(v.trim());

export function isValidUsername(v: string): boolean {
  const u = v.trim();
  return u.length >= 3 && u.length <= 30 && /^[a-z0-9_.]+$/.test(u) && /[a-z]/.test(u) && !/\d{5,}/.test(u);
}

export function profileHint(p: { name: string; email: string; user: string }, userLocked: boolean): string {
  if (p.name && !isValidProfileName(p.name)) return 'Name must be 3–50 characters';
  if (p.email && !isValidEmail(p.email)) return 'Enter a valid email address';
  if (!userLocked && p.user && !isValidUsername(p.user))
    return '3–30 characters: lowercase letters, numbers, dots or underscores (at least one letter, no 5+ digits in a row)';
  return '';
}

export const isValidPetName = (v: string) => v.length >= 2 && v.length <= 15 && !/\s/.test(v);

/* ---------------------------------------------------- draft payload */

export function buildDraftPayload(planKey: string, user: ApiUser) {
  return {
    planType: 'LITE',
    subscriptionFrequency: planKey === 'LITE_MONTHLY' ? 'MONTHLY' : 'ANNUAL',
    parentDetails: { mobileNumber: user.mobileNumber },
    ieDetails: {
      isVaccinated: true,
      isPetHealthy: true,
      vaccinationSchedule: true,
      healthReport: true,
      isPetDiabetic: false,
      hasHadIllness: false,
      isPetOnMedication: false,
    },
  };
}

export function mapDraftError(message: string): string {
  return message.includes('petDetails.creature must be one of the following values: Dog, Cat')
    ? 'We currently support only Dogs and Cats. Please select one of these pet types.'
    : message;
}

export function splitName(name: string): { firstName: string; lastName?: string } {
  const parts = name.trim().split(/\s+/);
  const rest = parts.slice(1).join(' ');
  return rest ? { firstName: parts[0], lastName: rest } : { firstName: parts[0] };
}

/** user.pets[].petId.creature is a plain string. */
export const creatureName = (pet: ApiPet): string => pet.creature ?? '';

/** Pet username: optional, 3–15 characters of [a-z0-9_.]. */
export const isValidPetUsername = (v: string) => v === '' || (v.length >= 3 && v.length <= 15 && /^[a-z0-9_.]+$/.test(v));

/** Breed search needs at least this many typed characters. */
export const BREED_MIN_CHARS = 3;

/* ----------------------------------------------- payment outcomes */

const EXPIRED = ['SESSION_EXPIRED', 'SESSION_TIMEOUT', 'EXPIRED'];
const FAILED = ['FAILED', 'USER_DROPPED', 'CANCELLED', 'CANCEL'];

export type PaymentOutcome = 'success' | 'expired' | 'failed' | 'pending';

/** Outcome checks run in the order the spec lists them. */
export function classifyPayment(draft: LiteDraft): PaymentOutcome {
  if (draft.planPurchased === true) return 'success';
  const status = String(draft.paymentDetails?.paymentStatus ?? '').toUpperCase();
  if (EXPIRED.includes(status)) return 'expired';
  if (FAILED.includes(status)) return 'failed';
  return 'pending';
}

/* ------------------------------------------------------- analytics */

type Gtag = (...args: unknown[]) => void;

export function track(event: 'AddToCart' | 'InitiateCheckout' | 'Purchase', params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: Gtag; fbq?: Gtag };
  try {
    w.gtag?.('event', event, params);
    w.fbq?.('track', event, params);
  } catch {
    /* analytics must never break the flow */
  }
}

/* ------------------------------------------------------------- urls */

export const PURCHASE_PATH = '/pawteckt';

export function returnUrlFor(origin: string, draftId: string): string {
  return `${origin}${PURCHASE_PATH}?action=payment_status&draft=${draftId}&planType=LITE`;
}

export function step1Url(draftId: string, extra = ''): string {
  return `${PURCHASE_PATH}?action=step1&draft=${draftId}${extra}`;
}
