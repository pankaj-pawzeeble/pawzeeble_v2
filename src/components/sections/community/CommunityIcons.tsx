import type { SVGProps } from 'react';

type P = { size?: number } & Omit<SVGProps<SVGSVGElement>, 'width' | 'height'>;

const base = (size: number, p: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...p,
});

export const InfoIcon = ({ size = 16, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
);
export const HeartIcon = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
);
export const CommentIcon = ({ size = 21, ...p }: P) => (
  <svg {...base(size, p)}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
);
export const SendIcon = ({ size = 21, ...p }: P) => (
  <svg {...base(size, p)}><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
);
export const MoreVerticalIcon = ({ size = 20, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
);
export const LockIcon = ({ size = 34, ...p }: P) => (
  <svg {...base(size, p)}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
export const UserIcon = ({ size = 20, ...p }: P) => (
  <svg {...base(size, p)}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
export const SmileIcon = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></svg>
);
export const PlayIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size, { fill: 'currentColor', stroke: 'none', ...p })}><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.1-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" /></svg>
);
export const CloseIcon = ({ size = 14, ...p }: P) => (
  <svg {...base(size, { strokeWidth: 2.6, ...p })}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
export const WaveMark = (p: { flip?: boolean }) => (
  <svg width="34" height="20" viewBox="0 0 34 20" fill="none" stroke="#6351A1" strokeWidth="3" strokeLinecap="round" aria-hidden="true" style={p.flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M2 7c4-5 8-5 12 0s8 5 12 0 5-3 6-2" />
    <path d="M2 16c4-5 8-5 12 0s8 5 12 0 5-3 6-2" />
  </svg>
);
