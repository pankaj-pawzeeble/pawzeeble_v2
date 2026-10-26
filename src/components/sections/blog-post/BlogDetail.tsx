import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Html, EmptyState, blogStyles as styles } from '@/components/sections/blog/BlogParts';
import { getBlogDetail } from '@/lib/blog/api';
import { dateDashed } from '@/lib/blog/format';
import type { Blog } from '@/lib/blog/types';

type State = { k: 'loading' } | { k: 'error'; message: string } | { k: 'ready'; blog: Blog };

/** A blog from GET blogs/{id}. */
export default function BlogDetail({ id }: { id: string }) {
  const [state, setState] = useState<State>({ k: 'loading' });

  useEffect(() => {
    let alive = true;
    getBlogDetail(id)
      .then((blog) => alive && setState(blog && blog._id ? { k: 'ready', blog } : { k: 'error', message: 'Article not found!' }))
      .catch((e: unknown) => alive && setState({ k: 'error', message: e instanceof Error && e.message && e.message !== 'Something Went Wrong' ? e.message : 'Article not found!' }));
    return () => {
      alive = false;
    };
  }, [id]);

  const back = () => void Router.push('/blog').then(() => window.scrollTo(0, 0));
  const backBtn = (
    <button onClick={back} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E4DDF3', color: '#4A3E78', padding: '10px 18px 10px 14px', borderRadius: 999, fontSize: 14.5, fontWeight: 700 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
      All articles
    </button>
  );

  if (state.k === 'loading') {
    return (
      <main style={{ maxWidth: 820, margin: '0 auto', padding: '36px 22px 64px' }} aria-busy="true">
        {backBtn}
        <div className={styles.sk} style={{ height: 44, marginTop: 28, width: '80%' }} />
        <div className={styles.sk} style={{ height: 18, marginTop: 18 }} />
        <div className={styles.sk} style={{ height: 340, marginTop: 30, borderRadius: 28 }} />
      </main>
    );
  }
  if (state.k === 'error') {
    return (
      <main style={{ maxWidth: 820, margin: '0 auto', padding: '36px 22px 64px' }}>
        {backBtn}
        <div style={{ marginTop: 28 }}>
          <EmptyState title={state.message} text="The article may have been removed or the link is wrong." />
        </div>
      </main>
    );
  }
  const b = state.blog;
  return (
    <main>
      <article style={{ maxWidth: 820, margin: '0 auto', padding: '36px 22px 0' }}>
        {backBtn}
        {b.tags?.length ? (
          <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {b.tags.map((tag) => (
              <span style={{ background: '#F2EEFA', color: '#4A3E78', padding: '6px 13px', borderRadius: 999, fontSize: 12.5, fontWeight: 700 }} key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
        <h1 style={{ marginTop: 16, fontSize: 'clamp(32px,4.4vw,50px)', lineHeight: 1.1, letterSpacing: '-.025em', color: '#2B2342', textWrap: 'balance' }}>{b.title}</h1>
        {b.desc ? <div style={{ marginTop: 14 }}><Html html={b.desc} /></div> : null}
        <div style={{ marginTop: 22, padding: '16px 0', borderTop: '1.5px solid #EFEAF8', borderBottom: '1.5px solid #EFEAF8', fontSize: 14, lineHeight: 1.4, color: '#6F6590' }}>
          {b.authorId?.name ? <strong style={{ color: '#2B2342', fontSize: 15 }}>By {b.authorId.name}</strong> : null}
          {b.authorId?.name ? <br /> : null}
          {dateDashed(b.publishedDate)}
        </div>
      </article>
      {b.coverImage ? (
        <div style={{ maxWidth: 1040, margin: '30px auto 0', padding: '0 22px' }}>
          <div style={{ height: 'clamp(240px,42vw,480px)', borderRadius: 28, overflow: 'hidden', background: '#F2EEFA' }}>
            <img src={b.coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      ) : null}
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '40px 22px 64px' }}>
        <Html html={b.blog} />
      </article>
    </main>
  );
}
