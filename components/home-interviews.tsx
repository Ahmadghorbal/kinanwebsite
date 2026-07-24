import { getLocale, getTranslations } from "next-intl/server";
import { getInterviews } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { YoutubeEmbed } from "./youtube-embed";

export async function HomeInterviews() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("interviews");
  const interviews = await getInterviews(locale);

  if (interviews.length === 0) return null;

  return (
    <section id="interviews" className="section scroll-mt-20 bg-surface-2">
      <Container>
        <Reveal>
          <p className="eyebrow">{t("heading")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-3 text-ink-secondary">{t("subtitle")}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {interviews.map((interview) => (
              <div key={interview.id} className="card overflow-hidden">
                <YoutubeEmbed youtubeId={interview.youtubeId} title={interview.title} />
                <div className="p-5">
                  <h3 className="font-semibold text-ink">{interview.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
