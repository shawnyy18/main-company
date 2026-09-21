/**
 * Published package pricing.
 *
 * SINGLE SOURCE OF TRUTH. Every peso figure shown anywhere on the site comes
 * from this file. Never hard-code a price in a component — published prices
 * that drift from what is actually quoted are worse than no published prices.
 *
 * Supersedes:
 *   FSK_Codehouse_Pricing_Structure.xlsx  (22 Jul 2026)
 *   FSK_Pricing_PH_Global.xlsx            (24 Jul 2026)
 *   FSK_SMB_Packages_and_LeadGen.md §3    (11 Aug 2026)
 * Those documents hold the market research that produced these numbers, but
 * their figures are stale. Do not quote from them.
 */

export type PackageCategory = "business" | "real-estate";

export interface CarePolicy {
  /**
   * Care is optional on every package. A one-page static site has almost
   * nothing to maintain — no CMS, no plugins, SSL renews itself — so requiring
   * a plan there would be selling something of little value. Care earns its
   * price where there is a CMS, a dashboard, a database, or an integration.
   */
  monthly: number;
  /**
   * True where the build has moving parts that genuinely need watching. Drives
   * a visible "Recommended" marker rather than an obligation.
   */
  recommended: boolean;
  /**
   * Months of hosting, SSL, and backups bundled into the build price. This is
   * a cost we absorb, not a service tier — stated separately so nobody reads
   * it as a care plan.
   */
  includedHostingMonths?: number;
  note?: string;
}

export interface PackageTier {
  slug: string;
  name: string;
  category: PackageCategory;
  /** null means the tier is quoted privately after discovery. */
  price: number | null;
  bestFor: string;
  includes: string[];
  care: CarePolicy;
  timeline: string;
  revisions: string;
  /** Drives the amber badge. Exactly one per category — asserted below. */
  recommended: boolean;
  /**
   * The honest limitation of this tier, stated plainly. Saying what a package
   * does NOT do prevents the most common client disputes and makes the rest
   * of the page more credible. Do not quietly drop these.
   */
  limitation?: string;
  /** Short comparison-row values, keyed by the row labels in `comparisonRows`. */
  compare: Record<string, string>;
  order: number;
}

export interface CarePlan {
  slug: string;
  name: string;
  monthly: number;
  responseTime: string;
  includes: string[];
  contentAllowance: string | null;
  /** One line on what this tier is actually for. */
  summary: string;
}

/** Formats a peso figure once, so currency style cannot drift between pages. */
export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}

/** Rows rendered in the at-a-glance comparison table, in display order. */
export const comparisonRows: Record<PackageCategory, string[]> = {
  business: [
    "Pages",
    "Design",
    "You can edit it",
    "Revisions",
    "Delivery",
  ],
  "real-estate": [
    "Listings at launch",
    "Property detail pages",
    "Search and filters",
    "You add listings yourself",
    "Multiple agents",
    "Revisions",
    "Delivery",
  ],
};

