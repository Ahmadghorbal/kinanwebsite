"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { clsx } from "@/lib/clsx";

export function SiteHeader() {
  const nav = useTranslations("nav");
  const meta = useTranslations("meta");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionLinks = [
    { href: `/${locale}#about`, label: nav("about") },
    { href: `/${locale}#interviews`, label: nav("interviews") },
    { href: `/${locale}#contact`, label: nav("contact") },
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors",
        scrolled ? "border-line" : "border-transparent",
      )}
      style={{ background: "var(--nav-bg)" }}
    >
      <div className="mx-auto flex h-16 max-w-[71rem] items-center justify-between gap-4 px-5 sm:px-6">
        <Link
          href="/"
          className="text-[17px] font-bold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          {meta("siteName")}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {sectionLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] font-medium text-ink-secondary transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/articles"
            className="text-[14px] font-medium text-ink-secondary transition-colors hover:text-ink"
          >
            {nav("articles")}
          </Link>
          <Link
            href="/survey"
            className="text-[14px] font-medium text-ink-secondary transition-colors hover:text-ink"
          >
            {nav("survey")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
            aria-label={open ? nav("closeMenu") : nav("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{nav("menu")}</span>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line md:hidden" style={{ background: "var(--nav-bg)" }}>
          <nav className="mx-auto flex max-w-[71rem] flex-col gap-1 px-5 py-3 sm:px-6">
            {sectionLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink-secondary transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/articles"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink-secondary transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {nav("articles")}
            </Link>
            <Link
              href="/survey"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink-secondary transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {nav("survey")}
            </Link>
            <div className="mt-2 sm:hidden">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
