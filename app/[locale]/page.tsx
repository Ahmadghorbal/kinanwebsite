import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/home-hero";
import { HomeAbout } from "@/components/home-about";
import { HomeArticles } from "@/components/home-articles";
import { HomeInterviews } from "@/components/home-interviews";
import { SurveyBanner } from "@/components/survey-banner";
import { HomeContact } from "@/components/home-contact";
import { PersonJsonLd } from "@/components/json-ld";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PersonJsonLd locale={locale} />
      <HomeHero />
      <HomeAbout />
      <HomeArticles />
      <HomeInterviews />
      <SurveyBanner />
      <HomeContact />
    </>
  );
}
