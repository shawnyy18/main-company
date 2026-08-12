/**
 * A small, dependency-free syntax highlighter that runs at build time.
 *
 * Design notes:
 * - It is a single-pass character scanner, not layered regex replacement, so
 *   escaping is applied exactly once per emitted chunk and can never corrupt
 *   the output.
 * - It emits semantic class names (`tok-*`) which are themed in globals.css.
 * - An unknown language degrades to escaped plain text rather than throwing.
 *
 * If content ever needs grammar-perfect highlighting for many languages,
 * replace this module with Shiki — `highlightCode` is the only export the
 * Markdown renderer uses.
 */

type TokenClass =
  | "com" // comment
  | "str" // string
  | "num" // number
  | "lit" // language literal: true / false / null
  | "key" // keyword
  | "typ" // type, class, builtin
  | "fn" // function or method name
  | "prop" // object property / css property / attribute
  | "var" // shell variable
  | "tag" // markup tag name
  | "pun"; // punctuation and operators

const LANGUAGE_ALIASES: Record<string, string> = {
  javascript: "js",
  node: "js",
  mjs: "js",
  cjs: "js",
  typescript: "ts",
  jsx: "js",
  tsx: "ts",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  terminal: "bash",
  yml: "yaml",
  jsonc: "json",
  htm: "html",
  xml: "html",
  postgres: "sql",
  postgresql: "sql",
  plaintext: "text",
  txt: "text",
  "": "text",
};

const LANGUAGE_LABELS: Record<string, string> = {
  ts: "TypeScript",
  js: "JavaScript",
  json: "JSON",
  bash: "Shell",
  css: "CSS",
  html: "HTML",
  sql: "SQL",
  swift: "Swift",
  yaml: "YAML",
  md: "Markdown",
  text: "Text",
};

