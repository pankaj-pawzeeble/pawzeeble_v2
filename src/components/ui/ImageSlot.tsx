import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { IMAGE_SLOTS } from '@/lib/imageSlots';
import styles from './ImageSlot.module.css';

export interface ImageSlotProps {
  id?: string;
  shape?: 'rect' | 'rounded' | 'circle' | 'pill' | string;
  radius?: string | number;
  mask?: string;
  fit?: 'cover' | 'contain' | string;
  align?: 'top' | string;
  placeholder?: string;
  src?: string;
  style?: CSSProperties;
}

/**
 * Content image with the same framing model as the design's image slots:
 * cover/contain baseline, optional stored scale + pan, optional top alignment.
 */
export default function ImageSlot({
  id,
  shape = 'rounded',
  radius,
  mask,
  fit = 'cover',
  align,
  placeholder = 'Drop an image',
  src,
  style,
}: ImageSlotProps) {
  const stored = id ? IMAGE_SLOTS[id] : undefined;
  const url = stored?.src ?? src;
  const view = stored ?? { s: 1, x: 0, y: 0 };
  const hostRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [box, setBox] = useState<{ fw: number; fh: number } | null>(null);
  const [nat, setNat] = useState<{ iw: number; ih: number } | null>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ fw: el.clientWidth, fh: el.clientHeight }));
    ro.observe(el);
    const raf = requestAnimationFrame(() => {
      const img = imgRef.current;
      if (img && img.complete && img.naturalWidth) setNat({ iw: img.naturalWidth, ih: img.naturalHeight });
    });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [url]);

  const radiusCss =
    shape === 'circle' ? '50%' : shape === 'pill' ? '9999px' : shape === 'rect' ? '0' : `${radius ?? 12}px`;
  const contain = String(fit).toLowerCase() === 'contain';

  let imgStyle: CSSProperties = {
    left: '50%',
    top: '50%',
    width: '100%',
    height: '100%',
    objectFit: contain ? 'contain' : 'cover',
  };
  const custom = view.s !== 1 || view.x !== 0 || view.y !== 0 || align === 'top';
  if (custom && nat && box && box.fw && box.fh) {
    const { iw, ih } = nat;
    const { fw, fh } = box;
    const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
    const k = base * view.s;
    const mx = Math.max(0, ((iw * k) / fw - 1) * 50);
    const my = Math.max(0, ((ih * k) / fh - 1) * 50);
    const x = Math.max(-mx, Math.min(mx, view.x));
    let y = Math.max(-my, Math.min(my, view.y));
    if (align === 'top' && view.s === 1 && !view.x && !view.y) y = Math.max(0, ((ih * k) / fh - 1) * 50);
    imgStyle = {
      left: `${50 + x}%`,
      top: `${50 + y}%`,
      width: `${((iw * k) / fw) * 100}%`,
      height: `${((ih * k) / fh) * 100}%`,
    };
  }

  return (
    <div ref={hostRef} id={id} className={styles.host} style={style} data-filled={url ? '' : undefined}>
      <div className={styles.frame} style={{ ...(mask ? { clipPath: mask } : { borderRadius: radiusCss }), ...(url ? { background: 'transparent' } : null) }}>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            className={styles.img}
            src={url}
            alt={placeholder}
            draggable={false}
            onLoad={(e) => setNat({ iw: e.currentTarget.naturalWidth, ih: e.currentTarget.naturalHeight })}
            style={imgStyle}
          />
        ) : (
          <div className={styles.empty}>
            <span className={styles.cap}>{placeholder}</span>
          </div>
        )}
      </div>
    </div>
  );
}
