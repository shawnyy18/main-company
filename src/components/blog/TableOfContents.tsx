"use client";

import { useEffect, useState } from "react";

import type { TocItem } from "@/lib/blog/types";

/**
 * Table of contents generated from the article's H2/H3 headings.
 *
 * Desktop: a sticky rail beside the article, with the current section
 * highlighted. Mobile: a collapsed <details> disclosure so it never takes up
 * reading space.
 */
export default function TableOfContents({
  items,
  variant,
}: {
  items: TocItem[];
  /** "mobile" renders the collapsed disclosure; "desktop" renders the sticky rail. */
  variant: "mobile" | "desktop";
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Only the desktop rail highlights the current section, so the mobile
    // instance never pays for an observer.
    if (variant !== "desktop") return;
    if (items.length === 0) return;
    if (typeof IntersectionObserver === "undefined") return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Bias the "active" band towards the top of the viewport, below the
      // fixed 64px header.
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items, variant]);

  if (items.length < 3) return null;

  const list = (
    <ul className="space-y-1 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
            className={`block border-l-2 py-1.5 transition-colors ${
              item.level === 3 ? "pl-6" : "pl-3.5"
            } ${
              activeId === item.id
                ? "border-accent font-medium text-accent"
                : "border-border-default text-text-secondary hover:border-text-primary hover:text-text-primary"
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "mobile") {
    // Collapsed by default so it never eats reading space on a phone.
    return (
      <details className="mt-10 border border-border-default bg-bg-surface xl:hidden">
        <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-semibold text-text-primary marker:content-none">
          <span className="flex items-center justify-between gap-3">
            On this page
            <span className="text-xs font-medium text-text-muted">
              {items.length} sections
            </span>
          </span>
        </summary>
        <nav aria-label="Table of contents" className="px-4 pb-4">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
        On this page
      </p>
      <div className="max-h-[calc(100vh-10rem)] overflow-y-auto pr-1">{list}</div>
    </nav>
  );
}
