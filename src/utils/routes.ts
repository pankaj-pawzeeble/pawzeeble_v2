import type { ParsedUrlQuery } from 'querystring';
import type { RouteState } from '@/types/site';

/** Internal page keys used by SiteController, mapped to Next.js routes. */
export const PAGE_ROUTES: Record<string, string> = {
  home: '/',
  ecosystem: '/ecosystem',
  ecosystem1: '/ecosystem',
  journey: '/journey',
  about: '/about',
  community: '/community',
  skale: '/skale',
  pawzmart: '/pawzmart',
  download: '/download',
  care: '/find-care',
  clinic: '/find-care/clinic',
  groomer: '/find-care/groomer',
  blog: '/blog',
  post: '/blog/post',
  pawteckt: '/pawteckt',
};

const PATH_TO_PAGE: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_ROUTES)
    .filter(([page]) => page !== 'ecosystem1')
    .map(([page, path]) => [path, page]),
);

export const routeFor = (page?: string) => (page && PAGE_ROUTES[page]) || '/';

export function pageFromPath(pathname: string): string {
  return PATH_TO_PAGE[pathname] ?? 'home';
}

export function routeStateFrom(pathname: string, query: ParsedUrlQuery): RouteState {
  const state: RouteState = { page: pageFromPath(pathname) };
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const type = Array.isArray(query.type) ? query.type[0] : query.type;
  if (state.page === 'post' && id != null && id !== '' && !Number.isNaN(Number(id))) state.blogPost = Number(id);
  if ((state.page === 'clinic' || state.page === 'groomer') && (type === 'assured' || type === 'regular')) state.clinicType = type;
  return state;
}

export function urlForState(st: { page?: string; blogPost?: number | null; clinicType?: string | null }): string {
  const base = routeFor(st.page);
  if (st.page === 'post' && st.blogPost != null) return `${base}?id=${st.blogPost}`;
  if ((st.page === 'clinic' || st.page === 'groomer') && st.clinicType) return `${base}?type=${st.clinicType}`;
  return base;
}
