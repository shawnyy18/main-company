import Link from "next/link";

import { postPath } from "@/lib/blog/format";
import type { PostSummary } from "@/lib/blog/types";

import CategoryBadge from "./CategoryBadge";
import CoverImage from "./CoverImage";
import PostMeta from "./PostMeta";

/**
 * Article card used in the latest-articles grid, category pages, and related
 * posts. The whole card is one link; the category is rendered as plain text so
 * no anchor is nested inside another.
 */
export default function BlogCard({
  post,
  sizes = "(min-width: 1024px) 384px, (min-width: 640px) 45vw, 92vw",
}: {
  post: PostSummary;
  sizes?: string;
}) {
  return (
    <article className="group h-full">
      <Link
        href={postPath(post.slug)}
        className="flex h-full flex-col border border-border-default bg-bg-card transition-colors hover:border-text-primary hover:bg-bg-card-hover"
      >
        <CoverImage post={post} sizes={sizes} className="border-0 border-b" />

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3">
            <CategoryBadge category={post.category} asLink={false} />
          </div>

          <h3 className="text-[17px] font-semibold leading-6 tracking-tight text-text-primary transition-colors group-hover:text-accent">
            {post.title}
          </h3>

          <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-text-secondary">
            {post.description}
          </p>

          <PostMeta
            publishedAt={post.publishedAt}
            readingMinutes={post.readingMinutes}
            className="mt-auto pt-5"
          />
        </div>
      </Link>
    </article>
  );
}
