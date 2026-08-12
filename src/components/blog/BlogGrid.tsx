import type { PostSummary } from "@/lib/blog/types";

import BlogCard from "./BlogCard";

/** Responsive article grid: one column on phones, two on tablets, three on desktop. */
export default function BlogGrid({
  posts,
  columns = 3,
}: {
  posts: PostSummary[];
  columns?: 2 | 3;
}) {
  const columnClass =
    columns === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-5 ${columnClass}`}>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
