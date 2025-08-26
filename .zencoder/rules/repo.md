# Repository Guide

Project: Vite React TypeScript Starter (Birthday Interactive)

## Tech Stack
- React 18 + TypeScript
- Vite 5
- TailwindCSS
- ESLint

## Scripts
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint
```

## Directory Structure (key paths)
- /src/App.tsx — Main page (cake, celebration, bouquet)
- /src/components/Cake.tsx — Birthday cake and candles
- /src/components/AudioBlower.tsx — Mic input to blow candles
- /src/components/Celebration.tsx — Celebration overlay popup
- /src/components/FlowerBouquet.tsx — Bouquet interactions
- /index.html — Vite entry
- /vite.config.ts — Vite config
- /tailwind.config.js, /postcss.config.js — Styling config

## App Flow
- Users blow out candles by clicking or via mic.
- When all candles are blown, a celebration overlay shows with a birthday tune.
- A bouquet section allows adding flowers progressively with messages.

## Recent Changes (UX and Fixes)
- Celebration popup now closes on:
  - Clicking the background
  - Clicking the popup card
  - Close (X) or action button
- Removed auto-dismiss timer; user controls dismissal.
- Bouquet reworked with SVG stems and flower heads for a cohesive, high-quality look and better alignment.

## Development
1) Install deps: `npm install`
2) Start dev server: `npm run dev` (default: http://localhost:5173)
3) Build: `npm run build` → outputs to `dist/`
4) Preview build: `npm run preview`

## Linting
- Run `npm run lint` (ESLint configuration present in repo).

## Styling
- TailwindCSS is configured; utilities used throughout components.

## Notes
- Microphone access requires user permission in the browser for AudioBlower to work.
- No environment variables required for current features.

## Ideas / Next Steps
- Replace generated tune with a short birthday song audio asset.
- Option to upload a custom message and background.
- Add shareable link with preset message/number of candles.
- Optional: Use real high-quality flower images if desired (current is vector SVG for crispness and performance).