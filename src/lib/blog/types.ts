/**
 * Shared blog types.
 *
 * These types are the contract between the content source (currently the
 * filesystem, later a CMS such as Supabase) and the UI. Components should only
 * ever depend on the types in this file — never on how content is stored.
 */

export interface BlogCategory {
  /** URL segment, e.g. "app-development". */
  slug: string;
  /** Display name, e.g. "App Development". */
  name: string;
  /** One-line description used on category pages and in metadata. */
  description: string;
}

export interface BlogAuthor {
  /** Stable id referenced from article frontmatter. */
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Optional avatar path under /public. */
  avatar?: string;
  /** Optional profile URL used in Article structured data. */
  url?: string;
}

/** A heading extracted from the article body, used to build the table of contents. */
export interface TocItem {
  id: string;
  text: string;
  /** 2 for H2, 3 for H3. */
  level: 2 | 3;
}

/** Article metadata without the body — enough to render cards, lists and feeds. */
export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  /** ISO date string, e.g. "2026-06-18". */
  publishedAt: string;
  /** ISO date string. Only present when the article has been revised. */
  updatedAt?: string;
  author: BlogAuthor;
  /** Site-root-relative image path. Undefined means "no artwork supplied yet". */
  coverImage?: string;
  coverAlt?: string;
  featured: boolean;
  keywords: string[];
  /** Whole minutes, rounded up, minimum 1. */
  readingMinutes: number;
  /** Whether the article should be excluded from listings, sitemap and search. */
  draft: boolean;
}

/** Article metadata plus the raw Markdown body. */
export interface Post extends PostSummary {
  body: string;
}

/** A fully rendered article, ready for the article template. */
export interface RenderedPost extends PostSummary {
  html: string;
  toc: TocItem[];
}

/**
 * The content source contract.
 *
 * Swapping local Markdown for a CMS means writing a new object that satisfies
 * this interface and pointing `src/lib/blog/source.ts` at it. No UI changes.
 */
export interface BlogSource {
  /** Every post, including drafts. Ordering is not guaranteed. */
  listPosts(): Promise<Post[]>;
  /** A single post by slug, or null when it does not exist. */
  getPost(slug: string): Promise<Post | null>;
}
