import Link from "next/link";

import type { BlogAuthor } from "@/lib/blog/types";

/** Byline block shown beneath the article body. */
export default function AuthorCard({ author }: { author: BlogAuthor }) {
  return (
    <div className="border border-border-default bg-bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
        Written by
      </p>
      <p className="mt-3 text-base font-semibold tracking-tight text-text-primary">
        {author.url ? (
          <Link href={author.url} className="transition-colors hover:text-accent">
            {author.name}
          </Link>
        ) : (
          author.name
        )}
      </p>
      <p className="mt-1 text-sm text-text-secondary">{author.role}</p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary">{author.bio}</p>
    </div>
  );
}
