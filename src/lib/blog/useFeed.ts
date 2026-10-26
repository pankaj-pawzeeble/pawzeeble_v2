import { useEffect, useState } from 'react';
import { getBlogs, getVlogs } from './api';
import type { Blog, Vlog } from './types';

interface Feed {
  loading: boolean;
  blogs: Blog[];
  vlogs: Vlog[];
  /** true when a request failed (that list is then empty). */
  failed: boolean;
}

let cache: Promise<{ blogs: Blog[]; vlogs: Vlog[]; failed: boolean }> | null = null;

/** Both lists load in parallel and are shared by the home section and the /blog page. */
function load() {
  if (!cache) {
    cache = Promise.allSettled([getBlogs(1, 30), getVlogs()]).then(([b, v]) => ({
      blogs: b.status === 'fulfilled' ? (b.value?.records ?? []) : [],
      vlogs: v.status === 'fulfilled' && Array.isArray(v.value) ? v.value : [],
      failed: b.status === 'rejected' || v.status === 'rejected',
    }));
    // a failed load is not cached, so the next visit tries again
    cache.then((r) => {
      if (r.failed) cache = null;
    });
  }
  return cache;
}

export function useFeed(): Feed {
  const [state, setState] = useState<Feed>({ loading: true, blogs: [], vlogs: [], failed: false });
  useEffect(() => {
    let alive = true;
    load().then((r) => alive && setState({ loading: false, ...r }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
