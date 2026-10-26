import type { ApiClient } from './apiClient';
import { ValidationError } from './errors';
import type {
  AmountDetails,
  AppointmentDetail,
  AppointmentPayload,
  BookingContext,
  BookingType,
  CreateAppointmentData,
  CurrentUser,
  EnterpriseClientPet,
  EntType,
  RegisterPetBody,
  SlotDay,
  WorkingHourSlot,
} from './models';

const enc = encodeURIComponent;

/* ------------------------------------------------------------- types */

/** Where the booking started: the clinic's Business page, or the Clinic/QR page. */
export type BookingSource = 'business' | 'clinic';
export type ServiceKind = 'consultation' | 'other';
export type AppointmentEndpoint = 'appointments' | 'appointments/from-pp';

export interface BookingParent {
  parentId: string;
  mobileNumber: string;
  name: string;
  emailId: string;
}

export interface BookingPet {
  petId: string;
  name: string;
  creature: string;
  gender: string;
  /** yyyy-MM-dd. Omitted from the payload when empty. */
  dob?: string;
  primaryBreed?: string;
  secondaryBreed?: string;
  color?: string;
  isNeutered?: boolean;
  microchipNo?: string;
}

export interface SelectedService {
  isConsultation: boolean;
  /** Sent as service.type for non-consultation services ("Consultation" otherwise). */
  title: string;
  charges: number;
  /** Required for non-consultation services; omitted for Consultation. */
  facilityId?: string;
}

export interface AppliedCoupon {
  discount: number;
  appliedAmount: number;
  type: string;
  title: string;
  couponCode: string;
}

export interface ConfirmBookingInput {
  entType: EntType;
  source: BookingSource;
  // TODO: how "active Protect plan" and "pet has plan" are derived is not specified in the contract; the caller supplies them.
  hasActiveProtectPlan: boolean;
  petHasPlan: boolean;
  isAssurancePartner: boolean;
  appointmentType: BookingType;
  parent: BookingParent;
  pet: BookingPet;
  clinicId: string;
  doctorId: string;
  doctorConsultationFee: number;
  /** YYYY-MM-DD */
  date: string;
  /** The selected whSlots objects, sent as-is. */
  slots: WorkingHourSlot[];
  reason: string;
  symptoms?: string;
  service?: SelectedService;
  coupon?: AppliedCoupon;
  aggressionLevel?: string;
}

export interface ConfirmBookingResult {
  appointmentId: string;
  /** Present for the Business flow, where payment is required. */
  paymentSessionId?: string;
}

export interface PetCouponsInput {
  entType: EntType;
  petId: string;
  clinicId: string;
  /** Required for clinics. */
  doctorId?: string;
  /** Required for clinic non-consultation services. */
  serviceId?: string;
  serviceKind: ServiceKind;
}

export interface RetryPaymentInput {
  doctorId: string;
  clinicId: string;
  userId: string;
  appointmentId: string;
}

export interface CheckoutOptions {
  paymentSessionId: string;
  returnUrl: string;
}

export type PostBookingOutcome = { action: 'reverted' } | { action: 'reward'; coupon: unknown } | { action: 'none' };

/* -------------------------------------------------- pure builders */

const isBlank = (s: string | undefined | null) => s === undefined || s === null || s.trim() === '';

/** Plan holder = active Protect plan AND the pet has a plan. */
export const isPlanHolder = (i: Pick<ConfirmBookingInput, 'hasActiveProtectPlan' | 'petHasPlan'>) =>
  i.hasActiveProtectPlan && i.petHasPlan;

/** Plan holder → POST appointments (no payment). Business page → from-pp (payment). Clinic/QR page → POST appointments. */
export function selectAppointmentEndpoint(
  i: Pick<ConfirmBookingInput, 'hasActiveProtectPlan' | 'petHasPlan' | 'source'>,
): AppointmentEndpoint {
  if (isPlanHolder(i)) return 'appointments';
  return i.source === 'business' ? 'appointments/from-pp' : 'appointments';
}