export function normalizeLanguage(language?: string): string {
  const raw = (language ?? "").trim().toLowerCase().split(/[\s:{]/)[0];
  return LANGUAGE_ALIASES[raw] ?? raw ?? "text";
}

/** Human-readable label shown in the code block header. */
export function languageLabel(language: string): string {
  return LANGUAGE_LABELS[language] ?? language.toUpperCase();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* -------------------------------------------------------------------------- */
/* Emitter                                                                    */
/* -------------------------------------------------------------------------- */

class Emitter {
  private parts: string[] = [];

  push(text: string, token?: TokenClass): void {
    if (text === "") return;
    const escaped = escapeHtml(text);
    this.parts.push(token ? `<span class="tok-${token}">${escaped}</span>` : escaped);
  }

  toString(): string {
    return this.parts.join("");
  }
}

/* -------------------------------------------------------------------------- */
/* C-like languages                                                           */
/* -------------------------------------------------------------------------- */

interface CLikeConfig {
  lineComment: string[];
  blockComment: [string, string] | null;
  /** Quote characters that open a string. */
  quotes: string[];
  /** Quotes that may span multiple lines. */
  multilineQuotes: string[];
  keywords: Set<string>;
  literals: Set<string>;
  builtins: Set<string>;
  /** Match keywords without regard to case (SQL). */
  caseInsensitive: boolean;
  /** Highlight `"key":` as a property (JSON). */
  jsonProperties: boolean;
  /** Characters that may start an identifier in addition to letters. */
  identifierStart: RegExp;
}

const set = (words: string) => new Set(words.split(/\s+/).filter(Boolean));

const JS_KEYWORDS = `as async await break case catch class const continue debugger declare
default delete do else enum export extends finally for from function get if implements import
in infer instanceof interface is keyof let namespace new of override private protected public
readonly return satisfies set static super switch this throw try type typeof var void while
with yield abstract asserts accessor`;

const JS_BUILTINS = `Array ArrayBuffer BigInt Boolean Date Error Function Infinity Intl JSON Map
Math NaN Number Object Promise Proxy Reflect RegExp Set String Symbol WeakMap WeakSet console
document fetch globalThis process window navigator localStorage URL URLSearchParams
string number boolean any unknown never object symbol bigint unique Record Partial Required
Readonly Pick Omit Exclude Extract Awaited ReturnType Parameters NonNullable Metadata React`;

const SWIFT_KEYWORDS = `actor as associatedtype async await break case catch class continue
convenience default defer deinit didSet do else enum extension fallthrough fileprivate final
for func get guard if import in indirect init inout internal is lazy let mutating nonisolated
open operator override private protocol public repeat required rethrows return self Self set
some static struct subscript super switch throw throws try typealias unowned var weak where
while willSet`;

const SWIFT_BUILTINS = `Any AnyObject Array Bool Character Codable Data Date Dictionary Double
Encodable Equatable Error Float Hashable Int Never Optional Result Set String Task URL UUID Void
View Text Image Button State Binding ObservedObject StateObject EnvironmentObject Published`;

const SQL_KEYWORDS = `add all alter and as asc begin between by cascade case cast check column
commit constraint create cross current_timestamp default delete desc distinct do drop else end
exists foreign from full group having if in index inner insert intersect into is join key left
like limit not null offset on or order outer primary references returning right rollback row
select set table then to transaction trigger union unique update using values view when where
with`;

const SQL_BUILTINS = `bigint boolean bytea char coalesce count date decimal float integer json
jsonb max min now numeric serial smallint sum text time timestamp timestamptz uuid varchar`;

const CLIKE_CONFIGS: Record<string, CLikeConfig> = {
  js: {
    lineComment: ["//"],
    blockComment: ["/*", "*/"],
    quotes: ['"', "'", "`"],
    multilineQuotes: ["`"],
    keywords: set(JS_KEYWORDS),
    literals: set("true false null undefined"),
    builtins: set(JS_BUILTINS),
    caseInsensitive: false,
    jsonProperties: false,
    identifierStart: /[A-Za-z_$]/,
  },
  swift: {
    lineComment: ["//"],
    blockComment: ["/*", "*/"],
    quotes: ['"'],
    multilineQuotes: [],
    keywords: set(SWIFT_KEYWORDS),
    literals: set("true false nil"),
    builtins: set(SWIFT_BUILTINS),
    caseInsensitive: false,
    jsonProperties: false,
    identifierStart: /[A-Za-z_@]/,
  },
  json: {
    lineComment: ["//"],
    blockComment: ["/*", "*/"],
    quotes: ['"'],
    multilineQuotes: [],
    keywords: new Set<string>(),
    literals: set("true false null"),
    builtins: new Set<string>(),
    caseInsensitive: false,
    jsonProperties: true,
    identifierStart: /[A-Za-z_]/,
  },
  sql: {
    lineComment: ["--"],
    blockComment: ["/*", "*/"],
    quotes: ['"', "'"],
    multilineQuotes: [],
    keywords: set(SQL_KEYWORDS),
    literals: set("true false null"),
    builtins: set(SQL_BUILTINS),
    caseInsensitive: true,
    jsonProperties: false,
    identifierStart: /[A-Za-z_]/,
  },
};

// `ts` shares the JavaScript grammar.
CLIKE_CONFIGS.ts = CLIKE_CONFIGS.js;

function isIdentifierPart(char: string): boolean {
  return /[A-Za-z0-9_$]/.test(char);
}

function readString(
  code: string,
  start: number,
  quote: string,
  allowNewline: boolean,
): number {
  let i = start + 1;
  while (i < code.length) {
    const char = code[i];
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === quote) return i + 1;
    if (char === "\n" && !allowNewline) return i;
    i += 1;
  }
  return i;
}

function highlightCLike(code: string, config: CLikeConfig): string {
  const out = new Emitter();
  let i = 0;
  let previousMeaningful = "";

  while (i < code.length) {
    const char = code[i];

    // Whitespace
    if (/\s/.test(char)) {
      let end = i;
      while (end < code.length && /\s/.test(code[end])) end += 1;
      out.push(code.slice(i, end));
      i = end;
      continue;
    }

    // Line comment
    const lineToken = config.lineComment.find((token) => code.startsWith(token, i));
    if (lineToken) {
      let end = code.indexOf("\n", i);
      if (end === -1) end = code.length;
      out.push(code.slice(i, end), "com");
      i = end;
      continue;
    }

    // Block comment
    if (config.blockComment && code.startsWith(config.blockComment[0], i)) {
      const closeIndex = code.indexOf(config.blockComment[1], i + config.blockComment[0].length);
      const end = closeIndex === -1 ? code.length : closeIndex + config.blockComment[1].length;
      out.push(code.slice(i, end), "com");
      i = end;
      continue;
    }

    // String
    if (config.quotes.includes(char)) {
      const end = readString(code, i, char, config.multilineQuotes.includes(char));
      const value = code.slice(i, end);

      if (config.jsonProperties) {
        // A string immediately followed by ":" is an object key.
        let lookahead = end;
        while (lookahead < code.length && /\s/.test(code[lookahead])) lookahead += 1;
        out.push(value, code[lookahead] === ":" ? "prop" : "str");
      } else {
        out.push(value, "str");
      }

      previousMeaningful = char;
      i = end;
      continue;
    }

    // Number
    if (/[0-9]/.test(char) || (char === "." && /[0-9]/.test(code[i + 1] ?? ""))) {
      let end = i;
      while (end < code.length && /[0-9a-fA-FxXoObB_.]/.test(code[end])) end += 1;
      if (/[eE]/.test(code[end] ?? "") && /[-+0-9]/.test(code[end + 1] ?? "")) {
        end += 2;
        while (end < code.length && /[0-9]/.test(code[end])) end += 1;
      }
      out.push(code.slice(i, end), "num");
      previousMeaningful = "0";
      i = end;
      continue;
    }

    // Identifier / keyword
    if (config.identifierStart.test(char)) {
      let end = i + 1;
      while (end < code.length && isIdentifierPart(code[end])) end += 1;
      const word = code.slice(i, end);
      const lookupWord = config.caseInsensitive ? word.toLowerCase() : word;

      let next = end;
      while (next < code.length && /[ \t]/.test(code[next])) next += 1;
      const nextChar = code[next] ?? "";

      let token: TokenClass;
      if (config.literals.has(lookupWord)) {
        token = "lit";
      } else if (config.keywords.has(lookupWord)) {
        token = "key";
      } else if (nextChar === "(") {
        token = "fn";
      } else if (config.builtins.has(word)) {
        token = "typ";
      } else if (/^[A-Z]/.test(word) && !config.caseInsensitive) {
        token = "typ";
      } else if (previousMeaningful === ".") {
        token = "prop";
      } else if (word.startsWith("@")) {
        token = "key";
      } else {
        token = "pun"; // plain identifier — styled as normal body text
      }

      // Plain identifiers should not carry punctuation colouring.
      if (token === "pun") {
        out.push(word);
      } else {
        out.push(word, token);
      }

      previousMeaningful = word;
      i = end;
      continue;
    }

    // Punctuation and operators
    out.push(char, "pun");
    previousMeaningful = char;
    i += 1;
  }

  return out.toString();
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                      */
/* -------------------------------------------------------------------------- */

const SHELL_COMMANDS = set(`npm npx pnpm yarn bun node deno git cd ls cp mv rm mkdir touch cat
echo curl wget grep sed awk chmod chown export source open code brew apt sudo docker vercel
supabase eas fastlane pod xcodebuild swift make python python3 pip pip3 ssh scp tar zip unzip`);

const SHELL_KEYWORDS = set(`if then elif else fi for while until do done case esac function
return break continue in local readonly set unset trap exit`);

function highlightShell(code: string): string {
  const out = new Emitter();
  let i = 0;
  let atCommandPosition = true;

  while (i < code.length) {
    const char = code[i];

    if (/\s/.test(char)) {
      let end = i;
      while (end < code.length && /\s/.test(code[end])) end += 1;
      if (code.slice(i, end).includes("\n")) atCommandPosition = true;
      out.push(code.slice(i, end));
      i = end;
      continue;
    }

    // Comment — only when it starts a word, so URLs with # survive.
    if (char === "#" && (i === 0 || /\s/.test(code[i - 1]))) {
      let end = code.indexOf("\n", i);
      if (end === -1) end = code.length;
      out.push(code.slice(i, end), "com");
      i = end;
      continue;
    }

    // Prompt marker at the start of a line.
    if (char === "$" && (i === 0 || code[i - 1] === "\n") && /\s/.test(code[i + 1] ?? "")) {
      out.push(char, "pun");
      i += 1;
      continue;
    }

    // Variable expansion
    if (char === "$") {
      let end = i + 1;
      if (code[end] === "{") {
        end = code.indexOf("}", end);
        end = end === -1 ? code.length : end + 1;
      } else {
        while (end < code.length && /[A-Za-z0-9_]/.test(code[end])) end += 1;
      }
      out.push(code.slice(i, end), "var");
      i = end;
      continue;
    }

    // Strings
    if (char === '"' || char === "'") {
      const end = readString(code, i, char, true);
      out.push(code.slice(i, end), "str");
      i = end;
      atCommandPosition = false;
      continue;
    }

    // Flags
    if (char === "-" && (i === 0 || /\s/.test(code[i - 1])) && /[-A-Za-z]/.test(code[i + 1] ?? "")) {
      let end = i;
      while (end < code.length && /[-A-Za-z0-9_]/.test(code[end])) end += 1;
      out.push(code.slice(i, end), "prop");
      i = end;
      continue;
    }

    // Words
    if (/[A-Za-z_./]/.test(char)) {
      let end = i;
      while (end < code.length && /[A-Za-z0-9_./@-]/.test(code[end])) end += 1;
      const word = code.slice(i, end);

      if (SHELL_KEYWORDS.has(word)) {
        out.push(word, "key");
      } else if (atCommandPosition && SHELL_COMMANDS.has(word)) {
        out.push(word, "fn");
      } else if (atCommandPosition) {
        out.push(word, "fn");
      } else {
        out.push(word);
      }

      atCommandPosition = false;
      i = end;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let end = i;
      while (end < code.length && /[0-9.]/.test(code[end])) end += 1;
      out.push(code.slice(i, end), "num");
      i = end;
      continue;
    }

    if (char === "|" || char === "&" || char === ";") atCommandPosition = true;
    out.push(char, "pun");
    i += 1;
  }

  return out.toString();
}

/* -------------------------------------------------------------------------- */
/* CSS                                                                        */
/* -------------------------------------------------------------------------- */

function highlightCss(code: string): string {
  const out = new Emitter();
  let i = 0;
  let inDeclarationBlock = false;
  let afterColon = false;

  while (i < code.length) {
    const char = code[i];

    if (/\s/.test(char)) {
      let end = i;
      while (end < code.length && /\s/.test(code[end])) end += 1;
      out.push(code.slice(i, end));
      i = end;
      continue;
    }

    if (code.startsWith("/*", i)) {
      const close = code.indexOf("*/", i + 2);
      const end = close === -1 ? code.length : close + 2;
      out.push(code.slice(i, end), "com");
      i = end;
      continue;
    }

    if (char === '"' || char === "'") {
      const end = readString(code, i, char, false);
      out.push(code.slice(i, end), "str");
      i = end;
      continue;
    }

    if (char === "{") {
      inDeclarationBlock = true;
      afterColon = false;
      out.push(char, "pun");
      i += 1;
      continue;
    }

    if (char === "}") {
      inDeclarationBlock = false;
      afterColon = false;
      out.push(char, "pun");
      i += 1;
      continue;
    }

    if (char === ":" && inDeclarationBlock) {
      afterColon = true;
      out.push(char, "pun");
      i += 1;
      continue;
    }

    if (char === ";") {
      afterColon = false;
      out.push(char, "pun");
      i += 1;
      continue;
    }

    // Hex colour
    if (char === "#" && /[0-9a-fA-F]/.test(code[i + 1] ?? "")) {
      let end = i + 1;
      while (end < code.length && /[0-9a-fA-F]/.test(code[end])) end += 1;
      out.push(code.slice(i, end), "num");
      i = end;
      continue;
    }

    // At-rule
    if (char === "@") {
      let end = i + 1;
      while (end < code.length && /[A-Za-z-]/.test(code[end])) end += 1;
      out.push(code.slice(i, end), "key");
      i = end;
      continue;
    }

    if (/[0-9]/.test(char) || (char === "-" && /[0-9]/.test(code[i + 1] ?? ""))) {
      let end = i + 1;
      while (end < code.length && /[0-9.a-z%]/.test(code[end])) end += 1;
      out.push(code.slice(i, end), "num");
      i = end;
      continue;
    }

    if (/[A-Za-z_.#*&[-]/.test(char)) {
      let end = i;
      while (end < code.length && /[A-Za-z0-9_.#*&[\]="'^~$-]/.test(code[end])) end += 1;
      const word = code.slice(i, end);

      let next = end;
      while (next < code.length && /[ \t]/.test(code[next])) next += 1;

      if (code[next] === "(") {
        out.push(word, "fn");
      } else if (inDeclarationBlock && !afterColon) {
        out.push(word, "prop");
      } else if (inDeclarationBlock) {
        out.push(word, "lit");
      } else {
        out.push(word, "tag");
      }

      i = end;
      continue;
    }

    out.push(char, "pun");
    i += 1;
  }

  return out.toString();
}

/* -------------------------------------------------------------------------- */
/* HTML                                                                       */
/* -------------------------------------------------------------------------- */

function highlightHtml(code: string): string {
  const out = new Emitter();
  let i = 0;

  while (i < code.length) {
    if (code.startsWith("<!--", i)) {
      const close = code.indexOf("-->", i + 4);
      const end = close === -1 ? code.length : close + 3;
      out.push(code.slice(i, end), "com");
      i = end;
      continue;
    }

    if (code[i] === "<") {
      const close = code.indexOf(">", i);
      const end = close === -1 ? code.length : close + 1;
      const tag = code.slice(i, end);

      // Emit the tag with attribute-level detail.
      let j = 0;
      const openMatch = /^<\/?[A-Za-z][A-Za-z0-9:-]*/.exec(tag);
      if (!openMatch) {
        out.push(tag, "pun");
        i = end;
        continue;
      }

      const prefixLength = tag.startsWith("</") ? 2 : 1;
      out.push(tag.slice(0, prefixLength), "pun");
      out.push(tag.slice(prefixLength, openMatch[0].length), "tag");
      j = openMatch[0].length;

      while (j < tag.length) {
        const char = tag[j];
        if (/\s/.test(char)) {
          let k = j;
          while (k < tag.length && /\s/.test(tag[k])) k += 1;
          out.push(tag.slice(j, k));
          j = k;
          continue;
        }
        if (char === '"' || char === "'") {
          const k = readString(tag, j, char, false);
          out.push(tag.slice(j, k), "str");
          j = k;
          continue;
        }
        if (/[A-Za-z_@:]/.test(char)) {
          let k = j;
          while (k < tag.length && /[A-Za-z0-9_@:.-]/.test(tag[k])) k += 1;
          out.push(tag.slice(j, k), "prop");
          j = k;
          continue;
        }
        out.push(char, "pun");
        j += 1;
      }

      i = end;
      continue;
    }

    const next = code.indexOf("<", i);
    const end = next === -1 ? code.length : next;
    out.push(code.slice(i, end));
    i = end;
  }

  return out.toString();
}

/* -------------------------------------------------------------------------- */
/* YAML                                                                       */
/* -------------------------------------------------------------------------- */

function highlightYaml(code: string): string {
  const out = new Emitter();

  code.split("\n").forEach((line, index, all) => {
    const commentIndex = line.indexOf("#");
    const keyMatch = /^(\s*(?:-\s+)?)([A-Za-z0-9_.-]+)(\s*:)/.exec(line);

    if (commentIndex === 0 || /^\s*#/.test(line)) {
      out.push(line, "com");
    } else if (keyMatch) {
      out.push(keyMatch[1]);
      out.push(keyMatch[2], "prop");
      out.push(keyMatch[3], "pun");
      const rest = line.slice(keyMatch[0].length);
      if (/^\s*(true|false|null)\s*$/.test(rest)) out.push(rest, "lit");
      else if (/^\s*-?\d+(\.\d+)?\s*$/.test(rest)) out.push(rest, "num");
      else out.push(rest, rest.trim() === "" ? undefined : "str");
    } else {
      out.push(line);
    }

    if (index < all.length - 1) out.push("\n");
  });

  return out.toString();
}

/* -------------------------------------------------------------------------- */
/* Entry point                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Highlights `code` and returns HTML-escaped markup.
 * Always returns safe HTML: every emitted chunk is escaped.
 */
export function highlightCode(code: string, language: string): string {
  const lang = normalizeLanguage(language);

  switch (lang) {
    case "bash":
      return highlightShell(code);
    case "css":
    case "scss":
      return highlightCss(code);
    case "html":
      return highlightHtml(code);
    case "yaml":
      return highlightYaml(code);
    default: {
      const config = CLIKE_CONFIGS[lang];
      if (config) return highlightCLike(code, config);
      return escapeHtml(code);
    }
  }
}
