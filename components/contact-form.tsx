"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "@/lib/clsx";

type Status = "idle" | "sending" | "success" | "error";
type MessageType = "communication" | "compliment";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const t = useTranslations("contact");
  const [type, setType] = useState<MessageType>("communication");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg(t("required"));
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMsg(t("invalidEmail"));
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, email, phone, message }),
      });
      if (!res.ok) throw new Error("send_failed");
      setStatus("success");
      form.reset();
      setType("communication");
    } catch {
      setStatus("error");
      setErrorMsg(t("error"));
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="font-medium text-ink">{t("success")}</p>
      </div>
    );
  }

  const types: MessageType[] = ["communication", "compliment"];

  return (
    <form onSubmit={submit} noValidate className="card p-6 sm:p-8">
      <fieldset className="mb-6">
        <legend className="mb-2.5 text-sm font-semibold text-ink">
          {t("typeLegend")}
        </legend>
        <div className="inline-flex rounded-full border border-line p-1">
          {types.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setType(val)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                type === val
                  ? "bg-accent text-accent-contrast"
                  : "text-ink-secondary hover:text-ink",
              )}
            >
              {val === "communication"
                ? t("typeCommunication")
                : t("typeCompliment")}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("name")} name="name" required autoComplete="name" />
        <Field
          label={t("email")}
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <Field
        label={t("phone")}
        name="phone"
        type="tel"
        autoComplete="tel"
        className="mt-4"
      />
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full resize-y rounded-2xl border border-line bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-accent focus:bg-surface"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-line bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-accent focus:bg-surface"
      />
    </div>
  );
}
