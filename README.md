# Kinan al-Nahhas — official site

Bilingual (Arabic / English) personal site for **كنان النحاس**, member of Syria's
People's Assembly for the city of Homs. Built with Next.js (App Router) and an
Apple-inspired design system, with a Sanity CMS and full bilingual SEO.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** + a custom design-token layer (light/dark, RTL/LTR)
- **next-intl** — locale routing `/ar` (default, RTL) and `/en`, with hreflang
- **Sanity** — headless CMS (`sanity/`, Studio via `npm run studio`)
- **SEO** — per-route metadata, JSON-LD (Person/Article/Breadcrumb), dynamic OG
  images, `sitemap.xml`, `robots.txt`

## Develop

```bash
nvm use
npm install
npm run dev     # http://localhost:3000
```

The site renders from `lib/content.ts` until a Sanity project is connected, then
switches to CMS content automatically.

## Content & data flow

- `lib/content.ts` — verified fallback content (bio, the ported article, survey).
- `lib/site-data.ts` — façade: serves Sanity data when configured, else the fallback.
- `app/api/contact` + `app/api/survey` — store submissions/votes in Sanity (write token).

## Deploy

See **[DEPLOY.md](./DEPLOY.md)** for the Sanity → GitHub → Vercel runbook.
