import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSite } from '@/hooks/useSite';
import { clinicService, NotFoundError, type Doctor, type EnterpriseDetails } from '@/lib/findcare';

/** Doctors are paginated; this is the page size. */
const DOCTORS_PAGE_SIZE = 6;

/** Display strings and map point derived from the loaded clinic. */
export interface ClinicPlace {
  /** "Street, Area, City 411021" */
  address: string;
  /** "Area, City" */
  areaCity: string;
  /** [lat, lng] — the API stores coordinates as [lng, lat]. */
  center: [number, number] | null;
}

const join = (parts: (string | undefined)[]) => {
  const out: string[] = [];
  for (const p of parts.map((x) => x?.trim()).filter((x): x is string => Boolean(x))) {
    if (!out.join(', ').toLowerCase().includes(p.toLowerCase())) out.push(p);
  }
  return out.join(', ');
};

export function clinicPlace(c: EnterpriseDetails): ClinicPlace {
  const [lng, lat] = c.geoLocation?.coordinates ?? [];
  const street = join([c.address, c.area, c.city]);
  return {
    address: c.pincode && !street.includes(c.pincode) ? `${street} ${c.pincode}` : street,
    areaCity: join([c.area, c.city]),
    center: Number.isFinite(lat) && Number.isFinite(lng) && (lat || lng) ? [lat, lng] : null,
  };
}

export interface ClinicData {
  /** false when the URL has no slug / id: the page then keeps its static design content. */
  live: boolean;
  loading: boolean;
  notFound: boolean;
  error: string | null;
  clinic: EnterpriseDetails | null;
  /** Derived from `clinic`; null until loaded. */
  place: ClinicPlace | null;
  doctors: Doctor[];
  totalDoctors: number;
  hasMoreDoctors: boolean;
  loadingMoreDoctors: boolean;
  loadMoreDoctors: () => void;
  retry: () => void;
  /** Slot booking starts from a doctor: the slots shown are that doctor's own schedule. */
  selectedDoctorId: string | null;
  selectDoctor: (id: string | null) => void;
}

const STATIC: ClinicData = {
  live: false,
  loading: false,
  notFound: false,
  error: null,
  clinic: null,
  place: null,
  doctors: [],
  totalDoctors: 0,
  hasMoreDoctors: false,
  loadingMoreDoctors: false,
  loadMoreDoctors: () => {},
  retry: () => {},
  selectedDoctorId: null,
  selectDoctor: () => {},
};

const ClinicDataContext = createContext<ClinicData>(STATIC);
export const useClinicData = () => useContext(ClinicDataContext);

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/**
 * Loads the clinic for /find-care/clinic/{slug} (GET businesses/business-page-settings/{slug})
 * or /find-care/clinic?id={id} (GET businesses/{id}), including its paginated doctor list.
 */
export function ClinicDataProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const v = useSite();
  const slug = first(router.query.slug);
  const id = first(router.query.id);
  const live = Boolean(slug || id);

  const [state, setState] = useState<Omit<ClinicData, 'loadMoreDoctors' | 'retry' | 'live' | 'place' | 'selectedDoctorId' | 'selectDoctor'>>({
    loading: true,
    notFound: false,
    error: null,
    clinic: null,
    doctors: [],
    totalDoctors: 0,
    hasMoreDoctors: false,
    loadingMoreDoctors: false,
  });
  const [selectedDoctorId, selectDoctor] = useState<string | null>(null);
  const pageRef = useRef(1);
  const runRef = useRef(0);
  const [attempt, setAttempt] = useState(0);
  const setClinicAssured = v.setClinicAssured as ((assured: boolean) => void) | undefined;
  const setClinicGeo = v.setClinicGeo as ((geo: { center: [number, number] | null; name: string } | null) => void) | undefined;

  const fetchPage = useCallback(
    (page: number) => (slug ? clinicService.getClinicBySlug(slug, page, DOCTORS_PAGE_SIZE) : clinicService.getClinicById(id as string, page, DOCTORS_PAGE_SIZE)),
    [slug, id],
  );

  useEffect(() => {
    if (!router.isReady || !live) return;
    const run = ++runRef.current;
    pageRef.current = 1;
    fetchPage(1)
      .then((data) => {
        if (run !== runRef.current) return;
        const doctors = data.doctorList?.doctors ?? [];
        const total = data.doctorList?.totalRecordCount ?? doctors.length;
        setState({
          loading: false,
          notFound: false,
          error: null,
          clinic: data.enterpriseDetails,
          doctors,
          totalDoctors: total,
          hasMoreDoctors: doctors.length < total,
          loadingMoreDoctors: false,
        });
        setClinicAssured?.(Boolean(data.enterpriseDetails?.isAssurancePartner));
        const place = data.enterpriseDetails ? clinicPlace(data.enterpriseDetails) : null;
        setClinicGeo?.(place ? { center: place.center, name: data.enterpriseDetails.businessName || data.enterpriseDetails.name } : null);
      })
      .catch((e: unknown) => {
        if (run !== runRef.current) return;
        const notFound = e instanceof NotFoundError || (e as { status?: number })?.status === 404;
        setState((s) => ({ ...s, loading: false, notFound, error: notFound ? null : e instanceof Error ? e.message : 'Something Went Wrong' }));
      });
    return () => {
      runRef.current++;
      setClinicGeo?.(null);
    };
    // setClinicAssured is recreated on every controller render; it must not retrigger the fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, live, fetchPage, attempt]);

  const loadMoreDoctors = useCallback(() => {
    const run = runRef.current;
    const next = pageRef.current + 1;
    setState((s) => ({ ...s, loadingMoreDoctors: true }));
    fetchPage(next)
      .then((data) => {
        if (run !== runRef.current) return;
        pageRef.current = next;
        setState((s) => {
          const doctors = [...s.doctors, ...(data.doctorList?.doctors ?? [])];
          const total = data.doctorList?.totalRecordCount ?? s.totalDoctors;
          return { ...s, doctors, totalDoctors: total, hasMoreDoctors: doctors.length < total, loadingMoreDoctors: false };
        });
      })
      .catch(() => {
        if (run === runRef.current) setState((s) => ({ ...s, loadingMoreDoctors: false }));
      });
  }, [fetchPage]);

  const retry = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    setAttempt((n) => n + 1);
  }, []);

  const value: ClinicData = live
    ? { ...state, live, place: state.clinic ? clinicPlace(state.clinic) : null, loadMoreDoctors, retry, selectedDoctorId, selectDoctor }
    : STATIC;

  return <ClinicDataContext.Provider value={value}>{children}</ClinicDataContext.Provider>;
}
