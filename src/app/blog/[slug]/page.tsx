import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import AdSenseScript from "@/components/blog/AdSenseScript";
import AdSlot from "@/components/blog/AdSlot";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleCTA from "@/components/blog/ArticleCTA";
import ArticleHeader from "@/components/blog/ArticleHeader";
import AuthorCard from "@/components/blog/AuthorCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import PrevNextNav from "@/components/blog/PrevNextNav";
import RelatedPosts from "@/components/blog/RelatedPosts";
import TableOfContents from "@/components/blog/TableOfContents";
import {
  BLOG_BASE_PATH,
  categoryPath,
  getAdjacentPosts,
  getAllPostSlugs,
  getPostSummary,
  getRelatedPosts,
  getRenderedPost,
  postPath,
  toIsoTimestamp,
} from "@/lib/blog";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/blog/structured-data";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostSummary(slug);
  if (!post) return {};

  const url = absoluteUrl(postPath(slug));

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.length > 0 ? post.keywords : undefined,
    authors: [{ name: post.author.name }],
    alternates: { canonical: postPath(slug) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: toIsoTimestamp(post.publishedAt),
      modifiedTime: toIsoTimestamp(post.updatedAt ?? post.publishedAt),
      authors: [post.author.name],
      section: post.category.name,
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getRenderedPost(slug);

  // An unknown slug falls through to the site's normal 404 page.
  if (!post) notFound();

  const [related, adjacent] = await Promise.all([
    getRelatedPosts(slug, 3),
    getAdjacentPosts(slug),
  ]);

  return (
    <>
      <Navbar />

      <main className="flex-grow px-5 pb-24 pt-28 sm:px-6 md:pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-16">
            {/* Stays centred in its grid column at every width, which
                guarantees room for the full-bleed code/table breakout. */}
            <div className="mx-auto w-full max-w-[44rem]">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: BLOG_BASE_PATH },
                  {
                    label: post.category.name,
                    href: categoryPath(post.category.slug),
                  },
                  { label: post.title },
                ]}
              />

              <div className="mt-7">
                <ArticleHeader post={post} />
              </div>

              <TableOfContents items={post.toc} variant="mobile" />

              <div className="mt-10">
                <ArticleBody html={post.html} />
              </div>

              <AdSlot placement="article-end" />

              <div className="mt-14 space-y-8">
                <AuthorCard author={post.author} />
                <ArticleCTA categorySlug={post.category.slug} />
                <NewsletterCTA />
              </div>

              <div className="mt-12">
                <PrevNextNav previous={adjacent.previous} next={adjacent.next} />
              </div>
            </div>

            <aside className="hidden xl:block">
              <TableOfContents items={post.toc} variant="desktop" />
            </aside>
          </div>

          {related.length > 0 ? (
            <div className="mt-20 border-t border-border-default pt-12">
              <RelatedPosts posts={related} />
            </div>
          ) : null}
        </div>
      </main>

      <Footer />

      <AdSenseScript />

      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: BLOG_BASE_PATH },
            { name: post.category.name, path: categoryPath(post.category.slug) },
            { name: post.title, path: postPath(post.slug) },
          ]),
        ]}
      />
    </>
  );
}
