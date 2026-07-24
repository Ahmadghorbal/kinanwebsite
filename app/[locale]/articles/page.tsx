import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { getArticles } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Container } from "@/components/container";
import { ArticleCard } from "@/components/article-card";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });
  return {
    title: t("heading"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/articles`,
      languages: {
        ar: "/ar/articles",
        en: "/en/articles",
        "x-default": "/ar/articles",
      },
    },
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("articles");
  const nav = await getTranslations("nav");
  const currentLocale = (await getLocale()) as Locale;
  const articles = await getArticles(currentLocale);

  return (
    <Container className="py-16 sm:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: nav("about"), url: `${siteUrl}/${locale}` },
          { name: t("heading"), url: `${siteUrl}/${locale}/articles` },
        ]}
      />
      <header className="mb-10">
        <p className="eyebrow">{t("heading")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-secondary">
          {t("subtitle")}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-ink-secondary">{t("empty")}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              readMoreLabel={t("readMore")}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
