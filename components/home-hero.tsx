import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getSiteData } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Container } from "./container";
import { Reveal } from "./reveal";

function initialsOf(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/^(al-|el-)/i, "").replace(/^ال/, ""))
    .filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => [...w][0])
    .join("");
}

export async function HomeHero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");
  const data = await getSiteData(locale);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />
      <Container className="pb-16 pt-20 text-center sm:pt-28">
        <Reveal className="flex flex-col items-center">
          {data.photo ? (
            <Image
              src={data.photo}
              alt={data.name}
              width={112}
              height={112}
              priority
              className="mb-7 h-28 w-28 rounded-full object-cover shadow-[var(--shadow-card)] grayscale contrast-125"
            />
          ) : (
            <div
              aria-hidden
              className="mb-7 flex h-28 w-28 items-center justify-center rounded-full text-3xl font-bold text-accent-contrast shadow-[var(--shadow-card)]"
              style={{
                background:
                  "linear-gradient(150deg, var(--accent), var(--accent-hover))",
              }}
            >
              {initialsOf(data.name)}
            </div>
          )}

          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/flag-syria.svg"
              alt=""
              aria-hidden="true"
              className="h-2.5 w-auto rounded-[1px] shadow-sm"
            />
            <VerifiedIcon />
            {t("official")}
          </span>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            {data.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-accent sm:text-xl">
            {data.role}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-secondary">
            {data.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={`/${locale}#about`} className="btn btn-primary">
              {t("readBio")}
            </a>
            <a href={`/${locale}#contact`} className="btn btn-secondary">
              {t("contact")}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function VerifiedIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
