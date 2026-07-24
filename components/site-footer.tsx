import { getLocale, getTranslations } from "next-intl/server";
import { getSiteData } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { FacebookIcon, XIcon } from "./icons";

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
          <p className="mt-1 text-xs font-medium text-accent">{t("official")}</p>
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
          <a href={`/${locale}#interviews`} className="text-sm text-ink-secondary transition-colors hover:text-ink">
            {nav("interviews")}
          </a>
          <Link href="/survey" className="text-sm text-ink-secondary transition-colors hover:text-ink">
            {nav("survey")}
          </Link>
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
            className="inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-ink"
          >
            <FacebookIcon className="h-4 w-4" />
            {about("followFacebook")}
          </a>
          <a
            href={data.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-ink"
          >
            <XIcon className="h-[15px] w-[15px]" />
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
