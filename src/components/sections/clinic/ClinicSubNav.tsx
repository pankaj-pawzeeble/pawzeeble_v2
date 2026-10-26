import { useEffect, useRef, useState } from 'react';

const TABS: [string, string][] = [['offers', 'Offers'], ['about', 'About'], ['services', 'Services'], ['slots', 'Slots'], ['doctors', 'Doctors']];

/** Sticky section tabs under the site header. Tabs whose section is not on the page (e.g. Offers on a regular clinic) are left out. */
export default function ClinicSubNav() {
  const [present, setPresent] = useState<string[]>([]);
  const [active, setActive] = useState('');
  const [top, setTop] = useState(72);
  const [barH, setBarH] = useState(56);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-r="site-hdr"]');
    const measure = () => {
      setTop(header?.offsetHeight ?? 72);
      setBarH((h) => bar.current?.offsetHeight || h);
      const here = TABS.map(([id]) => id).filter((id) => (document.getElementById(id)?.getClientRects().length ?? 0) > 0);
      setPresent((prev) => (prev.join() === here.join() ? prev : here));
    };
    measure();
    window.addEventListener('resize', measure);
    // sections mount after the clinic data loads, so look again as the page changes
    const mo = new MutationObserver(measure);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('resize', measure);
      mo.disconnect();
    };
  }, []);

  // the active tab is the section whose top is closest to (and above) the line under the sticky bars
  useEffect(() => {
    const onScroll = () => {
      const line = top + barH + 24;
      let current = '';
      let best = -Infinity;
      for (const id of present) {
        const t = document.getElementById(id)?.getBoundingClientRect().top;
        if (t !== undefined && t <= line && t > best) {
          best = t;
          current = id;
        }
      }
      setActive(current || present[0] || '');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [present, top, barH]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - top - barH - 16, behavior: reduce ? 'auto' : 'smooth' });
  };

  if (present.length === 0) return <div aria-hidden="true" />;

  return (
    <nav aria-label="Clinic sections" ref={bar} style={{ position: 'sticky', top, zIndex: 40, background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(12px)', borderTop: '1.5px solid #F2EEFA', borderBottom: '1.5px solid #EFEAF8' }}>
      <div style={{ maxWidth: 1260, margin: '0 auto', padding: '0 22px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {TABS.filter(([id]) => present.includes(id)).map(([id, label]) => (
          <button key={id} onClick={() => go(id)} aria-current={active === id ? 'true' : undefined} style={{ flex: 'none', background: 'none', padding: '16px 18px', fontSize: 16, fontWeight: active === id ? 700 : 500, color: active === id ? '#6351A1' : '#6F6590', borderBottom: `3px solid ${active === id ? '#6351A1' : 'transparent'}`, marginBottom: -1.5, transition: 'color .2s, border-color .2s' }}>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
