"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { SurveyData } from "@/lib/site-data";
import { clsx } from "@/lib/clsx";

type Status = "idle" | "voting" | "done" | "error";

function readLocalTally(surveyId: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(`survey-tally-${surveyId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocalTally(surveyId: string, tally: Record<string, number>) {
  try {
    localStorage.setItem(`survey-tally-${surveyId}`, JSON.stringify(tally));
  } catch {
    /* ignore */
  }
}

export function SurveyWidget({ survey }: { survey: SurveyData }) {
  const t = useTranslations("survey");
  const [selected, setSelected] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [voted, setVoted] = useState(false);
  const votedKey = `survey-voted-${survey.id}`;

  useEffect(() => {
    let didVote = false;
    try {
      didVote = localStorage.getItem(votedKey) === "1";
    } catch {
      /* ignore */
    }
    if (!didVote) return;

    // One-time read of external state (localStorage) right after mount,
    // deliberately deferred out of render to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVoted(true);

    fetch(`/api/survey?surveyId=${encodeURIComponent(survey.id)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.persisted) {
          setTotals(d.totals ?? {});
          setTotal(d.total ?? 0);
        } else {
          // No durable backend yet: trust our own local tally rather than
          // the server's ephemeral in-memory count, which can reset.
          const local = readLocalTally(survey.id);
          setTotals(local);
          setTotal(Object.values(local).reduce((s, n) => s + n, 0));
        }
      })
      .catch(() => {
        const local = readLocalTally(survey.id);
        setTotals(local);
        setTotal(Object.values(local).reduce((s, n) => s + n, 0));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setStatus("voting");
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyId: survey.id, optionId: selected }),
      });
      if (!res.ok) throw new Error("vote_failed");
      const d = await res.json();

      let nextTotals: Record<string, number>;
      let nextTotal: number;
      if (d.persisted) {
        nextTotals = d.totals ?? {};
        nextTotal = d.total ?? 0;
      } else {
        const local = readLocalTally(survey.id);
        local[selected] = (local[selected] ?? 0) + 1;
        writeLocalTally(survey.id, local);
        nextTotals = local;
        nextTotal = Object.values(local).reduce((s, n) => s + n, 0);
      }

      setTotals(nextTotals);
      setTotal(nextTotal);
      setVoted(true);
      setStatus("done");
      try {
        localStorage.setItem(votedKey, "1");
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
    }
  }

  if (voted) {
    return (
      <div className="card p-6 sm:p-8">
        <p className="text-sm text-ink-secondary">
          {status === "done" ? t("thanks") : t("alreadyVoted")}
        </p>
        <ul className="mt-6 space-y-4">
          {survey.options.map((opt) => {
            const count = totals[opt.id] ?? 0;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <li key={opt.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{opt.label}</span>
                  <span className="tabular-nums text-ink-tertiary">{pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-xs text-ink-tertiary">
          {t("totalVotes", { count: total })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 sm:p-8">
      <fieldset>
        <legend className="sr-only">{survey.question}</legend>
        <div className="space-y-2.5">
          {survey.options.map((opt) => {
            const active = selected === opt.id;
            return (
              <label
                key={opt.id}
                className={clsx(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors",
                  active
                    ? "border-accent bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]"
                    : "border-line hover:border-ink-tertiary",
                )}
              >
                <input
                  type="radio"
                  name={`survey-${survey.id}`}
                  value={opt.id}
                  checked={active}
                  onChange={() => setSelected(opt.id)}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                <span className="text-[15px] font-medium text-ink">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {status === "error" && (
        <p className="mt-4 text-sm text-danger">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={!selected || status === "voting"}
        className="btn btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "voting" ? t("voting") : t("vote")}
      </button>
    </form>
  );
}
