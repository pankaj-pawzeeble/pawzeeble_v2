import { ApiError, UnsafePayloadError } from './errors';
import type { ApiEnvelope } from './models';

export type QueryValue = string | number | boolean | null | undefined;

export interface RequestOptions {
  /** true → send the stored token. false → send an empty Authorization header. */
  auth?: boolean;
  /** undefined / null values are dropped. */
  query?: Record<string, QueryValue>;
  body?: unknown;
}

export interface ApiClient {
  get<T>(endpoint: string, opts?: RequestOptions): Promise<T>;
  post<T>(endpoint: string, opts?: RequestOptions): Promise<T>;
  patch<T>(endpoint: string, opts?: RequestOptions): Promise<T>;
}

export interface ApiClientOptions {
  /** Read on every request so config changes apply immediately. Endpoints are relative to this. */
  getBaseUrl: () => string;
  /** Raw token (no "Bearer"). */
  getToken: () => string | null | undefined;
  fetchImpl?: typeof fetch;
}

export const GENERIC_ERROR_MESSAGE = 'Something Went Wrong';

/** Matches an HTML tag (`<b>`, `</div>`, `<script src=…>`) or comment. Plain "a < b" is allowed. */
const HTML_TAG = /<\/?[a-z][^>]*>|<!--/i;

/** Returns the path of the first string that contains HTML/script markup, or null when the payload is clean. */
export function findUnsafeString(value: unknown, path = 'body'): string | null {
  if (typeof value === 'string') return HTML_TAG.test(value) ? path : null;
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const hit = findUnsafeString(value[i], `${path}[${i}]`);
      if (hit) return hit;
    }
    return null;
  }
  if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value)) {
      const hit = findUnsafeString(v, `${path}.${key}`);
      if (hit) return hit;
    }
  }
  return null;
}

/** Throws UnsafePayloadError when the payload contains HTML/script tags. */
export function assertSafePayload(payload: unknown): void {
  const hit = findUnsafeString(payload);
  if (hit) throw new UnsafePayloadError(hit);
}

function extractMessage(body: unknown): string | null {
  const m = (body as { message?: unknown } | null)?.message;
  if (Array.isArray(m) && m.length) return m.map(String).join(', ');
  if (typeof m === 'string' && m) return m;
  return null;
}

function buildUrl(baseUrl: string, endpoint: string, query?: Record<string, QueryValue>): string {
  const base = baseUrl.replace(/\/+$/, '');
  const path = endpoint.replace(/^\/+/, '');
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query ?? {})) {
    if (v !== undefined && v !== null) params.append(k, String(v));
  }
  const qs = params.toString();
  return `${base}/${path}${qs ? `?${qs}` : ''}`;
}

/**
 * Minimal HTTP client for the V2 API.
 * - `Authorization: <raw token>`; unauthenticated calls send an empty Authorization.
 * - Unwraps `{ success, message, data }` and resolves to `data`.
 * - Non-2xx → ApiError with the server message; no response → ApiError("Something Went Wrong").
 * - POST/PATCH bodies containing HTML/script tags are rejected before sending.
 */
export function createApiClient(options: ApiClientOptions): ApiClient {
  async function request<T>(method: 'GET' | 'POST' | 'PATCH', endpoint: string, opts: RequestOptions = {}): Promise<T> {
    const hasBody = method !== 'GET';
    if (hasBody) assertSafePayload(opts.body);

    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: (opts.auth && options.getToken()) || '',
    };
    if (hasBody) headers['Content-Type'] = 'application/json';

    const doFetch = options.fetchImpl ?? fetch;
    let res: Response;
    try {
      res = await doFetch(buildUrl(options.getBaseUrl(), endpoint, opts.query), {
        method,
        headers,
        body: hasBody && opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      });
    } catch {
      throw new ApiError(GENERIC_ERROR_MESSAGE);
    }

    const text = await res.text().catch(() => '');
    let parsed: unknown = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }

    if (!res.ok) throw new ApiError(extractMessage(parsed) ?? GENERIC_ERROR_MESSAGE, res.status, parsed);

    // TODO: the contract does not say what to do with a 2xx response where `success` is false. It is passed through unchanged.
    return (parsed as ApiEnvelope<T> | null)?.data as T;
  }

  return {
    get: (endpoint, opts) => request('GET', endpoint, opts),
    post: (endpoint, opts) => request('POST', endpoint, opts),
    patch: (endpoint, opts) => request('PATCH', endpoint, opts),
  };
}