/**
 * Non-consultation service → 0.
 * Plan holder at an Assurance-Partner clinic → the selected service charge.
 * Otherwise → doctor.consultationFee.
 */
export function resolveConsultationFee(i: ConfirmBookingInput): number {
  if (i.service && !i.service.isConsultation) return 0;
  if (isPlanHolder(i) && i.isAssurancePartner && i.service) return i.service.charges;
  return i.doctorConsultationFee;
}

/** Builds the POST appointments / appointments/from-pp body. `enterprisePetId` comes from the registration step (4.2). */
export function buildAppointmentPayload(i: ConfirmBookingInput, enterprisePetId: string): AppointmentPayload {
  const extras = isPlanHolder(i) || i.entType === 'groomer';

  const petDetails: AppointmentPayload['patientDetails']['petDetails'] = {
    name: i.pet.name,
    creature: i.pet.creature,
    gender: i.pet.gender,
    petId: i.pet.petId,
    enterprisePetId,
  };
  if (!isBlank(i.pet.dob)) petDetails.dob = i.pet.dob;
  if (!isBlank(i.pet.primaryBreed)) petDetails.primaryBreed = i.pet.primaryBreed;
  if (!isBlank(i.pet.secondaryBreed)) petDetails.secondaryBreed = i.pet.secondaryBreed;

  const payload: AppointmentPayload = {
    patientDetails: {
      parentDetails: {
        parentId: i.parent.parentId,
        mobileNumber: i.parent.mobileNumber,
        name: i.parent.name,
        emailId: i.parent.emailId,
      },
      petDetails,
    },
    // TODO: for plan-holder / groomer bookings the contract shows `"reason": " "` (a single space) with the reason text in
    // visitDetails.description. Followed literally; confirm this is intended.
    preAppointmentDetails: { reason: extras ? ' ' : i.reason },
    clinicDetails: { consultationFee: resolveConsultationFee(i), doctorId: i.doctorId, clinicId: i.clinicId },
    // TODO: the contract example shows only { st, et }, but says timeslots = "the selected whSlots objects" (which include `available`).
    schedule: { date: i.date, timeslots: i.slots },
    appointmentType: i.appointmentType,
  };
  if (!isBlank(i.symptoms)) payload.preAppointmentDetails.symptoms = i.symptoms;

  if (extras) {
    if (!i.service) throw new ValidationError('service is required for plan-holder and groomer bookings');
    if (!i.service.isConsultation && !i.service.facilityId) {
      throw new ValidationError('service.facilityId is required for non-consultation services');
    }
    payload.service = {
      type: i.service.isConsultation ? 'Consultation' : i.service.title,
      charges: i.service.charges,
    };
    if (!i.service.isConsultation) payload.service.facilityId = i.service.facilityId;
    if (i.coupon) payload.coupon = { ...i.coupon };
    // TODO: the contract does not say when `aggressionLevel` is required; it is sent only when provided.
    if (!isBlank(i.aggressionLevel)) payload.aggressionLevel = i.aggressionLevel;
    payload.visitDetails = { description: i.reason };
  }
  return payload;
}

/** Builds the pet-registration body (4.2). Missing optional pet fields default to empty strings / false, as in the contract. */
export function buildRegisterPetBody(i: Pick<ConfirmBookingInput, 'parent' | 'pet' | 'clinicId'>): RegisterPetBody {
  return {
    clientId: i.parent.parentId,
    clientInfo: { name: i.parent.name, mobileNumber: i.parent.mobileNumber, emailId: i.parent.emailId },
    petId: i.pet.petId,
    petInfo: {
      name: i.pet.name,
      creature: i.pet.creature,
      gender: i.pet.gender,
      primaryBreed: i.pet.primaryBreed ?? '',
      seconadaryBreed: i.pet.secondaryBreed ?? '', // TODO: misspelled key mirrors the existing web app; see RegisterPetBody.
      color: i.pet.color ?? '',
      isNeutered: i.pet.isNeutered ?? false,
      microchipNo: i.pet.microchipNo ?? '',
    },
    clinicId: i.clinicId,
  };
}

