# Elpis.co

Editorial, architectural marketing site for **Elpis.co**, an interior design,
renovation and design & build studio in Shah Alam, Malaysia. Built with
Next.js (App Router, TypeScript), GSAP + ScrollTrigger for motion and Lenis
for smooth scroll.

## Stack

- Next.js 16 (App Router, Server Components by default)
- TypeScript
- Native CSS (design tokens + a 12-column editorial grid in `app/globals.css`, no Tailwind)
- GSAP + ScrollTrigger for text/image reveals and the process sticky-scroll
- Lenis for smooth scroll, synced to GSAP's ticker
- `next/font` (self-hosted Instrument Serif + Manrope, no runtime Google Fonts requests)
- `next/image` for all photography

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

`npm run build` must succeed with no TypeScript errors before deploying.
`npm run lint` runs ESLint (flat config, Next 16's linting is no longer part
of `next build`).

## Deploying to Vercel

This is a standard Next.js App Router project — import the repository into
Vercel, framework preset **Next.js**, no special build configuration needed.
No environment variables are required (see `.env.example`); no database is
used.

## Where to replace placeholder content

### Images

The current photography is reused from the site's original single-page
version (5 real photos, no build-step placeholders). Replace with final
Elpis photography in `/public/images/`, keeping the same aspect ratios so
the existing compositions don't need to be redesigned:

- `/public/images/hero/main.jpg` — homepage hero, full-bleed
- `/public/images/projects/<slug>/cover.jpg` and `hero.jpg` — one pair per
  project (currently `serene-residence`, `modern-sanctuary`, `coastal-retreat`)
- `/public/images/details/material-detail.jpg` — reused across the homepage
  Craft section and every project detail page's material section
- `/public/images/studio/studio-atmosphere.jpg` — Studio page

Each project currently has a single photo doing double duty as its
cover/hero/gallery image. Add more images per project by extending the
`images` array in `data/projects.ts` and wiring them into a gallery section
on `app/projects/[slug]/page.tsx` once more photography exists.

### Contact links

Real contact details were not supplied, so these are visible placeholders —
search the codebase for them:

- `[WHATSAPP_URL]` — header fullscreen menu, footer, homepage final CTA, contact page
- `[INSTAGRAM_URL]` — header fullscreen menu, footer
- `[EMAIL_ADDRESS]` — footer, and the contact form's `mailto:` action in
  `components/contact/ContactForm.tsx`

The contact form currently submits via a `mailto:` link (opens the visitor's
email client, no backend). Before launch, replace this with a real API route
or form provider (Formspree, Netlify Forms, Resend, etc.) — see the `TODO`
comment at the top of `components/contact/ContactForm.tsx`.

### Project data

All project content (title, location, year, type, scope, services,
description) lives in `data/projects.ts`. Add, edit or remove entries there;
`/projects`, `/projects/[slug]` and the two homepage featured-project spots
all read from this file.

### Location / studio address

"Shah Alam, Malaysia" appears in the fullscreen menu and footer as a
placeholder location, per the build brief. Update in
`components/layout/FullscreenMenu.tsx` and `components/layout/Footer.tsx`.

## Notes on the design system

- Brand tokens (colors, type, spacing) are defined once in `app/globals.css`
  under `:root`. Two colors were deliberately calibrated slightly darker than
  the brief's literal hex values so text passes WCAG AA contrast at label
  sizes — see the comments beside `--champagne-ink` and `--muted` in that
  file for the exact numbers.
- The header's light/dark text color switches automatically based on which
  section is behind it — every `<section>` should carry a
  `data-nav-theme="light"` or `"dark"` attribute for this to work correctly
  when adding new sections.
- Motion respects `prefers-reduced-motion` throughout (GSAP entrances,
  custom cursor, and the marquee all degrade to a static state).
