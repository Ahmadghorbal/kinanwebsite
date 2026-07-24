# Deploy & connect — runbook

This site runs today on built-in verified content. To make it CMS-driven and live,
complete the three steps below. Each needs a one-time login that can't be done from
the build agent, so they're yours to run.

---

## 0. Local development

```bash
nvm use            # Node 24 (installed via nvm)
npm install
cp .env.local.example .env.local   # already created; edit as needed
npm run dev        # http://localhost:3000  → redirects to /ar
```

The site works immediately with the content in `lib/content.ts` (Arabic + English).
`npm run build` produces the production build.

---

## 1. Sanity (CMS)

The site reads from Sanity automatically once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set;
until then it uses the built-in fallback.

```bash
npx sanity login                       # opens browser
npx sanity init --env .env.local       # create/select a project + dataset "production"
                                       # writes NEXT_PUBLIC_SANITY_PROJECT_ID + DATASET
```

Then create a **write token** (Sanity dashboard → API → Tokens → *Editor*) and add it to
`.env.local`:

```
SANITY_API_WRITE_TOKEN=sk...
```

Seed the verified content and run Studio:

```bash
npm run seed            # pushes lib/content.ts into Sanity (bio, article, survey)
npm run studio          # local Studio at http://localhost:3333
# npm run studio:deploy # optional hosted Studio at <host>.sanity.studio
```

After seeding, edits in Studio appear on the site. Contact submissions and survey votes
are written to Sanity via the API routes using the write token.

**Important:** until `SANITY_API_WRITE_TOKEN` is set, the survey API reports
`persisted: false` and the site keeps vote counts in the visitor's own browser
(localStorage) instead — this is deliberate. A project ID alone lets anonymous
*reads* succeed against Sanity (returning empty data), which would otherwise look
like "real, empty results" even though nothing was actually saved. Add the write
token to switch survey (and contact) storage over to Sanity for real.

---

## 2. GitHub

No `gh` CLI or SSH key was detected on this machine, so create the repo in the browser,
then push (the local repo is already committed):

1. Create an **empty** repo at https://github.com/new (no README/…).
2. Connect and push:

```bash
git remote add origin https://github.com/<you>/kinan-site.git
git branch -M main
git push -u origin main
```

(HTTPS push will prompt for a GitHub username + a Personal Access Token as the password,
or set up an SSH key first — your choice.)

---

## 3. Vercel

The Vercel account login can't be done from the build agent — do this in your dashboard:

1. https://vercel.com/new → **Import** the GitHub repo. Framework auto-detects as Next.js.
2. Add **Environment Variables** (Project → Settings → Environment Variables):

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` (your real URL) |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | from step 1 |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` |
   | `SANITY_API_WRITE_TOKEN` | the Editor token (keep secret) |

3. **Deploy.** Every push to `main` then auto-deploys; branches get preview URLs.
4. In Sanity → API → **CORS origins**, add your Vercel URL so Studio/preview can reach it.

### Custom domain
Vercel → Project → Settings → **Domains** → add your domain and follow the DNS steps.
Set `NEXT_PUBLIC_SITE_URL` to that domain so canonical URLs, the sitemap, and Open Graph
tags are correct.

---

## Notes & provenance

- **Content:** the bio and the article «أولوياتنا في مجلس الشعب» are from public reporting
  and the author's own piece; the article credits and links its first publication in
  *Syria in Transition* (`syriaintransition.com`). The English article text is the outlet's
  official translation.
- **Not included:** no photo is bundled (the hero shows a monogram). Add one in Studio
  (`siteSettings.photo`) or `public/` and it will render automatically.
- **Fonts:** Latin uses the system (SF) stack; Arabic uses IBM Plex Sans Arabic. Apple's
  SF fonts can't be licensed for the web, so the system stack renders real SF on Apple devices.
