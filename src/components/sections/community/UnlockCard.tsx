import { UNLOCK_TOPICS } from '@/lib/community/data';
import styles from './Community.module.css';
import { LockIcon } from './CommunityIcons';
import { useDownloadGate } from './DownloadGate';

export default function UnlockCard() {
  const { lock } = useDownloadGate();
  return (
    <section style={{ position: 'relative', marginTop: '44px', background: 'linear-gradient(180deg, #E4DEFC 0%, #F3F0FD 40%, #fff 62%)', border: '1.5px solid #EFEAF8', borderRadius: '24px', padding: '62px clamp(16px,4vw,32px) 30px', textAlign: 'center' }}>
      <span style={{ position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -50%)', width: '84px', height: '84px', borderRadius: '50%', background: '#fff', border: '1.5px solid #EFEAF8', boxShadow: '0 12px 28px rgba(43,35,66,.12)', color: '#CA5C00', display: 'grid', placeItems: 'center' }}>
        <LockIcon size={34} />
      </span>
      <h2 style={{ margin: '0 auto', maxWidth: '380px', fontSize: 'clamp(22px, 3.4vw, 26px)', fontWeight: 800, lineHeight: 1.25, color: '#2B2342' }}>
        Unlock more posts by joining The Pawzeeble Community
      </h2>
      <div style={{ marginTop: '22px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        {UNLOCK_TOPICS.map((t) => (
          <span key={t} style={{ background: '#fff', border: '1.5px solid #E7E1F4', color: '#4A3E78', fontSize: '14px', fontWeight: 600, padding: '8px 15px', borderRadius: '999px' }}>{t}</span>
        ))}
      </div>
      <button onClick={() => lock('see more posts')} className={styles.cta} style={{ marginTop: '28px', background: '#CA5C00', color: '#fff', fontSize: '15.5px', fontWeight: 700, padding: '15px 28px', borderRadius: '999px' }}>Download Pawzeeble app</button>
    </section>
  );
}
