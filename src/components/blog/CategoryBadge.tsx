import Link from "next/link";

import { categoryPath } from "@/lib/blog/format";
import type { BlogCategory } from "@/lib/blog/types";

/**
 * Category pill. Renders as a link by default; pass `asLink={false}` when it
 * sits inside another link, since nested anchors are invalid HTML.
 */
export default function CategoryBadge({
  category,
  asLink = true,
  tone = "default",
}: {
  category: BlogCategory;
  asLink?: boolean;
  tone?: "default" | "inverted";
}) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-tight transition-colors";

  const styles =
    tone === "inverted"
      ? "border-white/25 bg-white/10 text-white"
      : "border-indigo-100 bg-accent-soft text-accent";

  if (!asLink) {
    return <span className={`${base} ${styles}`}>{category.name}</span>;
  }

  return (
    <Link
      href={categoryPath(category.slug)}
      className={`${base} ${styles} hover:border-accent hover:bg-accent hover:text-white`}
    >
      {category.name}
    </Link>
  );
}
