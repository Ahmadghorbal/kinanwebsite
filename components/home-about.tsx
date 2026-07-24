import { getLocale, getTranslations } from "next-intl/server";
import { getSiteData } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { FacebookIcon, XIcon } from "./icons";

export async function HomeAbout() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about");
  const data = await getSiteData(locale);

  return (
    <section id="about" className="section scroll-mt-20">
      <Container className="max-w-[64rem]">
        <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <p className="eyebrow">{t("heading")}</p>
            <div className="mt-6 space-y-5">
              {data.bio.map((para, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-ink-secondary"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={data.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("followFacebook")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <FacebookIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={data.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("followX")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <XIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/syria-map.svg"
              alt=""
              aria-hidden="true"
              className="mx-auto w-full max-w-xs opacity-90"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
