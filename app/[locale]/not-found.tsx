import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t("heading")}</h1>
      <p className="mt-3 text-ink-secondary">{t("body")}</p>
      <Link href="/" className="btn btn-primary mt-8">
        {t("home")}
      </Link>
    </div>
  );
}
