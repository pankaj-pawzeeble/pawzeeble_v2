import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, EmptyState, Html, SkeletonGrid, VideoPlayer, blogStyles as styles } from '@/components/sections/blog/BlogParts';
import { getBusinessBlogDetail, getBusinessBlogs, getBusinessVlogs } from '@/lib/blog/api';
import { dateLong, stripHtml } from '@/lib/blog/format';
import { selectedBusinessVlogAtom } from '@/lib/blog/store';
import type { BusinessBlog, BusinessVlog } from '@/lib/blog/types';
import { useClinicData } from './ClinicData';

type Tab = 'All' | 'Blogs' | 'Vlogs';
const TABS: Tab[] = ['All', 'Blogs', 'Vlogs'];
const PREVIEW = 3;

interface List<T> {
  /** 'unavailable' = the call failed or was refused: that list is hidden. */
  status: 'loading' | 'ok' | 'unavailable';
  records: T[];
  total: number;
  page: number;
  more: boolean;
}

type Item = { kind: 'blog'; blog: BusinessBlog; date: number } | { kind: 'vlog'; vlog: BusinessVlog; date: number };

const isPublic = (v: BusinessVlog) => v.videoDetails?.title !== 'Private video';
const when = (iso?: string) => Date.parse(iso ?? '') || 0;

/** Pages of 10 are appended; loading stops once everything is loaded. */
function usePagedList<T>(fetchPage: ((page: number) => Promise<{ records: T[]; totalRecordCount: number }>) | null) {
  const [list, setList] = useState<List<T>>({ status: 'loading', records: [], total: 0, page: 1, more: false });

  useEffect(() => {
    if (!fetchPage) return;
    let alive = true;
    fetchPage(1)
      .then((res) => alive && setList({ status: 'ok', records: res.records ?? [], total: res.totalRecordCount ?? 0, page: 1, more: (res.records?.length ?? 0) < (res.totalRecordCount ?? 0) }))
      .catch(() => alive && setList({ status: 'unavailable', records: [], total: 0, page: 1, more: false }));
    return () => {
      alive = false;
    };
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!fetchPage) return;
    const next = list.page + 1;
    fetchPage(next)
      .then((res) =>
        setList((l) => {
          const records = [...l.records, ...(res.records ?? [])];
          return { ...l, records, page: next, total: res.totalRecordCount ?? l.total, more: records.length < (res.totalRecordCount ?? l.total) && (res.records?.length ?? 0) > 0 };
        }),
      )
      .catch(() => setList((l) => ({ ...l, more: false })));
  }, [fetchPage, list.page]);

  return { list, loadMore };
}

