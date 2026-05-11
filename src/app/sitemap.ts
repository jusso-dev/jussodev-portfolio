import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl =
  process.env.SITE_URL ?? "https://jusso-dev.github.io/jussodev-portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
