/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from 'next/router';
import { load as loadCashfree } from '@cashfreepayments/cashfree-js';
import * as api from './api';
import type { ApiPet, ApiUser, Creature, LiteDraft } from './api';
import {
  GST_RATE,
  buildDraftPayload,
  classifyPayment,
  creatureName,
  formatDateDateMonYear,
  BREED_MIN_CHARS,
  hasRealUsername,
  isNewUser,
  isValidEmail,
  isValidPetName,
  isValidPetUsername,
  isValidProfileName,
  isValidUsername,
  mapDraftError,
  needsPetSelection,
  parsePlanTypes,
  profileHint,
  returnUrlFor,
  selectedPlan,
  splitName,
  step1Url,
  track,
  validatePhone,
  type Frequency,
  type LitePlans,
} from './lite';

/**
 * Pawteckt Lite purchase flow. Owns the business logic; the existing subscribe
 * components render it through the values returned by `vals()`. State lives in the
 * host controller under `state.lite`.
 */

type Stage = null | 'setup' | 'processing' | 'error' | 'failed' | 'expired' | 'pending';

export interface LiteState {
  plans: LitePlans;
  frequency: Frequency;
  user: ApiUser | null;
  draft: LiteDraft | null;
  draftParam: boolean;
  activeDraftId: string;
  incomplete: LiteDraft[];
  stage: Stage;
  payMsg: string;
  retry: 'draft' | 'payment' | null;
  phoneErr: string;
  otpErr: string;
  otpBusy: boolean;
  profileBusy: boolean;
  profileErr: string;
  petBusy: boolean;
  petErr: string;
  successFreq: Frequency | null;
  continuingId: string;
  draftsDismissed: boolean;
  creatures: Creature[];
  breedOpts: string[];
  breed2Opts: string[];
}

export const initialLiteState = (): LiteState => ({
  plans: { loaded: false, annual: null, monthly: null },
  frequency: 'ANNUAL',
  user: null,
  draft: null,
  draftParam: false,
  activeDraftId: '',
  incomplete: [],
  stage: null,
  payMsg: '',
  retry: null,
  phoneErr: '',
  otpErr: '',
  otpBusy: false,
  profileBusy: false,
  profileErr: '',
  petBusy: false,
  petErr: '',
  successFreq: null,
  continuingId: '',
  draftsDismissed: false,
  creatures: [],
  breedOpts: [],
  breed2Opts: [],
});

