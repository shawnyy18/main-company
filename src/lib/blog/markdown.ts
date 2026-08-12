import { Marked, Renderer, type RendererObject, type Tokens } from "marked";

import {
  escapeHtml,
  highlightCode,
  languageLabel,
  normalizeLanguage,
} from "./highlight";
import type { TocItem } from "./types";

export interface RenderedMarkdown {
  html: string;
  toc: TocItem[];
}

/** Strips tags and decodes the handful of entities that appear in headings. */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

const CALLOUT_LABELS: Record<string, string> = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution",
};

/**
 * Parses a fenced-code info string such as:
 *   ts title="src/lib/blog/index.ts"
 */
function parseCodeMeta(info: string): { language: string; title?: string } {
  const language = normalizeLanguage(info);
  const titleMatch = /title="([^"]+)"|title='([^']+)'/.exec(info);
  return { language, title: titleMatch?.[1] ?? titleMatch?.[2] };
}

/**
 * Renders article Markdown to HTML and extracts a table of contents.
 *
 * A fresh renderer is created per call so heading slugs and the TOC never leak
 * between articles.
 */
export async function renderMarkdown(markdown: string): Promise<RenderedMarkdown> {
  const toc: TocItem[] = [];
  const usedSlugs = new Map<string, number>();

  function uniqueSlug(text: string): string {
    const base = slugify(text);
    const seen = usedSlugs.get(base) ?? 0;
    usedSlugs.set(base, seen + 1);
    return seen === 0 ? base : `${base}-${seen + 1}`;
  }

  const renderer: RendererObject = {
    heading(this: Renderer, { tokens, depth }: Tokens.Heading) {
      const inner = this.parser.parseInline(tokens);
      const text = toPlainText(inner);

      // Articles start at H2 — the page supplies the single H1.
      if (depth === 1) {
        return `<h2 class="article-heading">${inner}</h2>\n`;
      }

      if (depth === 2 || depth === 3) {
        const id = uniqueSlug(text);
        toc.push({ id, text, level: depth });
        return (
          `<h${depth} id="${id}" class="article-heading">` +
          `<a class="heading-anchor" href="#${id}" aria-label="Link to section: ${escapeHtml(text)}">#</a>` +
          `${inner}</h${depth}>\n`
        );
      }

      return `<h${depth} class="article-heading">${inner}</h${depth}>\n`;
    },

    code(_token: Tokens.Code) {
      const { text, lang } = _token;
      const { language, title } = parseCodeMeta(lang ?? "");
      const highlighted = highlightCode(text, language);
      const label = title ?? languageLabel(language);

      return (
        `<figure class="code-block" data-language="${escapeHtml(language)}">` +
        `<figcaption class="code-block__bar">` +
        `<span class="code-block__label">${escapeHtml(label)}</span>` +
        `<button type="button" class="code-block__copy" data-copy-code aria-label="Copy code to clipboard">` +
        `<span data-copy-label>Copy</span></button>` +
        `</figcaption>` +
        `<pre class="code-block__pre" tabindex="0"><code class="code-block__code language-${escapeHtml(language)}">${highlighted}</code></pre>` +
        `</figure>\n`
      );
    },

    paragraph(this: Renderer, { tokens }: Tokens.Paragraph) {
      // A paragraph containing only an image becomes a <figure>, which is not
      // valid inside <p>. Emit the figure on its own instead.
      if (tokens.length === 1 && tokens[0].type === "image") {
        return `${this.parser.parseInline(tokens)}\n`;
      }
      return `<p>${this.parser.parseInline(tokens)}</p>\n`;
    },

    blockquote(this: Renderer, { tokens }: Tokens.Blockquote) {
      const body = this.parser.parse(tokens);
      const calloutMatch = /^\s*<p>\s*\[!(note|tip|important|warning|caution)\]\s*(?:<br\s*\/?>)?\s*/i.exec(body);

      if (calloutMatch) {
        const kind = calloutMatch[1].toLowerCase();
        const rest = `<p>${body.slice(calloutMatch[0].length)}`;
        return (
          `<aside class="callout callout--${kind}" role="note">` +
          `<p class="callout__label">${CALLOUT_LABELS[kind]}</p>` +
          `<div class="callout__body">${rest}</div>` +
          `</aside>\n`
        );
      }

      return `<blockquote class="article-quote">${body}</blockquote>\n`;
    },

    table(this: Renderer, token: Tokens.Table) {
      // Reuse marked's alignment-aware table output, then make it scrollable
      // so wide tables never force the page to scroll horizontally on mobile.
      const table = Renderer.prototype.table.call(this, token);
      return `<div class="table-scroll" role="region" aria-label="Table" tabindex="0">${table}</div>\n`;
    },

    link(this: Renderer, { href, title, tokens }: Tokens.Link) {
      const inner = this.parser.parseInline(tokens);
      const isExternal = /^https?:\/\//i.test(href) && !href.includes("fskcodehouse.com");
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      const relAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeHtml(href)}"${titleAttr}${relAttr}>${inner}</a>`;
    },

    image({ href, title, text }: Tokens.Image) {
      const caption = title
        ? `<figcaption class="article-figure__caption">${escapeHtml(title)}</figcaption>`
        : "";
      return (
        `<figure class="article-figure">` +
        `<img src="${escapeHtml(href)}" alt="${escapeHtml(text ?? "")}" loading="lazy" decoding="async" />` +
        `${caption}</figure>\n`
      );
    },
  };

  const parser = new Marked({ gfm: true, breaks: false, renderer });
  const html = await parser.parse(markdown);

  return { html, toc };
}
