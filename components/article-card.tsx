import Image from "next/image";
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
      className="card group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-hover)]"
    >
      {article.coverImage && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <time
          dateTime={article.publishedAt}
          className="text-xs text-ink-tertiary"
        >
          {formatDate(article.publishedAt, locale)}
        </time>
        <h3 className="mt-2 text-xl font-semibold text-ink transition-colors group-hover:text-accent">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-ink-secondary">{article.dek}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          {readMoreLabel} <span aria-hidden>{arrow}</span>
        </span>
      </div>
    </Link>
  );
}
