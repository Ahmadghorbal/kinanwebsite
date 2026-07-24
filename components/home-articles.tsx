import { getLocale, getTranslations } from "next-intl/server";
import { getArticles } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { ArticleCard } from "./article-card";

export async function HomeArticles() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("articles");
  const articles = (await getArticles(locale)).slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section id="articles" className="section scroll-mt-20 bg-surface-2">
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{t("heading")}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {t("latestHeading")}
              </h2>
            </div>
            <Link
              href="/articles"
              className="hidden shrink-0 text-sm font-semibold text-accent hover:underline sm:inline"
            >
              {t("heading")} →
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                locale={locale}
                readMoreLabel={t("readMore")}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
