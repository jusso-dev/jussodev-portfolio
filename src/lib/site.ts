// Canonical origin for absolute URLs (RSS, OG, sitemap). The site is served
// from the custom domain root, so there is no basePath.
export const siteUrl = (
  process.env.SITE_URL ?? "https://justin.middler.io"
).replace(/\/+$/, "");

export const siteName = "Justin Middler · Dossier";

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
