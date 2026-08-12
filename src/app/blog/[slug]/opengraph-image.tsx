import { ImageResponse } from "next/og";

import { getPostSummary } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog/format";

/**
 * Per-article Open Graph image, generated at build time.
 *
 * The site's shared OG asset is an SVG, which Facebook, LinkedIn, X and
 * Discord all refuse to render. This produces a real PNG per article using
 * Next's built-in `next/og` — no extra dependency, no design tooling — so
 * shared links look intentional.
 *
 * To use bespoke artwork instead, set `coverImage` in the article frontmatter
 * and reference it from `generateMetadata`.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FSK Codehouse Corp. article";

type Params = Promise<{ slug: string }>;

export default async function OpengraphImage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostSummary(slug);

  const title = post?.title ?? "FSK Codehouse Corp.";
  const category = post?.category.name ?? "Blog";
  const meta = post
    ? `${formatPostDate(post.publishedAt)}  ·  ${post.readingMinutes} min read`
    : "fskcodehouse.com";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f1115",
          padding: "72px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.22)",
              padding: "8px 18px",
              fontSize: 22,
              color: "#c7cbd3",
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 58 : 68,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "960px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "28px",
            fontSize: 24,
            color: "#9aa1ad",
          }}
        >
          <div style={{ display: "flex", color: "#ffffff", fontWeight: 600 }}>
            FSK Codehouse Corp.
          </div>
          <div style={{ display: "flex" }}>{meta}</div>
        </div>
      </div>
    ),
    size,
  );
}
