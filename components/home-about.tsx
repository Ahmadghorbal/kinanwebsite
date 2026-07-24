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
      <Container className="max-w-[46rem]">
        <Reveal>
          <p className="eyebrow">{t("heading")}</p>
          <div className="mt-6 space-y-5">
            {data.bio.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-secondary">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
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
        </Reveal>
      </Container>
    </section>
  );
}
