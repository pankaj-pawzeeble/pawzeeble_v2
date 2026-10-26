import Router from 'next/router';
import { useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { EmptyState, FeedCard, SkeletonGrid } from '@/components/sections/blog/BlogParts';
import { openBlog } from '@/components/sections/blog/BlogFeed';
import { mergeFeed } from '@/lib/blog/format';
import { selectedVlogAtom } from '@/lib/blog/store';
import type { Vlog } from '@/lib/blog/types';
import { useFeed } from '@/lib/blog/useFeed';
import { useSite } from '@/hooks/useSite';
import styles from './BlogsVlogsSection.module.css';

/** The three newest blogs and vlogs, merged. A vlog opens in the player on /blog. */
export default function BlogsVlogsSection() {
  const v = useSite();
  const feed = useFeed();
  const setSelected = useSetAtom(selectedVlogAtom);
  const items = useMemo(() => mergeFeed(feed.blogs, feed.vlogs).slice(0, 3), [feed.blogs, feed.vlogs]);

  const playVlog = (vlog: Vlog) => {
    setSelected(vlog);
    void Router.push('/blog').then(() => window.scrollTo(0, 0));
  };

  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "56px 22px 10px", paddingTop: "80px", marginTop: "40px", marginBottom: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "18px", flexWrap: "wrap", paddingBottom: "14px", borderBottom: "2px solid #2B2342" }}>
        <h2 style={{ fontSize: "clamp(26px,3vw,34px)", color: "#2B2342" }}>Blogs and Vlogs</h2>
        <button onClick={v.goBlog} style={{ background: "none", padding: "0", color: "#A44A00", fontSize: "14.5px", fontWeight: "700" }} className={styles.h1}>All blogs and vlogs</button>
      </div>
      <div style={{ marginTop: "24px" }}>
        {feed.loading ? (
          <SkeletonGrid count={3} />
        ) : items.length === 0 ? (
          <EmptyState title="No blogs or vlogs yet" text={feed.failed ? "We could not load them just now. Please try again in a moment." : "Check back soon."} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "30px", alignItems: "start" }}>
            {items.map((it) => (
              <FeedCard item={it} onBlog={openBlog} onVlog={playVlog} key={it.kind === "blog" ? it.blog._id : it.vlog.videoId} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
