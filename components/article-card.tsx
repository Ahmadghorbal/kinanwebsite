import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import type { ArticleSummary } from "@/lib/site-data";

export function ArticleCard({
  article,
  locale,
  readMoreLabel,
}: {
  article: ArticleSummary;
  locale: string;
  readMoreLabel: string;
}) {
  const arrow = locale === "ar" ? "←" : "→";
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="card group flex flex-col gap-5 p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-hover)] sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <time
          dateTime={article.publishedAt}
          className="text-sm text-ink-tertiary"
        >
          {formatDate(article.publishedAt, locale)}
        </time>
        <h3 className="mt-2 text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
          {article.title}
        </h3>
        <p className="mt-2 max-w-2xl text-[17px] leading-relaxed text-ink-secondary">
          {article.dek}
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-accent sm:self-auto">
        {readMoreLabel} <span aria-hidden>{arrow}</span>
      </span>
    </Link>
  );
}
