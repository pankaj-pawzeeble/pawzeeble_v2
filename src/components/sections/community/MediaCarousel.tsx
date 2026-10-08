import { useState } from 'react';
import { formatDuration, type PostMedia } from '@/lib/community/data';
import { useSignedUrl } from '@/lib/community/useSignedUrl';
import styles from './Community.module.css';
import { PlayIcon } from './CommunityIcons';
import { useDownloadGate } from './DownloadGate';

function MediaItem({ item }: { item: PostMedia }) {
  const { lock } = useDownloadGate();
  const src = useSignedUrl(item.kind === 'video' ? item.posterUrl : item.url);
  return (
    <div style={{ position: 'relative', flex: 'none', width: '100%', aspectRatio: '4 / 5', scrollSnapAlign: 'start', background: '#F2EEFA' }}>
      {src ? (
        <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : null}
      {item.kind === 'video' ? (
        <>
          <button onClick={() => lock('watch this video')} aria-label="Play video" className={styles.playBtn} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '64px', height: '64px', borderRadius: '50%', background: '#CA5C00', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 12px 30px rgba(43,35,66,.3)' }}>
            <PlayIcon size={26} />
          </button>
          <span style={{ position: 'absolute', left: '12px', bottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(43,35,66,.78)', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '5px 10px', borderRadius: '999px' }}>
            <PlayIcon size={10} />
            {formatDuration(item.durationSec)}
          </span>
        </>
      ) : null}
    </div>
  );
}

export default function MediaCarousel({ media }: { media: PostMedia[] }) {
  const [active, setActive] = useState(0);
  if (media.length === 0) return null;
  if (media.length === 1) return <MediaItem item={media[0]} />;

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={styles.hideScroll}
        onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', overscrollBehaviorX: 'contain' }}
      >
        {media.map((m, i) => (
          <MediaItem item={m} key={i} />
        ))}
      </div>
      <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(43,35,66,.78)', color: '#fff', fontSize: '12.5px', fontWeight: 700, padding: '5px 10px', borderRadius: '999px' }}>
        {active + 1}/{media.length}
      </span>
      <div style={{ position: 'absolute', bottom: '14px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px', pointerEvents: 'none' }}>
        {media.map((_, i) => (
          <span key={i} className={styles.dot} style={{ height: '7px', width: i === active ? '18px' : '7px', borderRadius: '999px', background: i === active ? '#fff' : 'rgba(255,255,255,.6)', boxShadow: '0 1px 4px rgba(43,35,66,.3)' }} />
        ))}
      </div>
    </div>
  );
}