export const packages: PackageTier[] = [
  // ---------------------------------------------------------------- business
  {
    slug: "launch-page",
    name: "Launch Page",
    category: "business",
    price: 8999,
    bestFor:
      "Freelancers, professionals, and small businesses getting online for the first time.",
    includes: [
      "One-page responsive website",
      "Up to five content sections",
      "Template layout customised to your brand",
      "Contact or inquiry form",
      "Messenger, WhatsApp, and social links",
      "Basic on-page SEO",
      "Mobile optimisation",
      "One revision round",
    ],
    care: {
      monthly: 2500,
      recommended: false,
      includedHostingMonths: 12,
      note: "A single static page has very little to maintain, so a care plan is genuinely optional here. Hosting, SSL, and backups are included for the first 12 months either way.",
    },
    timeline: "5–7 business days",
    revisions: "1 round",
    recommended: false,
    limitation:
      "This is a single page. If you need separate pages for services, team, or projects, start at Business Website.",
    compare: {
      Pages: "One page",
      Design: "Template + your brand",
      "You can edit it": "—",
      Revisions: "1 round",
      Delivery: "5–7 days",
    },
    order: 1,
  },
  {
    slug: "business-website",
    name: "Business Website",
    category: "business",
    price: 24999,
    bestFor:
      "Established businesses that need a complete company website rather than a single page.",
    includes: [
      "Up to five main pages",
      "Semi-customised design",
      "Contact and lead-capture form",
      "Services or product presentation",
      "Google Maps and social media integration",
      "Google Analytics setup",
      "Basic on-page SEO",
      "Mobile and performance optimisation",
      "Two revision rounds",
    ],
    care: {
      monthly: 2500,
      recommended: true,
      note: "Worth having once there are forms, analytics, and several pages to keep working.",
    },
    timeline: "10–15 business days",
    revisions: "2 rounds",
    recommended: true,
    limitation:
      "Content changes come through us. If you want to publish your own posts or updates, you need Growth Website.",
    compare: {
      Pages: "Up to 5",
      Design: "Semi-customised",
      "You can edit it": "—",
      Revisions: "2 rounds",
      Delivery: "10–15 days",
    },
    order: 2,
  },
  {
    slug: "growth-website",
    name: "Growth Website",
    category: "business",
    price: 49999,
    bestFor:
      "Growing businesses that want to publish their own content and generate leads without calling a developer.",
    includes: [
      "Up to eight main pages",
      "Tailored visual design",
      "Blog, portfolio, or project management system",
      "Conversion-focused sections and calls to action",
      "Advanced lead-capture forms",
      "Google Analytics and Search Console",
      "Performance and accessibility optimisation",
      "Basic structured-data SEO",
      "Training for your staff",
      "Three revision rounds",
    ],
    care: {
      monthly: 2500,
      recommended: true,
      note: "Strongly worth it here. A content system is the part that breaks, and Plus covers the updates you would otherwise queue up for us.",
    },
    timeline: "3–5 weeks",
    revisions: "3 rounds",
    recommended: false,
    compare: {
      Pages: "Up to 8",
      Design: "Tailored",
      "You can edit it": "✓",
      Revisions: "3 rounds",
      Delivery: "3–5 weeks",
    },
    order: 3,
  },
  {
    slug: "custom-website",
    name: "Custom Website",
    category: "business",
    price: null,
    bestFor:
      "Businesses with specific workflows, or anything the packages above do not cover.",
    includes: [
      "Fully custom interface and user experience",
      "Online store and payment processing",
      "Booking and reservation systems",
      "Customer or member portals",
      "Custom dashboards and reporting",
      "Account log-in and authentication",
      "Subscription and recurring billing",
      "API and CRM integrations",
      "Business process automation",
      "Advanced content management",
    ],
    care: {
      monthly: 2500,
      recommended: true,
      note: "Quoted with the project. Anything with payments, log-ins, or integrations needs someone watching it.",
    },
    timeline: "Agreed in scope",
    revisions: "Agreed in scope",
    recommended: false,
    limitation:
      "Product catalogues over 40 items, or any site needing search and filtering, are quoted here rather than under Growth Website.",
    compare: {
      Pages: "Unlimited",
      Design: "Fully custom",
      "You can edit it": "✓",
      Revisions: "Agreed in scope",
      Delivery: "Agreed in scope",
    },
    order: 4,
  },

  // ------------------------------------------------------------- real estate
  {
    slug: "property-launch",
    name: "Property Launch",
    category: "real-estate",
    price: 8999,
    bestFor: "New agents with a small number of active properties.",
    includes: [
      "One-page responsive agent website",
      "Agent profile and contact details",
      "Up to three featured properties",
      "Property photographs and key details",
      "General inquiry form",
      "Messenger, WhatsApp, and click-to-call buttons",
      "Social media links",
      "Basic on-page SEO",
      "One revision round",
    ],
    care: {
      monthly: 2500,
      recommended: false,
      includedHostingMonths: 12,
      note: "A single agent page has very little to maintain, so a care plan is optional. Hosting, SSL, and backups are included for the first 12 months either way.",
    },
    timeline: "5–7 business days",
    revisions: "1 round",
    recommended: false,
    limitation:
      "Properties are placed manually by us. This package has no dashboard and you cannot add listings yourself. If your properties change regularly, start at Agent Portfolio.",
    compare: {
      "Listings at launch": "3 featured",
      "Property detail pages": "—",
      "Search and filters": "—",
      "You add listings yourself": "—",
      "Multiple agents": "—",
      Revisions: "1 round",
      Delivery: "5–7 days",
    },
    order: 1,
  },
  {
    slug: "agent-portfolio",
    name: "Agent Portfolio",
    category: "real-estate",
    price: 34999,
    bestFor:
      "Active individual agents who need a real page for every property.",
    includes: [
      "Up to five main pages",
      "Up to 10 property listings at launch",
      "An individual detail page for every property",
      "Photo gallery per property",
      "Inquiry form attached to each property",
      "Basic property categories",
      "For sale, for rent, and sold status",
      "Agent profile and credentials",
      "Google Maps integration",
      "Analytics setup",
      "Two revision rounds",
    ],
    care: {
      monthly: 2500,
      recommended: true,
      note: "Worth having — this is the tier where listings change and you cannot update them yourself.",
    },
    timeline: "2–3 weeks",
    revisions: "2 rounds",
    recommended: true,
    limitation:
      "We upload the first 10 listings. After launch, listing changes go through a care plan or are quoted per batch — there is no self-service dashboard at this tier.",
    compare: {
      "Listings at launch": "10",
      "Property detail pages": "✓",
      "Search and filters": "—",
      "You add listings yourself": "—",
      "Multiple agents": "—",
      Revisions: "2 rounds",
      Delivery: "2–3 weeks",
    },
    order: 2,
  },
  {
    slug: "brokerage-listings",
    name: "Brokerage Listings",
    category: "real-estate",
    price: 89999,
    bestFor:
      "Teams and small brokerages that add or change properties every week.",
    includes: [
      "Customisable brokerage website",
      "Listing management dashboard",
      "Up to 30 listings entered at launch",
      "Property search and filters",
      "Individual property detail pages",
      "Multiple agent profiles",
      "Properties assigned to specific agents",
      "Inquiry form attached to each property",
      "Basic inquiry routing to the right agent",
      "Property status management",
      "Analytics and Search Console setup",
      "Dashboard training for your staff",
      "Three revision rounds",
    ],
    care: {
      monthly: 2500,
      recommended: true,
      note: "Your staff manage listings through the dashboard, so Basic usually covers it.",
    },
    timeline: "4–7 weeks",
    revisions: "3 rounds",
    recommended: false,
    compare: {
      "Listings at launch": "30",
      "Property detail pages": "✓",
      "Search and filters": "✓",
      "You add listings yourself": "✓",
      "Multiple agents": "✓",
      Revisions: "3 rounds",
      Delivery: "4–7 weeks",
    },
    order: 3,
  },
  {
    slug: "custom-real-estate",
    name: "Custom Real-Estate Website",
    category: "real-estate",
    price: null,
    bestFor:
      "Established brokerages, developers, and property marketplaces.",
    includes: [
      "Fully custom interface and branding",
      "Large-scale listing database",
      "Advanced property search and filters",
      "Interactive property maps",
      "Agent and administrator dashboards",
      "Automated lead routing",
      "CRM integration",
      "External listing-feed integration",
      "Buyer or tenant accounts",
      "Viewing appointment booking",
      "Commission and transaction tracking",
      "Companion mobile application",
    ],
    care: {
      monthly: 2500,
      recommended: true,
      note: "Quoted with the project. Listing feeds and buyer accounts need active monitoring.",
    },
    timeline: "Agreed in scope",
    revisions: "Agreed in scope",
    recommended: false,
    limitation:
      "More than 60 listings at launch, external listing feeds, or buyer accounts move a project here rather than Brokerage Listings.",
    compare: {
      "Listings at launch": "Unlimited",
      "Property detail pages": "✓",
      "Search and filters": "Advanced",
      "You add listings yourself": "✓",
      "Multiple agents": "✓",
      Revisions: "Agreed in scope",
      Delivery: "Agreed in scope",
    },
    order: 4,
  },
];

