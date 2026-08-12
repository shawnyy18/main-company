import type { BlogAuthor } from "./types";

/**
 * Author registry.
 *
 * Articles reference an author by `id` in their frontmatter. Adding a named
 * writer later is an entry here plus one frontmatter line — no component
 * changes. Only add people who have actually agreed to be credited.
 */
export const authors: BlogAuthor[] = [
  {
    id: "fsk-team",
    name: "FSK Codehouse Team",
    role: "Software team, FSK Codehouse Corp.",
    bio: "FSK Codehouse Corp. is a Philippine software company building real-estate platforms, digital commerce, and web and mobile products for clients, partners, and its own portfolio.",
    url: "/about",
  },
];

const authorById = new Map(authors.map((a) => [a.id, a]));

export const DEFAULT_AUTHOR_ID = "fsk-team";

export function getAuthor(id: string): BlogAuthor | undefined {
  return authorById.get(id);
}

export function getAuthorOrDefault(id?: string): BlogAuthor {
  if (id) {
    const author = authorById.get(id);
    if (author) return author;
  }
  return authorById.get(DEFAULT_AUTHOR_ID)!;
}
