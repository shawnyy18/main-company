import Link from "next/link";

import { postPath } from "@/lib/blog/format";
import type { PostSummary } from "@/lib/blog/types";

import CategoryBadge from "./CategoryBadge";
import CoverImage from "./CoverImage";
import PostMeta from "./PostMeta";

/** The spotlight article at the top of the blog homepage. */
export default function FeaturedPost({ post }: { post: PostSummary }) {
  return (
    <article className="group">
      <Link
        href={postPath(post.slug)}
        className="grid overflow-hidden border border-border-default bg-bg-card transition-colors hover:border-text-primary lg:grid-cols-[1.15fr_1fr]"
      >
        <CoverImage
          post={post}
          priority
          ratio="aspect-[16/9] lg:aspect-auto lg:h-full"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="border-0 border-b lg:border-b-0 lg:border-r"
        />

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border-default bg-bg-surface px-2.5 py-1 text-xs font-semibold text-text-secondary">
              Featured
            </span>
            <CategoryBadge category={post.category} asLink={false} />
          </div>

          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-text-primary transition-colors group-hover:text-accent sm:text-3xl">
            {post.title}
          </h2>

          <p className="mt-4 max-w-xl text-[15px] leading-7 text-text-secondary">
            {post.description}
          </p>

          <PostMeta
            publishedAt={post.publishedAt}
            readingMinutes={post.readingMinutes}
            className="mt-6"
          />

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Read article
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
