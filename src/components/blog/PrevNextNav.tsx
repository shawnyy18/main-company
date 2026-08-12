import Link from "next/link";

import { postPath } from "@/lib/blog/format";
import type { PostSummary } from "@/lib/blog/types";

/** Previous / next article navigation in publication order. */
export default function PrevNextNav({
  previous,
  next,
}: {
  previous: PostSummary | null;
  next: PostSummary | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="More articles"
      className="grid gap-4 border-t border-border-default pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={postPath(previous.slug)}
          rel="prev"
          className="group border border-border-default bg-bg-card p-5 transition-colors hover:border-indigo-200 hover:bg-bg-card-hover"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            Previous
          </span>
          <span className="mt-2 block text-sm font-semibold leading-6 text-text-primary transition-colors group-hover:text-accent">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={postPath(next.slug)}
          rel="next"
          className="group border border-border-default bg-bg-card p-5 transition-colors hover:border-indigo-200 hover:bg-bg-card-hover sm:text-right"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            Next
          </span>
          <span className="mt-2 block text-sm font-semibold leading-6 text-text-primary transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
