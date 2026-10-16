---
title: This blog is live
date: 2026-10-16
summary: I've added a small blog to this site. Here's what it's for and how it works.
tags: [meta]
---

I've added a blog to this site. It's deliberately small: plain markdown files in the repo, turned into static HTML when the site builds. There's no CMS, no comments and no tracking.

## What goes here

Short notes on cyber security, cloud platforms and the open source tools I publish on [GitHub](https://github.com/jusso-dev). When a problem deserves more than a few paragraphs, I'll write it up properly.

## How it works

Each post is one markdown file with a few lines of frontmatter at the top:

```yaml
---
title: This blog is live
date: 2026-10-16
summary: I've added a small blog to this site.
tags: [meta]
---
```

When a change lands on `main`, GitHub Actions builds the site and publishes it to GitHub Pages. The whole thing ships as static files, so there's nothing to patch and nothing to log in to.

If you'd rather read in a feed reader, there's an [RSS feed](/blog/rss.xml).
