"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");
  const other = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      aria-label={t("label")}
      className="inline-flex h-9 items-center justify-center rounded-full border border-line px-3 text-sm font-medium text-ink-secondary transition-colors hover:text-ink hover:border-ink-tertiary focus-visible:text-ink"
    >
      {t("switchToEnglish")}
    </button>
  );
}
