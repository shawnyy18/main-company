/**
 * Client and partner work.
 *
 * This is the proof layer of the site — everything here must be real and
 * verifiable. Do not add invented metrics. If an outcome cannot be backed by
 * something the client would confirm, leave `outcome` undefined and let the
 * scope speak instead.
 *
 * Mirrors the shape of `lib/apps.ts` so both feed the same card components.
 */

export type ProjectCategory =
  | "Real estate"
  | "Distribution"
  | "Web application"
  | "Mobile application";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectData {
  slug: string;
  name: string;
  /** Shown when the client agreed to be named. */
  client?: string;
  year: string;
  category: ProjectCategory;
  /** One line, plain language, understandable by a non-technical reader. */
  summary: string;
  /** What was wrong or missing before the project. */
  problem: string;
  /** Actual delivered scope. Keep to real, checkable statements. */
  built: string[];
  stack: string[];
  /** Only populate when provable. Omitted rather than invented. */
  outcome?: string;
  liveUrl?: string;
  /** Verifiable facts rendered as a small stat row. Optional. */
  facts?: { label: string; value: string }[];
  images: ProjectImage[];
  /**
   * How cover art sits in a fixed-ratio frame. Portrait app screenshots must
   * be contained — cropping them to a landscape strip shows only the status
   * bar. Landscape site captures are cropped to fill.
   */
  coverFit: "cover" | "contain";
  /** Controls order and homepage inclusion. Lower shows first. */
  order: number;
  featured: boolean;
}

export const projects: ProjectData[] = [
  {
    slug: "marketlink-distribution",
    name: "Marketlink Distribution",
    client: "Marketlink Distribution Inc.",
    year: "2026",
    category: "Distribution",
    summary:
      "A product catalogue and wholesale inquiry site for a Pampanga-based distributor supplying snacks, beverages, and pantry goods to stores and resellers.",
    problem:
      "Buyers had no single place to see what Marketlink carried. Every inquiry started with a message asking whether an item was available, and the range had to be described product by product.",
    built: [
      "A browsable catalogue of 114 products with brand attribution on every item",
      "Category browsing across snacks, beverages, instant beverages, cookies and wafers, chocolates, and bread",
      "A per-product inquiry flow, so a buyer sends a request with the item already attached",
      "A wholesale section separating reseller and retail buyers",
      "Full site design, build, and deployment",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://www.marketlinkdistributioninc.com",
    facts: [
      { label: "Products catalogued", value: "114" },
      { label: "Categories", value: "6" },
      { label: "Scope", value: "Design and build" },
    ],
    images: [
      {
        src: "/work/marketlink-home.jpg",
        alt: "Marketlink Distribution home page showing the product hero",
      },
      {
        src: "/work/marketlink-categories.jpg",
        alt: "Marketlink Distribution category grid showing selection counts",
      },
    ],
    coverFit: "cover",
    order: 1,
    featured: true,
  },
  {
    slug: "lenso",
    name: "Lenso",
    year: "2026",
    category: "Mobile application",
    summary:
      "A private photo-sharing and messaging app for close friends, with a home screen widget, group chat, and scheduled time capsules. Built and operated by FSK Codehouse.",
    problem:
      "Sharing a moment with a small group of friends means posting it to an audience that is far larger than the group, on apps built for reach rather than closeness.",
    built: [
      "iOS app in Swift and SwiftUI, live on the App Store",
      "Home screen widget built with WidgetKit that updates as friends post",
      "One-to-one and group messaging with reactions and read state",
      "Scheduled time capsules that deliver a moment at a future date",
      "Supabase backend covering auth, storage, realtime, and row-level security",
      "Subscriptions through RevenueCat, with an ad-free tier",
    ],
    stack: ["Swift", "SwiftUI", "WidgetKit", "Supabase", "RevenueCat"],
    liveUrl: "https://apps.apple.com/app/lenso-photo-widget-chat/id6786334500",
    facts: [
      { label: "Platform", value: "iOS" },
      { label: "Status", value: "Live on the App Store" },
      { label: "Scope", value: "Owned and operated" },
    ],
    images: [
      { src: "/work/lenso-1.png", alt: "Lenso app camera screen" },
      { src: "/work/lenso-2.png", alt: "Lenso app moments feed" },
      { src: "/work/lenso-3.png", alt: "Lenso app home screen widget" },
    ],
    coverFit: "contain",
    order: 2,
    featured: true,
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export const featuredProjects = sortedProjects.filter(
  (project) => project.featured,
);
