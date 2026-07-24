import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getArticleSlugs } from "@/lib/site-data";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getArticleSlugs();
  const entries: MetadataRoute.Sitemap = [];

  const langs = (path: string) => ({
    languages: {
      ar: `${siteUrl}/ar${path}`,
      en: `${siteUrl}/en${path}`,
    },
  });

  for (const locale of routing.locales) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: langs(""),
    });
    entries.push({
      url: `${siteUrl}/${locale}/articles`,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: langs("/articles"),
    });
    for (const slug of slugs) {
      entries.push({
        url: `${siteUrl}/${locale}/articles/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: langs(`/articles/${slug}`),
      });
    }
  }

  return entries;
}
