import { NextResponse } from "next/server";
import { siteContent } from "@/lib/content";
import { isSanityWriteConfigured } from "@/sanity/env";
import { client, writeClient } from "@/sanity/lib/client";

// In-memory fallback — best effort only for the lifetime of this server
// process; NOT durable across restarts/serverless cold starts. `persisted`
// in the response reflects whether THIS request actually reached Sanity
// (not merely whether a project ID is configured — a configured-but-failed
// write must NOT report persisted:true, or the client would wrongly trust
// an ephemeral in-memory count as durable). See components/survey-widget.tsx.
const memory = new Map<string, Record<string, number>>();

function optionIdsFor(surveyId: string): string[] | null {
  const survey = siteContent.surveys.find((s) => s.id === surveyId);
  return survey ? survey.options.map((o) => o.id) : null;
}

function emptyTotals(optionIds: string[]): Record<string, number> {
  return Object.fromEntries(optionIds.map((id) => [id, 0]));
}

async function readFromSanity(
  surveyId: string,
  optionIds: string[],
): Promise<Record<string, number> | null> {
  try {
    const docId = `surveyResults.${surveyId}`;
    const doc = await client.fetch<{ counts?: Record<string, number> }>(
      `*[_id == $id][0]{counts}`,
      { id: docId },
    );
    const counts = doc?.counts ?? {};
    const totals = emptyTotals(optionIds);
    for (const id of optionIds) totals[id] = Number(counts[id] ?? 0);
    return totals;
  } catch {
    return null;
  }
}

function readFromMemory(
  surveyId: string,
  optionIds: string[],
): Record<string, number> {
  return { ...(memory.get(surveyId) ?? emptyTotals(optionIds)) };
}

function summarize(
  surveyId: string,
  totals: Record<string, number>,
  persisted: boolean,
) {
  const total = Object.values(totals).reduce((s, n) => s + n, 0);
  return { id: surveyId, totals, total, persisted };
}

export async function GET(request: Request) {
  const surveyId = new URL(request.url).searchParams.get("surveyId") ?? "";
  const optionIds = optionIdsFor(surveyId);
  if (!optionIds) {
    return NextResponse.json({ error: "unknown_survey" }, { status: 404 });
  }

  if (isSanityWriteConfigured) {
    const totals = await readFromSanity(surveyId, optionIds);
    if (totals) return NextResponse.json(summarize(surveyId, totals, true));
  }
  return NextResponse.json(
    summarize(surveyId, readFromMemory(surveyId, optionIds), false),
  );
}

export async function POST(request: Request) {
  let surveyId: unknown;
  let optionId: unknown;
  try {
    ({ surveyId, optionId } = await request.json());
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof surveyId !== "string") {
    return NextResponse.json({ error: "invalid_survey" }, { status: 400 });
  }
  const optionIds = optionIdsFor(surveyId);
  if (!optionIds) {
    return NextResponse.json({ error: "unknown_survey" }, { status: 404 });
  }
  if (typeof optionId !== "string" || !optionIds.includes(optionId)) {
    return NextResponse.json({ error: "invalid_option" }, { status: 400 });
  }

  if (isSanityWriteConfigured) {
    try {
      const docId = `surveyResults.${surveyId}`;
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
      const totals = await readFromSanity(surveyId, optionIds);
      if (totals) return NextResponse.json(summarize(surveyId, totals, true));
    } catch {
      /* fall through to memory */
    }
  }

  const current = memory.get(surveyId) ?? emptyTotals(optionIds);
  current[optionId] = (current[optionId] ?? 0) + 1;
  memory.set(surveyId, current);
  return NextResponse.json(
    summarize(surveyId, { ...current }, false),
  );
}
