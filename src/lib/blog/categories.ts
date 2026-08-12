import type { BlogCategory } from "./types";

/**
 * Blog category registry.
 *
 * Adding a category is a one-line change here — listings, filters, category
 * pages, metadata and the sitemap all read from this array.
 */
export const categories: BlogCategory[] = [
  {
    slug: "app-development",
    name: "App Development",
    description:
      "Planning, building, and shipping mobile applications — scoping, platform choices, and release preparation.",
  },
  {
    slug: "web-development",
    name: "Web Development",
    description:
      "Building business websites and web platforms that load fast, rank well, and convert visitors into enquiries.",
  },
  {
    slug: "ai-development",
    name: "AI & Development",
    description:
      "How AI-assisted tooling changes the way software gets designed, written, reviewed, and maintained.",
  },
  {
    slug: "startup-product",
    name: "Startup & Product Building",
    description:
      "Turning an idea into a product: scope, sequencing, validation, and the decisions that shape a first release.",
  },
  {
    slug: "tutorials",
    name: "Tutorials",
    description:
      "Step-by-step technical walkthroughs drawn from problems we run into on real projects.",
  },
  {
    slug: "monetization",
    name: "Monetization",
    description:
      "Pricing, subscriptions, advertising, and the practical mechanics of earning revenue from software.",
  },
  {
    slug: "case-studies",
    name: "Case Studies",
    description:
      "Notes from products FSK Codehouse builds and operates, and what each one taught us.",
  },
];

const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): BlogCategory | undefined {
  return categoryBySlug.get(slug);
}

export function getCategoryOrThrow(slug: string): BlogCategory {
  const category = categoryBySlug.get(slug);
  if (!category) {
    throw new Error(
      `Unknown blog category "${slug}". Add it to src/lib/blog/categories.ts or fix the article frontmatter.`,
    );
  }
  return category;
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
