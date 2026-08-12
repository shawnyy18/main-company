import { formatPostDate, toIsoTimestamp } from "@/lib/blog/format";
import type { PostSummary } from "@/lib/blog/types";

import CategoryBadge from "./CategoryBadge";
import CoverImage from "./CoverImage";

/**
 * Article title block: category, H1, standfirst, byline, dates, reading time,
 * and the cover slot. The page supplies the only H1 on the route.
 */
export default function ArticleHeader({ post }: { post: PostSummary }) {
  return (
    <header>
      <div className="mb-5">
        <CategoryBadge category={post.category} />
      </div>

      <h1 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl md:text-[2.75rem]">
        {post.title}
      </h1>

      <p className="mt-5 text-lg leading-8 text-text-secondary">{post.description}</p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border-default pt-6 text-sm text-text-secondary">
        <span className="font-semibold text-text-primary">{post.author.name}</span>
        <span aria-hidden="true" className="text-text-muted">
          ·
        </span>
        <time dateTime={toIsoTimestamp(post.publishedAt)}>
          {formatPostDate(post.publishedAt)}
        </time>
        <span aria-hidden="true" className="text-text-muted">
          ·
        </span>
        <span>{post.readingMinutes} min read</span>
        {post.updatedAt ? (
          <span className="text-text-muted">
            (updated{" "}
            <time dateTime={toIsoTimestamp(post.updatedAt)}>
              {formatPostDate(post.updatedAt)}
            </time>
            )
          </span>
        ) : null}
      </div>

      <div className="mt-8">
        <CoverImage
          post={post}
          priority
          sizes="(min-width: 1280px) 768px, (min-width: 768px) 90vw, 100vw"
        />
      </div>
    </header>
  );
}
