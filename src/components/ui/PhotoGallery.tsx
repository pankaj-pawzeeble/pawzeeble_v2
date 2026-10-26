import { useCallback, useEffect, useState } from 'react';
import styles from './PhotoGallery.module.css';

const MAX_TILES = 5;

interface PhotoGalleryProps {
  /** Photo URLs. The layout depends on how many there are (0 to 5, then 5 with a "+N" overlay). */
  photos: string[];
  /** Used for alt text: "<alt> photo 2". */
  alt: string;
}

/** Photo grid with a fullscreen viewer (arrows, ← →, Esc, counter). */
export default function PhotoGallery({ photos, alt }: PhotoGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const count = photos.length;

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, step]);

  if (count === 0) {
    return (
      <div className={styles.empty}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
        No photos added yet
      </div>
    );
  }

  const shown = photos.slice(0, MAX_TILES);
  const extra = count - MAX_TILES;
  const layout = styles['n' + Math.min(count, MAX_TILES)];

  return (
    <>
      <div className={`${styles.grid} ${layout}`}>
        {shown.map((src, i) => (
          <button type="button" className={styles.tile} onClick={() => setOpen(i)} aria-label={`Open ${alt} photo ${i + 1}`} key={src + i}>
            <img src={src} alt={`${alt} photo ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
            {i === MAX_TILES - 1 && extra > 0 ? <span className={styles.more}>+{extra}</span> : null}
          </button>
        ))}
      </div>
      {open !== null ? (
        <div className={styles.viewer} role="dialog" aria-modal="true" aria-label={`${alt} photos`} onClick={() => setOpen(null)}>
          <img className={styles.viewerImg} src={photos[open]} alt={`${alt} photo ${open + 1}`} onClick={(e) => e.stopPropagation()} />
          <button type="button" className={`${styles.viewerBtn} ${styles.close}`} onClick={() => setOpen(null)} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          {count > 1 ? (
            <>
              <button type="button" className={`${styles.viewerBtn} ${styles.prev}`} onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" className={`${styles.viewerBtn} ${styles.next}`} onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </>
          ) : null}
          <div className={styles.counter}>{open + 1} / {count}</div>
        </div>
      ) : null}
    </>
  );
}
