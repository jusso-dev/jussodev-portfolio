import type { Metadata } from "next";
import { ClassificationBanner } from "@/components/ClassificationBanner";
import { SiteNav } from "@/components/SiteNav";
import { formatDate, getAllPosts } from "@/lib/blog";
import { siteName } from "@/lib/site";

const title = "Blog · Justin Middler";
const description =
  "Notes from Justin Middler on cyber security, cloud platforms and the tools he builds.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog/",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title }] },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/blog/",
    siteName,
    title,
    description,
  },
  twitter: { card: "summary", title, description },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="page">
      <ClassificationBanner position="top" />

      <main className="shell">
        <SiteNav current="blog" />
        <article className="dossier" aria-labelledby="blog-title">
          <header className="dossier__header">
            <div>
              <p className="dossier__id">DOSSIER 002 · FIELD NOTES</p>
              <p className="label" style={{ marginTop: "0.35rem" }}>
                Written by J. Middler · Newest first
              </p>
            </div>
            <div className="dossier__page">
              <div>
                {String(posts.length).padStart(2, "0")}{" "}
                {posts.length === 1 ? "ENTRY" : "ENTRIES"}
              </div>
              <div style={{ marginTop: "0.2rem" }}>
                <a className="dossier__link" href="/blog/rss.xml">
                  RSS FEED
                </a>
              </div>
            </div>
          </header>

          <section className="section" aria-labelledby="blog-title">
            <div className="section__header">
              <span className="section__index">§B</span>
              <h1 id="blog-title" className="section__title">
                Blog
              </h1>
              <span className="section__meta">Notes · write-ups</span>
            </div>

            <span className="rule" aria-hidden="true" />

            {posts.length === 0 ? (
              <p className="post-list__empty">No entries filed yet.</p>
            ) : (
              <ol className="post-list">
                {posts.map((post, i) => (
                  <li key={post.slug}>
                    <a className="artifact" href={`/blog/${post.slug}/`}>
                      <span className="artifact__index" aria-hidden="true">
                        {`B.${String(posts.length - i).padStart(2, "0")}`}
                      </span>
                      <div className="artifact__body">
                        <h2 className="artifact__name">{post.title}</h2>
                        <p className="artifact__desc">{post.summary}</p>
                        <p className="artifact__meta">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          {post.tags.map((tag) => (
                            <span key={tag}>#{tag}</span>
                          ))}
                          {post.draft ? <span>Draft</span> : null}
                        </p>
                      </div>
                      <span className="artifact__glyph" aria-hidden="true">
                        &gt;
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </article>
      </main>

      <ClassificationBanner position="bottom" />
    </div>
  );
}
