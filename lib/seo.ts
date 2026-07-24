/** Canonical site origin, used for metadataBase, sitemap, canonical URLs, JSON-LD. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
