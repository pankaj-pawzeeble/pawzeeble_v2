import { createApiClient } from './apiClient';
import { createBookingService } from './bookingService';
import { createClinicService } from './clinicService';
import { createPlacesService } from './places';
import { getAuthToken, getV2BaseUrl } from './config';

export * from './apiClient';
export * from './bookingService';
export * from './clinicService';
export * from './errors';
export * from './models';
export * from './places';

/** Default client wired to the app config (V2 base URL + stored token). */
export const api = createApiClient({ getBaseUrl: getV2BaseUrl, getToken: getAuthToken });

export const clinicService = createClinicService(api);
export const bookingService = createBookingService(api);
export const placesService = createPlacesService(api);

export const {
  searchClinics,
  globalSearch,
  getClinicById,
  getClinicBySlug,
  getBranches,
  getDoctorServices,
  getClinicCoupons,
  getServiceVariant,
} = clinicService;

export const {
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
} = bookingService;
