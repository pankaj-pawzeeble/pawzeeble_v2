import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  // Preflight is off so Tailwind's reset doesn't alter the design's own base styles.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        ink: '#2B2342',
        plum: { DEFAULT: '#6351A1', soft: '#F2EEFA', line: '#E0D8F1' },
        accent: { DEFAULT: '#CA5C00', hover: '#A44A00' },
        cream: '#FFFCF6',
        muted: '#5A5177',
      },
      fontFamily: { sans: ["'Plus Jakarta Sans'", 'sans-serif'] },
    },
  },
  plugins: [],
};

export default config;
