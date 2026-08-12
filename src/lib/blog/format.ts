/**
 * Client-safe blog helpers.
 *
 * This module must never import the content source — components (including
 * Client Components) import from here, while `src/lib/blog/index.ts` pulls in
 * the filesystem and stays server-only.
 */

export const BLOG_BASE_PATH = "/blog";

export function postPath(slug: string): string {
  return `${BLOG_BASE_PATH}/${slug}`;
}

export function categoryPath(categorySlug: string): string {
  return `${BLOG_BASE_PATH}/category/${categorySlug}`;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** "2026-06-18" -> "June 18, 2026". UTC-pinned so server and client agree. */
export function formatPostDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

/** "2026-06-18" -> "Jun 18, 2026". */
export function formatShortDate(isoDate: string): string {
  return shortDateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

/** ISO 8601 timestamp for `<time datetime>` and structured data. */
export function toIsoTimestamp(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toISOString();
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
