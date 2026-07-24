/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Seeds a connected Sanity dataset with the verified content in lib/content.ts.
 * Run after creating the project:  npm run seed
 * (wraps `sanity exec scripts/seed.ts --with-user-token`)
 */
import { getCliClient } from "sanity/cli";
import { siteContent } from "../lib/content";

const client = getCliClient();

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

const lstr = (v: { ar: string; en: string }) => ({
  _type: "localeString",
  ar: v.ar,
  en: v.en,
});
const ltext = (v: { ar: string; en: string }) => ({
  _type: "localeText",
  ar: v.ar,
  en: v.en,
});

async function run() {
  const docs: any[] = [];

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    name: lstr(siteContent.name),
    role: lstr(siteContent.role),
    tagline: ltext(siteContent.tagline),
    bio: siteContent.bio.map((p) => ({
      _key: key(),
      _type: "localeText",
      ar: p.ar,
      en: p.en,
    })),
    socials: siteContent.socials,
    contactEmail: siteContent.contactEmail,
  });

  for (const a of siteContent.articles) {
    docs.push({
      _id: `article-${a.slug}`,
      _type: "article",
      title: lstr(a.title),
      slug: { _type: "slug", current: a.slug },
      dek: ltext(a.dek),
      publishedAt: new Date(a.publishedAt).toISOString(),
      source: { name: lstr(a.source.name), url: a.source.url },
      summary: a.summary.map((p) => ({
        _key: key(),
        _type: "localeText",
        ar: p.ar,
        en: p.en,
      })),
    });
  }

  docs.push({
    _id: `survey-${siteContent.survey.id}`,
    _type: "survey",
    surveyId: siteContent.survey.id,
    question: lstr(siteContent.survey.question),
    options: siteContent.survey.options.map((o) => ({
      _key: key(),
      id: o.id,
      label: lstr(o.label),
    })),
    isActive: true,
  });

  for (const i of siteContent.interviews) {
    docs.push({
      _id: `interview-${i.id}`,
      _type: "interview",
      title: lstr(i.title),
      youtubeId: i.youtubeId,
      publishedAt: new Date(i.publishedAt).toISOString(),
    });
  }

  const tx = client.transaction();
  for (const d of docs) tx.createOrReplace(d);
  await tx.commit();
  console.log(`Seeded ${docs.length} documents into Sanity.`);
  console.log(
    "Note: article cover images aren't seeded automatically — upload them in Studio (they live in public/images/articles/ for the site's own fallback rendering).",
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