/** Cashfree checkout options: { paymentSessionId, returnUrl: "<app>/appointment-booking/{apptId}?d={doctorId}&e={clinicId}" }. */
export function buildCheckoutOptions(input: {
  paymentSessionId: string;
  appUrl: string;
  appointmentId: string;
  doctorId: string;
  clinicId: string;
}): CheckoutOptions {
  const app = input.appUrl.replace(/\/+$/, '');
  return {
    paymentSessionId: input.paymentSessionId,
    returnUrl: `${app}/appointment-booking/${enc(input.appointmentId)}?d=${enc(input.doctorId)}&e=${enc(input.clinicId)}`,
  };
}

/* ----------------------------------------------------------- service */

export function createBookingService(api: ApiClient) {
  /** GET v1/appointments/slots/docs/{doctorId}/ents/{clinicId} [auth] — that doctor's own schedule: [{ date, whSlots }]. */
  function getDoctorSlots(clinicId: string, doctorId: string): Promise<SlotDay[]> {
    return api.get<SlotDay[]>(`v1/appointments/slots/docs/${enc(doctorId)}/ents/${enc(clinicId)}`, { auth: true });
  }

  /**
   * Loads, in parallel:
   *  GET users/cn/me [auth]
   *  GET v1/appointments/slots/docs/{doctorId}/ents/{clinicId} [auth]
   *  GET payment-gateways/payment-details/{clinicId}/{doctorId}[?service_id=] [auth]
   *  GET appointments/symptoms [no auth]
   */
  async function loadBookingContext(clinicId: string, doctorId: string, serviceId?: string): Promise<BookingContext> {
    const [me, slots, payment, symptoms] = await Promise.all([
      api.get<CurrentUser>('users/cn/me', { auth: true }),
      getDoctorSlots(clinicId, doctorId),
      api.get<{ amountDetails: AmountDetails }>(`payment-gateways/payment-details/${enc(clinicId)}/${enc(doctorId)}`, {
        auth: true,
        query: { service_id: serviceId || undefined },
      }),
      api.get<{ symptoms: string[] }>('appointments/symptoms'),
    ]);
    return { me, slots, amountDetails: payment.amountDetails, symptoms: symptoms.symptoms };
  }

  /**
   * Pet coupons (Protect-plan users only — the caller decides whether to call):
   *  groomer:              GET pets/{petId}/coupons-usage/bId/{clinicId} [auth]
   *  clinic consultation:  GET pets/{petId}/coupons-usage/bId/{clinicId}/dId/{doctorId} [auth]
   *  clinic other service: GET pets/{petId}/coupons-usage/bId/{clinicId}/dId/{doctorId}?facilityId={serviceId} [auth]
   */
  function getPetCoupons(input: PetCouponsInput): Promise<unknown> {
    // TODO: the response shape of the pet coupons endpoints is not specified in the contract.
    const base = `pets/${enc(input.petId)}/coupons-usage/bId/${enc(input.clinicId)}`;
    if (input.entType === 'groomer') return api.get<unknown>(base, { auth: true });
    if (!input.doctorId) throw new ValidationError('doctorId is required for clinic pet coupons');
    const path = `${base}/dId/${enc(input.doctorId)}`;
    if (input.serviceKind === 'consultation') return api.get<unknown>(path, { auth: true });
    if (!input.serviceId) throw new ValidationError('serviceId is required for non-consultation clinic pet coupons');
    return api.get<unknown>(path, { auth: true, query: { facilityId: input.serviceId } });
  }

  /**
   * 4.2: GET enterprises/clients/{userId}/enterprises/{clinicId}; when the pet is missing or has no enterprisePetId,
   * POST pet-enterprise-details/register. Returns the enterprisePetId.
   */
  async function ensurePetRegistered(input: Pick<ConfirmBookingInput, 'parent' | 'pet' | 'clinicId'>): Promise<string> {
    // TODO: auth is not stated for the 4.2 endpoints; sent as authenticated.
    const client = await api.get<{ pets: EnterpriseClientPet[] }>(
      `enterprises/clients/${enc(input.parent.parentId)}/enterprises/${enc(input.clinicId)}`,
      { auth: true },
    );
    // TODO: assumes enterprise pet `_id` equals the user's `petId`; the contract does not say how to match them.
    const existing = client?.pets?.find((p) => p._id === input.pet.petId);
    if (existing?.enterprisePetId) return existing.enterprisePetId;

    const registered = await api.post<{ enterpriseId: string }>('pet-enterprise-details/register', {
      auth: true,
      body: buildRegisterPetBody(input),
    });
    return registered.enterpriseId;
  }

  /**
   * 4.2 + 4.3: registers the pet if needed, builds the payload, picks the endpoint and creates the appointment.
   *  POST appointments            (plan holder, or Clinic/QR page; no online payment)
   *  POST appointments/from-pp    (Business page; payment required) [auth]
   */
  async function confirmBooking(input: ConfirmBookingInput): Promise<ConfirmBookingResult> {
    const enterprisePetId = await ensurePetRegistered(input);
    const payload = buildAppointmentPayload(input, enterprisePetId);
    const endpoint = selectAppointmentEndpoint(input);
    // TODO: auth is not stated for the appointment-create endpoints; sent as authenticated.
    const data = await api.post<CreateAppointmentData>(endpoint, { auth: true, body: payload });
    // TODO: for the Business flow a missing paymentSessionId is returned as undefined; the contract does not define the failure.
    return { appointmentId: data._id, paymentSessionId: data.orderDetails?.paymentSessionId };
  }

  /** POST payment-gateways/orders [auth] — returns data.paymentSessionId. */
  async function retryPayment(input: RetryPaymentInput): Promise<string> {
    const data = await api.post<{ paymentSessionId: string }>('payment-gateways/orders', {
      auth: true,
      body: { userId: input.doctorId, entId: input.clinicId, customerId: input.userId, appointmentId: input.appointmentId },
    });
    return data.paymentSessionId;
  }

  /** GET appointments/{appointmentId} [auth] */
  function getAppointment(appointmentId: string): Promise<AppointmentDetail> {
    return api.get<AppointmentDetail>(`appointments/${enc(appointmentId)}`, { auth: true });
  }

  /** PATCH appointments/{appointmentId}/revert-to-cancel [auth] — body {} */
  function revertToCancel(appointmentId: string): Promise<unknown> {
    return api.patch<unknown>(`appointments/${enc(appointmentId)}/revert-to-cancel`, { auth: true, body: {} });
  }

  /** GET appointments/{appointmentId}/random-coupon [auth] */
  function getRewardCoupon(appointmentId: string): Promise<unknown> {
    // TODO: the response shape is not specified in the contract.
    return api.get<unknown>(`appointments/${enc(appointmentId)}/random-coupon`, { auth: true });
  }

  /**
   * 4.5 rules:
   *  status === 'Frozen' AND paymentStatus !== 'Success' → PATCH revert-to-cancel
   *  paymentStatus === 'Success'                         → GET random-coupon
   */
  async function handlePostBookingState(appointmentId: string, appointment: AppointmentDetail): Promise<PostBookingOutcome> {
    const paymentStatus = appointment.paymentDetails?.paymentStatus;
    if (appointment.status === 'Frozen' && paymentStatus !== 'Success') {
      await revertToCancel(appointmentId);
      return { action: 'reverted' };
    }
    if (paymentStatus === 'Success') {
      return { action: 'reward', coupon: await getRewardCoupon(appointmentId) };
    }
    return { action: 'none' };
  }

  return {
    getDoctorSlots,
    loadBookingContext,
    getPetCoupons,
    ensurePetRegistered,
    confirmBooking,
    retryPayment,
    getAppointment,
    revertToCancel,
    getRewardCoupon,
    handlePostBookingState,
  };
}

export type BookingService = ReturnType<typeof createBookingService>;
