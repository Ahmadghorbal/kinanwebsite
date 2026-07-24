import { getSiteData } from "@/lib/site-data";
import type { ArticleFull } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function PersonJsonLd({ locale }: { locale: string }) {
  const data = await getSiteData(locale as Locale);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: data.name,
        jobTitle: data.role,
        description: data.tagline,
        url: `${siteUrl}/${locale}`,
        ...(data.photo ? { image: data.photo } : {}),
        sameAs: [data.socials.facebook, data.socials.x].filter(Boolean),
      }}
    />
  );
}

export async function WebSiteJsonLd({ locale }: { locale: string }) {
  const data = await getSiteData(locale as Locale);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: data.name,
        url: `${siteUrl}/${locale}`,
        inLanguage: locale,
      }}
    />
  );
}

export async function ArticleJsonLd({
  article,
  locale,
}: {
  article: ArticleFull;
  locale: string;
}) {
  const data = await getSiteData(locale as Locale);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.dek,
        datePublished: article.publishedAt,
        inLanguage: locale,
        author: { "@type": "Person", name: data.name },
        mainEntityOfPage: `${siteUrl}/${locale}/articles/${article.slug}`,
        isBasedOn: article.source?.url || undefined,
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: it.url,
        })),
      }}
    />
  );
}
