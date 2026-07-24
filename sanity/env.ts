export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True once a real Sanity project is wired up via env vars. */
export const isSanityConfigured = projectId.length > 0;

/**
 * True only once writes can actually succeed (project + write token both
 * configured). A project ID alone lets anonymous *reads* succeed against an
 * empty dataset — which looks deceptively like "real, empty data" — so this
 * is the flag that should gate whether server-reported totals are trusted as
 * durable (see app/api/survey/route.ts and components/survey-widget.tsx).
 */
export const isSanityWriteConfigured =
  isSanityConfigured && Boolean(process.env.SANITY_API_WRITE_TOKEN);
