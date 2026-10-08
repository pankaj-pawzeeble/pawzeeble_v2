import { atom } from 'jotai';
import { FEED_PAGE_SIZE, getPawsts } from './api';
import type { Pawst } from './types';

/** The feed list. */
export const pawstListAtom = atom<Pawst[]>([]);
/** The next page to fetch. */
export const pageAtom = atom(1);
/** `true` while more pages exist. */
export const isPageAtom = atom(true);
/** A page fetch is in flight. */
export const isPawstLoadingAtom = atom(false);

const MAX_LIST = 1000;

/** Fetches the next feed page. Failures are silent (logged only): no error state, no retry. */
export const getPawstListAtom = atom(null, async (get, set) => {
  if (!get(isPageAtom) || get(isPawstLoadingAtom)) return;
  set(isPawstLoadingAtom, true);
  try {
    const page = get(pageAtom);
    const res = await getPawsts(page);
    if (res.success) {
      const data = Array.isArray(res.data) ? res.data : [];
      // race guard: only apply if the page did not change while awaiting
      if (page === get(pageAtom)) {
        const next = page === 1 ? [...data] : [...get(pawstListAtom), ...data];
        set(pawstListAtom, next.length > MAX_LIST ? next.slice(-MAX_LIST) : next);
        if (data.length < FEED_PAGE_SIZE) set(isPageAtom, false);
        else set(pageAtom, page + 1);
      }
    } else {
      console.log('Could not load the community feed:', res.message);
    }
  } catch (e) {
    console.log('Could not load the community feed:', e);
  } finally {
    set(isPawstLoadingAtom, false);
  }
});

/** Generic "replace this pawst with the server's copy": used after every like/comment/reply/edit mutation. */
export const replacePawstAtom = atom(null, (get, set, pawst: Pawst) => {
  set(pawstListAtom, get(pawstListAtom).map((p) => (p._id === pawst._id ? pawst : p)));
});

export const deletePawstAtom = atom(null, (get, set, pawstId: string) => {
  set(pawstListAtom, get(pawstListAtom).filter((p) => p._id !== pawstId));
});

/** Run on unmount so the next visit starts from page 1. */
export const resetFeedAtom = atom(null, (_get, set) => {
  set(pawstListAtom, []);
  set(pageAtom, 1);
  set(isPageAtom, true);
});
