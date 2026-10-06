# Pawzeeble Website v2 — Next.js

Next.js (Pages Router) conversion of the Pawzeeble website design. The layout, copy, colours, images, scroll scenes, hover states and responsive rules come straight from the original design file.

## Requirements

- Node.js **20.9 or newer**. `.nvmrc` is set to `22`.
- npm 10+

## Setup

```bash
cd ~/Desktop/pawzeeble-website-v2
nvm use            # optional
npm install
npm run dev        # http://localhost:3000
```

Checks:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config, eslint-config-next)
npm run build      # production build
npm run check      # all three
```

## Stack

Next.js 16, React 19, TypeScript 5.9, Pages Router (`src/pages`, no `src/app`), MUI v5 + Emotion (ThemeProvider wired with the site palette), Tailwind CSS 3 (preflight off so it doesn't reset the design), CSS Modules + global CSS, Jotai (Provider wired), Axios (`src/lib/http.ts`), socket.io-client (`src/lib/socket.ts`). Framer Motion, Swiper, React Hook Form and Zod are installed but not used yet.

## Routes

| Route | View |
|---|---|
| `/` | Home: hero, marquee, pinned feature rail with zoom into the Pawteckt panel, cities, Sheru AI, Clans, testimonials, blogs/vlogs, FAQ |
| `/ecosystem` | Four products + profile CTA |
| `/journey` | Universal Pet Profile scroll cinematic (no header/footer) |
| `/about` | Story, stats, timeline, backers, mission, team, open roles |
| `/pawteckt` | Plans, comparison table, coverage, eligibility, claims, FAQ, subscribe flow |
| `/find-care` | City/service search, categories, results |
| `/find-care/clinic?type=assured\|regular` | Clinic detail, coupons, slot booking, Leaflet map |
| `/find-care/groomer?type=…` | Groomer detail |
| `/blog` | Articles / Podcasts tabs |
| `/blog/post?id=N` | Article |
| `/community`, `/skale`, `/pawzmart`, `/download` | Placeholder pages from the design |

## Structure

```
src/
  pages/            routes + _app (providers, controller, shell) + _document (fonts, Leaflet CSS)
  components/
    layout/         SiteShell, SiteHeader, MobileDrawer, ClosingBanner, SiteFooter, ScrollTopButton, AppQrCard
    overlays/       BookingDialog
    subscribe/      SubscribeFlow + steps/ (phone, OTP, payment, pet, KYC, …)
    views/          one view per route
    sections/<page> one component per page section
    ui/ImageSlot    content image with the design's crop/framing model
  lib/
    site/SiteController.ts  state, handlers, scroll scenes (ported logic)
    site/DCLogic.ts         base class: context provider + router sync
    imageSlots.ts           placed images + crops per slot id
    http.ts, socket.ts
  hooks/useSite.ts  read controller values from any component
  utils/routes.ts   page ↔ URL mapping
  styles/globals.css  Tailwind directives + the design's global rules (data-r hooks, media queries, keyframes)
  theme/muiTheme.ts
  types/site.ts
public/images/      brand/, badges/, content/, slots/
```

### How state works

`SiteController` (in `_app`) holds the site state and the scroll-scene logic. It persists across navigation. Its `renderVals()` output goes through React context, and components read it with `useSite()`. When the controller changes `page`, the URL updates through `next/router`. Back and forward navigation and direct links update the controller in return.

`SiteController.ts` and `DCLogic.ts` use `// @ts-nocheck` because they are a direct port of the original logic. Typing them is the obvious next refactor.

### Styling

Inline style objects carry the design's exact values. Hover states are in each component's `*.module.css` (`!important` so they win over inline styles, as in the original). Responsive and reduced-motion rules are in `globals.css`, keyed on `data-r` / `data-eco` attributes.

## Open items

- Clinic and groomer pages render client-only because the booking calendar uses today's date.
- Image slots without a placed image show their placeholder caption, as in the design.
- Real App Store / Play Store links, clinic data and API endpoints (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL`) are still placeholders.
