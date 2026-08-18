import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * The whole site, including /blog, is crawlable. The API route is excluded
 * because it accepts lead submissions and has nothing to index, and the DTI
 * registration certificate is excluded because it carries the owner's full
 * legal name — the registration details are stated in the footer instead.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/FSKCODEHOUSE_DTI.pdf"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
