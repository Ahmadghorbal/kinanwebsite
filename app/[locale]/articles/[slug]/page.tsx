import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArticle, getArticleSlugs, getNextArticle } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle(slug, locale as Locale);
  if (!article) return {};

  const path = `/articles/${slug}`;
  return {
    title: article.title,
    description: article.dek,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ar: `/ar${path}`,
        en: `/en${path}`,
        "x-default": `/ar${path}`,
      },
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      publishedTime: article.publishedAt,
      url: `/${locale}${path}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getArticle(slug, locale as Locale);
  if (!article) notFound();

  const t = await getTranslations("articles");
  const nextArticle = await getNextArticle(slug, locale as Locale);

  return (
    <article className="mx-auto w-full max-w-[44rem] px-5 py-14 sm:px-6 sm:py-20">
      <ArticleJsonLd article={article} locale={locale} />
      <BreadcrumbJsonLd
        items={[
          { name: t("heading"), url: `${siteUrl}/${locale}/articles` },
          {
            name: article.title,
            url: `${siteUrl}/${locale}/articles/${slug}`,
          },
        ]}
      />

      <Link
        href="/articles"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
      >
        <span aria-hidden>{locale === "ar" ? "→" : "←"}</span>
        {t("backToArticles")}
      </Link>

      <header className="mt-6">
        <time
          dateTime={article.publishedAt}
          className="text-sm text-ink-tertiary"
        >
          {formatDate(article.publishedAt, locale)}
        </time>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-ink-secondary">
          {article.dek}
        </p>
      </header>

      <hr className="my-8 border-line" />

      <div className="prose">
        {article.summary.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {article.source?.url && (
        <div className="mt-8 rounded-2xl border-2 border-accent/30 bg-surface-2 p-6">
          <p className="text-sm font-semibold text-ink">
            {t("sourcePrefix")}
          </p>
          <a
            href={article.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-3"
          >
            {t("readFullArticle")} — {article.source.name}
            <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
          </a>
        </div>
      )}

      {nextArticle && (
        <div className="mt-12 border-t border-line pt-8">
          <p className="eyebrow">{t("nextArticle")}</p>
          <Link
            href={`/articles/${nextArticle.slug}`}
            className="group mt-3 flex items-center justify-between gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-accent"
          >
            <div>
              <time
                dateTime={nextArticle.publishedAt}
                className="text-xs text-ink-tertiary"
              >
                {formatDate(nextArticle.publishedAt, locale)}
              </time>
              <h3 className="mt-1 text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                {nextArticle.title}
              </h3>
            </div>
            <span
              aria-hidden
              className="shrink-0 text-xl text-accent transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            >
              {locale === "ar" ? "←" : "→"}
            </span>
          </Link>
        </div>
      )}
    </article>
  );
}
