import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSurvey } from "@/lib/site-data";
import type { Locale } from "@/lib/content";
import { Container } from "@/components/container";
import { SurveyWidget } from "@/components/survey-widget";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "survey" });
  return {
    title: t("heading"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/survey`,
      languages: {
        ar: "/ar/survey",
        en: "/en/survey",
        "x-default": "/ar/survey",
      },
    },
  };
}

export default async function SurveyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("survey");
  const nav = await getTranslations("nav");
  const survey = await getSurvey(locale as Locale);

  return (
    <Container className="max-w-[40rem] py-16 sm:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: nav("about"), url: `${siteUrl}/${locale}` },
          { name: t("heading"), url: `${siteUrl}/${locale}/survey` },
        ]}
      />
      <p className="eyebrow">{t("heading")}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {survey.question}
      </h1>
      <p className="mt-3 text-ink-secondary">{t("subtitle")}</p>
      <div className="mt-8">
        <SurveyWidget survey={survey} />
      </div>
    </Container>
  );
}
