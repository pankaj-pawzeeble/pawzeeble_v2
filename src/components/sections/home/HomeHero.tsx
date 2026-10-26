import ImageSlot from '@/components/ui/ImageSlot';
import { useAppDownload } from '@/components/layout/AppDownload';
import { useSite } from '@/hooks/useSite';
import styles from './HomeHero.module.css';

export default function HomeHero() {
  const v = useSite();
  const { dlApp } = useAppDownload();
  return (
    <section
      data-r="hero"
      style={{
        maxWidth: '1260px',
        margin: '0 auto',
        padding: '44px 22px 30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))',
        gap: '40px',
        alignItems: 'flex-start',
      }}
    >
      <div data-r="hero-copy" style={{ position: 'relative', zIndex: '1' }}>
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '9px',
            background: '#fff',
            border: '1px solid #E7E1F4',
            padding: '7px 15px 7px 9px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#4A3E78',
          }}
        >
          <span
            style={{
              background: 'rgb(47, 158, 128)',
              color: 'rgb(255, 255, 255)',
              padding: '3px 9px',
              borderRadius: '999px',
              fontSize: '11.5px',
              fontWeight: '700',
            }}
          >
            LIVE
          </span>
          In The City You Live In
        </div>
        <h1
          style={{
            marginTop: '20px',
            fontSize: 'clamp(42px,5.6vw,68px)',
            color: '#2B2342',
            textWrap: 'balance',
          }}
        >
          Co-Parenting your pet!
        </h1>
        <p
          style={{
            marginTop: '20px',
            fontSize: '18px',
            lineHeight: '1.62',
            color: '#5A5177',
            maxWidth: '500px',
            textWrap: 'pretty',
          }}
        >
          Find and book verified pet services, manage your pet&apos;s life, and protect it all — with
          Pawzeeble.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '30px', flexWrap: 'wrap' }}>
          <button
            onClick={() => dlApp()}
            style={{
              background: '#CA5C00',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              padding: '17px 32px',
              borderRadius: '999px',
              boxShadow: '0 12px 26px rgba(202,92,0,.28)',
            }}
            className={styles.h1}
          >
            Download Pawzeeble App
          </button>
          <button
            onClick={v.goEco}
            style={{
              background: 'transparent',
              color: '#6351A1',
              fontSize: '16px',
              fontWeight: '700',
              padding: '17px 30px',
              borderRadius: '999px',
              border: '2px solid #D8CFF0',
            }}
            className={styles.h2}
          >
            See the ecosystem
          </button>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '34px', flexWrap: 'wrap' }}
        >
          <div style={{ display: 'flex' }}>
            <span
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #FFFFFF',
              }}
            >
              <ImageSlot id="pz-av1" shape="circle" placeholder="Pet parent" />
            </span>
            <span
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #FFFFFF',
                marginLeft: '-14px',
              }}
            >
              <ImageSlot id="pz-av2" shape="circle" placeholder="Pet parent" />
            </span>
            <span
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #FFFFFF',
                marginLeft: '-14px',
              }}
            >
              <ImageSlot id="pz-av3" shape="circle" placeholder="Pet parent" />
            </span>
          </div>
          <div style={{ fontSize: '14.5px', lineHeight: '1.45', color: '#5A5177', textAlign: 'left' }}>
            <strong style={{ color: 'rgb(43, 35, 66)' }}>2 lakh+ pet parents</strong>
            <br />
            already part of Pawzeeble
          </div>
        </div>
      </div>
      <div data-r="hero-art" style={{ position: 'relative', minHeight: '560px' }}>
        <div
          data-r="hero-phone"
          style={{
            position: 'absolute',
            top: '-10px',
            left: '165px',
            width: 'min(58%,244px)',
            borderRadius: '32px',
            padding: '8px',
            background: '#2B2342',
            boxShadow: '0 30px 60px rgba(43,35,66,.3)',
            zIndex: '2',
          }}
        >
          <div
            style={{
              borderRadius: '25px',
              overflow: 'hidden',
              background: '#fff',
              aspectRatio: '1440 / 3204',
            }}
          >
            <ImageSlot
              id="pz-img-home-hero"
              shape="rect"
              src="/images/home/hero-phone-screen.webp"
              placeholder="Pawzeeble app home screen"
              align="top"
              style={{ display: 'block', width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div
          data-r="hero-img-a"
          style={{ position: 'absolute', left: '418px', top: '96px', width: '176px', zIndex: '3' }}
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '176 / 208',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 44px rgba(43,35,66,.16)',
            }}
          >
            <ImageSlot
              id="pz-hero-a"
              shape="rect"
              placeholder="Pet parent with dog"
              style={{ position: 'absolute', inset: '0', aspectRatio: 'auto' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '0',
              transform: 'translate(-50%, 50%)',
              background: '#fff',
              borderRadius: '18px',
              padding: '12px 16px',
              boxShadow: '0 14px 30px rgba(43,35,66,.16)',
              display: 'flex',
              gap: '11px',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                flex: 'none',
                width: '34px',
                height: '34px',
                borderRadius: '11px',
                background: '#E4F4EF',
                color: '#2F9E80',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div style={{ fontSize: '12.5px', lineHeight: '1.35', color: '#5A5177' }}>
              <strong style={{ display: 'block', color: '#2B2342', fontSize: '13.5px' }}>Vet booked</strong>
              Wed, 8:00 PM
            </div>
          </div>
        </div>
        <div
          data-r="hero-img-b"
          style={{ position: 'absolute', left: '0', bottom: '70px', width: '150px', zIndex: '3' }}
        >
          <div
            style={{
              position: 'relative',
              height: '200px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 16px 34px rgba(43,35,66,.14)',
            }}
          >
            <ImageSlot
              id="pz-hero-b"
              shape="rect"
              placeholder="Vet with cat"
              style={{ position: 'absolute', inset: '0', aspectRatio: 'auto' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '132px',
              left: '71px',
              transform: 'translate(-50%, 50%)',
              background: '#fff',
              borderRadius: '18px',
              padding: '12px 16px',
              boxShadow: '0 14px 30px rgba(43,35,66,.16)',
              display: 'flex',
              gap: '11px',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                flex: 'none',
                width: '34px',
                height: '34px',
                borderRadius: '11px',
                background: '#FFF4E9',
                color: '#CA5C00',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </span>
            <div style={{ fontSize: '12.5px', lineHeight: '1.35', color: '#5A5177' }}>
              <strong style={{ display: 'block', color: '#2B2342', fontSize: '13.5px' }}>
                Reminder Added
              </strong>
              Walk, 7:30 PM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
