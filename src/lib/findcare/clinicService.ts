import type { ApiClient } from './apiClient';
import { NotFoundError } from './errors';
import type {
  BookingType,
  Clinic,
  ClinicDetailData,
  ClinicDetailTarget,
  ClinicSearchData,
  DoctorServicesData,
  EntRelation,
  GlobalSearchData,
  GlobalSearchType,
} from './models';

const enc = encodeURIComponent;

/** Grid page size used by the clinic search grid. */
export const GRID_PAGE_SIZE = 8;
/** `distances` query value is fixed by the contract. */
export const SEARCH_DISTANCES = 10000;

export interface SearchClinicsInput {
  lat?: number | null;
  lng?: number | null;
  q?: string;
  /** 1-based */
  page: number;
  size?: number;
  bookingType: BookingType;
  /** Which business type to list. Defaults to 'clinic'. */
  entType?: 'clinic' | 'groomer';
  /** Records already loaded (pages before `page`). Page 1 ignores it; later pages append to it. */
  loaded?: Clinic[];
}

export interface SearchClinicsResult {
  /** Accumulated list: page 1 replaces `loaded`, page > 1 appends to it. */
  records: Clinic[];
  /** Records returned by this page only. */
  pageRecords: Clinic[];
  totalRecordCount: number;
  /** loaded < totalRecordCount */
  hasMore: boolean;
}

export interface GlobalSearchInput {
  q: string;
  searchType: GlobalSearchType;
  page: number;
  limit: number;
}

export type BranchRelations = { source: 'parent' | 'child'; relations: EntRelation[] };

const hasCoord = (n: number | null | undefined): n is number => typeof n === 'number' && Number.isFinite(n);

/** Pure pagination merge: page 1 replaces, page > 1 appends; hasMore = loaded < total. */
export function mergeClinicPage(loaded: Clinic[], page: number, pageRecords: Clinic[], totalRecordCount: number) {
  const records = page <= 1 ? pageRecords : [...loaded, ...pageRecords];
  return { records, pageRecords, totalRecordCount, hasMore: records.length < totalRecordCount };
}

/** Grid card → detail routing: slug when the business page is live, otherwise id. */
export function resolveClinicDetailTarget(
  clinic: Pick<Clinic, '_id' | 'businessPageUrlRoute' | 'businessPageActive'>,
): ClinicDetailTarget {
  if (clinic.businessPageUrlRoute && clinic.businessPageActive) return { kind: 'slug', slug: clinic.businessPageUrlRoute };
  return { kind: 'id', id: clinic._id };
}

export function createClinicService(api: ApiClient) {
  /**
   * GET businesses [auth]
   * Query: lat, lng, distances=10000, page, size, q (only when non-empty), entType=clinic, oc=true (only for Online Consultation).
   * Returns an empty result without calling the API when lat/lng are unavailable.
   */
  async function searchClinics(input: SearchClinicsInput): Promise<SearchClinicsResult> {
    const loaded = input.loaded ?? [];
    if (!hasCoord(input.lat) || !hasCoord(input.lng)) {
      return mergeClinicPage(loaded, input.page, [], loaded.length);
    }
    const data = await api.get<ClinicSearchData>('businesses', {
      auth: true,
      query: {
        lat: input.lat,
        lng: input.lng,
        distances: SEARCH_DISTANCES,
        page: input.page,
        size: input.size ?? GRID_PAGE_SIZE,
        q: input.q && input.q.trim() ? input.q : undefined,
        entType: input.entType ?? 'clinic',
        oc: input.bookingType === 'Online Consultation' ? true : undefined,
      },
    });
    return mergeClinicPage(loaded, input.page, data.records, data.totalRecordCount);
  }

  /** GET master-search/global-search [auth] — header / global search. */
  function globalSearch(input: GlobalSearchInput): Promise<GlobalSearchData> {
    return api.get<GlobalSearchData>('master-search/global-search', {
      auth: true,
      query: { q: input.q, searchType: input.searchType, page: input.page, limit: input.limit },
    });
  }

  /** GET businesses/{clinicId}?page&size [no auth] */
  function getClinicById(id: string, page: number, size: number): Promise<ClinicDetailData> {
    return api.get<ClinicDetailData>(`businesses/${enc(id)}`, { query: { page, size } });
  }

  /**
   * GET businesses/business-page-settings/{slug}?page&size [no auth]
   * Throws NotFoundError when enterpriseDetails.businessPageActive === false.
   */
  async function getClinicBySlug(slug: string, page: number, size: number): Promise<ClinicDetailData> {
    const data = await api.get<ClinicDetailData>(`businesses/business-page-settings/${enc(slug)}`, { query: { page, size } });
    if (data?.enterpriseDetails?.businessPageActive === false) throw new NotFoundError('Business page not found');
    return data;
  }

  /**
   * GET businesses/ent-relations/{clinicId} [no auth] (parent branches);
   * GET businesses/ent-relations-child/{clinicId} [no auth] only when the parent result is empty.
   */
  async function getBranches(clinicId: string): Promise<BranchRelations> {
    const parents = await api.get<EntRelation[]>(`businesses/ent-relations/${enc(clinicId)}`);
    if (parents && parents.length > 0) return { source: 'parent', relations: parents };
    const children = await api.get<EntRelation[]>(`businesses/ent-relations-child/${enc(clinicId)}`);
    return { source: 'child', relations: children ?? [] };
  }

  /** GET v1/businesses/{clinicId}/doctors/{doctorId}/services [auth] — doctor services + fees. */
  function getDoctorServices(clinicId: string, doctorId: string): Promise<DoctorServicesData> {
    return api.get<DoctorServicesData>(`v1/businesses/${enc(clinicId)}/doctors/${enc(doctorId)}/services`, { auth: true });
  }

  /** GET businesses/{clinicId}/coupons [auth] — clinic coupons. */
  function getClinicCoupons(clinicId: string): Promise<unknown[]> {
    // TODO: the response shape of this endpoint is not specified in the contract.
    return api.get<unknown[]>(`businesses/${enc(clinicId)}/coupons`, { auth: true });
  }

  /** GET facilities/{serviceId} [auth] — service variant detail. */
  function getServiceVariant(serviceId: string): Promise<unknown> {
    // TODO: the response shape of this endpoint is not specified in the contract.
    return api.get<unknown>(`facilities/${enc(serviceId)}`, { auth: true });
  }

  return {
    searchClinics,
    globalSearch,
    resolveClinicDetailTarget,
    getClinicById,
    getClinicBySlug,
    getBranches,
    getDoctorServices,
    getClinicCoupons,
    getServiceVariant,
  };
}

export type ClinicService = ReturnType<typeof createClinicService>;
