/* eslint-disable @next/next/no-html-link-for-pages -- plain links on purpose: DESIGN.md rules out client-side router transitions. */
import type { Metadata } from "next";
import { ClassificationBanner } from "@/components/ClassificationBanner";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Not found · Justin Middler",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="page">
      <ClassificationBanner position="top" />
      <main className="shell">
        <SiteNav current={null} />
        <article className="dossier" aria-labelledby="nf-title">
          <header className="dossier__header">
            <p className="dossier__id">FILE NOT FOUND · 404</p>
            <div className="dossier__page">NO RECORD</div>
          </header>
          <h1 id="nf-title" className="post__title">
            No record of that file
          </h1>
          <p className="post__summary">
            The page you asked for doesn&apos;t exist or has been withdrawn.
            Try the <a className="dossier__link" href="/">dossier</a> or the{" "}
            <a className="dossier__link" href="/blog/">blog</a>.
          </p>
        </article>
      </main>
      <ClassificationBanner position="bottom" />
    </div>
  );
}
