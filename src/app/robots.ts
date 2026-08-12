import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * The whole site, including /blog, is crawlable. Only the API route is
 * excluded — it accepts lead submissions and has nothing to index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
