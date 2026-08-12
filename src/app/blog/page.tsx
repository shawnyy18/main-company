import type { Metadata } from "next";

import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import BlogBrowser from "@/components/blog/BlogBrowser";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import { BLOG_BASE_PATH, getAllPosts, getCategoriesInUse, getFeaturedPost } from "@/lib/blog";
import { blogSchema, breadcrumbSchema } from "@/lib/blog/structured-data";
import { absoluteUrl } from "@/lib/site";

const TITLE = "Blog — insights from building real software";
const DESCRIPTION =
  "Practical writing from FSK Codehouse on web development, mobile app development, AI-assisted development, product building, and software monetization.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: BLOG_BASE_PATH },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(BLOG_BASE_PATH),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const TOPICS = [
  "Web development",
  "Mobile apps",
  "AI & development",
  "Startups & products",
  "Tutorials",
  "Monetization",
];

export default async function BlogHomePage() {
  const [posts, featured, categoriesInUse] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
    getCategoriesInUse(),
  ]);

  return (
    <>
      <Navbar />

      <main className="flex-grow px-5 pb-24 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BlogHero
            eyebrow="FSK Codehouse Blog"
            title="Insights from building real software."
            description="We build web and mobile products for clients, partners, and our own portfolio. This is where we write down what that actually involves — the decisions, the tradeoffs, and the parts that are harder than they look."
            topics={TOPICS}
          />

          {featured ? (
            <section className="mt-14" aria-labelledby="featured-article">
              <h2 id="featured-article" className="sr-only">
                Featured article
              </h2>
              <FeaturedPost post={featured} />
            </section>
          ) : null}

          <section className="mt-16 border-t border-border-default pt-12" aria-labelledby="all-articles">
            <div className="mb-8">
              <h2
                id="all-articles"
                className="text-2xl font-semibold tracking-tight text-text-primary"
              >
                All articles
              </h2>
              <p className="mt-2 text-sm leading-7 text-text-secondary">
                Browse by category, or search across every article we&apos;ve
                published.
              </p>
            </div>

            {posts.length > 0 ? (
              <BlogBrowser
                posts={posts}
                categories={categoriesInUse}
                excludeSlug={featured?.slug}
              />
            ) : (
              <p className="border border-border-default bg-bg-surface px-6 py-16 text-center text-sm text-text-secondary">
                No articles published yet.
              </p>
            )}
          </section>

          <div className="mt-16">
            <NewsletterCTA />
          </div>
        </div>
      </main>

      <Footer />

      <JsonLd
        data={[
          blogSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: BLOG_BASE_PATH },
          ]),
        ]}
      />
    </>
  );
}
