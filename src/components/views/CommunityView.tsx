import { useEffect, useState } from 'react';
import ClansCard from '@/components/sections/community/ClansCard';
import { DownloadGateProvider } from '@/components/sections/community/DownloadGate';
import PostCard from '@/components/sections/community/PostCard';
import UnlockCard from '@/components/sections/community/UnlockCard';
import ViewOnlyCard from '@/components/sections/community/ViewOnlyCard';
import { SAMPLE_CLANS, SAMPLE_POSTS, getCommunityFeed, type Clan, type CommunityPost } from '@/lib/community/data';

export default function CommunityView() {
  const [posts, setPosts] = useState<CommunityPost[]>(SAMPLE_POSTS);
  const [clans, setClans] = useState<Clan[]>(SAMPLE_CLANS);

  useEffect(() => {
    let alive = true;
    getCommunityFeed()
      .then((feed) => {
        if (!alive) return;
        setPosts(feed.posts.slice(0, 12));
        setClans(feed.clans);
      })
      .catch((e) => console.error('Could not load the community feed', e));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <DownloadGateProvider>
      <main style={{ background: '#FFFCF6', padding: 'clamp(20px, 4vw, 40px) 16px 120px' }}>
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <ViewOnlyCard />
          <ClansCard clans={clans} />
          {posts.map((p) => (
            <PostCard post={p} key={p.id} />
          ))}
          <UnlockCard />
        </div>
      </main>
    </DownloadGateProvider>
  );
}
