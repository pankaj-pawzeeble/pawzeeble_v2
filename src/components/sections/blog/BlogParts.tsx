import { Fragment, type ReactNode } from 'react';
import { dateDashed, dateLong, sanitizeHtml, stripHtml } from '@/lib/blog/format';
import type { Blog, FeedItem, Vlog } from '@/lib/blog/types';
import styles from './BlogParts.module.css';

const URL_RE = /(https?:\/\/[^\s<]+[^\s<.,;:!?)'"\]])/g;

/** Plain text with URLs turned into links (opened in a new tab). */
export function Linkified({ text }: { text: string }) {
  const out: ReactNode[] = text.split(URL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <a href={part} target="_blank" rel="noopener noreferrer" key={i}>
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
  return <>{out}</>;
}

/** CMS HTML, sanitised, with the shared article styling. */
export function Html({ html, small }: { html: string; small?: boolean }) {
  return <div className={`${styles.html} ${small ? styles.htmlSm : ''}`} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />;
}

const playIcon = (
  <svg width="46" height="46" viewBox="2 2 20 20" aria-hidden="true" style={{ display: 'block' }}>
    <circle cx="12" cy="12" r="10" fill="#CA5C00" />
    <path d="M10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z" fill="#fff" />
  </svg>
);

interface CardProps {
  image?: string;
  imageSize?: { width?: number; height?: number };
  kicker: string;
  title: string;
  dek: string;
  meta: string;
  play?: boolean;
  onOpen: () => void;
}

export function Card({ image, imageSize, kicker, title, dek, meta, play, onOpen }: CardProps) {
  return (
    <button type="button" className={styles.card} onClick={onOpen}>
      <div className={styles.thumb}>
        {image ? <img src={image} alt="" width={imageSize?.width} height={imageSize?.height} loading="lazy" /> : null}
        {play ? <span className={styles.play}>{playIcon}</span> : null}
      </div>
      <div className={styles.kicker}>{kicker}</div>
      <h3 className={styles.title}>{title}</h3>
      {dek ? <p className={styles.dek}>{dek}</p> : null}
      <div className={styles.meta}>{meta}</div>
    </button>
  );
}

export const blogCardProps = (b: Blog): Omit<CardProps, 'onOpen'> => ({
  image: b.thumbImage || b.coverImage,
  kicker: 'Blog',
  title: b.title,
  dek: stripHtml(b.desc),
  meta: [dateDashed(b.publishedDate), b.authorId?.name && `By ${b.authorId.name}`].filter(Boolean).join(' · '),
});

export const vlogCardProps = (v: Vlog): Omit<CardProps, 'onOpen'> => ({
  image: v.thumbnails?.medium?.url ?? v.thumbnails?.high?.url ?? v.thumbnails?.default?.url,
  imageSize: { width: v.thumbnails?.medium?.width, height: v.thumbnails?.medium?.height },
  kicker: 'Vlog · YouTube',
  title: v.title,
  dek: v.description,
  meta: dateLong(v.videoPublishedAt),
  play: true,
});

/** One card for either kind of item. */
export function FeedCard({ item, onBlog, onVlog }: { item: FeedItem; onBlog: (b: Blog) => void; onVlog: (v: Vlog) => void }) {
  return item.kind === 'blog' ? <Card {...blogCardProps(item.blog)} onOpen={() => onBlog(item.blog)} /> : <Card {...vlogCardProps(item.vlog)} onOpen={() => onVlog(item.vlog)} />;
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className={styles.grid} aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <div className={`${styles.sk} `} style={{ height: 176, borderRadius: 22 }} />
          <div className={styles.sk} style={{ height: 12, width: 70, marginTop: 14 }} />
          <div className={styles.sk} style={{ height: 22, marginTop: 10 }} />
          <div className={styles.sk} style={{ height: 14, marginTop: 10, width: '85%' }} />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, text }: { title: string; text?: string }) {
  return (
    <div className={styles.state}>
      <h3>{title}</h3>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export { styles as blogStyles };

/** YouTube player plus the "more vlogs" list. */
export function VideoPlayer({ videoId, title, date, description, more, activeId, onPick, onBack, backLabel }: {
  videoId: string;
  title: string;
  date: string;
  description: string;
  more: { id: string; title: string; date: string; thumb?: string }[];
  activeId: string;
  onPick: (id: string) => void;
  onBack: () => void;
  backLabel: string;
}) {
  return (
    <div>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E4DDF3', color: '#4A3E78', padding: '10px 18px 10px 14px', borderRadius: 999, fontSize: 14.5, fontWeight: 700, marginBottom: 22 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        {backLabel}
      </button>
      <div className={styles.player}>
        <div>
          <div className={styles.frame}>
            <iframe src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <h1 style={{ marginTop: 20, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.2, color: '#2B2342' }}>{title}</h1>
          {date ? <div style={{ marginTop: 8, fontSize: 13.5, color: '#6F6590' }}>{date}</div> : null}
          {description ? <p className={styles.desc}><Linkified text={description} /></p> : null}
        </div>
        {more.length > 0 ? (
          <aside className={styles.side}>
            <h3>More vlogs for you</h3>
            <div className={styles.sideList}>
              {more.map((m) => (
                <button className={styles.row} aria-current={m.id === activeId ? 'true' : undefined} onClick={() => onPick(m.id)} key={m.id}>
                  <span className={styles.rowImg}>{m.thumb ? <img src={m.thumb} alt="" loading="lazy" /> : null}</span>
                  <span style={{ minWidth: 0 }}>
                    <span className={styles.rowTitle}>{m.title}</span>
                    <span className={styles.rowDate} style={{ display: 'block' }}>{m.date}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
