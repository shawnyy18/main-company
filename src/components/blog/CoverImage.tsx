import Image from "next/image";

import type { PostSummary } from "@/lib/blog/types";

/**
 * Article artwork slot.
 *
 * The container always reserves its aspect ratio, so pages never shift when an
 * image loads — and articles without artwork yet render a quiet branded panel
 * instead of a broken image. Drop a file in `public/blog/` and set
 * `coverImage` in the article frontmatter to replace it.
 */
export default function CoverImage({
  post,
  priority = false,
  sizes,
  className = "",
  ratio = "aspect-[16/9]",
}: {
  post: Pick<PostSummary, "coverImage" | "coverAlt" | "title" | "category">;
  priority?: boolean;
  sizes: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden border border-border-default bg-bg-surface ${className}`}
    >
      {post.coverImage ? (
        <Image
          src={post.coverImage}
          alt={post.coverAlt ?? post.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className="blog-cover-placeholder absolute inset-0 flex items-end justify-between p-4 sm:p-5"
          aria-hidden="true"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            {post.category.name}
          </span>
          <span className="text-[11px] font-semibold tracking-tight text-text-muted">
            FSK
          </span>
        </div>
      )}
    </div>
  );
}
