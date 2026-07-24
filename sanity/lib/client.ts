import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// A harmless placeholder keeps createClient from throwing when no project is
// configured yet; the data façade never calls these unless isSanityConfigured.
const safeProjectId = projectId || "placeholder";

export const client = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/** Server-only client for writes (contact submissions, survey votes). */
export const writeClient = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
