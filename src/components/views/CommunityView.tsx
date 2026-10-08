import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ClansCard from '@/components/sections/community/ClansCard';
import { DownloadGateProvider } from '@/components/sections/community/DownloadGate';
import PostCard from '@/components/sections/community/PostCard';
import UnlockCard from '@/components/sections/community/UnlockCard';
import ViewOnlyCard from '@/components/sections/community/ViewOnlyCard';
import { SAMPLE_CLANS, SAMPLE_POSTS } from '@/lib/community/data';
import { pawstToPost } from '@/lib/community/mappers';
import { getPawstListAtom, isPageAtom, isPawstLoadingAtom, pawstListAtom, resetFeedAtom } from '@/lib/community/store';

/** View-only mode shows a teaser: more posts are behind the app download (UnlockCard). */
const FEED_CAP = 12;
const NEAR_BOTTOM_PX = 600;
const THROTTLE_MS = 1200;

const nearBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - NEAR_BOTTOM_PX;

export default function CommunityView() {
  const store = useStore();
  const list = useAtomValue(pawstListAtom);
  const loading = useAtomValue(isPawstLoadingAtom);
  const fetchPage = useSetAtom(getPawstListAtom);
  const reset = useSetAtom(resetFeedAtom);
  const [attempted, setAttempted] = useState(false);
  const lastLoad = useRef(0);

  // reads live state from the store, so listeners never see stale values
  const loadMore = useCallback(() => {
    const now = Date.now();
    const canLoad = store.get(isPageAtom) && !store.get(isPawstLoadingAtom) && store.get(pawstListAtom).length < FEED_CAP;
    if (!canLoad || now - lastLoad.current < THROTTLE_MS) return;
    lastLoad.current = now;
    fetchPage();
  }, [store, fetchPage]);

  // first page, then reset on leave so the next visit starts from page 1
  useEffect(() => {
    lastLoad.current = Date.now();
    fetchPage().finally(() => setAttempted(true));
    return () => reset();
  }, [fetchPage, reset]);

  // infinite scroll until the teaser cap is filled
  useEffect(() => {
    const onScroll = () => nearBottom() && loadMore();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore]);

  // a short page can leave the bottom in view without any scroll event
  useEffect(() => {
    if (attempted && !loading && nearBottom()) loadMore();
  }, [attempted, loading, list.length, loadMore]);

  const posts = useMemo(() => {
    if (list.length > 0) return list.slice(0, FEED_CAP).map(pawstToPost);
    return attempted ? SAMPLE_POSTS.slice(0, FEED_CAP) : [];
  }, [list, attempted]);

  return (
    <DownloadGateProvider>
      <main style={{ background: '#FFFCF6', padding: 'clamp(20px, 4vw, 40px) 16px 120px' }}>
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <ViewOnlyCard />
          <ClansCard clans={SAMPLE_CLANS} />
          {posts.map((p) => (
            <PostCard post={p} key={p.id} />
          ))}
          <UnlockCard />
        </div>
      </main>
    </DownloadGateProvider>
  );
}
