/* eslint-disable @next/next/no-html-link-for-pages -- plain links on purpose: DESIGN.md rules out client-side router transitions. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClassificationBanner } from "@/components/ClassificationBanner";
import { SiteNav } from "@/components/SiteNav";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { siteName } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Only slugs from content/blog exist. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  const title = `${post.title} · Justin Middler`;
  return {
    title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_AU",
      url,
      siteName,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: ["Justin Middler"],
      tags: post.tags,
    },
    twitter: { card: "summary", title: post.title, description: post.summary },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="page">
      <ClassificationBanner position="top" />

      <main className="shell">
        <SiteNav current="blog" />
        <article className="dossier" aria-labelledby="post-title">
          <header className="dossier__header">
            <div>
              <p className="dossier__id">DOSSIER 002 · FIELD NOTES</p>
              <p className="label" style={{ marginTop: "0.35rem" }}>
                <a className="dossier__link" href="/blog/">
                  &lt; All entries
                </a>
              </p>
            </div>
            <div className="dossier__page">
              <div>FILED {post.date.replaceAll("-", ".")}</div>
              <div style={{ marginTop: "0.2rem" }}>AUTH · J. MIDDLER</div>
            </div>
          </header>

          <header className="post__head">
            <h1 id="post-title" className="post__title">
              {post.title}
            </h1>
            <p className="post__meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
              {post.draft ? <span>Draft</span> : null}
            </p>
            <p className="post__summary">{post.summary}</p>
          </header>

          <div
            className="prose"
            // Rendered at build time from markdown with raw HTML dropped and
            // the output sanitised (see src/lib/blog.ts).
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="colophon">
            <div>
              <div>{"// END OF ENTRY //"}</div>
              <div style={{ marginTop: "0.3rem" }}>
                <a className="dossier__link" href="/blog/">
                  &lt; Back to all entries
                </a>
              </div>
            </div>
            <div className="colophon__right">
              <div>{`ENTRY ${post.slug.toUpperCase()}`}</div>
              <div style={{ marginTop: "0.3rem", color: "var(--ink-faint)" }}>
                STATIC EXPORT
              </div>
            </div>
          </div>
        </article>
      </main>

      <ClassificationBanner position="bottom" />
    </div>
  );
}
