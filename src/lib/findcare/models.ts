/* Typed models for the Find Care / booking API (V2). Only fields listed in the API contract are modelled. */

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export type BookingType = 'Visit' | 'Online Consultation';
export type EntType = 'clinic' | 'groomer';
/** Time of day as an HHmm integer: 1000 = 10:00, 1014 = 10:14. */
export type HHmm = number;

/* ------------------------------------------------------------ search */

export interface GeoLocation {
  type: string;
  /** [lng, lat] */
  coordinates: [number, number];
}

export interface Clinic {
  _id: string;
  name: string;
  businessName: string;
  type: string;
  entType: string;
  logo?: string;
  image: string;
  phoneNumber: string[];
  email: string;
  address: string;
  area: string;
  city: string;
  state?: string;
  pincode: string;
  geoLocation: GeoLocation;
  distance: number;
  consultationFee: number;
  onwardPrice: number;
  lowestPrice?: number;
  isAssurancePartner: boolean;
  isOnlineConsultationActive: boolean;
  isWhatsAppActive: boolean;
  businessPageUrlRoute: string;
  businessPageActive: boolean;
}

export interface ClinicSearchData {
  records: Clinic[];
  totalRecordCount: number;
}

export type GlobalSearchType = 'user' | 'pet' | 'clinics' | 'groomers' | 'content' | 'all';

export interface GlobalSearchEntRecord {
  _id: string;
  name: string;
  businessName: string;
  logo: string;
  area: string;
  city: string;
  type: 'clinic' | 'groomer';
  businessPageUrlRoute: string;
  businessPageActive: boolean;
}

export interface GlobalSearchData {
  // TODO: record shapes for users, pets, blogs and vlogs are not specified in the contract.
  users: { records: unknown[]; count: number };
  pets: { records: unknown[]; count: number };
  clinics: { records: GlobalSearchEntRecord[]; count: number };
  groomers: { records: GlobalSearchEntRecord[]; count: number };
  content: { blogs: unknown[]; vlogs: unknown[]; count: number };
}

export type ClinicDetailTarget = { kind: 'slug'; slug: string } | { kind: 'id'; id: string };

/* ------------------------------------------------------------ detail */

export interface EnterpriseImage {
  path: string;
  deleted: boolean;
  _id: string;
}

export interface SocialLink {
  name: 'facebook' | 'linkedIn' | 'instagram' | 'twitter' | 'googlePlus';
  link: string;
  active: boolean;
}

export interface Coupon {
  code: string;
  title: string;
  discountPercent: number;
  discountAmount: number;
  remainingCount: number;
}

export interface ServiceVariant {
  name: string;
  amount: number;
}

export interface EnterpriseService {
  _id: string;
  name: string;
  animalType: string;
  description: string;
  price: number;
  variants?: ServiceVariant[];
  coupon?: { code: string; title: string; discountPercent: number; discountAmount: number };
  image?: { url: string; key: string };
}

export interface EnterpriseDetails {
  _id: string;
  type: string;
  name: string;
  businessName: string;
  logo: string;
  bio?: string;
  aboutUs: string;
  images: EnterpriseImage[];
  contacts: string[];
  email: string[];
  address: string;
  area: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  geoLocation: { coordinates: [number, number] };
  isAssurancePartner: boolean;
  isOnlineConsultationActive: boolean;
  isWhatsAppActive: boolean;
  ocDetails?: { mobileNumber: string; consultationFee: number; available: boolean };
  businessPageActive: boolean;
  businessPageUrlRoute: string;
  smLinks: SocialLink[];
  services: EnterpriseService[];
  theme: { primaryColor: string; secondaryColor: string };
  hasNGO: boolean;
  aboutNGO: string;
}

export type Weekday = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface TimeRange {
  st: HHmm;
  et: HHmm;
}

export interface Doctor {
  _id: string;
  name: string;
  title: string;
  mobileNumber: string;
  profilePic: string;
  consultationFee?: number;
  // TODO: type of `pzbPF` is not specified in the contract.
  pzbPF?: unknown;
  professionDetails?: { qualifications: string[]; experience: number; description: string };
  workingHours: Record<Weekday, TimeRange[]>;
}

