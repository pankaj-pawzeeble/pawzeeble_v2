import type { Clan } from '@/lib/community/data';
import styles from './Community.module.css';
import { WaveMark } from './CommunityIcons';
import { useDownloadGate } from './DownloadGate';

export default function ClansCard({ clans }: { clans: Clan[] }) {
  const { lock } = useDownloadGate();
  return (
    <section style={{ background: 'linear-gradient(180deg, #E4DEFC 0%, #F3F0FD 45%, #fff 70%)', border: '1.5px solid #EFEAF8', borderRadius: '24px', padding: '28px 0 22px', textAlign: 'center', overflow: 'hidden' }}>
      <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '.24em', color: '#6351A1' }}>INTRODUCING</div>
      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <WaveMark />
        <h2 style={{ fontSize: 'clamp(40px, 8vw, 52px)', fontWeight: 800, lineHeight: 1, color: '#2B2342' }}>Clans</h2>
        <WaveMark flip />
      </div>
      <p style={{ margin: '14px auto 0', maxWidth: '440px', padding: '0 16px', fontSize: '16.5px', lineHeight: 1.55, color: '#5A5177', textWrap: 'balance' }}>
        Clans are private breed circles where pet parents learn, bond, and grow together.
      </p>
      <div className={styles.hideScroll} style={{ marginTop: '22px', display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '0 20px', scrollPaddingLeft: '20px' }}>
        {clans.map((c) => (
          <button key={c.id} onClick={() => lock(`join the ${c.name}`)} className={styles.clanBtn} style={{ flex: 'none', width: '92px', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '84px', height: '84px', borderRadius: '50%', border: '3px solid #CA5C00', padding: '3px', boxSizing: 'border-box', background: '#fff' }}>
              <span style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#F2EEFA', color: '#6351A1', fontWeight: 800, fontSize: '22px' }}>
                {c.avatarUrl ? (
                  <img src={c.avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  c.name.charAt(0)
                )}
              </span>
            </span>
            <span style={{ width: '100%', fontSize: '13.5px', fontWeight: 600, color: '#2B2342', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
