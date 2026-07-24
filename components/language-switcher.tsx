"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { getPathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("language");
  const other = locale === "ar" ? "en" : "ar";

  function switchLocale() {
    const href = getPathname({ href: pathname, locale: other });
    // Hard navigation (not the App Router's client-side transition): the
    // /ar and /en routes are separate root layouts, and a soft transition
    // between them can drop the theme toggle's manually-set `data-theme`
    // attribute on <html>. A full reload guarantees the inline theme script
    // reruns and reapplies the saved preference before first paint.
    window.location.assign(href);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={t("label")}
      className="inline-flex h-9 items-center justify-center rounded-full border border-line px-3 text-sm font-medium text-ink-secondary transition-colors hover:text-ink hover:border-ink-tertiary focus-visible:text-ink"
    >
      {t("switchToEnglish")}
    </button>
  );
}
