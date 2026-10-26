import { vi } from 'vitest';
import { createApiClient } from '../apiClient';

export interface Call {
  url: URL;
  method: string;
  headers: Record<string, string>;
  body: unknown;
}

type Responder = (call: Call) => { status?: number; body?: unknown } | undefined;

/** API client backed by a mocked fetch. `respond` maps a call to `{ status, body }`; default is 200 with `{ data: null }`. */
export function mockApi(respond: Responder = () => undefined, token: string | null = 'tok123') {
  const calls: Call[] = [];
  const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const call: Call = {
      url: new URL(String(input)),
      method: init?.method ?? 'GET',
      headers: (init?.headers ?? {}) as Record<string, string>,
      body: init?.body ? JSON.parse(String(init.body)) : undefined,
    };
    calls.push(call);
    const r = respond(call) ?? {};
    const status = r.status ?? 200;
    const body = 'body' in r ? r.body : { success: true, message: 'ok', data: null };
    return new Response(JSON.stringify(body), { status });
  }) as unknown as typeof fetch;

  const api = createApiClient({ getBaseUrl: () => 'https://api.test/', getToken: () => token, fetchImpl });
  return { api, calls, fetchImpl };
}

export const ok = <T>(data: T) => ({ body: { success: true, message: 'ok', data } });
