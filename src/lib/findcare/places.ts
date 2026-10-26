import type { ApiClient } from './apiClient';

const enc = encodeURIComponent;

/* ------------------------------------------------------------- models */

export interface PlacePrediction {
  description: string;
  place_id: string;
  [key: string]: unknown;
}

export interface GeocodeComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/** Response of GET geocode/places. */
export interface GeocodeResult {
  address_components: GeocodeComponent[];
  formatted_address: string;
  geometry?: { location?: { lat: number; lng: number } };
  place_id: string;
}

export interface LocationArea {
  city?: string;
  locality?: string;
  subLocality?: string;
  subLocalityLevel1?: string;
}

export interface ResolvedLocation {
  position: { coords: { latitude: number; longitude: number } };
  area?: LocationArea;
  place_id?: string;
}

/* ------------------------------------------------------------ helpers */

/**
 * Area from a geocode result: formatted_address, with "<plus_code>, " removed when address_components has a plus_code.
 * The same string is used for city, locality, subLocality and subLocalityLevel1.
 */
export function buildArea(geocode: GeocodeResult | undefined): LocationArea | undefined {
  if (!geocode?.formatted_address) return undefined;
  let address = geocode.formatted_address;
  const plusCode = geocode.address_components?.find((c) => c.types?.includes('plus_code'));
  if (plusCode) address = address.replace(`${plusCode.long_name}, `, '');
  return { city: address, locality: address, subLocality: address, subLocalityLevel1: address };
}

/** The last non-empty area value (used as the saved location's description). */
export function areaDescription(area: LocationArea | undefined): string {
  if (!area) return '';
  const values = [area.city, area.locality, area.subLocality, area.subLocalityLevel1].filter((v): v is string => Boolean(v));
  return values[values.length - 1] ?? '';
}

const logError = (what: string, e: unknown) => console.error(`[places] ${what} failed`, e);

/* ------------------------------------------------------------ service */

/** Address autocomplete + geocoding. Every helper logs errors and returns undefined instead of throwing. */
export function createPlacesService(api: ApiClient) {
  /** GET master-data/places/search/{q}?sessiontoken={token} [auth] — address suggestions. */
  async function searchPlaces(q: string, sessionToken: string): Promise<PlacePrediction[] | undefined> {
    try {
      return await api.get<PlacePrediction[]>(`master-data/places/search/${enc(q)}`, { auth: true, query: { sessiontoken: sessionToken } });
    } catch (e) {
      logError('searchPlaces', e);
      return undefined;
    }
  }

  /** GET master-data/places/lat-lng/{placeId}?sessiontoken={token} [auth] — data.geometry.location.{lat,lng}. */
  async function getPlaceCoordinates(placeId: string, sessionToken: string): Promise<{ lat: number; lng: number } | undefined> {
    try {
      const data = await api.get<{ geometry?: { location?: { lat: number; lng: number } } }>(`master-data/places/lat-lng/${enc(placeId)}`, {
        auth: true,
        query: { sessiontoken: sessionToken },
      });
      return data?.geometry?.location;
    } catch (e) {
      logError('getPlaceCoordinates', e);
      return undefined;
    }
  }

  /** GET geocode/places?lat&lng [auth] — { address_components, formatted_address, geometry, place_id }. */
  async function reverseGeocode(lat: number, lng: number): Promise<GeocodeResult | undefined> {
    try {
      // TODO: assumes the geocode payload is the envelope's `data`; the contract shows only the inner shape.
      return await api.get<GeocodeResult>('geocode/places', { auth: true, query: { lat, lng } });
    } catch (e) {
      logError('reverseGeocode', e);
      return undefined;
    }
  }

  /** Selected suggestion → coordinates (lat-lng) → area (geocode). Missing coordinates fall back to 0, a missing area to undefined. */
  async function resolvePlace(placeId: string, sessionToken: string): Promise<ResolvedLocation> {
    const loc = await getPlaceCoordinates(placeId, sessionToken);
    const latitude = loc?.lat ?? 0;
    const longitude = loc?.lng ?? 0;
    const geocode = loc ? await reverseGeocode(latitude, longitude) : undefined;
    return { position: { coords: { latitude, longitude } }, area: buildArea(geocode), place_id: geocode?.place_id };
  }

  /** "Locate me": device coordinates → area (geocode). */
  async function resolveCoordinates(latitude: number, longitude: number): Promise<ResolvedLocation> {
    const geocode = await reverseGeocode(latitude, longitude);
    return { position: { coords: { latitude, longitude } }, area: buildArea(geocode), place_id: geocode?.place_id };
  }

  return { searchPlaces, getPlaceCoordinates, reverseGeocode, resolvePlace, resolveCoordinates };
}

export type PlacesService = ReturnType<typeof createPlacesService>;
