import { getLocale, getTranslations } from "next-intl/server";
import { getSiteData } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const about = await getTranslations("about");
  const data = await getSiteData(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-[71rem] gap-8 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-[17px] font-bold text-ink">{data.name}</p>
          <p className="mt-1 text-sm text-ink-secondary">{t("role")}</p>
        </div>

        <nav className="flex flex-col gap-2.5" aria-label={t("nav")}>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            {t("nav")}
          </p>
          <a href={`/${locale}#about`} className="text-sm text-ink-secondary transition-colors hover:text-ink">
            {nav("about")}
          </a>
          <Link href="/articles" className="text-sm text-ink-secondary transition-colors hover:text-ink">
            {nav("articles")}
          </Link>
          <a href={`/${locale}#survey`} className="text-sm text-ink-secondary transition-colors hover:text-ink">
            {nav("survey")}
          </a>
          <a href={`/${locale}#contact`} className="text-sm text-ink-secondary transition-colors hover:text-ink">
            {nav("contact")}
          </a>
        </nav>

        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
            {t("follow")}
          </p>
          <a
            href={data.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-secondary transition-colors hover:text-ink"
          >
            {about("followFacebook")}
          </a>
          <a
            href={data.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-secondary transition-colors hover:text-ink"
          >
            {about("followX")}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-[71rem] px-5 py-6 sm:px-6">
          <p className="text-xs text-ink-tertiary">
            © {year} {data.name} — {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
