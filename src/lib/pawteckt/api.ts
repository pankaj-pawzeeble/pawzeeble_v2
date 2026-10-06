import axios, { type AxiosRequestConfig } from 'axios';
import CryptoJS from 'crypto-js';

/* ------------------------------------------------------------------ types */

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiPet {
  _id: string;
  name: string;
  creature?: string;
  gender?: string;
  [key: string]: unknown;
}

/** user.pets[] entries wrap the pet under `petId`. */
export interface UserPet {
  petId: ApiPet;
  [key: string]: unknown;
}

export interface Creature {
  _id: string;
  creature: string;
}

export interface CreatePetBody {
  name: string;
  username?: string;
  creature: string;
  gender?: 'M' | 'F';
  primaryBreed: string;
  secondaryBreed?: string;
  dob?: string;
  bio?: string;
}

export interface ApiUser {
  _id: string;
  mobileNumber: string;
  name?: string;
  username?: string;
  emailId?: string;
  pets?: UserPet[];
  [key: string]: unknown;
}

export interface LiteDraft {
  _id: string;
  planPurchased?: boolean;
  subscriptionFrequency?: 'MONTHLY' | 'ANNUAL' | string;
  mandateStatus?: string;
  petId?: string;
  petDetails?: { name?: string; creature?: string; gender?: string };
  parentDetails?: { firstName?: string; lastName?: string; emailId?: string; mobileNumber?: string };
  paymentDetails?: { paymentStatus?: string; amountDetails?: { ta?: number } };
  [key: string]: unknown;
}

export interface PlanTypeItem {
  _id?: string;
  planType: string;
  price: number | string;
  discountedPrice?: number | null;
}

export interface PlanPrice {
  price: number;
  planType: string;
}

/* ------------------------------------------------------- token storage */

const TOKEN_KEY = 'token';

/** Single CryptoJS passphrase (no separate key/IV). */
function secret(): string {
  const passphrase = process.env.NEXT_PUBLIC_BITCOIN_RING;
  if (!passphrase) throw new Error('NEXT_PUBLIC_BITCOIN_RING is not configured');
  return passphrase;
}

const hasWindow = () => typeof window !== 'undefined';

/** Store the AES-encrypted token. App handoff tokens live in sessionStorage only. */
export function storeToken(raw: string, opts: { session?: boolean } = {}): void {
  if (!hasWindow()) return;
  const encrypted = CryptoJS.AES.encrypt(raw, secret()).toString();
  if (opts.session) {
    window.sessionStorage.setItem(TOKEN_KEY, encrypted);
    window.sessionStorage.setItem('cameFromApp', 'true');
  } else {
    window.localStorage.setItem(TOKEN_KEY, encrypted);
  }
}

/** Read order: sessionStorage first, then localStorage. Returns the raw token. */
export function getToken(): string | null {
  if (!hasWindow()) return null;
  try {
    const stored = window.sessionStorage.getItem(TOKEN_KEY) || window.localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    const raw = CryptoJS.AES.decrypt(stored, secret()).toString(CryptoJS.enc.Utf8);
    return raw || null;
  } catch {
    return null;
  }
}

export function hasStoredToken(): boolean {
  if (!hasWindow()) return false;
  try {
    return !!(window.sessionStorage.getItem(TOKEN_KEY) || window.localStorage.getItem(TOKEN_KEY));
  } catch {
    return false;
  }
}

export function clearToken(): void {
  if (!hasWindow()) return;
  try {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
}

export function setIsNewCookie(isNew: boolean): void {
  if (!hasWindow()) return;
  if (isNew) {
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    document.cookie = `isNew=true; path=/; expires=${expires.toUTCString()}`;
  } else {
    document.cookie = 'isNew=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

/* ------------------------------------------------------------- client */

/** In dev the API is reached through the same-origin /v2-proxy rewrite (no CORS headers for localhost). */
const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/v2-proxy' : process.env.NEXT_PUBLIC_V2_BASE_URL,
  timeout: 20000,
});

/** `Authorization: <raw token>` — no "Bearer" prefix. */
function authed(config: AxiosRequestConfig = {}): AxiosRequestConfig {
  const token = getToken();
  return token ? { ...config, headers: { ...config.headers, Authorization: token } } : config;
}

export function errorMessage(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { message?: unknown } }; message?: string };
  const m = e?.response?.data?.message;
  if (Array.isArray(m) && m.length) return m.map(String).join(', ');
  if (typeof m === 'string' && m) return m;
  return e?.message || fallback;
}

