import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import BlogGrid from "@/components/blog/BlogGrid";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import {
  BLOG_BASE_PATH,
  categoryPath,
  getCategoriesInUse,
  getCategory,
  getPostsByCategory,
} from "@/lib/blog";
import {
  breadcrumbSchema,
  collectionPageSchema,
} from "@/lib/blog/structured-data";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ category: string }>;

/**
 * Category pages exist as real, crawlable URLs so search engines can index
 * topic clusters. The client-side filter on /blog is a browsing convenience on
 * top of these — not a replacement for them.
 */
export async function generateStaticParams() {
  // Only prerender categories that actually contain articles. Empty categories
  // still resolve if someone types the URL, but they are never prerendered,
  // linked, or listed in the sitemap — no thin pages for Google to find.
  const inUse = await getCategoriesInUse();
  return inUse.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  const title = `${category.name} articles`;
  const posts = await getPostsByCategory(categorySlug);

  return {
    title,
    description: category.description,
    alternates: { canonical: categoryPath(categorySlug) },
    // Keep empty categories out of the index until they have content.
    robots: posts.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      title: `${title} — FSK Codehouse Blog`,
      description: category.description,
      url: absoluteUrl(categoryPath(categorySlug)),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — FSK Codehouse Blog`,
      description: category.description,
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Params }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) notFound();

  const [posts, otherCategories] = await Promise.all([
    getPostsByCategory(categorySlug),
    getCategoriesInUse(),
  ]);

  return (
    <>
      <Navbar />

      <main className="flex-grow px-5 pb-24 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: BLOG_BASE_PATH },
              { label: category.name },
            ]}
          />

          <header className="mt-7 max-w-3xl">
            <p className="mb-4 text-sm font-semibold text-accent">Category</p>
            <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              {category.name}
            </h1>
            <p className="mt-5 text-[17px] leading-8 text-text-secondary">
              {category.description}
            </p>
          </header>

          <nav
            aria-label="Other categories"
            className="mt-9 flex flex-wrap gap-2 border-y border-border-default py-5"
          >
            <Link
              href={BLOG_BASE_PATH}
              className="inline-flex items-center rounded-full border border-border-default bg-bg-card px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-text-primary hover:text-accent"
            >
              All articles
            </Link>
            {otherCategories
              .filter((item) => item.slug !== categorySlug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={categoryPath(item.slug)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-default bg-bg-card px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-text-primary hover:text-accent"
                >
                  {item.name}
                  <span className="text-text-muted">{item.count}</span>
                </Link>
              ))}
          </nav>

          <div className="mt-10">
            {posts.length > 0 ? (
              <BlogGrid posts={posts} />
            ) : (
              <div className="border border-border-default bg-bg-surface px-6 py-16 text-center">
                <p className="text-sm font-semibold text-text-primary">
                  Nothing published in {category.name} yet.
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
                  We&apos;re writing for this category. In the meantime, there
                  are other articles worth reading.
                </p>
                <Link
                  href={BLOG_BASE_PATH}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-text-secondary"
                >
                  Browse all articles
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <JsonLd
        data={[
          collectionPageSchema({
            name: `${category.name} articles`,
            description: category.description,
            path: categoryPath(categorySlug),
            posts,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: BLOG_BASE_PATH },
            { name: category.name, path: categoryPath(categorySlug) },
          ]),
        ]}
      />
    </>
  );
}