function Overlay({ onClose, children, wide }: { onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', key);
    };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 210, background: 'rgba(43,35,66,.55)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '4vh 16px', overflowY: 'auto' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: wide ? 1100 : 820, background: '#fff', borderRadius: 28, padding: 'clamp(18px,3vw,32px)', boxShadow: '0 30px 80px rgba(43,35,66,.35)' }}>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', right: 16, top: 16, width: 36, height: 36, borderRadius: '50%', background: '#F2EEFA', color: '#4A3E78', display: 'grid', placeItems: 'center', zIndex: 2 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

/** A clinic blog from GET blogs/{id}. */
function BlogReader({ id, onClose }: { id: string; onClose: () => void }) {
  const [state, setState] = useState<{ k: 'loading' } | { k: 'error' } | { k: 'ready'; blog: BusinessBlog }>({ k: 'loading' });
  useEffect(() => {
    let alive = true;
    getBusinessBlogDetail(id)
      .then((blog) => alive && setState(blog?._id ? { k: 'ready', blog } : { k: 'error' }))
      .catch(() => alive && setState({ k: 'error' }));
    return () => {
      alive = false;
    };
  }, [id]);
  return (
    <Overlay onClose={onClose}>
      <button onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E4DDF3', color: '#4A3E78', padding: '10px 18px 10px 14px', borderRadius: 999, fontSize: 14.5, fontWeight: 700 }}>← Back</button>
      {state.k === 'loading' ? (
        <div aria-busy="true" style={{ marginTop: 24 }}>
          <div className={styles.sk} style={{ height: 38, width: '75%' }} />
          <div className={styles.sk} style={{ height: 260, marginTop: 20, borderRadius: 22 }} />
        </div>
      ) : state.k === 'error' ? (
        <div style={{ marginTop: 24 }}><EmptyState title="Article not found!" text="The article may have been removed." /></div>
      ) : (
        <>
          <h2 style={{ marginTop: 24, fontSize: 'clamp(26px,3.4vw,38px)', lineHeight: 1.15, color: '#2B2342' }}>{state.blog.title}</h2>
          {state.blog.desc ? <div style={{ marginTop: 12 }}><Html html={state.blog.desc} small /></div> : null}
          {state.blog.coverImage ? <img src={state.blog.coverImage} alt="" style={{ marginTop: 22, width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 22, display: 'block' }} /> : null}
          <div style={{ marginTop: 24 }}><Html html={state.blog.blog} small /></div>
        </>
      )}
    </Overlay>
  );
}

/** "Blogs and vlogs" for a clinic page: a preview of the newest items that expands in place. Hidden when nothing is available. */
export default function ClinicBlogs() {
  const router = useRouter();
  const data = useClinicData();
  const qSlug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;
  const clinicName = (data.live && (qSlug || data.clinic?.businessPageUrlRoute)) || '';

  const blogsFetch = useMemo(() => (clinicName ? (p: number) => getBusinessBlogs(clinicName, p) : null), [clinicName]);
  const vlogsFetch = useMemo(() => (clinicName ? (p: number) => getBusinessVlogs(clinicName, p) : null), [clinicName]);
  const blogs = usePagedList<BusinessBlog>(blogsFetch);
  const vlogs = usePagedList<BusinessVlog>(vlogsFetch);

  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<Tab>('All');
  const [openBlogId, setOpenBlogId] = useState('');
  const [selected, setSelected] = useAtom(selectedBusinessVlogAtom);

  const blogList = blogs.list.status === 'ok' ? blogs.list.records.filter((b) => !b.deleted) : [];
  const vlogList = vlogs.list.status === 'ok' ? vlogs.list.records.filter(isPublic) : [];
  const items: Item[] = useMemo(
    () =>
      [
        ...blogList.map((blog) => ({ kind: 'blog' as const, blog, date: when(blog.publishedDate) })),
        ...vlogList.map((vlog) => ({ kind: 'vlog' as const, vlog, date: when(vlog.publishedDate || vlog.createdAt) })),
      ].sort((a, b) => b.date - a.date),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blogs.list.records, vlogs.list.records, blogs.list.status, vlogs.list.status],
  );

  if (!clinicName) return null;
  const loading = blogs.list.status === 'loading' || vlogs.list.status === 'loading';
  const unavailable = blogs.list.status === 'unavailable' && vlogs.list.status === 'unavailable';
  if (unavailable || (!loading && items.length === 0)) return null;

  const shown = expanded ? (tab === 'Blogs' ? items.filter((i) => i.kind === 'blog') : tab === 'Vlogs' ? items.filter((i) => i.kind === 'vlog') : items) : items.slice(0, PREVIEW);
  const moreFor = tab === 'Blogs' ? blogs.list.more : tab === 'Vlogs' ? vlogs.list.more : blogs.list.more || vlogs.list.more;
  const loadMore = () => {
    if (tab !== 'Vlogs' && blogs.list.more) blogs.loadMore();
    if (tab !== 'Blogs' && vlogs.list.more) vlogs.loadMore();
  };

  const vlogCard = (v: BusinessVlog) => {
    const d = v.videoDetails;
    return { image: d.thumbnails?.medium?.url ?? d.thumbnails?.default?.url, imageSize: { width: d.thumbnails?.medium?.width, height: d.thumbnails?.medium?.height }, kicker: 'Vlog · YouTube', title: d.title, dek: d.description, meta: dateLong(v.createdAt), play: true };
  };
  const pickVlog = (id: string) => {
    const v = vlogList.find((x) => x.videoDetails.videoId === id);
    if (v) setSelected(v);
  };

  return (
    <section id="blogs" style={{ background: '#fff', border: '1.5px solid #EFEAF8', borderRadius: 28, padding: 'clamp(22px,3vw,32px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: 24, color: '#2B2342' }}>Blogs and vlogs</h2>
        {!loading && items.length > PREVIEW ? (
          <button onClick={() => setExpanded((e) => !e)} style={{ background: 'none', padding: 0, color: '#A44A00', fontSize: 14.5, fontWeight: 700 }}>{expanded ? 'Show less' : 'View all'}</button>
        ) : null}
      </div>

      {expanded ? (
        <div className={styles.tabs} role="group" aria-label="Filter" style={{ marginTop: 16 }}>
          {TABS.map((t) => (
            <button className={styles.tab} aria-pressed={tab === t} onClick={() => setTab(t)} key={t}>{t}</button>
          ))}
        </div>
      ) : null}

      <div style={{ marginTop: 20 }}>
        {loading ? (
          <SkeletonGrid count={PREVIEW} />
        ) : shown.length === 0 ? (
          <EmptyState title={tab === 'Blogs' ? 'No blogs yet' : tab === 'Vlogs' ? 'No vlogs yet' : 'No blogs or vlogs yet'} />
        ) : (
          <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 24 }}>
            {shown.map((it) =>
              it.kind === 'blog' ? (
                <Card key={it.blog._id} image={it.blog.thumbImage || it.blog.coverImage} kicker="Blog" title={it.blog.title} dek={stripHtml(it.blog.desc)} meta={dateLong(it.blog.publishedDate)} onOpen={() => setOpenBlogId(it.blog._id)} />
              ) : (
                <Card key={it.vlog._id} {...vlogCard(it.vlog)} onOpen={() => setSelected(it.vlog)} />
              ),
            )}
          </div>
        )}
      </div>

      {expanded && moreFor ? (
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <button onClick={loadMore} style={{ color: '#CA5C00', fontSize: 15, fontWeight: 700, padding: '12px 30px', borderRadius: 999, background: '#fff', border: '1.5px solid #CA5C00' }}>Load more</button>
        </div>
      ) : null}

      {openBlogId ? <BlogReader id={openBlogId} onClose={() => setOpenBlogId('')} /> : null}
      {selected ? (
        <Overlay onClose={() => setSelected(null)} wide>
          <VideoPlayer
            videoId={selected.videoDetails.videoId}
            title={selected.videoDetails.title}
            date={dateLong(selected.createdAt)}
            description={selected.videoDetails.description}
            more={vlogList.map((v) => ({ id: v.videoDetails.videoId, title: v.videoDetails.title, date: dateLong(v.createdAt), thumb: v.videoDetails.thumbnails?.medium?.url ?? v.videoDetails.thumbnails?.default?.url }))}
            activeId={selected.videoDetails.videoId}
            onPick={pickVlog}
            onBack={() => setSelected(null)}
            backLabel="Back"
          />
        </Overlay>
      ) : null}
    </section>
  );
}
