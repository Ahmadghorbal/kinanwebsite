import "server-only";
import { cache } from "react";
import { siteContent, type Locale } from "./content";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import {
  siteSettingsQuery,
  articlesQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  surveyQuery,
  interviewsQuery,
} from "@/sanity/lib/queries";

export interface SiteData {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  socials: { facebook: string; x: string };
  contactEmail: string;
  photo?: string;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  dek: string;
  publishedAt: string;
  source: { name: string; url: string };
  coverImage?: string;
}

export interface ArticleFull extends ArticleSummary {
  summary: string[];
}

export interface SurveyData {
  id: string;
  question: string;
  options: { id: string; label: string }[];
}

export interface InterviewData {
  id: string;
  title: string;
  youtubeId: string;
  publishedAt: string;
}

/** Pick a localized value from either a {ar,en} object or a plain string. */
function pick(value: unknown, locale: Locale): string {
  if (value && typeof value === "object" && locale in (value as object)) {
    return String((value as Record<string, unknown>)[locale] ?? "");
  }
  return typeof value === "string" ? value : "";
}

// ----- Fallback builders (verified content in lib/content.ts) --------------
function fallbackSiteData(locale: Locale): SiteData {
  return {
    name: siteContent.name[locale],
    role: siteContent.role[locale],
    tagline: siteContent.tagline[locale],
    bio: siteContent.bio.map((p) => p[locale]),
    socials: siteContent.socials,
    contactEmail: siteContent.contactEmail,
    photo: siteContent.photo,
  };
}

function fallbackArticles(locale: Locale): ArticleSummary[] {
  return siteContent.articles.map((a) => ({
    slug: a.slug,
    title: a.title[locale],
    dek: a.dek[locale],
    publishedAt: a.publishedAt,
    source: { name: a.source.name[locale], url: a.source.url },
    coverImage: a.coverImage,
  }));
}

function fallbackArticle(slug: string, locale: Locale): ArticleFull | null {
  const a = siteContent.articles.find((x) => x.slug === slug);
  if (!a) return null;
  return {
    slug: a.slug,
    title: a.title[locale],
    dek: a.dek[locale],
    publishedAt: a.publishedAt,
    source: { name: a.source.name[locale], url: a.source.url },
    coverImage: a.coverImage,
    summary: a.summary.map((p) => p[locale]),
  };
}

function fallbackSurvey(locale: Locale): SurveyData {
  const s = siteContent.survey;
  return {
    id: s.id,
    question: s.question[locale],
    options: s.options.map((o) => ({ id: o.id, label: o.label[locale] })),
  };
}

function fallbackInterviews(locale: Locale): InterviewData[] {
  return siteContent.interviews.map((i) => ({
    id: i.id,
    title: i.title[locale],
    youtubeId: i.youtubeId,
    publishedAt: i.publishedAt,
  }));
}

// ----- Public façade: Sanity when configured, fallback otherwise -----------
export const getSiteData = cache(async (locale: Locale): Promise<SiteData> => {
  if (!isSanityConfigured) return fallbackSiteData(locale);
  try {
    const doc = await client.fetch(siteSettingsQuery);
    if (!doc) return fallbackSiteData(locale);
    const fb = fallbackSiteData(locale);
    return {
      name: pick(doc.name, locale) || fb.name,
      role: pick(doc.role, locale) || fb.role,
      tagline: pick(doc.tagline, locale) || fb.tagline,
      bio: Array.isArray(doc.bio)
        ? doc.bio.map((p: unknown) => pick(p, locale))
        : fb.bio,
      socials: doc.socials ?? fb.socials,
      contactEmail: doc.contactEmail ?? fb.contactEmail,
      photo: doc.photo ?? fb.photo,
    };
  } catch {
    return fallbackSiteData(locale);
  }
});

export const getArticles = cache(
  async (locale: Locale): Promise<ArticleSummary[]> => {
    if (!isSanityConfigured) return fallbackArticles(locale);
    try {
      const docs = await client.fetch(articlesQuery);
      if (!Array.isArray(docs) || docs.length === 0)
        return fallbackArticles(locale);
      return docs.map((a: Record<string, unknown>) => ({
        slug: String(a.slug ?? ""),
        title: pick(a.title, locale),
        dek: pick(a.dek, locale),
        publishedAt: String(a.publishedAt ?? ""),
        source: {
          name: pick((a.source as Record<string, unknown>)?.name, locale),
          url: String((a.source as Record<string, unknown>)?.url ?? ""),
        },
        coverImage: (a.coverImage as string | undefined) ?? undefined,
      }));
    } catch {
      return fallbackArticles(locale);
    }
  },
);

export const getArticle = cache(
  async (slug: string, locale: Locale): Promise<ArticleFull | null> => {
    if (!isSanityConfigured) return fallbackArticle(slug, locale);
    try {
      const a = await client.fetch(articleBySlugQuery, { slug });
      if (!a) return fallbackArticle(slug, locale);
      const summary =
        a.summary && typeof a.summary === "object" ? a.summary[locale] : null;
      return {
        slug: String(a.slug ?? slug),
        title: pick(a.title, locale),
        dek: pick(a.dek, locale),
        publishedAt: String(a.publishedAt ?? ""),
        source: {
          name: pick(a.source?.name, locale),
          url: String(a.source?.url ?? ""),
        },
        coverImage: a.coverImage ?? undefined,
        summary: Array.isArray(summary)
          ? summary
          : fallbackArticle(slug, locale)?.summary ?? [],
      };
    } catch {
      return fallbackArticle(slug, locale);
    }
  },
);

export const getArticleSlugs = cache(async (): Promise<string[]> => {
  if (!isSanityConfigured) return siteContent.articles.map((a) => a.slug);
  try {
    const slugs = await client.fetch(articleSlugsQuery);
    return Array.isArray(slugs) && slugs.length > 0
      ? slugs
      : siteContent.articles.map((a) => a.slug);
  } catch {
    return siteContent.articles.map((a) => a.slug);
  }
});

export const getSurvey = cache(async (locale: Locale): Promise<SurveyData> => {
  if (!isSanityConfigured) return fallbackSurvey(locale);
  try {
    const s = await client.fetch(surveyQuery);
    if (!s) return fallbackSurvey(locale);
    return {
      id: String(s.id ?? siteContent.survey.id),
      question: pick(s.question, locale),
      options: Array.isArray(s.options)
        ? s.options.map((o: { id?: string; label: unknown }, i: number) => ({
            id: String(o.id ?? i),
            label: pick(o.label, locale),
          }))
        : fallbackSurvey(locale).options,
    };
  } catch {
    return fallbackSurvey(locale);
  }
});

export const getInterviews = cache(
  async (locale: Locale): Promise<InterviewData[]> => {
    if (!isSanityConfigured) return fallbackInterviews(locale);
    try {
      const docs = await client.fetch(interviewsQuery);
      if (!Array.isArray(docs) || docs.length === 0)
        return fallbackInterviews(locale);
      return docs.map((i: Record<string, unknown>) => ({
        id: String(i.youtubeId ?? i._id ?? ""),
        title: pick(i.title, locale),
        youtubeId: String(i.youtubeId ?? ""),
        publishedAt: String(i.publishedAt ?? ""),
      }));
    } catch {
      return fallbackInterviews(locale);
    }
  },
);
