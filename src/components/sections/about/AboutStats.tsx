import { useEffect, useRef } from 'react';

const STATS: { value: string; label: string; bg: string }[] = [
  { value: '150K+', label: 'Pet parents', bg: '#F0EBFA' },
  { value: '40+', label: 'Cities', bg: '#FFEAF4' },
  { value: '500+', label: 'Service providers', bg: '#FFF1E4' },
];

/** Counts the number up from 0 over 1.4s (ease-out cubic) once the tile is half visible. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const m = value.match(/([\d,]+(?:\.\d+)?)/);
    if (!m) return;
    const target = parseFloat(m[1].replace(/,/g, ''));
    const dec = (m[1].split('.')[1] || '').length;
    const comma = m[1].includes(',');
    const pre = value.slice(0, m.index);
    const post = value.slice((m.index ?? 0) + m[1].length);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / 1400);
          const v = target * (1 - Math.pow(1 - p, 3));
          let str = dec ? v.toFixed(dec) : String(Math.round(v));
          if (comma) str = Number(str).toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec });
          el.textContent = p < 1 ? pre + str + post : value;
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return <div ref={ref} style={{ fontSize: "clamp(46px,6vw,76px)", fontWeight: "800", letterSpacing: "-.04em", lineHeight: "1", fontVariantNumeric: "tabular-nums", color: "#2B2342" }}>{value}</div>;
}

export default function AboutStats() {
  return (
    <section style={{ maxWidth: "1260px", margin: "0 auto", padding: "clamp(80px,10vw,128px) 22px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <p style={{ marginBottom: "12px", color: "#CA5C00", fontWeight: "700", fontSize: "13.5px", letterSpacing: ".06em", textTransform: "uppercase" }}>By the numbers</p>
        <h2 style={{ fontSize: "clamp(32px,4vw,46px)", color: "#2B2342", textWrap: "balance" }}>Small team. Big pack.</h2>
      </div>
      <div style={{ marginTop: "36px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "20px" }}>
        {STATS.map((s) => (
          <div style={{ background: s.bg, borderRadius: "28px", padding: "clamp(26px,3vw,40px)" }} key={s.label}>
            <CountUp value={s.value} />
            <div style={{ marginTop: "12px", fontSize: "16px", fontWeight: "700", opacity: ".8", color: "#2B2342" }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* TODO: the design has a footnote "As of [month year]." with the date unfilled; omitted until it is supplied. */}
    </section>
  );
}
