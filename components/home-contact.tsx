import { getTranslations } from "next-intl/server";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { ContactForm } from "./contact-form";

export async function HomeContact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="section scroll-mt-20 bg-surface-2">
      <Container className="max-w-[40rem]">
        <Reveal>
          <p className="eyebrow">{t("heading")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-3 text-ink-secondary">{t("subtitle")}</p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
