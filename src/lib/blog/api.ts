import { getV2BaseUrl } from '@/lib/findcare/config';
import type { Blog, BusinessBlog, BusinessVlog, Page, Vlog } from './types';

/** All blog and vlog endpoints are public GETs: no Authorization header. */
async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${getV2BaseUrl().replace(/\/+$/, '')}/${path}`, { headers: { Accept: 'application/json' } });
  const body = (await res.json().catch(() => null)) as { success?: boolean; message?: string; data?: T } | null;
  if (!res.ok || !body || body.success === false) throw new Error(body?.message || 'Something Went Wrong');
  return body.data as T;
}

/** The date range is part of the existing helper's contract and is kept as is. */
const START_DATE = '2022-08-01';
const END_DATE = '2023-03-16';

export const getBlogs = (page = 1, limit = 30) => get<Page<Blog>>(`blogs?page=${page}&limit=${limit}&startDate=${START_DATE}&endDate=${END_DATE}`);

export const getBlogDetail = (id: string) => get<Blog>(`blogs/${encodeURIComponent(id)}`);

export const getVlogs = () => get<Vlog[]>('master-data/vlogs');

export const BUSINESS_PAGE_SIZE = 10;

export const getBusinessBlogs = (clinicName: string, page = 1) =>
  get<Page<BusinessBlog>>(`blogs/business-page-settings/${encodeURIComponent(clinicName)}?page=${page}&limit=${BUSINESS_PAGE_SIZE}`);

export const getBusinessVlogs = (clinicName: string, page = 1) =>
  get<Page<BusinessVlog>>(`vlogs/business-page-settings/${encodeURIComponent(clinicName)}?page=${page}&limit=${BUSINESS_PAGE_SIZE}`);

export const getBusinessBlogDetail = (id: string) => get<BusinessBlog>(`blogs/${encodeURIComponent(id)}`);
