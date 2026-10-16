import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// Posts live in content/blog/YYYY-MM-DD-slug.md. See content/blog/README.md.
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const FILENAME_RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  draft: boolean;
  file: string;
};

export type Post = PostMeta & { html: string };

// Only YAML frontmatter. gray-matter can otherwise evaluate `---js` blocks.
const refuse = () => {
  throw new Error("Only YAML frontmatter is allowed in blog posts.");
};
const matterOptions = {
  engines: { js: refuse, javascript: refuse, coffee: refuse, json: refuse },
};

function fail(file: string, message: string): never {
  throw new Error(`[blog] content/blog/${file}: ${message}`);
}

function toDateString(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && DATE_RE.test(value.trim())) {
    const date = value.trim();
    // Reject impossible dates such as 2026-02-30.
    const parsed = new Date(`${date}T00:00:00Z`);
    if (!Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date) {
      return date;
    }
  }
  return null;
}

function requireString(file: string, data: Record<string, unknown>, key: string) {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `frontmatter "${key}" is required and must be a non-empty string.`);
  }
  return value.trim();
}

function parseFile(file: string): { meta: PostMeta; body: string } {
  const match = FILENAME_RE.exec(file);
  if (!match) {
    fail(
      file,
      "filename must be YYYY-MM-DD-slug.md, with a slug of lowercase a-z, 0-9 and single hyphens.",
    );
  }
  const [, fileDate, slug] = match;
  const raw = readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw, matterOptions);

  const title = requireString(file, data, "title");
  const summary = requireString(file, data, "summary");
  const date = toDateString(data.date);
  if (!date) fail(file, 'frontmatter "date" is required and must be a real date formatted YYYY-MM-DD.');
  if (date !== fileDate) {
    fail(file, `frontmatter date ${date} does not match the filename date ${fileDate}.`);
  }

  let tags: string[] = [];
  if (data.tags !== undefined && data.tags !== null) {
    if (!Array.isArray(data.tags) || !data.tags.every((t) => typeof t === "string")) {
      fail(file, 'frontmatter "tags" must be a list of strings, e.g. [security, azure].');
    }
    tags = data.tags.map((t: string) => t.trim()).filter(Boolean);
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    fail(file, 'frontmatter "draft" must be true or false.');
  }

  return {
    meta: { slug, title, date, summary, tags, draft: data.draft === true, file },
    body: content,
  };
}

function includeDrafts() {
  return process.env.NODE_ENV !== "production";
}

let cache: { meta: PostMeta; body: string }[] | null = null;

function loadAll() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  let files: string[];
  try {
    files = readdirSync(BLOG_DIR);
  } catch (error) {
    throw new Error(`[blog] cannot read ${BLOG_DIR}`, { cause: error });
  }
  // Any .md/.MD file except the README is a post candidate, so a bad
  // extension fails validation instead of silently dropping the post.
  const parsed = files
    .filter((f) => f.toLowerCase().endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map(parseFile);

  const seen = new Map<string, string>();
  for (const { meta } of parsed) {
    const prior = seen.get(meta.slug);
    if (prior) fail(meta.file, `slug "${meta.slug}" is already used by ${prior}.`);
    seen.set(meta.slug, meta.file);
  }

  cache = parsed
    .filter(({ meta }) => includeDrafts() || !meta.draft)
    .sort((a, b) =>
      a.meta.date === b.meta.date
        ? a.meta.slug.localeCompare(b.meta.slug)
        : b.meta.date.localeCompare(a.meta.date),
    );
  return cache;
}

export function getAllPosts(): PostMeta[] {
  return loadAll().map(({ meta }) => meta);
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // Raw HTML in markdown is dropped (allowDangerousHtml is off), then the
  // tree is sanitised before highlighting adds its own classes.
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeHighlight, { detect: false })
  .use(rehypeStringify);

export async function getPost(slug: string): Promise<Post | null> {
  const entry = loadAll().find(({ meta }) => meta.slug === slug);
  if (!entry) return null;
  const html = String(await processor.process(entry.body));
  return { ...entry.meta, html };
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// 2026-10-16 -> 16 Oct 2026
export function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

// 2026-10-16 -> RFC 822 date for RSS, midday UTC so it never shifts a day.
export function rfc822(date: string): string {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}
