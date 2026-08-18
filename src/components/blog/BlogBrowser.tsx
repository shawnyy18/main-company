"use client";

import { useMemo, useState } from "react";

import type { BlogCategory, PostSummary } from "@/lib/blog/types";

import BlogGrid from "./BlogGrid";

const ALL = "all";

/**
 * Client-side browsing for the blog homepage: a text filter plus category
 * pills, both running over metadata that is already on the page. No search
 * service, no extra network request.
 *
 * Category pills also link through to real `/blog/category/...` pages via the
 * "View all" affordance, so browsing stays crawlable for search engines.
 */
export default function BlogBrowser({
  posts,
  categories,
  /** Slug already shown in the featured slot; hidden until the reader filters. */
  excludeSlug,
}: {
  posts: PostSummary[];
  categories: Array<BlogCategory & { count: number }>;
  excludeSlug?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const isFiltering = query.trim() !== "" || activeCategory !== ALL;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return posts.filter((post) => {
      // The featured article is only duplicated in the grid once the reader
      // starts searching — otherwise it would appear twice on first load.
      if (!isFiltering && post.slug === excludeSlug) return false;
      if (activeCategory !== ALL && post.category.slug !== activeCategory) {
        return false;
      }
      if (needle === "") return true;

      return (
        post.title.toLowerCase().includes(needle) ||
        post.description.toLowerCase().includes(needle) ||
        post.category.name.toLowerCase().includes(needle) ||
        post.keywords.some((keyword) => keyword.toLowerCase().includes(needle))
      );
    });
  }, [posts, query, activeCategory, excludeSlug, isFiltering]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
          role="group"
          aria-label="Filter articles by category"
        >
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            <FilterPill
              label="All"
              active={activeCategory === ALL}
              onClick={() => setActiveCategory(ALL)}
            />
            {categories.map((category) => (
              <FilterPill
                key={category.slug}
                label={category.name}
                count={category.count}
                active={activeCategory === category.slug}
                onClick={() => setActiveCategory(category.slug)}
              />
            ))}
          </div>
        </div>

        <search className="lg:w-72 lg:shrink-0">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles"
              autoComplete="off"
              className="w-full rounded-full border border-border-default bg-bg-card py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
            />
          </div>
        </search>
      </div>

      <p aria-live="polite" className="sr-only">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"} shown.
      </p>

      {filtered.length > 0 ? (
        <BlogGrid posts={filtered} />
      ) : (
        <div className="border border-border-default bg-bg-surface px-6 py-16 text-center">
          <p className="text-sm font-semibold text-text-primary">
            No articles match that search.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">
            Try a different keyword, or clear the filters to see everything
            we&apos;ve published.
          </p>
          {isFiltering ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(ALL);
              }}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-border-default bg-white px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-text-primary hover:text-accent"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-border-default bg-bg-card text-text-secondary hover:border-text-primary hover:text-accent"
      }`}
    >
      {label}
      {typeof count === "number" ? (
        <span className={active ? "text-white/70" : "text-text-muted"}>{count}</span>
      ) : null}
    </button>
  );
}
