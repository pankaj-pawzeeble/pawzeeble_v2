import type { Blog, FeedItem, Vlog } from './types';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const parts = (iso?: string) => {
  const d = new Date(iso ?? '');
  return Number.isNaN(d.getTime()) ? null : d;
};

/** 16-March-2023 */
export function dateDashed(iso?: string): string {
  const d = parts(iso);
  return d ? `${String(d.getDate()).padStart(2, '0')}-${MONTHS[d.getMonth()]}-${d.getFullYear()}` : '';
}

/** 16 March 2023 */
export function dateLong(iso?: string): string {
  const d = parts(iso);
  return d ? `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : '';
}

/** Short description with the HTML tags removed. */
export const stripHtml = (html = ''): string => html.replace(/(<([^>]+)>)/gi, '');

/**
 * Article bodies are HTML written in the admin; this drops what should never run in a visitor's browser
 * (script/style blocks, inline event handlers, javascript: links) before it is injected.
 */
export function sanitizeHtml(html = ''): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1=$2#$2');
}

/** Private videos are never shown. Newest first. */
export const publicVlogs = (vlogs: Vlog[]): Vlog[] =>
  vlogs.filter((v) => v.title !== 'Private video').sort((a, b) => Date.parse(b.videoPublishedAt) - Date.parse(a.videoPublishedAt));

/** Blogs and vlogs in one list, newest first. */
export function mergeFeed(blogs: Blog[], vlogs: Vlog[]): FeedItem[] {
  const items: FeedItem[] = [
    ...blogs.map((blog) => ({ kind: 'blog' as const, blog, date: Date.parse(blog.publishedDate) || 0 })),
    ...publicVlogs(vlogs).map((vlog) => ({ kind: 'vlog' as const, vlog, date: Date.parse(vlog.videoPublishedAt) || 0 })),
  ];
  return items.sort((a, b) => b.date - a.date);
}
