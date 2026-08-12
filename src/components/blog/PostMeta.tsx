import { formatPostDate, formatReadingTime, toIsoTimestamp } from "@/lib/blog/format";

/**
 * Publication date and reading time, separated by a mid dot.
 * Used on cards, the featured slot, and the article header.
 */
export default function PostMeta({
  publishedAt,
  readingMinutes,
  updatedAt,
  className = "",
}: {
  publishedAt: string;
  readingMinutes: number;
  updatedAt?: string;
  className?: string;
}) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted ${className}`}>
      <time dateTime={toIsoTimestamp(publishedAt)}>{formatPostDate(publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span>{formatReadingTime(readingMinutes)}</span>
      {updatedAt ? (
        <>
          <span aria-hidden="true">·</span>
          <span>
            Updated{" "}
            <time dateTime={toIsoTimestamp(updatedAt)}>{formatPostDate(updatedAt)}</time>
          </span>
        </>
      ) : null}
    </p>
  );
}
