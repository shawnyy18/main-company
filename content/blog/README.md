# Writing a blog article

Every article is one Markdown file in this folder. **The filename is the URL.**

```
content/blog/react-native-vs-native-development.md
  -> https://fskcodehouse.com/blog/react-native-vs-native-development
```

Slugs must be lowercase, hyphen-separated, and contain no dates. The build fails
if a filename and its `slug:` frontmatter disagree, or if the slug isn't a valid
URL segment — that's deliberate, so a bad URL never reaches production.

## Frontmatter

```markdown
---
title: "React Native vs Native Development: Which Should You Choose?"
description: "One or two sentences. Used as the meta description, the card excerpt, and the social preview text."
category: app-development
publishedAt: 2026-07-14
updatedAt: 2026-07-30
featured: false
draft: false
coverImage: /blog/react-native-cover.jpg
coverAlt: "Description of the image for screen readers"
keywords:
  - react native
  - native development
---
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Also the `<h1>` and the page title. |
| `description` | yes | Meta description and card excerpt. Aim for 140–160 characters. |
| `category` | yes | Must be a slug from `src/lib/blog/categories.ts`. |
| `publishedAt` | yes | `YYYY-MM-DD`. Controls ordering. |
| `updatedAt` | no | `YYYY-MM-DD`. Shown in the byline and used as `dateModified`. Ignored if identical to `publishedAt`. |
| `featured` | no | The newest `featured: true` article takes the spotlight on `/blog`. |
| `draft` | no | Visible in `npm run dev`, excluded from production builds and the sitemap. Renaming the file with a leading `_` hides it entirely. |
| `coverImage` | no | Path under `public/`. Without it, a neutral branded panel renders instead. |
| `coverAlt` | no | Falls back to the title. |
| `author` | no | An id from `src/lib/blog/authors.ts`. Defaults to the FSK Codehouse Team byline. |
| `keywords` | no | Used for meta keywords and to rank related articles. |

Reading time is calculated automatically — don't set it.

## Writing the body

Start headings at `##`. The page supplies the `<h1>` from `title`, so an `#` in
the body would create a second one.

`##` and `###` headings automatically get ids, anchor links, and an entry in the
table of contents. The table of contents appears once an article has three or
more headings.

### Code blocks

Add a language for syntax highlighting, and optionally a title:

````markdown
```ts title="src/lib/blog/index.ts"
export async function getAllPosts(): Promise<PostSummary[]> {
  return posts.sort(byNewestFirst);
}
```
````

Supported: `ts`, `tsx`, `js`, `jsx`, `json`, `bash`, `css`, `html`, `sql`,
`swift`, `yaml`. Anything else renders as plain monospace text — never broken.

### Callouts

```markdown
> [!NOTE]
> Neutral aside.

> [!TIP]
> Practical suggestion.

> [!IMPORTANT]
> Something the reader shouldn't skim past.

> [!WARNING]
> A real risk.
```

A blockquote without a `[!...]` marker renders as a normal quote.

### Everything else

Tables, lists, images, links, and inline code all work as standard GitHub
Markdown. Tables scroll horizontally on small screens instead of breaking the
layout. Links to other sites automatically open in a new tab.

Link internally wherever it's natural — to other articles (`/blog/some-slug`),
to services (`/#services`), to products (`/apps/lenso`), and to the enquiry form
(`/#contact`). Internal linking is a large part of how these pages rank.

## Adding a category

Add an entry to `src/lib/blog/categories.ts`. The filter pills, the category
page at `/blog/category/<slug>`, and the sitemap all pick it up automatically.
Categories with no articles are never prerendered, linked, or indexed.

## Checklist before publishing

- [ ] Filename matches the slug you want, lowercase and hyphenated
- [ ] `description` reads well as a search result
- [ ] Headings start at `##` and nest sensibly
- [ ] Code blocks have a language
- [ ] Internal links point somewhere real
- [ ] `npm run build` passes