export interface Facility {
  _id: string;
  title: string;
  category: string;
  charges: number;
  description: string;
  tax: { percentage: number; type: string };
}

export interface ClinicDetailData {
  enterpriseDetails: EnterpriseDetails;
  doctorList: { doctors: Doctor[]; totalRecordCount: number };
  facilities: Facility[];
}

export interface Branch {
  _id: string;
  name: string;
  businessName: string;
  address: string;
  area: string;
  city: string;
  businessPageUrlRoute: string;
  logo: string;
  businessPageActive: boolean;
}

export interface EntRelation {
  _id: string;
  parentId: Branch;
  childId: Branch;
}

export interface DoctorServicesData {
  fees?: {
    consultationFee: number;
    vaccinationFee: number;
    dewormingFee: number;
    neuteringFee: number;
    spayingFee: number;
    castrationFee: number;
  };
  coupons?: { consultation: Coupon; vaccination: Coupon; deworming: Coupon; neutering: Coupon };
  serviceFeesDetail?: { facilityId: string | null; title: string; kind: string; charge: number }[];
}

/* ----------------------------------------------------------- booking */

export interface CurrentUser {
  pets: { petId: string }[];
  // TODO: other fields of GET users/cn/me are not specified in the contract.
  [key: string]: unknown;
}

export interface WorkingHourSlot extends TimeRange {
  available: boolean;
}

export interface SlotDay {
  /** YYYY-MM-DD */
  date: string;
  whSlots: WorkingHourSlot[];
}

export interface AmountDetails {
  ta: number;
  revenue: number;
  pgPay: number;
  taOnPzbRev: number;
  ntaOnPzbRev: number;
  consultationFee: number;
}

export interface BookingContext {
  me: CurrentUser;
  slots: SlotDay[];
  amountDetails: AmountDetails;
  symptoms: string[];
}

export interface EnterpriseClientPet {
  _id: string;
  name: string;
  creature: string;
  gender: string;
  enterprisePetId?: string;
}

export interface RegisterPetBody {
  clientId: string;
  clientInfo: { name: string; mobileNumber: string; emailId: string };
  petId: string;
  petInfo: {
    name: string;
    creature: string;
    gender: string;
    primaryBreed: string;
    // TODO: the existing web app sends this key misspelled ("seconadaryBreed"). Kept as-is; confirm with the backend team.
    seconadaryBreed: string;
    color: string;
    isNeutered: boolean;
    microchipNo: string;
  };
  clinicId: string;
}

export interface AppointmentPayload {
  patientDetails: {
    parentDetails: { parentId: string; mobileNumber: string; name: string; emailId: string };
    petDetails: {
      name: string;
      creature: string;
      gender: string;
      petId: string;
      enterprisePetId: string;
      dob?: string;
      primaryBreed?: string;
      secondaryBreed?: string;
    };
  };
  preAppointmentDetails: { symptoms?: string; reason: string };
  clinicDetails: { consultationFee: number; doctorId: string; clinicId: string };
  schedule: { date: string; timeslots: WorkingHourSlot[] };
  appointmentType: BookingType;
  /* plan-holder / groomer extras */
  coupon?: { discount: number; appliedAmount: number; type: string; title: string; couponCode: string };
  service?: { type: string; charges: number; facilityId?: string };
  aggressionLevel?: string;
  visitDetails?: { description: string };
}

export interface CreateAppointmentData {
  _id: string;
  // TODO: type of `apptNo` is not specified in the contract.
  apptNo: string | number;
  payload: unknown;
  orderDetails?: {
    paymentSessionId: string;
    paymentDetails: { ta: number; revenue: number; pgPay: number; taOnPzbRev: number; ntaOnPzbRev: number };
  };
}

export interface AppointmentDetail {
  status: string;
  schedule?: { date: string; timeslots: TimeRange[] };
  paymentDetails?: { paymentStatus?: string };
  clinicDetails?: AppointmentPayload['clinicDetails'];
  patientDetails?: AppointmentPayload['patientDetails'];
  service?: AppointmentPayload['service'];
}
