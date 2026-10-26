import { useCallback, useEffect, useRef, useState } from 'react';
import { clinicService, type BookingType, type Clinic } from '@/lib/findcare';

interface ClinicResultsState {
  records: Clinic[];
  total: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const IDLE: ClinicResultsState = { records: [], total: 0, hasMore: false, loading: false, error: null };

export interface ClinicQuery {
  latitude: number;
  longitude: number;
  bookingType: BookingType;
  /** 'clinic' (default) or 'groomer'. */
  entType?: 'clinic' | 'groomer';
  /** Free-text search (optional). */
  q?: string;
}

/**
 * Loads the clinic grid from GET businesses around the chosen coordinates. Reloads (page 1) whenever latitude, longitude,
 * booking type or q change; "load more" appends. Does nothing while `enabled` is false or the coordinates are 0/0.
 */
export function useClinicResults({ latitude, longitude, bookingType, entType = 'clinic', q }: ClinicQuery, enabledFlag: boolean) {
  const enabled = enabledFlag && Boolean(latitude) && Boolean(longitude);
  const [state, setState] = useState<ClinicResultsState>(IDLE);
  const pageRef = useRef(1);
  const runRef = useRef(0);
  const recordsRef = useRef<Clinic[]>([]);

  const load = useCallback(
    async (page: number) => {
      const run = ++runRef.current;
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const res = await clinicService.searchClinics({
          lat: latitude,
          lng: longitude,
          q,
          page,
          bookingType,
          entType,
          loaded: page > 1 ? recordsRef.current : [],
        });
        if (run !== runRef.current) return;
        pageRef.current = page;
        recordsRef.current = res.records;
        setState({ records: res.records, total: res.totalRecordCount, hasMore: res.hasMore, loading: false, error: null });
      } catch (e) {
        if (run !== runRef.current) return;
        setState((s) => ({ ...s, loading: false, error: e instanceof Error ? e.message : 'Something Went Wrong' }));
      }
    },
    [latitude, longitude, bookingType, entType, q],
  );

  useEffect(() => {
    recordsRef.current = [];
    pageRef.current = 1;
    if (!enabled) {
      runRef.current++;
      setState(IDLE);
      return;
    }
    setState({ ...IDLE, loading: true });
    load(1);
    return () => {
      runRef.current++;
    };
  }, [enabled, load]);

  return {
    ...state,
    hasLocation: Boolean(latitude) && Boolean(longitude),
    loadMore: () => load(pageRef.current + 1),
    retry: () => load(pageRef.current),
  };
}
