import { NextResponse } from "next/server";
import { siteContent } from "@/lib/content";
import { isSanityConfigured } from "@/sanity/env";
import { client, writeClient } from "@/sanity/lib/client";

const surveyId = siteContent.survey.id;
const optionIds = siteContent.survey.options.map((o) => o.id);
const docId = `surveyResults.${surveyId}`;

// In-memory fallback (used until a Sanity project is connected).
const memory: Record<string, number> = Object.fromEntries(
  optionIds.map((id) => [id, 0]),
);

function emptyTotals(): Record<string, number> {
  return Object.fromEntries(optionIds.map((id) => [id, 0]));
}

async function readTotals(): Promise<Record<string, number>> {
  if (isSanityConfigured) {
    try {
      const doc = await client.fetch<{ counts?: Record<string, number> }>(
        `*[_id == $id][0]{counts}`,
        { id: docId },
      );
      const counts = doc?.counts ?? {};
      const totals = emptyTotals();
      for (const id of optionIds) totals[id] = Number(counts[id] ?? 0);
      return totals;
    } catch {
      /* fall through to memory */
    }
  }
  return { ...memory };
}

function summarize(totals: Record<string, number>) {
  const total = Object.values(totals).reduce((s, n) => s + n, 0);
  return { id: surveyId, totals, total };
}

export async function GET() {
  const totals = await readTotals();
  return NextResponse.json(summarize(totals));
}

export async function POST(request: Request) {
  let optionId: unknown;
  try {
    ({ optionId } = await request.json());
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof optionId !== "string" || !optionIds.includes(optionId)) {
    return NextResponse.json({ error: "invalid_option" }, { status: 400 });
  }

  if (isSanityConfigured) {
    try {
      await writeClient.createIfNotExists({
        _id: docId,
        _type: "surveyResults",
        surveyId,
        counts: {},
      });
      await writeClient
        .patch(docId)
        .setIfMissing({ [`counts.${optionId}`]: 0 })
        .inc({ [`counts.${optionId}`]: 1 })
        .commit();
      const totals = await readTotals();
      return NextResponse.json(summarize(totals));
    } catch {
      /* fall through to memory */
    }
  }

  memory[optionId] = (memory[optionId] ?? 0) + 1;
  return NextResponse.json(summarize({ ...memory }));
}
