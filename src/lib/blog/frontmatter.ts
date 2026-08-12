/**
 * A deliberately small YAML-subset frontmatter parser.
 *
 * It supports exactly what article frontmatter needs — quoted and unquoted
 * scalars, booleans, numbers, inline arrays and block arrays — which avoids
 * pulling in a YAML dependency for seven fields. If frontmatter ever needs
 * nested objects, replace this file with `gray-matter`; nothing else in the
 * blog reads raw frontmatter.
 */

export type FrontmatterValue = string | number | boolean | string[];
export type FrontmatterData = Record<string, FrontmatterValue>;

export interface ParsedFile {
  data: FrontmatterData;
  body: string;
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function stripQuotes(raw: string): string {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 1) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length > 1)
  ) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
  return trimmed;
}

function coerceScalar(raw: string): FrontmatterValue {
  const value = stripQuotes(raw);
  if (value === "true") return true;
  if (value === "false") return false;
  // Only treat as a number when the whole string is numeric; dates such as
  // 2026-06-18 must stay strings.
  if (value !== "" && /^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

function parseInlineArray(raw: string): string[] {
  const inner = raw.trim().slice(1, -1).trim();
  if (inner === "") return [];
  return inner
    .split(",")
    .map((item) => stripQuotes(item))
    .filter((item) => item !== "");
}

/**
 * Splits a Markdown file into frontmatter data and body.
 * Files without frontmatter return an empty data object.
 */
export function parseFrontmatter(source: string): ParsedFile {
  const normalized = source.replace(/^﻿/, "");
  const match = FRONTMATTER_PATTERN.exec(normalized);

  if (!match) {
    return { data: {}, body: normalized.trim() };
  }

  const data: FrontmatterData = {};
  const lines = match[1].split(/\r?\n/);

  let currentListKey: string | null = null;

  for (const line of lines) {
    if (line.trim() === "" || line.trim().startsWith("#")) continue;

    // Block-array item: "  - value"
    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && currentListKey) {
      (data[currentListKey] as string[]).push(stripQuotes(listItem[1]));
      continue;
    }

    const pair = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!pair) continue;

    const key = pair[1];
    const rawValue = pair[2].trim();

    if (rawValue === "") {
      // Start of a block array.
      currentListKey = key;
      data[key] = [];
      continue;
    }

    currentListKey = null;

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = parseInlineArray(rawValue);
    } else {
      data[key] = coerceScalar(rawValue);
    }
  }

  return { data, body: normalized.slice(match[0].length).trim() };
}

/* ---- typed accessors: keep the noise out of the source adapter ---- */

export function readString(
  data: FrontmatterData,
  key: string,
): string | undefined {
  const value = data[key];
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  if (typeof value === "number") return String(value);
  return undefined;
}

export function readRequiredString(
  data: FrontmatterData,
  key: string,
  context: string,
): string {
  const value = readString(data, key);
  if (!value) {
    throw new Error(`Blog article "${context}" is missing required frontmatter field "${key}".`);
  }
  return value;
}

export function readBoolean(data: FrontmatterData, key: string): boolean {
  return data[key] === true;
}

export function readStringArray(data: FrontmatterData, key: string): string[] {
  const value = data[key];
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string" && value.trim() !== "") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}
