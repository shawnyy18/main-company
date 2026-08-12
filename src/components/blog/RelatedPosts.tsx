import type { PostSummary } from "@/lib/blog/types";

import BlogCard from "./BlogCard";

/** "Keep reading" section shown after the article body. */
export default function RelatedPosts({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-articles">
      <h2
        id="related-articles"
        className="mb-6 text-xl font-semibold tracking-tight text-text-primary"
      >
        Keep reading
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 92vw"
          />
        ))}
      </div>
    </section>
  );
}