export const carePlans: CarePlan[] = [
  {
    slug: "basic",
    name: "Basic",
    monthly: 2500,
    responseTime: "3 business days",
    contentAllowance: null,
    summary: "Keeps the site online, secure, and backed up.",
    includes: [
      "Hosting, SSL certificate, and daily backups",
      "Uptime and security monitoring",
      "Security patches and bug fixes",
    ],
  },
  {
    slug: "plus",
    name: "Plus",
    monthly: 7500,
    responseTime: "1 business day",
    contentAllowance: "2 hours per month",
    summary: "Everything in Basic, plus a small amount of build time each month.",
    includes: [
      "Everything in Basic",
      "Content, listing, and page updates",
      "Small additions — a new section, a new form, a tracking tag",
      "Monthly report",
    ],
  },
  {
    slug: "pro",
    name: "Pro",
    monthly: 18000,
    responseTime: "Same business day",
    contentAllowance: "8 hours per month",
    summary:
      "For sites that keep growing — new integrations, not just maintenance.",
    includes: [
      "Everything in Plus",
      "New integrations: payments, booking, CRM, automations",
      "Priority queue for urgent fixes",
      "Quarterly planning call",
    ],
  },
];

export const categoryLabels: Record<PackageCategory, string> = {
  business: "Business websites",
  "real-estate": "Real-estate websites",
};

export function packagesByCategory(category: PackageCategory): PackageTier[] {
  return packages
    .filter((tier) => tier.category === category)
    .sort((a, b) => a.order - b.order);
}

/** Lowest real price in a category — drives the "from ₱X" on the homepage. */
export function startingPrice(category: PackageCategory): number {
  const prices = packagesByCategory(category)
    .map((tier) => tier.price)
    .filter((price): price is number => price !== null);
  return Math.min(...prices);
}

/**
 * Maps a package slug to the matching <option> in the lead form, so arriving
 * from a pricing CTA pre-selects the right project type. Values must match
 * ALLOWED_PROJECT_TYPES in app/api/leads/route.ts exactly.
 */
export function projectTypeForPackage(slug: string): string | undefined {
  if (slug === "application") return "Web or mobile application";
  if (slug.startsWith("care-")) return "Care plan only";
  const tier = packages.find((t) => t.slug === slug);
  if (!tier) return undefined;
  return tier.category === "real-estate"
    ? "Real-estate website"
    : "Business website";
}

export function getPackageBySlug(slug: string): PackageTier | undefined {
  return packages.find((tier) => tier.slug === slug);
}

/**
 * Two "Most chosen" badges in one category is an easy mistake to make when
 * editing this file and an embarrassing one to ship. Fail loudly in dev.
 */
if (process.env.NODE_ENV !== "production") {
  (["business", "real-estate"] as PackageCategory[]).forEach((category) => {
    const flagged = packagesByCategory(category).filter((t) => t.recommended);
    if (flagged.length > 1) {
      throw new Error(
        `packages.ts: ${flagged.length} tiers marked recommended in "${category}". Exactly one is allowed.`,
      );
    }
  });
}
