import type { MetadataRoute } from "next";

import { apps } from "@/lib/apps";
import { sortedProjects } from "@/lib/projects";
import {
  categoryPath,
  getAllPosts,
  getCategoriesInUse,
  postPath,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap for the whole site.
 *
 * Blog articles and non-empty category pages are added automatically, so
 * publishing a new article requires no change here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const appRoutes: MetadataRoute.Sitemap = apps.flatMap((app) => [
    {
      url: `${SITE_URL}/apps/${app.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/apps/${app.slug}/privacy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/apps/${app.slug}/terms`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/apps/${app.slug}/support`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ]);

  const projectRoutes: MetadataRoute.Sitemap = sortedProjects.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const [posts, categoriesInUse] = await Promise.all([
    getAllPosts(),
    getCategoriesInUse(),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: posts[0] ? new Date(`${posts[0].publishedAt}T00:00:00Z`) : now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...categoriesInUse.map((category) => ({
      url: `${SITE_URL}${categoryPath(category.slug)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}${postPath(post.slug)}`,
      lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.8 : 0.7,
    })),
  ];

  return [...staticRoutes, ...projectRoutes, ...appRoutes, ...blogRoutes];
}
