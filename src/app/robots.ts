import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl =
  process.env.SITE_URL ?? "https://justin.middler.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
