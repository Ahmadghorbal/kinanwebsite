import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { Reveal } from "./reveal";

export async function SurveyBanner() {
  const t = await getTranslations("survey");

  return (
    <section className="section scroll-mt-20">
      <Container>
        <Reveal>
          <div className="card flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:justify-between sm:text-start">
            <div>
              <p className="eyebrow">{t("heading")}</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {t("bannerTitle")}
              </h2>
              <p className="mt-2 max-w-lg text-ink-secondary">
                {t("bannerBody")}
              </p>
            </div>
            <Link href="/survey" className="btn btn-primary shrink-0">
              {t("bannerCta")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
