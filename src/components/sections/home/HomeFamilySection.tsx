import { useEffect, useRef, type CSSProperties } from 'react';
import { useAppDownload } from '@/components/layout/AppDownload';
import styles from './HomeFamilySection.module.css';

const delay = (d: string) => ({ '--d': d }) as CSSProperties;

export default function HomeFamilySection() {
  const { dlApp } = useAppDownload();
  const root = useRef<HTMLElement>(null);

  // each element slides up once, the first time it scrolls into view
  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>(`.${styles.reveal}`) ?? []);
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add(styles.shown));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add(styles.shown);
          io.unobserve(e.target);
        }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.family} ref={root}>
      <div className={styles.inner}>
        <img className={`${styles.logo} ${styles.reveal}`} src="/images/shared/pawzeeble-logo.webp" alt="Pawzeeble" width={1200} height={319} />

        <div className={`${styles.sub} ${styles.reveal}`} style={delay('.08s')}>
          <span />
          <p>
            Making pet care
            <br />
            simpler &amp; accessible
          </p>
          <span />
        </div>

        <div className={styles.grid}>
          <div className={styles.reveal} style={delay('.12s')}>
            <div className={`${styles.card} ${styles.app}`}>
              <div className={styles.tile} />
              <div className={styles.body}>
                <h3>Pawzeeble app</h3>
                <p>Book vets, groomers and trainers, and keep your pet&apos;s records in one place.</p>
                <button type="button" className={styles.cta} onClick={() => dlApp()}>
                  Check it out <span>▶</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.reveal} style={delay('.24s')}>
            <div className={`${styles.card} ${styles.mart}`}>
              <div className={styles.tile} />
              <div className={styles.body}>
                <h3>My PawzMart</h3>
                <p>Tees and merch for proud pet parents, and a few for your pets too.</p>
                <a className={styles.cta} href="https://mypawzmart.com" target="_blank" rel="noopener">
                  Check it out <span>▶</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.reveal} style={delay('.36s')}>
            <div className={`${styles.card} ${styles.skale}`}>
              <div className={styles.tile} />
              <div className={styles.body}>
                <h3>Skale</h3>
                <p>Software that helps pet care service providers run their business.</p>
                <a className={styles.cta} href="https://skl.care" target="_blank" rel="noopener">
                  Check it out <span>▶</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
