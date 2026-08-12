import { categories } from "./categories";
import { renderMarkdown } from "./markdown";
import { blogSource } from "./source";
import type { BlogCategory, Post, PostSummary, RenderedPost } from "./types";

export type {
  BlogAuthor,
  BlogCategory,
  Post,
  PostSummary,
  RenderedPost,
  TocItem,
} from "./types";
export { categories, getCategory, getAllCategorySlugs } from "./categories";
export { authors, getAuthor } from "./authors";

/**
 * ---------------------------------------------------------------------------
 * PUBLIC BLOG API
 * ---------------------------------------------------------------------------
 * Pages and components import from here and nowhere else. Everything below is
 * storage-agnostic: it operates on the `BlogSource` contract, so replacing
 * local Markdown with a CMS is a change in `source.ts` alone.
 */

/** Drafts are visible while developing so they can be previewed, never in production. */
const INCLUDE_DRAFTS = process.env.NODE_ENV === "development";

function toSummary(post: Post): PostSummary {
  // Strip the body so summaries never ship article content to list views.
  const { body: _body, ...summary } = post;
  void _body;
  return summary;
}

function byNewestFirst(a: PostSummary, b: PostSummary): number {
  if (a.publishedAt === b.publishedAt) return a.title.localeCompare(b.title);
  return a.publishedAt < b.publishedAt ? 1 : -1;
}

async function loadVisiblePosts(): Promise<Post[]> {
  const posts = await blogSource.listPosts();
  return posts.filter((post) => INCLUDE_DRAFTS || !post.draft);
}

/* -------------------------------------------------------------------------- */
/* Listing                                                                    */
/* -------------------------------------------------------------------------- */

/** Every published article, newest first. */
export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await loadVisiblePosts();
  return posts.map(toSummary).sort(byNewestFirst);
}

/** Published articles in one category, newest first. */
export async function getPostsByCategory(
  categorySlug: string,
): Promise<PostSummary[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category.slug === categorySlug);
}

/**
 * The article to spotlight on the blog homepage: the newest one flagged
 * `featured: true`, falling back to the newest article overall.
 */
export async function getFeaturedPost(): Promise<PostSummary | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

/** Categories that currently contain at least one published article. */
export async function getCategoriesInUse(): Promise<
  Array<BlogCategory & { count: number }>
> {
  const posts = await getAllPosts();
  return categories
    .map((category) => ({
      ...category,
      count: posts.filter((post) => post.category.slug === category.slug).length,
    }))
    .filter((category) => category.count > 0);
}

/** Slugs for `generateStaticParams`. */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await loadVisiblePosts();
  return posts.map((post) => post.slug);
}

/* -------------------------------------------------------------------------- */
/* Single article                                                             */
/* -------------------------------------------------------------------------- */

/** Article metadata only — cheap enough for `generateMetadata`. */
export async function getPostSummary(
  slug: string,
): Promise<PostSummary | null> {
  const post = await blogSource.getPost(slug);
  if (!post || (post.draft && !INCLUDE_DRAFTS)) return null;
  return toSummary(post);
}

/** Article metadata plus rendered HTML and table of contents. */
export async function getRenderedPost(
  slug: string,
): Promise<RenderedPost | null> {
  const post = await blogSource.getPost(slug);
  if (!post || (post.draft && !INCLUDE_DRAFTS)) return null;

  const { html, toc } = await renderMarkdown(post.body);
  return { ...toSummary(post), html, toc };
}

/**
 * Articles to suggest at the end of a post.
 *
 * Ranking: same category scores highest, then each shared keyword, with
 * recency as the tie-breaker. Always returns up to `limit` articles when the
 * blog has enough content, so the section never renders half-empty.
 */
export async function getRelatedPosts(
  slug: string,
  limit = 3,
): Promise<PostSummary[]> {
  const posts = await getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return posts.slice(0, limit);

  const currentKeywords = new Set(
    current.keywords.map((keyword) => keyword.toLowerCase()),
  );

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = 0;
      if (post.category.slug === current.category.slug) score += 10;
      for (const keyword of post.keywords) {
        if (currentKeywords.has(keyword.toLowerCase())) score += 2;
      }
      return { post, score };
    })
    .sort((a, b) => b.score - a.score || byNewestFirst(a.post, b.post))
    .slice(0, limit)
    .map((entry) => entry.post);
}

/** Neighbouring articles in publication order, for previous/next navigation. */
export async function getAdjacentPosts(slug: string): Promise<{
  previous: PostSummary | null;
  next: PostSummary | null;
}> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    // `posts` is newest-first, so the *older* article sits at a higher index.
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

/* -------------------------------------------------------------------------- */
/* URLs and formatting                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Re-exported from `./format` for convenience on the server. Client Components
 * must import these from `@/lib/blog/format` directly — importing this file
 * would pull the filesystem source into the browser bundle.
 */
export {
  BLOG_BASE_PATH,
  categoryPath,
  formatPostDate,
  formatReadingTime,
  formatShortDate,
  postPath,
  toIsoTimestamp,
} from "./format";
