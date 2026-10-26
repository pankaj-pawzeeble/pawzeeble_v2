import Router from 'next/router';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { dateLong, mergeFeed, publicVlogs } from '@/lib/blog/format';
import { selectedVlogAtom } from '@/lib/blog/store';
import type { Blog, FeedItem, Vlog } from '@/lib/blog/types';
import { useFeed } from '@/lib/blog/useFeed';
import { blogCardProps, blogStyles as styles, Card, EmptyState, FeedCard, SkeletonGrid, VideoPlayer, vlogCardProps } from './BlogParts';

type Tab = 'All' | 'Blogs' | 'Vlogs';
const TABS: Tab[] = ['All', 'Blogs', 'Vlogs'];

export const openBlog = (b: Blog) => {
  void Router.push(`/blog/post?id=${encodeURIComponent(b._id)}`).then(() => window.scrollTo(0, 0));
};

/** The /blog page: heading, All / Blogs / Vlogs tabs, and the vlog player when a vlog is selected. */
export default function BlogFeed() {
  const feed = useFeed();
  const [tab, setTab] = useState<Tab>('All');
  const [selected, setSelected] = useAtom(selectedVlogAtom);

  const vlogs = useMemo(() => publicVlogs(feed.vlogs), [feed.vlogs]);
  const all: FeedItem[] = useMemo(() => mergeFeed(feed.blogs, feed.vlogs), [feed.blogs, feed.vlogs]);
  const items = tab === 'Blogs' ? all.filter((i) => i.kind === 'blog') : tab === 'Vlogs' ? all.filter((i) => i.kind === 'vlog') : all;

  const play = (v: Vlog) => {
    setSelected(v);
    window.scrollTo(0, 0);
  };

  return (
    <section style={{ maxWidth: 1260, margin: '0 auto', padding: '52px 22px 40px' }}>
      {selected ? (
        <VideoPlayer
          videoId={selected.videoId}
          title={selected.title}
          date={dateLong(selected.videoPublishedAt)}
          description={selected.description}
          more={vlogs.map((v) => ({ id: v.videoId, title: v.title, date: dateLong(v.videoPublishedAt), thumb: v.thumbnails?.medium?.url ?? v.thumbnails?.default?.url }))}
          activeId={selected.videoId}
          onPick={(id) => {
            const v = vlogs.find((x) => x.videoId === id);
            if (v) play(v);
          }}
          onBack={() => setSelected(null)}
          backLabel="All blogs and vlogs"
        />
      ) : (
        <>
          <h1 style={{ fontSize: 'clamp(36px,4.8vw,56px)', color: '#2B2342' }}>The Pawzeeble Journal</h1>
          <p style={{ marginTop: 14, fontSize: 17.5, lineHeight: 1.62, color: '#5A5177', maxWidth: 540 }}>
            Written by our veterinarians and the pet parents who have been through it. Read it, or watch the vlogs.
          </p>
          <div className={styles.tabs} role="group" aria-label="Filter" style={{ marginTop: 22 }}>
            {TABS.map((t) => (
              <button className={styles.tab} aria-pressed={tab === t} onClick={() => setTab(t)} key={t}>{t}</button>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            {feed.loading ? (
              <SkeletonGrid />
            ) : items.length === 0 ? (
              <EmptyState title={tab === 'Blogs' ? 'No blogs yet' : tab === 'Vlogs' ? 'No vlogs yet' : 'No blogs or vlogs yet'} text={feed.failed ? 'We could not load everything just now. Please try again in a moment.' : 'Check back soon.'} />
            ) : (
              <div className={styles.grid}>
                {items.map((it) => (
                  <FeedCard item={it} onBlog={openBlog} onVlog={play} key={it.kind === 'blog' ? it.blog._id : it.vlog.videoId} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

// re-exported so other surfaces can render the same cards
export { Card, blogCardProps, vlogCardProps };
