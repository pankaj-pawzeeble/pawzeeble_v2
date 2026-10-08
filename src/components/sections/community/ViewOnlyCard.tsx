import styles from './Community.module.css';
import { InfoIcon } from './CommunityIcons';
import { useDownloadGate } from './DownloadGate';

export default function ViewOnlyCard() {
  const { lock } = useDownloadGate();
  return (
    <section style={{ background: '#fff', border: '1.5px solid #EFEAF8', borderRadius: '24px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#2B2342' }}>News Feed</h1>
        <button onClick={() => lock('sign up')} className={styles.cta} style={{ background: '#CA5C00', color: '#fff', fontSize: '14.5px', fontWeight: 700, padding: '11px 22px', borderRadius: '999px' }}>Download App</button>
      </div>
      <div style={{ background: '#F2EEFA', borderRadius: '16px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ flex: 'none', width: '30px', height: '30px', borderRadius: '50%', background: '#6351A1', color: '#fff', display: 'grid', placeItems: 'center' }}>
          <InfoIcon size={16} />
        </span>
        <p style={{ fontSize: '13.5px', fontWeight: 600, lineHeight: 1.5, color: '#4A3E78' }}>
          You are currently in view-only mode. Unlock everything: log in/sign up for full access to our community network.
        </p>
      </div>
    </section>
  );
}
