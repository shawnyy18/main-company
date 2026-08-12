/** Average adult reading speed for technical prose. */
const WORDS_PER_MINUTE = 220;

/** Code is skimmed rather than read; count it at a slower, smaller weight. */
const CODE_LINES_PER_MINUTE = 60;

/**
 * Estimates reading time in whole minutes from raw Markdown.
 *
 * Fenced code blocks are measured by line count rather than word count so a
 * long snippet does not inflate the estimate the way prose would.
 */
export function estimateReadingMinutes(markdown: string): number {
  const codeBlocks: string[] = markdown.match(/```[\s\S]*?```/g) ?? [];
  const codeLines = codeBlocks.reduce(
    (total, block) => total + block.split("\n").length,
    0,
  );

  const prose = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]/g, " ");

  const words = prose.split(/\s+/).filter(Boolean).length;
  const minutes = words / WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE;

  return Math.max(1, Math.ceil(minutes));
}
