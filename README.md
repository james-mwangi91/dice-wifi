# DICE WiFi

Marketing site for DICE WiFi, an internet service provider serving Nairobi and its
satellite towns. Single-page React app with client-side routing, deployed to GitHub Pages.

## Stack

React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · Framer Motion · React Router 6

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run `tsc --noEmit` |

## Configuration

The contact form delivers through [EmailJS](https://www.emailjs.com). Copy `.env.example`
to `.env` and fill in your credentials:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

All three are required. Without them the form simulates a send in development and reports
an error in production builds — it will not silently pretend a message was delivered.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which lints, typechecks, builds
with `--base=/dice-wifi/` and publishes to GitHub Pages.

Because Pages has no SPA rewrite, `public/404.html` captures the requested path in
`sessionStorage` and `index.html` restores it before the router mounts, so deep links and
refreshes resolve correctly. Both derive the base path at runtime rather than hardcoding
it, so serving from a custom domain root works without changes.

## Project layout

```
src/
  animations/   Framer Motion variants
  components/
    home/       Landing page sections
    layout/     Navbar, Footer, Layout shell
    misc/       Cursor, loader, cookie notice, floating actions
    ui/         Reusable primitives (Button, Reveal, SectionHeading…)
  constants/    Site content — packages, coverage, FAQs, testimonials
  contexts/     Theme provider
  hooks/        useScrolled, useReducedMotion, useScrollLock, useLocalStorage
  pages/        Route components
  types/        Shared interfaces
  utils/        Class-name join, scroll/navigation helpers
```

Site copy lives in `src/constants/index.ts` — packages, pricing, coverage areas, FAQs and
testimonials can all be edited there without touching components.

## Hotspot site

`hotspot/` is a separate single-page site for DICE Hotspot (pay-as-you-go WiFi
bundles), with its own theme and dependencies. It deploys alongside the main site at
`/dice-wifi/hotspot/`.

```bash
cd hotspot
npm install
npm run dev     # http://localhost:5174
```

Bundles, hero slides, hotspot areas and FAQs live in `hotspot/src/data.ts`.
Hero photos come from Unsplash at up to 2400px wide, served via `srcset`.
