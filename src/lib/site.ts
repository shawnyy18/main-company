/**
 * Single source of truth for the public site origin.
 *
 * Used by metadata, canonical URLs, JSON-LD, the sitemap, and robots.txt so
 * that the domain is never hard-coded in more than one place.
 */
export const SITE_URL = "https://fskcodehouse.com";

export const SITE_NAME = "FSK Codehouse";

export const SITE_CONTACT_EMAIL = "hello@fskcodehouse.com";

/** Builds an absolute URL from a site-root-relative path. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
