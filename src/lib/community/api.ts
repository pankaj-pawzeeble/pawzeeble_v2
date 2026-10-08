import axios, { type AxiosProgressEvent, type AxiosRequestConfig } from 'axios';
import { getToken } from '@/lib/pawteckt/api';
import type { CnResult, Pawst, ReportPayload, ToggleLikePayload } from './types';

/* ------------------------------------------------------------------ http */

const trimSlash = (s: string) => s.replace(/\/+$/, '');

/** `cn/...` endpoints. The community API sends `access-control-allow-origin: *`, so no dev proxy is needed. */
const communityClient = axios.create({ baseURL: trimSlash(process.env.NEXT_PUBLIC_V2_COMMUNITY_BASE_URL || ''), timeout: 20000 });

/** Main API (signed media URLs). Same dev proxy as lib/pawteckt/api.ts. */
const mainClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/v2-proxy' : trimSlash(process.env.NEXT_PUBLIC_V2_BASE_URL || ''),
  timeout: 20000,
});

/** Raw token, no "Bearer". Guests send an empty string. A custom `headers` object replaces it entirely. */
function authConfig(isAuth: boolean, headers?: Record<string, string>): AxiosRequestConfig {
  if (headers) return { headers };
  return { headers: { Authorization: (isAuth && getToken()) || '' } };
}

/** Resolves to the server body `{ success, message, data }`; rejects with the server error body. */
async function call<T>(
  client: typeof communityClient,
  method: 'get' | 'post' | 'patch' | 'delete',
  endpoint: string,
  opts: { payload?: unknown; isAuth: boolean; headers?: Record<string, string>; onUploadProgress?: (e: AxiosProgressEvent) => void },
): Promise<T> {
  try {
    const config = { ...authConfig(opts.isAuth, opts.headers), url: `/${endpoint}`, method, data: opts.payload, onUploadProgress: opts.onUploadProgress };
    const res = await client.request<T>(config);
    return res.data;
  } catch (error) {
    const e = error as { response?: { data?: unknown } };
    if (!e.response) throw { message: 'Something Went Wrong' };
    throw e.response.data;
  }
}

function failure(e: unknown): { success: false; message: string; data: null } {
  const raw = typeof e === 'string' ? e : (e as { message?: unknown } | null)?.message;
  const message = Array.isArray(raw) ? raw.map(String).join(', ') : typeof raw === 'string' && raw ? raw : 'Something went wrong';
  return { success: false, message, data: null };
}

/** Wraps a call so it resolves to `{ success:false, ... }` instead of throwing. */
async function safe<T>(run: () => Promise<CnResult<T>>): Promise<CnResult<T>> {
  try {
    const res = await run();
    return res && typeof res === 'object' && 'success' in res ? res : failure(res);
  } catch (e) {
    return failure(e);
  }
}

const cn = {
  get: <T>(endpoint: string, isAuth = false) => call<CnResult<T>>(communityClient, 'get', endpoint, { isAuth }),
  post: <T>(endpoint: string, payload: unknown, isAuth = true) => call<CnResult<T>>(communityClient, 'post', endpoint, { payload, isAuth }),
  patch: <T>(endpoint: string, payload: unknown, isAuth = true) => call<CnResult<T>>(communityClient, 'patch', endpoint, { payload, isAuth }),
  del: <T>(endpoint: string, isAuth = true) => call<CnResult<T>>(communityClient, 'delete', endpoint, { isAuth }),
};

/* ------------------------------------------------------------------ feed */

export const FEED_PAGE_SIZE = 5;

/** Guests can read the feed (no auth). */
export const getPawsts = (page = 1, size = FEED_PAGE_SIZE) => safe<Pawst[]>(() => cn.get(`cn/feeds?page=${page}&size=${size}`));

export const getPawstsById = (pawstId: string) => safe<Pawst>(() => cn.get(`cn/feeds/${pawstId}`));

export const getPawstByUserId = (userId: string, page = 1, size = 10) =>
  safe<Pawst[]>(() => cn.get(`cn/pawsts/${userId}?page=${page}&size=${size}`, true));

export const getPawstByPetId = (petId: string, page = 1, size = 10) =>
  safe<Pawst[]>(() => cn.get(`cn/pawsts/pets/${petId}?page=${page}&size=${size}`, true));

/** Notification deep-link. Singular `pawst`, and (unlike the rest) served by the MAIN base URL. */
export const getPostDetailById = (postId: string) => safe<Pawst>(() => call(mainClient, 'get', `cn/pawst/${postId}`, { isAuth: true }));

/* --------------------------------------------------------------- pawsts */

