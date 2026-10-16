import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog/`,
      lastModified: posts[0] ? new Date(`${posts[0].date}T00:00:00Z`) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}/`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
