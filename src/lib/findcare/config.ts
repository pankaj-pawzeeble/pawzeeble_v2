import { getToken } from '@/lib/pawteckt/api';

/**
 * V2 base URL (dev: https://dev-apiv2.pawzeeble.com/), read from NEXT_PUBLIC_V2_BASE_URL.
 * In the browser during `next dev` the existing same-origin `/v2-proxy` rewrite is used (see next.config.ts) because the API
 * sends no CORS headers for localhost.
 */
export function getV2BaseUrl(): string {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') return '/v2-proxy';
  return process.env.NEXT_PUBLIC_V2_BASE_URL || '';
}

/** Raw stored token (no "Bearer"), or null for guests. */
export const getAuthToken = (): string | null => getToken();