/* ---------------------------------------------------------- endpoints */

export const COUNTRY_CODE = '+91';

export async function fetchPlanTypes() {
  const res = await client.get<ApiEnvelope<PlanTypeItem[]>>('protect-plans-inventory/plan-types');
  return res.data;
}

export async function generateOtp(mobileNumber: string) {
  const res = await client.post<ApiEnvelope>('auth/otp', { mobileNumber, countryCode: COUNTRY_CODE });
  return res.data;
}

export interface VerifyOtpResponse extends ApiEnvelope {
  data?: { userDetails?: ApiUser & { token?: string } };
}

export async function verifyOtp(mobileNumber: string, otp: string) {
  const res = await client.post<VerifyOtpResponse>('auth/otp-signupin', {
    mobileNumber,
    otp,
    countryCode: COUNTRY_CODE,
  });
  return res.data;
}

export async function getMe() {
  const res = await client.get<ApiEnvelope<ApiUser>>('users/cn/me', authed());
  return res.data;
}

/** Any 2xx response means the username is TAKEN; an error response means AVAILABLE. */
export async function isUsernameTaken(username: string): Promise<boolean> {
  try {
    await client.get('users/username/exists', authed({ params: { q: username } }));
    return true;
  } catch {
    return false;
  }
}

export async function updateProfile(body: { name: string; emailId: string; username?: string }) {
  const res = await client.patch<ApiEnvelope>('users', body, authed());
  return res.data;
}

export async function createDraft(body: Record<string, unknown>) {
  const res = await client.post<ApiEnvelope<LiteDraft>>('pet-insurance/drafts', body, authed());
  return res.data;
}

export async function updateDraft(id: string, body: Record<string, unknown>) {
  const res = await client.patch<ApiEnvelope<LiteDraft>>(`pet-insurance/drafts/${id}`, body, authed());
  return res.data;
}

export async function getDraft(id: string) {
  const res = await client.get<ApiEnvelope<LiteDraft>>(`pet-insurance/drafts/${id}`, authed());
  return res.data;
}

export async function getPaidDrafts() {
  const res = await client.get<ApiEnvelope<LiteDraft[]>>(
    'pet-insurance/drafts',
    authed({ params: { paymentStatus: 'success' } }),
  );
  return res.data;
}

export interface PaymentOrder {
  paymentSessionId?: string;
  authLink?: string;
}

export async function createPaymentOrder(draftId: string, returnUrl: string) {
  const res = await client.post<ApiEnvelope<PaymentOrder>>(
    'payment-gateways/pp-orders',
    { draftId, returnUrl },
    authed(),
  );
  return res.data;
}

export interface MandateAuthStatus {
  lastAuthPaymentStatus?: string;
  lastAuthFailureReason?: string;
}

export async function getMandateAuthStatus(draftId: string) {
  const res = await client.get<ApiEnvelope<MandateAuthStatus>>(
    `payment-gateways/pp-subscriptions/${draftId}/auth-payment-status`,
    authed(),
  );
  return res.data;
}

export async function createPet(body: CreatePetBody) {
  const res = await client.post<ApiEnvelope<ApiPet>>('pets', body, authed());
  return res.data;
}

export async function getCreatures() {
  const res = await client.get<ApiEnvelope<Creature[]>>('master-data/creatures', authed());
  return res.data;
}

/** `creatureId` is the creature's _id, not its name. */
export async function searchBreeds(search: string, creatureId: string) {
  const res = await client.get<ApiEnvelope<{ breeds: string[] }>>(
    'master-data/breeds',
    authed({ params: { search, creatureId } }),
  );
  return res.data;
}