/** Throws on failure (the caller handles `.catch`). Fields: `medias[]`, `sharedPawstId?`, `words`, `forPetIds[]`. */
export const uploadPawst = (formData: FormData, onUploadProgress?: (percent: number) => void) =>
  call<CnResult<Pawst>>(communityClient, 'post', 'cn/pawsts', {
    payload: formData,
    isAuth: true,
    onUploadProgress: onUploadProgress ? (e) => onUploadProgress(Math.floor((e.loaded / (e.total || 1)) * 100)) : undefined,
  });

/** Only `words` is editable; `forPetIds` is never sent. */
export const updatePawst = (payload: { words: string }, pawstId: string) => safe<Pawst>(() => cn.patch(`cn/pawsts/${pawstId}`, payload));

export const deletePawst = (pawstId: string) => safe<unknown>(() => cn.del(`cn/pawsts/${pawstId}`));

/* ------------------------------------------------- comments and replies */

export const postComment = (payload: { words: string }, pawstId: string) => safe<Pawst>(() => cn.post(`cn/comments/${pawstId}`, payload));

export const updateComment = (payload: { words: string }, pawstId: string, commentId: string) =>
  safe<Pawst>(() => cn.patch(`cn/comments/${pawstId}/${commentId}`, payload));

export const deleteComment = (pawstId: string, commentId: string) => safe<Pawst>(() => cn.del(`cn/comments/${pawstId}/${commentId}`));

export const postReply = (payload: { words: string }, pawstId: string, commentId: string) =>
  safe<Pawst>(() => cn.post(`cn/replies/${pawstId}/${commentId}`, payload));

export const updateReply = (payload: { words: string }, pawstId: string, commentId: string, replyId: string) =>
  safe<Pawst>(() => cn.patch(`cn/replies/${pawstId}/${commentId}/${replyId}`, payload));

export const deleteReply = (pawstId: string, commentId: string, replyId: string) =>
  safe<Pawst>(() => cn.del(`cn/replies/${pawstId}/${commentId}/${replyId}`));

/* ---------------------------------------------------------------- likes */

/** Picks the endpoint from the payload: reply, comment, or pawst. */
export function toggleLike(payload: ToggleLikePayload) {
  const endpoint = payload.comment_id ? (payload.reply_id ? 'cn/toggle_like_reply' : 'cn/toggle_like_comment') : 'cn/toggle_like_pawst';
  return safe<Pawst>(() => cn.patch(endpoint, payload));
}

/** `state` for a like toggle: 1 (like) unless the user already appears in the target's `likedBy`. */
export const likeStateFor = (likedBy: { byId: string }[], userId: string): 0 | 1 => (likedBy.some((l) => l.byId === userId) ? 0 : 1);

/* --------------------------------------------------------------- report */

export const reportCommunityPost = (payload: ReportPayload) => safe<unknown>(() => cn.post('cn/reports', payload));

/* ------------------------------------------------------- signed media */

/** Only URLs on this host need signing; anything else is used as-is. */
const SIGNED_HOST = 'pawzeeble-dev.s3.ap-south-1.amazonaws.com';
const SIGNED_TTL_MS = 5 * 60 * 1000;
const SIGNED_MAX_ENTRIES = 200;

export const needsSigning = (url: string) => url.includes(SIGNED_HOST);

const signedCache = new Map<string, { url: string; expires: number }>();
const signedInflight = new Map<string, Promise<string | null>>();

/** `private` + auth when logged in, `public` for guests. Cached in memory for 5 minutes (max 200 entries). */
export function getSignedURL(src: string, isDownload = false, isExtension = false): Promise<string | null> {
  const key = `${src}|${isDownload}|${isExtension}`;
  const hit = signedCache.get(key);
  if (hit && hit.expires > Date.now()) return Promise.resolve(hit.url);
  const pending = signedInflight.get(key);
  if (pending) return pending;

  const isAuth = !!getToken();
  const params = new URLSearchParams({ url: src });
  if (isDownload) params.set('mode', 'download');
  if (isExtension) params.set('extension', 'true');

  const request = call<{ data?: string }>(mainClient, 'get', `url/${isAuth ? 'private' : 'public'}/s3signed?${params}`, { isAuth })
    .then((res) => {
      const url = typeof res?.data === 'string' ? res.data : null;
      if (url) {
        signedCache.delete(key);
        signedCache.set(key, { url, expires: Date.now() + SIGNED_TTL_MS });
        if (signedCache.size > SIGNED_MAX_ENTRIES) signedCache.delete(signedCache.keys().next().value as string);
      }
      return url;
    })
    .catch(() => null)
    .finally(() => signedInflight.delete(key));
  signedInflight.set(key, request);
  return request;
}
