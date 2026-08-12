import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

import { BLOG_BASE_PATH, postPath, toIsoTimestamp } from "./format";
import type { PostSummary } from "./types";

/**
 * JSON-LD builders.
 *
 * Every schema references the single Organization node by `@id`, so search
 * engines resolve one publisher entity across the whole site rather than a
 * duplicate copy per page.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}${BLOG_BASE_PATH}/#blog`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/fsk-logo-icon.png"),
    },
    description:
      "FSK Codehouse Corp. is a Philippine software company building real-estate platforms, digital product storefronts, and web and mobile applications.",
    sameAs: [
      "https://www.facebook.com/fskcodehouse",
      "https://www.linkedin.com/company/fsk-codehouse-corp/",
    ],
  };
}

export function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_ID,
    name: `${SITE_NAME} Blog`,
    description:
      "Practical writing on web development, mobile app development, AI-assisted development, product building, and software monetization.",
    url: absoluteUrl(BLOG_BASE_PATH),
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

export function blogPostingSchema(post: PostSummary) {
  const url = absoluteUrl(postPath(post.slug));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    // Google truncates headlines beyond ~110 characters.
    headline: post.title.slice(0, 110),
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: toIsoTimestamp(post.publishedAt),
    dateModified: toIsoTimestamp(post.updatedAt ?? post.publishedAt),
    author: {
      "@type": "Organization",
      name: post.author.name,
      url: post.author.url ? absoluteUrl(post.author.url) : SITE_URL,
    },
    publisher: { "@id": ORGANIZATION_ID },
    image: [absoluteUrl(post.coverImage ?? `${postPath(post.slug)}/opengraph-image`)],
    articleSection: post.category.name,
    keywords: post.keywords.join(", "),
    isPartOf: { "@id": BLOG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageSchema({
  name,
  description,
  path,
  posts,
}: {
  name: string;
  description: string;
  path: string;
  posts: PostSummary[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": BLOG_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(postPath(post.slug)),
        name: post.title,
      })),
    },
  };
}
