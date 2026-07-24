import { NextResponse } from "next/server";
import { isSanityConfigured } from "@/sanity/env";
import { writeClient } from "@/sanity/lib/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = ["communication", "complaint"] as const;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const type = String(payload.type ?? "");
  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!TYPES.includes(type as (typeof TYPES)[number])) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }
  if (!name || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  if (isSanityConfigured) {
    try {
      await writeClient.create({
        _type: "contactSubmission",
        type,
        name,
        email,
        phone: phone || undefined,
        message,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "store_failed" }, { status: 502 });
    }
  }

  // No CMS connected yet: accept so the UX works end-to-end in the demo.
  console.info("[contact] submission (not persisted — Sanity not configured):", {
    type,
    name,
    email,
  });
  return NextResponse.json({ ok: true, persisted: false });
}