const BLANK_OTP = ['', '', '', '', '', ''];
const BLANK_NP = { name: '', uname: '', type: '', gender: '', breed: '', breed2: '', other: '' };
const BLANK_JN = { name: '', email: '', user: '' };
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const ls = {
  get: (k: string) => { try { return window.localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { window.localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  del: (k: string) => { try { window.localStorage.removeItem(k); } catch { /* storage unavailable */ } },
};
const fmtINR = (n: number) => '₹' + n.toLocaleString('en-IN');

export default class LiteFlow {
  private host: any;
  private cashfree: any = null;
  private pendingContinue = false;
  private pendingAnnualAddToCart = false;
  private lastPlan: { planKey: string; price: number } | null = null;
  private wasNewUser = false;
  private postDraftId = '';
  private profileRequired = false;
  private run = 0;
  private purchased = new Set<string>();
  private otpRequesting = false;
  private draftsChecked = false;
  private unmounted = false;
  private breedTimers: Record<'primary' | 'secondary', ReturnType<typeof setTimeout> | undefined> = { primary: undefined, secondary: undefined };
  private breedSeq = { primary: 0, secondary: 0 };

  constructor(host: any) {
    this.host = host;
  }

  /* ------------------------------------------------------------ state */

  private get s(): LiteState {
    return this.host.state.lite;
  }

  private patch(p: Partial<LiteState>) {
    this.host.setState((prev: any) => ({ lite: { ...prev.lite, ...p } }));
  }

  private setSub(sub: string | null) {
    this.host.setState({ sub });
    document.body.style.overflow = sub ? 'hidden' : '';
  }

  private query(): URLSearchParams {
    return new URLSearchParams(window.location.search);
  }

  private replaceUrl(url: string) {
    this.patch({ draftParam: new URL(url, window.location.origin).searchParams.has('draft') });
    void Router.replace(url, undefined, { shallow: true, scroll: false });
  }

  /* --------------------------------------------------------- lifecycle */

  mount() {
    // Mobile-app handoff: ?token= → session-only storage, then strip it from the URL.
    const q = this.query();
    const handoff = q.get('token');
    if (handoff) {
      try {
        api.storeToken(handoff, { session: true });
      } catch {
        /* missing encryption key — the user can still log in with OTP */
      }
      q.delete('token');
      const qs = q.toString();
      void Router.replace(window.location.pathname + (qs ? '?' + qs : ''), undefined, { shallow: true, scroll: false });
    }
    this.patch({ draftParam: this.query().has('draft') });

    void this.preloadCashfree();
    void this.loadPlans();
    void this.bootstrap();
  }

  /** Resume as soon as the user becomes available after login. */
  onUpdate(prev: any) {
    const was = prev?.lite?.user;
    if (!was && this.s.user && this.pendingContinue) {
      this.pendingContinue = false;
      const { planKey, price } = selectedPlan(this.s.plans, this.s.frequency);
      if (price != null) void this.startLitePayment(planKey, price);
      return;
    }
    if (!was && this.s.user) void this.checkIncomplete();
  }

  destroy() {
    this.unmounted = true;
  }

  private async preloadCashfree() {
    try {
      this.cashfree = await loadCashfree({ mode: (process.env.NEXT_PUBLIC_CASHFREE_MODE as 'sandbox' | 'production') || 'sandbox' });
    } catch {
      this.cashfree = null;
    }
  }

  private async loadPlans() {
    try {
      const body = await api.fetchPlanTypes();
      const { annual, monthly } = parsePlanTypes(body);
      this.patch({ plans: { loaded: true, annual, monthly } });
    } catch {
      this.patch({ plans: { loaded: true, annual: null, monthly: null } });
    }
  }

  /** 3.4 session check, then the purchase-page query handling. */
  private async bootstrap() {
    const token = api.getToken();
    if (token && !this.s.user) await this.refreshUser();
    else if (!token && this.s.user) this.patch({ user: null });

    const q = this.query();
    const action = q.get('action');
    const draftId = q.get('draft');
    if (draftId && action === 'payment_status' && q.get('planType') === 'LITE') void this.paymentStatus(draftId);
    else if (draftId && action === 'step1') void this.step1(draftId, q);
    else if (!draftId) void this.checkIncomplete();
  }

  /* -------------------------------------------------------------- auth */

  /** 3.3 — returns the user without touching state. */
  private async fetchMe(): Promise<ApiUser | null> {
    try {
      const res = await api.getMe();
      if (res.success && res.data?._id) return res.data;
    } catch {
      /* fall through */
    }
    api.clearToken();
    return null;
  }

  private async refreshUser(): Promise<ApiUser | null> {
    const user = await this.fetchMe();
    this.patch({ user });
    return user;
  }

  /* ----------------------------------------------------- plan selection */

  private get plan() {
    return selectedPlan(this.s.plans, this.s.frequency);
  }

  /** "Continue with plan". */
  continuePlan = async () => {
    const { planKey, price } = this.plan;
    if (price == null) return;

    // Fresh purchase: never reuse an old draft (a purchased one makes the backend reject the PATCH).
    this.run += 1;
    this.patch({ draft: null, stage: null, payMsg: '', phoneErr: '', otpErr: '', petErr: '', profileErr: '', successFreq: null });
    this.host.setState({ subPlan: 'lite', decl: false, subPhone: '', otp: BLANK_OTP.slice(), subPetId: '', payBusy: false, jn: { ...BLANK_JN }, np: { ...BLANK_NP } });

    if (!this.s.user && api.hasStoredToken()) await this.refreshUser();

    if (this.s.user) {
      track('AddToCart', { value: price, currency: 'INR' });
      void this.startLitePayment(planKey, price);
      return;
    }

    if (this.s.frequency === 'ANNUAL') this.pendingAnnualAddToCart = true;
    else track('AddToCart', { value: price, currency: 'INR' });
    this.pendingContinue = true;
    this.setSub('phone');
    setTimeout(() => document.getElementById('pz-sub-phone')?.focus(), 60);
  };

  closeSub = () => {
    this.pendingAnnualAddToCart = false;
    this.pendingContinue = false;
    const { stage } = this.s;
    clearInterval(this.host._otpT);
    clearTimeout(this.host._payT);
    if (this.host.state.sub === 'done' || stage === 'pending') {
      this.goHome();
      return;
    }
    if (stage === 'failed' || stage === 'expired') ls.del('hasRefreshed');
    this.patch({ stage: null, payMsg: '' });
    this.setSub(null);
  };

  goHome() {
    this.patch({ stage: null, payMsg: '', draftParam: false });
    this.setSub(null);
    if (window.sessionStorage.getItem('cameFromApp') === 'true') {
      api.clearToken();
      this.patch({ user: null });
      window.location.href = 'pawzeeble://home';
      return;
    }
    void Router.push('/');
  }

  /* --------------------------------------------------------------- otp */

  private startTimer() {
    clearInterval(this.host._otpT);
    this.host.setState({ otpLeft: 60 });
    this.host._otpT = setInterval(() => {
      this.host.setState((p: any) => {
        if (p.otpLeft <= 1) {
          clearInterval(this.host._otpT);
          return { otpLeft: 0 };
        }
        return { otpLeft: p.otpLeft - 1 };
      });
    }, 1000);
  }

  private focusOtp(i: number) {
    setTimeout(() => {
      const el = document.getElementById('pz-otp-' + i) as HTMLInputElement | null;
      el?.focus();
      el?.select?.();
    }, 0);
  }

  sendOtp = async (opts: { resend?: boolean } = {}) => {
    if (this.otpRequesting) return;
    const phone: string = this.host.state.subPhone;
    const err = validatePhone(phone);
    if (err) {
      this.patch({ phoneErr: err });
      return;
    }
    this.otpRequesting = true;
    this.patch({ otpBusy: true, phoneErr: '', otpErr: '' });
    try {
      const res = await api.generateOtp(phone);
      if (!res.success) throw new Error(res.message || 'Unable to send OTP');
      this.host.setState({ sub: 'otp', otp: BLANK_OTP.slice() });
      this.startTimer();
      this.focusOtp(0);
      if (this.pendingAnnualAddToCart) {
        const { price } = this.plan;
        track('AddToCart', { value: price, currency: 'INR' });
        this.pendingAnnualAddToCart = false;
      }
    } catch (e) {
      const msg = api.errorMessage(e, 'Unable to send OTP');
      this.patch(opts.resend || this.host.state.sub === 'otp' ? { otpErr: msg } : { phoneErr: msg });
    } finally {
      this.otpRequesting = false;
      this.patch({ otpBusy: false });
    }
  };

  resendOtp = () => {
    if (this.host.state.otpLeft > 0) return;
    this.host.setState({ otp: BLANK_OTP.slice() });
    void this.sendOtp({ resend: true });
    this.focusOtp(0);
  };

  verifyOtp = async () => {
    const otp: string[] = this.host.state.otp;
    if (otp.some((d) => d === '') || this.s.otpBusy) return;
    this.patch({ otpBusy: true, otpErr: '' });
    try {
      const res = await api.verifyOtp(this.host.state.subPhone, otp.join(''));
      const details = res.data?.userDetails;
      if (!res.success || !details?.token) throw new Error(res.message || 'Unable to Login');
      api.storeToken(details.token);
      api.setIsNewCookie(isNewUser(details));

      const user = await this.fetchMe();
      if (!user) throw new Error('Unable to Login');

      clearInterval(this.host._otpT);
      this.host.setState({ subPhone: '', otp: BLANK_OTP.slice() });
      this.setSub(null);
      this.patch({ otpBusy: false, user }); // triggers the resume in onUpdate()
    } catch (e) {
      this.patch({ otpBusy: false, otpErr: api.errorMessage(e, 'Unable to Login') });
    }
  };

  /* ------------------------------------------------- draft + payment */

  private showStage(stage: Stage, payMsg = '', retry: LiteState['retry'] = null) {
    this.setSub('pay');
    this.patch({ stage, payMsg, retry });
  }

  async startLitePayment(planKey: string, price: number) {
    const user = this.s.user;
    if (!user) return;
    this.lastPlan = { planKey, price };
    this.showStage('setup');

    if (!this.cashfree) {
      this.showStage('error', 'Payment gateway not ready. Please try again.', 'draft');
      return;
    }

    track('InitiateCheckout', { value: Number((price * (1 + GST_RATE)).toFixed(2)), currency: 'INR' });

    const payload = buildDraftPayload(planKey, user);
    const current = this.s.draft;
    try {
      const res = current ? await api.updateDraft(current._id, payload) : await api.createDraft(payload);
      if (!res.success || !res.data?._id) throw new Error(res.message || 'Could not start your purchase. Please try again.');
      this.patch({ draft: res.data, activeDraftId: res.data._id });
      await this.makePayment(res.data._id);
    } catch (e) {
      this.showStage('error', mapDraftError(api.errorMessage(e, 'Could not start your purchase. Please try again.')), 'draft');
    }
  }

  async makePayment(draftId: string) {
    this.showStage('setup');
    try {
      const res = await api.createPaymentOrder(draftId, returnUrlFor(window.location.origin, draftId));
      if (res.success === false) throw new Error(res.message || 'Payment session could not be created. Please try again.');
      const data = res.data;
      if (data?.paymentSessionId) {
        await this.cashfree?.checkout({ paymentSessionId: data.paymentSessionId, returnUrl: returnUrlFor(window.location.origin, draftId) });
        return;
      }
      if (data?.authLink) {
        window.sessionStorage.setItem('litePendingDraftId', draftId);
        window.location.href = data.authLink;
        return;
      }
      throw new Error('Payment session could not be created. Please try again.');
    } catch (e) {
      this.showStage('error', api.errorMessage(e, 'Payment session could not be created. Please try again.'), 'payment');
    }
  }

  /** Re-runs payment on the EXISTING draft — never creates a new one. */
  retryPayment = (draftId: string) => {
    ls.del('hasRefreshed');
    this.replaceUrl(step1Url(draftId));
    void this.makePayment(draftId);
  };

  /** The pay-step button: retries whatever just failed. */
  payAction = () => {
    const { stage, retry, draft, activeDraftId } = this.s;
    if (stage === 'setup' || stage === 'processing') return;
    const id = draft?._id || activeDraftId;
    if ((stage === 'failed' || stage === 'expired' || retry === 'payment') && id) {
      this.retryPayment(id);
    } else if (this.lastPlan) {
      void this.startLitePayment(this.lastPlan.planKey, this.lastPlan.price);
    }
  };

  /* --------------------------------------------------- payment result */

  private async fetchDraft(id: string): Promise<LiteDraft | null> {
    try {
      const res = await api.getDraft(id);
      return res.success && res.data ? res.data : null;
    } catch {
      return null;
    }
  }

  private async paymentStatus(draftId: string) {
    const run = ++this.run;
    this.patch({ draft: null, activeDraftId: draftId });
    this.showStage('processing');
    await wait(5000);
    if (run !== this.run) return;

    const draft = await this.fetchDraft(draftId);
    if (run !== this.run) return;

    const outcome = draft ? classifyPayment(draft) : 'pending';
    if (draft && outcome === 'success') {
      ls.del('hasRefreshed');
      const freq: Frequency = draft.subscriptionFrequency === 'MONTHLY' ? 'MONTHLY' : 'ANNUAL';
      ls.set('litePlanSuccessPending', freq);
      if (freq === 'ANNUAL' && !this.purchased.has(draftId)) {
        this.purchased.add(draftId);
        track('Purchase', { value: draft.paymentDetails?.amountDetails?.ta, transaction_id: draft._id, currency: 'INR' });
      }
      this.replaceUrl(step1Url(draftId));
      void this.step1(draftId, new URLSearchParams('action=step1&draft=' + draftId));
      return;
    }
    if (outcome === 'expired') {
      this.clearFlags();
      this.replaceUrl(step1Url(draftId, '&lite_session_expired=true'));
      this.showStage('expired', 'Your payment session expired. Please try again.');
      return;
    }
    if (outcome === 'failed') {
      this.clearFlags();
      this.replaceUrl(step1Url(draftId, '&lite_payment_failed=true'));
      this.showStage('failed', 'Payment failed. Please try again.');
      return;
    }
    // pending / unknown: reload once, then treat as failed
    if (!ls.get('hasRefreshed')) {
      ls.set('hasRefreshed', 'true');
      window.location.reload();
      return;
    }
    this.clearFlags();
    this.replaceUrl(step1Url(draftId, '&lite_payment_failed=true'));
    this.showStage('failed', 'Payment failed. Please try again.');
  }

  private clearFlags() {
    ls.del('hasRefreshed');
    ls.del('litePlanSuccessPending');
  }

  private async step1(draftId: string, q: URLSearchParams) {
    const run = this.run;
    const status = (q.get('status') || '').toUpperCase();
    const planParam = q.get('plan_type') || '';
    const isLitePlan = planParam.startsWith('LITE_');
    this.patch({ activeDraftId: draftId });

    const succeed = async (freqHint?: Frequency, hasParent?: boolean) => {
      const draft = await this.fetchDraft(draftId);
      if (run !== this.run) return;
      if (!draft) {
        this.showStage('pending', 'We could not load your purchase yet. Please check again shortly.');
        return;
      }
      this.showSuccess(draft, freqHint, hasParent);
    };

    if (isLitePlan && status) {
      if (status === 'ACTIVE') await succeed(planParam === 'LITE_MONTHLY' ? 'MONTHLY' : undefined);
      else if (status === 'SUSPENDED' || status === 'CANCELLED') this.showStage('failed', 'Payment failed. Please try again.');
      return; // PENDING: do nothing
    }

    if (isLitePlan) {
      this.showStage('processing');
      await wait(5000);
      if (run !== this.run) return;
      if (planParam === 'LITE_MONTHLY') {
        try {
          const res = await api.getMandateAuthStatus(draftId);
          const s = res.data?.lastAuthPaymentStatus;
          if (s === 'SUCCESS') await succeed('MONTHLY');
          else if (s === 'FAILED') this.showStage('failed', res.data?.lastAuthFailureReason || 'Payment failed. Please try again.');
          else this.showStage('pending', 'Your auto-renewal setup is still pending.');
        } catch {
          this.showStage('pending', 'Your auto-renewal setup is still pending.');
        }
        return;
      }
      const draft = await this.fetchDraft(draftId);
      if (run !== this.run) return;
      const m = draft?.mandateStatus;
      if (draft && m === 'ACTIVE') this.showSuccess(draft);
      else if (m === 'SUSPENDED') this.showStage('failed', 'Payment failed. Please try again.');
      else if (m === 'CANCELLED') this.showStage('failed', 'Mandate was cancelled.');
      else this.showStage('pending', 'Your payment is still being confirmed.');
      return;
    }

    if (ls.get('litePlanSuccessPending')) {
      const draft = await this.fetchDraft(draftId);
      if (run !== this.run) return;
      ls.del('litePlanSuccessPending');
      if (draft && draft.planPurchased === true) this.showSuccess(draft);
      return;
    }

    if (q.get('lite_payment_failed') === 'true') {
      this.showStage('failed', 'Payment failed. Please try again.');
      return;
    }
    if (q.get('lite_session_expired') === 'true') {
      this.showStage('expired', 'Your payment session expired. Please try again.');
      return;
    }

    if (q.get('resume_draft') === 'true') {
      const draft = await this.fetchDraft(draftId);
      if (run !== this.run || !draft) return;
      const hasParent = Boolean(draft.parentDetails?.firstName);
      const needsPet = !draft.petId && !draft.petDetails?.name;
      if (needsPet && String(draft.paymentDetails?.paymentStatus ?? '').toUpperCase() === 'SUCCESS') {
        this.showSuccess(draft, draft.subscriptionFrequency === 'MONTHLY' ? 'MONTHLY' : 'ANNUAL', hasParent);
      }
      return;
    }

    const draft = await this.fetchDraft(draftId);
    if (run === this.run && draft) this.patch({ draft });
  }

  /* ---------------------------------------------- post-payment + pets */

  private showSuccess(draft: LiteDraft, freqHint?: Frequency, hasParentDetails?: boolean) {
    const freq: Frequency = freqHint ?? (draft.subscriptionFrequency === 'MONTHLY' ? 'MONTHLY' : 'ANNUAL');
    this.patch({ draft, activeDraftId: draft._id, successFreq: freq, stage: null, payMsg: '' });
    if (needsPetSelection(draft)) this.startPostPayment(draft, hasParentDetails);
    else this.showDone(draft, freq);
  }

  private showDone(draft: LiteDraft, freq: Frequency) {
    if (freq === 'MONTHLY' && !this.purchased.has(draft._id)) {
      this.purchased.add(draft._id);
      track('Purchase', { value: draft.paymentDetails?.amountDetails?.ta, transaction_id: draft._id, currency: 'INR' });
    }
    this.host._subStart = new Date();
    this.patch({ stage: null });
    this.setSub('done');
  }

  /** wasNewUser is captured ONCE per draft: saving the profile flips isNewUser to false. */
  private startPostPayment(draft: LiteDraft, hasParentDetails?: boolean) {
    const user = this.s.user;
    if (this.postDraftId !== draft._id) {
      this.postDraftId = draft._id;
      // Resume mode (hasParentDetails given) goes by the draft and pets, not the account's new-user flag.
      this.wasNewUser = hasParentDetails !== undefined ? this.pets().length === 0 : isNewUser(user);
      this.profileRequired = hasParentDetails !== undefined ? !hasParentDetails : this.wasNewUser;
    }
    if (this.profileRequired) {
      const name = user?.name && user.name !== user.mobileNumber ? user.name : '';
      const uname = user?.username && user.username !== user.mobileNumber ? user.username : '';
      this.host.setState({ jn: { name, email: user?.emailId || '', user: uname } });
      this.patch({ profileErr: '', profileBusy: false });
      this.setSub('join');
    } else {
      this.openPetStage();
    }
  }

  private openPetStage() {
    this.patch({ petErr: '', petBusy: false });
    if (this.wasNewUser) {
      this.host.setState({ subPetId: '', np: { ...BLANK_NP }, npBrQ: '' });
      this.resetBreeds();
      void this.ensureCreatures();
      this.setSub('add');
    } else {
      this.setSub('pet');
    }
  }

  joinNext = async () => {
    const { jn } = this.host.state;
    const user = this.s.user;
    if (!user || this.s.profileBusy) return;
    const locked = hasRealUsername(user);
    const ok = isValidProfileName(jn.name) && isValidEmail(jn.email) && (locked || isValidUsername(jn.user));
    if (!ok) return;

    this.patch({ profileBusy: true, profileErr: '' });
    try {
      if (!locked && (await api.isUsernameTaken(jn.user.trim()))) {
        this.patch({ profileBusy: false, profileErr: 'Username already taken' });
        return;
      }
      const body = locked
        ? { name: jn.name.trim(), emailId: jn.email.trim() }
        : { name: jn.name.trim(), emailId: jn.email.trim(), username: jn.user.trim() };
      const res = await api.updateProfile(body);
      if (!res.success) throw new Error(res.message || 'Could not save your profile. Please try again.');

      const fresh = await this.fetchMe();
      if (fresh) this.patch({ user: fresh });

      const draftId = this.s.draft?._id || this.s.activeDraftId;
      if (draftId) {
        // fire-and-forget: never block on this
        api.updateDraft(draftId, { parentDetails: { ...splitName(jn.name), emailId: jn.email.trim() } }).catch(() => undefined);
      }
      this.patch({ profileBusy: false });
      this.openPetStage();
    } catch (e) {
      this.patch({ profileBusy: false, profileErr: api.errorMessage(e, 'Could not save your profile. Please try again.') });
    }
  };

  /** user.pets[] wraps each pet under `petId`. */
  private pets(): ApiPet[] {
    return (this.s.user?.pets ?? []).map((p) => p?.petId).filter((p): p is ApiPet => !!p?._id);
  }

  private selectedPet(): ApiPet | undefined {
    return this.pets().find((p) => p._id === this.host.state.subPetId);
  }

  /** The creature (Dog/Cat) matching the form's type key. */
  private creatureFor(type: string): Creature | undefined {
    return this.s.creatures.find((c) => c.creature.toLowerCase() === type);
  }

  /** Loads the creatures once, keeping only Dog and Cat. */
  ensureCreatures = async () => {
    if (this.s.creatures.length) return;
    try {
      const res = await api.getCreatures();
      const list = Array.isArray(res.data) ? res.data : [];
      this.patch({ creatures: list.filter((c) => c.creature === 'Dog' || c.creature === 'Cat') });
    } catch {
      /* the type dropdown stays empty; the user can reopen the form */
    }
  };

  /** Debounced breed search (~300ms). Nothing is preloaded before the user types. */
  searchBreed(target: 'primary' | 'secondary', text: string) {
    const key = target === 'primary' ? 'breedOpts' : 'breed2Opts';
    clearTimeout(this.breedTimers[target]);
    const q = text.trim();
    const creature = this.creatureFor(this.host.state.np.type);
    if (q.length < BREED_MIN_CHARS || !creature) {
      this.breedSeq[target] += 1;
      this.patch({ [key]: [] } as Partial<LiteState>);
      return;
    }
    this.breedTimers[target] = setTimeout(async () => {
      const seq = ++this.breedSeq[target];
      try {
        const res = await api.searchBreeds(q, creature._id);
        if (seq !== this.breedSeq[target]) return; // a newer search superseded this one
        const breeds = res.success && Array.isArray(res.data?.breeds) ? res.data.breeds : [];
        this.patch({ [key]: breeds } as Partial<LiteState>);
      } catch {
        if (seq === this.breedSeq[target]) this.patch({ [key]: [] } as Partial<LiteState>);
      }
    }, 300);
  }

  private resetBreeds() {
    clearTimeout(this.breedTimers.primary);
    clearTimeout(this.breedTimers.secondary);
    this.breedSeq.primary += 1;
    this.breedSeq.secondary += 1;
    this.patch({ breedOpts: [], breed2Opts: [] });
  }

  savePet = async () => {
    const { np } = this.host.state;
    const user = this.s.user;
    if (!user || this.s.petBusy) return;
    const creature = this.creatureFor(np.type);
    if (!(creature && isValidPetName(np.name) && np.breed && isValidPetUsername(np.uname))) return;

    const hadNoPetsBefore = this.pets().length === 0;
    const gender = np.gender === 'male' ? 'M' : np.gender === 'female' ? 'F' : undefined;
    this.patch({ petBusy: true, petErr: '' });
    try {
      const res = await api.createPet({
        name: np.name,
        ...(np.uname ? { username: np.uname } : {}),
        creature: creature.creature,
        ...(gender ? { gender } : {}),
        primaryBreed: np.breed,
        ...(np.breed2.trim() ? { secondaryBreed: np.breed2.trim() } : {}),
      });
      if (!res.success || !res.data?._id) throw new Error(res.message || 'Could not add your pet. Please try again.');
      const created: ApiPet = { ...res.data, creature: res.data.creature ?? creature.creature };
      const wrapped = { petId: created };

      const existing = user.pets ?? [];
      const pets = existing.some((p) => p.petId?._id === created._id) ? existing : [...existing, wrapped];
      this.patch({ user: { ...user, pets } });
      const fresh = await this.fetchMe();
      if (fresh) {
        const merged = fresh.pets?.some((p) => p.petId?._id === created._id) ? fresh.pets : [...(fresh.pets ?? []), wrapped];
        this.patch({ user: { ...fresh, pets: merged } });
      }

      this.resetBreeds();
      this.host.setState({ subPetId: created._id });
      this.setSub('pet');
      this.patch({ petBusy: false });
      if (hadNoPetsBefore) await this.attachPet(created._id);
    } catch (e) {
      this.patch({ petBusy: false, petErr: api.errorMessage(e, 'Could not add your pet. Please try again.') });
    }
  };

  /** 10. PATCH the draft with the chosen pet. */
  private async attachPet(petId: string) {
    const draft = this.s.draft;
    const pet = this.pets().find((p) => p._id === petId);
    if (!draft || !pet) return;
    this.patch({ petBusy: true, petErr: '' });
    try {
      const res = await api.updateDraft(draft._id, {
        petId: pet._id,
        petDetails: { creature: creatureName(pet), name: pet.name, ...(pet.gender ? { gender: pet.gender } : {}) },
      });
      if (!res.success || !res.data) throw new Error(res.message || 'Could not save your pet. Please try again.');
      this.patch({ draft: res.data, petBusy: false, incomplete: this.s.incomplete.filter((d) => d._id !== res.data?._id) });
      this.showDone(res.data, res.data.subscriptionFrequency === 'MONTHLY' ? 'MONTHLY' : this.s.successFreq ?? 'ANNUAL');
    } catch (e) {
      this.patch({ petBusy: false, petErr: api.errorMessage(e, 'Could not save your pet. Please try again.') });
    }
  }

  activate = () => {
    const id: string = this.host.state.subPetId;
    if (!id || this.s.petBusy) return;
    void this.attachPet(id);
  };

  /* ------------------------------------------------ resume paid drafts */

  /**
   * Background check (once, logged-in users on /pawteckt with no draft/status in the URL):
   * paid drafts with no pet. Renders nothing while loading, on failure or when empty.
   */
  private async checkIncomplete() {
    const user = this.s.user;
    if (this.draftsChecked || this.unmounted || !user?._id) return;
    if (this.host.state.page !== 'pawteckt') return;
    const q = this.query();
    if (q.has('draft') || q.has('draft_id') || q.has('status')) return;
    this.draftsChecked = true;
    try {
      const res = await api.getPaidDrafts();
      if (this.unmounted) return;
      const list = (res.success && Array.isArray(res.data) ? res.data : []).filter(
        (d) => String(d.paymentDetails?.paymentStatus ?? '').toLowerCase() === 'success' && !d.petId,
      );
      this.patch({ incomplete: list });
    } catch (e) {
      console.error('Could not check incomplete paid drafts', e);
    }
  }

  /** Continue button: resumes the EXISTING draft (never creates one). */
  continueDraft = (draftId: string) => {
    if (this.s.continuingId) return;
    this.patch({ continuingId: draftId });
    this.openDraft(draftId);
  };

  closeDrafts = () => {
    if (!this.s.continuingId) this.patch({ draftsDismissed: true });
  };

  private openDraft(draftId: string) {
    this.run += 1;
    this.postDraftId = '';
    this.patch({ draft: null, stage: null, payMsg: '', successFreq: null, activeDraftId: draftId, continuingId: '' });
    this.host.setState({ subPetId: '', np: { ...BLANK_NP } });
    this.replaceUrl(step1Url(draftId, '&resume_draft=true'));
    void this.step1(draftId, new URLSearchParams(`action=step1&draft=${draftId}&resume_draft=true`));
  }

  /* ------------------------------------------------------------- vals */

  /** Values for the "Continue your Pawteckt Lite subscription" modal. */
  private draftsModalVals() {
    const s = this.s;
    const st = this.host.state;
    const hasStatus = typeof window !== 'undefined' && this.query().has('status');
    const open =
      st.page === 'pawteckt' && !!s.user?._id && !s.draftParam && !st.sub && !hasStatus && !s.draftsDismissed && s.incomplete.length > 0;
    const busy = !!s.continuingId;
    return {
      draftsModalOpen: open,
      draftsMany: s.incomplete.length > 1,
      draftsBusy: busy,
      closeDrafts: this.closeDrafts,
      drafts: s.incomplete.map((d) => {
        const monthly = d.subscriptionFrequency === 'MONTHLY';
        const ta = d.paymentDetails?.amountDetails?.ta;
        const paid = formatDateDateMonYear(d.createdAt);
        return {
          id: d._id,
          freq: monthly ? 'Monthly' : 'Annual',
          monthly,
          paidLabel: paid ? `Paid on ${paid}` : 'Paid',
          amount: ta == null ? '' : fmtINR(Number(ta)),
          continuing: s.continuingId === d._id,
          disabled: busy,
          pick: () => this.continueDraft(d._id),
        };
      }),
    };
  }

  /** Page-level values (plan card, resume list). Safe to call for any plan. */
  pageVals() {
    const s = this.s;
    const annual = s.plans.annual;
    return {
      litePlanVisible: !!annual && !s.draftParam,
      litePriceLabel: annual ? fmtINR(annual.price) : '',
      ...this.draftsModalVals(),
    };
  }

  /** Overrides for the subscribe steps while the Lite flow is open. */
  vals(base: any, btn: (on: boolean) => any) {
    const st = this.host.state;
    const s = this.s;
    if (st.subPlan !== 'lite') return {};

    const { price } = this.plan;
    const priceS = price != null ? fmtINR(price) : '';
    const sub = st.sub;
    const stage = s.stage;
    const busy = stage === 'setup' || stage === 'processing';
    const otpOk = st.otp.every((d: string) => d !== '');
    const jn = st.jn;
    const user = s.user;
    const locked = hasRealUsername(user);
    const hint = profileHint(jn, locked);
    const jnOk = isValidProfileName(jn.name) && isValidEmail(jn.email) && (locked || isValidUsername(jn.user));
    const np = st.np;
    const npOk = !!(this.creatureFor(np.type) && isValidPetName(np.name) && np.breed && isValidPetUsername(np.uname));
    const unameHint = np.uname && !isValidPetUsername(np.uname) ? 'Pet username: 3–15 characters, lowercase letters, numbers, dots or underscores' : '';
    const breedOpts = s.breedOpts;
    const hi = Math.min(st.npBrHi || 0, Math.max(0, breedOpts.length - 1));
    const pickBreed = (b: string) => this.host.setState((p: any) => ({ np: { ...p.np, breed: b }, npBrQ: b, npBrOpen: false, npBrHi: 0 }));
    const pets = this.pets().map((p) => ({ id: p._id, name: p.name }));
    const pet = this.selectedPet();
    const draftPet = s.draft?.petDetails?.name;
    const petName = pet?.name || draftPet || 'your pet';
    const petOk = !!pet && !s.petBusy;
    const freqLabel = (s.draft?.subscriptionFrequency ?? s.frequency) === 'MONTHLY' ? 'Monthly' : 'Annual';
    const start: Date = this.host._subStart || new Date();
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);
    end.setDate(end.getDate() - 1);
    const fmt = (d: Date) => d.getDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()] + ' ' + d.getFullYear();
    const retryable = stage === 'failed' || stage === 'expired' || stage === 'error';

    return {
      subPlanLine: `Pawteckt lite · ${freqLabel}${priceS ? ' · ' + priceS : ''}`,
      subPlanName: `Pawteckt lite · ${freqLabel}`,
      subPrice: priceS,
      subStart: fmt(start),
      subEnd: fmt(end),
      subPetName: petName,
      subPetInitial: petName === 'your pet' ? '' : petName.charAt(0).toUpperCase(),

      // phone + otp
      phoneErr: s.phoneErr,
      otpErr: s.otpErr,
      subPhoneBad: s.otpBusy,
      subBtnPhone: btn(!s.otpBusy),
      onSubPhone: (e: any) => {
        const v = e.target.value.replace(/\D/g, '').slice(0, 10);
        this.host.setState({ subPhone: v });
        this.patch({ phoneErr: '', otpErr: '' });
        if (sub === 'otp') {
          clearInterval(this.host._otpT);
          this.host.setState({ sub: 'phone', otp: BLANK_OTP.slice(), otpLeft: 0 });
        }
      },
      sendOtp: () => void this.sendOtp(),
      resendOtp: this.resendOtp,
      verifyOtp: () => void this.verifyOtp(),
      otpBad: !otpOk || s.otpBusy,
      subBtnOtp: btn(otpOk && !s.otpBusy),

      // payment / status
      payIdle: false,
      payBusy: busy,
      payBusyText: stage === 'setup' ? 'Setting up your payment…' : 'Confirming your payment…',
      payMsg: s.payMsg,
      payMsgColor: stage === 'pending' ? '#6F6590' : '#CE0049',
      payShowBtn: retryable,
      payBtnLabel: retryable ? (stage === 'error' && s.retry === 'draft' ? 'Try again' : 'Retry payment') : '',
      subBtnPay: btn(!busy),
      payNow: this.payAction,

      // profile form
      subIsJoin: sub === 'join',
      onJnUser: (e: any) => this.host.setState((p: any) => ({ jn: { ...p.jn, user: e.target.value.replace(/\s/g, '').toLowerCase().slice(0, 30) } })),
      jnUserLocked: locked,
      jnHint: s.profileErr || hint || 'Your username is how other pet parents find you',
      jnHintColor: s.profileErr || hint ? '#CE0049' : '#6F6590',
      jnBad: !jnOk || s.profileBusy,
      subBtnJoin: btn(jnOk && !s.profileBusy),
      joinNext: () => void this.joinNext(),

      // pet selection
      subPets: pets,
      petErr: s.petErr || unameHint,

      // add-pet: creatures + breed search come from master-data
      npTypes: s.creatures.map((c) => ({ v: c.creature.toLowerCase(), l: c.creature })),
      onNpType: (e: any) => {
        this.host.setState((p: any) => ({ npBrQ: '', npBrOpen: false, np: { ...p.np, type: e.target.value, breed: '', breed2: '', other: '' } }));
        this.resetBreeds();
      },
      onNpUname: (e: any) => this.host.setState((p: any) => ({ np: { ...p.np, uname: e.target.value.replace(/\s/g, '').toLowerCase().slice(0, 15) } })),
      npIsOther: false,
      npBrNone: false,
      npBreedQ: st.npBrQ ?? '',
      npBrOpen: !!st.npBrOpen && breedOpts.length > 0,
      npBrOpts: breedOpts.map((b, k) => ({
        l: b,
        on: np.breed === b,
        pick: (e: any) => { e.preventDefault(); pickBreed(b); },
        style: { padding: '10px 12px', borderRadius: 10, fontSize: 14.5, fontWeight: np.breed === b ? 700 : 500, color: '#2B2342', cursor: 'pointer', background: k === hi ? '#F3EEFF' : 'transparent' },
      })),
      onNpBreedQ: (e: any) => {
        const text: string = e.target.value;
        const exact = breedOpts.find((b) => b.toLowerCase() === text.trim().toLowerCase());
        this.host.setState((p: any) => ({ npBrQ: text, npBrOpen: true, npBrHi: 0, np: { ...p.np, breed: exact ?? '' } }));
        this.searchBreed('primary', text);
      },
      npBrFocus: () => this.host.setState({ npBrOpen: true }),
      npBrBlur: () => this.host.setState({ npBrOpen: false }),
      npBrKey: (e: any) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); this.host.setState({ npBrOpen: true, npBrHi: Math.min(hi + 1, breedOpts.length - 1) }); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); this.host.setState({ npBrHi: Math.max(hi - 1, 0) }); }
        else if (e.key === 'Enter' && st.npBrOpen && breedOpts[hi]) { e.preventDefault(); pickBreed(breedOpts[hi]); }
        else if (e.key === 'Escape') this.host.setState({ npBrOpen: false });
      },
      npBreeds: s.breed2Opts.map((b) => ({ v: b, l: b })),
      onNpBreed2: (e: any) => {
        const text: string = e.target.value;
        this.host.setState((p: any) => ({ np: { ...p.np, breed2: text } }));
        this.searchBreed('secondary', text);
      },
      petBad: !petOk,
      subBtnPet: btn(petOk),
      onPickPet: (e: any) => {
        this.host.setState({ subPetId: e.target.value });
        this.patch({ petErr: '' });
      },
      openAddPet: () => {
        this.host.setState({ sub: 'add', np: { ...BLANK_NP }, npBrQ: '', subPetId: '' });
        this.resetBreeds();
        void this.ensureCreatures();
        this.patch({ petErr: '' });
      },
      backToPet: () => this.host.setState({ sub: 'pet' }),
      cancelPet: () => {
        this.host.setState({ sub: 'pet', subPetId: '' });
        this.patch({ petErr: '' });
      },
      npBad: !npOk || s.petBusy,
      subBtnAdd: { ...btn(npOk && !s.petBusy), width: '100%' },
      savePet: () => void this.savePet(),
      activate: this.activate,

      closeSub: this.closeSub,
    };
  }
}
