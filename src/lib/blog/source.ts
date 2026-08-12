import { promises as fs } from "node:fs";
import path from "node:path";

import { getAuthorOrDefault } from "./authors";
import { getCategoryOrThrow } from "./categories";
import {
  parseFrontmatter,
  readBoolean,
  readRequiredString,
  readString,
  readStringArray,
} from "./frontmatter";
import { estimateReadingMinutes } from "./reading-time";
import type { BlogSource, Post } from "./types";

/**
 * ---------------------------------------------------------------------------
 * THE ONLY FILE THAT KNOWS WHERE ARTICLES LIVE
 * ---------------------------------------------------------------------------
 * Everything else imports from `src/lib/blog/index.ts`, which talks to the
 * `BlogSource` interface. To migrate to Supabase or another CMS, add a
 * `supabaseSource` that satisfies `BlogSource` and change `blogSource` at the
 * bottom of this file. No page or component needs to change.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function assertIsoDate(value: string, field: string, context: string): string {
  if (!ISO_DATE.test(value)) {
    throw new Error(
      `Blog article "${context}" has an invalid "${field}" value (${value}). Use YYYY-MM-DD.`,
    );
  }
  return value;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/i, "");
}

/** Turns one Markdown file into a validated `Post`. */
function toPost(filename: string, raw: string): Post {
  const fileSlug = slugFromFilename(filename);
  const { data, body } = parseFrontmatter(raw);

  const slug = readString(data, "slug") ?? fileSlug;
  if (slug !== fileSlug) {
    throw new Error(
      `Blog article "${filename}" declares slug "${slug}" but the filename implies "${fileSlug}". Keep them identical so URLs stay predictable.`,
    );
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `Blog slug "${slug}" is invalid. Use lowercase words separated by single hyphens.`,
    );
  }

  const publishedAt = assertIsoDate(
    readRequiredString(data, "publishedAt", filename),
    "publishedAt",
    filename,
  );
  const rawUpdatedAt = readString(data, "updatedAt");
  const updatedAt = rawUpdatedAt
    ? assertIsoDate(rawUpdatedAt, "updatedAt", filename)
    : undefined;

  return {
    slug,
    title: readRequiredString(data, "title", filename),
    description: readRequiredString(data, "description", filename),
    category: getCategoryOrThrow(readRequiredString(data, "category", filename)),
    publishedAt,
    // An updatedAt identical to publishedAt carries no information; drop it so
    // the UI and structured data stay honest.
    updatedAt: updatedAt && updatedAt !== publishedAt ? updatedAt : undefined,
    author: getAuthorOrDefault(readString(data, "author")),
    coverImage: readString(data, "coverImage"),
    coverAlt: readString(data, "coverAlt"),
    featured: readBoolean(data, "featured"),
    keywords: readStringArray(data, "keywords"),
    readingMinutes: estimateReadingMinutes(body),
    draft: readBoolean(data, "draft"),
    body,
  };
}

/**
 * Posts are read once per process and reused. During `next build` this means a
 * single pass over the content directory no matter how many routes render.
 */
let cache: Promise<Post[]> | null = null;

async function readAllPosts(): Promise<Post[]> {
  let filenames: string[];

  try {
    filenames = await fs.readdir(CONTENT_DIR);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const markdownFiles = filenames.filter(
    (name) =>
      /\.mdx?$/i.test(name) &&
      // Authoring notes and parked drafts are not articles. A leading
      // underscore is the escape hatch for "in the folder, not published".
      !name.startsWith("_") &&
      name.toLowerCase() !== "readme.md",
  );

  const posts = await Promise.all(
    markdownFiles.map(async (filename) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf8");
      return toPost(filename, raw);
    }),
  );

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      throw new Error(`Duplicate blog slug "${post.slug}" in content/blog.`);
    }
    seen.add(post.slug);
  }

  return posts;
}

function listPosts(): Promise<Post[]> {
  cache ??= readAllPosts();
  return cache;
}

/**
 * Reads articles from `content/blog/*.md` at build time.
 *
 * This module imports `node:fs`, so it can only ever be pulled into a Server
 * Component. That is intentional: it keeps content loading off the client.
 */
export const fileSystemSource: BlogSource = {
  listPosts,
  async getPost(slug: string) {
    const posts = await listPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  },
};

/**
 * The active content source. Swap this single binding to change backends.
 *
 * Example future migration:
 *   export const blogSource: BlogSource = supabaseSource;
 */
export const blogSource: BlogSource = fileSystemSource;
