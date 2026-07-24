import { getLocale, getTranslations } from "next-intl/server";
import { getSiteData } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Container } from "./container";
import { Reveal } from "./reveal";

export async function HomeAbout() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about");
  const data = await getSiteData(locale);

  return (
    <section id="about" className="section scroll-mt-20">
      <Container>
        <Reveal>
          <p className="eyebrow">{t("heading")}</p>
          <div className="mt-6 grid gap-10 md:grid-cols-[1.6fr_1fr]">
            <div className="space-y-5">
              {data.bio.map((para, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-ink-secondary"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="space-y-3">
              {data.facts.map((fact, i) => (
                <div key={i} className="card p-5">
                  <p className="text-xs font-medium text-ink-tertiary">
                    {fact.label}
                  </p>
                  <p className="mt-1 font-semibold text-ink">{fact.value}</p>
                </div>
              ))}
              <div className="flex gap-4 px-1 pt-1">
                <a
                  href={data.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  {t("followFacebook")}
                </a>
                <a
                  href={data.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  {t("followX")}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
