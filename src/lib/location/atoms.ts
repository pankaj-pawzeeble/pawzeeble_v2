import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { BookingType, LocationArea } from '@/lib/findcare';
import { areaDescription } from '@/lib/findcare/places';
import { encryptedStorage } from './storage';

export interface SavedLocation {
  area?: LocationArea;
  /** The last non-empty area value. */
  description?: string;
  place_id?: string;
}

export interface LatLong {
  latitude: number;
  longitude: number;
}

/** Saved location, persisted (encrypted) under the "location" key. */
export const locationAtom = atomWithStorage<SavedLocation>('location', {}, encryptedStorage);

/** Coordinates the clinic list searches around. 0/0 means "not chosen yet". */
export const locationLatLongAtom = atomWithStorage<LatLong>('locationLatLong', { latitude: 0, longitude: 0 }, encryptedStorage);

/** Write-only: locationLatLongAtom.set(lat, lng). */
export const setLocationLatLongAtom = atom(null, (_get, set, latitude: number, longitude: number) => {
  set(locationLatLongAtom, { latitude, longitude });
});

/** Write-only: saves area, description (last non-empty area value) and place_id. */
export const setLocationAreaAtom = atom(null, (_get, set, area: LocationArea | undefined, placeId?: string) => {
  set(locationAtom, { area, description: areaDescription(area), place_id: placeId });
});

/** Location dialog open state. */
export const locationOpenAtom = atom(false);
export const setLocationOpenAtom = atom(null, (_get, set, open: boolean) => set(locationOpenAtom, open));

/** 'Visit' by default; 'Online Consultation' adds oc=true to the clinic search. */
export const bookingTypeAtom = atom<BookingType>('Visit');
