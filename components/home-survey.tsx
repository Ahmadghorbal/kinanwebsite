import { getLocale, getTranslations } from "next-intl/server";
import { getSurvey } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SurveyWidget } from "./survey-widget";

export async function HomeSurvey() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("survey");
  const survey = await getSurvey(locale);

  return (
    <section id="survey" className="section scroll-mt-20">
      <Container className="max-w-[40rem]">
        <Reveal>
          <p className="eyebrow">{t("heading")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {survey.question}
          </h2>
          <p className="mt-3 text-ink-secondary">{t("subtitle")}</p>
          <div className="mt-8">
            <SurveyWidget survey={survey} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
