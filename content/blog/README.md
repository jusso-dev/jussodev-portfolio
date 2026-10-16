# Blog posts

Every `.md` file in this folder (except this README) is a blog post. The site
renders them to static HTML at build time. This README is never published.

## 1. File path and name

```
content/blog/YYYY-MM-DD-slug.md
```

Example: `content/blog/2026-10-16-this-blog-is-live.md`

- `YYYY-MM-DD` is the publish date, zero padded (`2026-03-07`, not `2026-3-7`).
- `slug` is everything after the date, minus `.md`. It becomes the URL:
  `https://justin.middler.io/blog/<slug>/`
- Slug rules:
  - lowercase letters `a-z`, digits `0-9` and hyphens `-` only
  - no spaces, underscores, capitals, accents or punctuation
  - no leading, trailing or double hyphens
  - must be unique across all posts, even if the dates differ
- The extension must be `.md` (lowercase).

Good: `2026-11-02-sentinel-cost-tuning.md`
Bad: `2026-11-2-Sentinel_Cost.md`, `sentinel-cost.md`, `2026-11-02-sentinel--cost.md`

## 2. Frontmatter

The file must start with YAML frontmatter between two `---` lines. Copy this
and edit the values:

```markdown
---
title: Tuning Sentinel costs without losing detections
date: 2026-11-02
summary: One sentence that appears on the blog list, in RSS and in link previews.
tags: [security, azure]
draft: false
---

Post body in markdown starts here.
```

| Field     | Required | Format                                                        |
| --------- | -------- | ------------------------------------------------------------- |
| `title`   | yes      | Plain text. Wrap in double quotes if it contains a colon `:`. |
| `date`    | yes      | `YYYY-MM-DD`. Must equal the date in the filename.            |
| `summary` | yes      | One sentence of plain text. Quote it if it contains `:`.      |
| `tags`    | no       | List of lowercase words, e.g. `[security, azure]`.            |
| `draft`   | no       | `true` or `false`. Defaults to `false`.                       |

Only YAML frontmatter is accepted. Don't add other fields expecting them to show up.

## 3. Body

Standard markdown plus GitHub extras (tables, task lists, strikethrough,
autolinks). Notes:

- Don't repeat the title as a `#` heading. The page already shows it. Use `##`
  and `###` for sections.
- Raw HTML is stripped. Write markdown only.
- Fenced code blocks with a language (` ```ts `, ` ```bash `, ` ```yaml `) get
  syntax highlighting at build time.
- Link to other posts with the site path, e.g. `[RSS](/blog/rss.xml)` or
  `[earlier post](/blog/this-blog-is-live/)`.
- Images: put the file in `public/blog/` and reference it as `/blog/name.png`.

## 4. Drafts

`draft: true` posts are skipped in production builds. They don't appear on the
live site, the blog list, the RSS feed or the sitemap. They do show up in
`npm run dev` so you can preview them. Flip to `draft: false` (or delete the
line) to publish.

## 5. How it goes live

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
deploys it to GitHub Pages. Either:

- commit the new file straight to `main`, or
- open a pull request and merge it into `main`.

The post is live a couple of minutes later at
`https://justin.middler.io/blog/<slug>/`, and appears at the top of
`https://justin.middler.io/blog/` and in `https://justin.middler.io/blog/rss.xml`.

## 6. If the build fails

The build validates every post and fails with a message naming the file and
the problem (bad filename, missing field, date mismatch, duplicate slug). A
failed build doesn't deploy, so the live site keeps the previous version. Fix
the file and push again. To check before pushing:

```bash
npm ci
npm run build
```
