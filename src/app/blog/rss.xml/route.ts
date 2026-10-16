import { getAllPosts, rfc822 } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

// Rendered once at build time to out/blog/rss.xml.
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const feedUrl = absoluteUrl("/blog/rss.xml");
  const blogUrl = absoluteUrl("/blog/");

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}/`);
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const lastBuild = posts[0] ? rfc822(posts[0].date) : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Justin Middler · Blog</title>
    <link>${blogUrl}</link>
    <description>Notes from Justin Middler on cyber security, cloud platforms and the tools he builds.</description>
    <language>en-au</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
