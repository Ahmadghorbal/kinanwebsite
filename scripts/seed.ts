/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Seeds a connected Sanity dataset with the verified content in lib/content.ts.
 * Run after creating the project:  npm run seed
 * (wraps `sanity exec scripts/seed.ts --with-user-token`)
 */
import { getCliClient } from "sanity/cli";
import { siteContent } from "../lib/content";
import { blocksToPortableText } from "../lib/portable";

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
    facts: siteContent.facts.map((f) => ({
      _key: key(),
      label: lstr(f.label),
      value: lstr(f.value),
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
      body: {
        _type: "localeBlock",
        ar: blocksToPortableText(a.body, "ar"),
        en: blocksToPortableText(a.body, "en"),
      },
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

  const tx = client.transaction();
  for (const d of docs) tx.createOrReplace(d);
  await tx.commit();
  console.log(`Seeded ${docs.length} documents into Sanity.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
