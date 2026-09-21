# Implementation Plan — Packages on the Website

**Status:** Plan only — no code written.
**Date:** 29 August 2026
**Decisions locked:** Full prices public · Three services, apps stays quote-only
**Supersedes:** the private-only distribution model in `FSK_Pricing_Review.md` §6

---

## 1. What changes, in one paragraph

Services today is two cards with no prices. It becomes three services, two of which carry real package tables, plus a dedicated `/pricing` route holding the full detail. The homepage keeps a short summary; the deep content lives on its own indexable page. The Canva PDFs stay — they become the *tailored* version sent after a discovery call, with the client's name on the cover. The website becomes the top of the funnel; the PDF becomes the proposal.

---

## 2. The consequence of going public

Publishing prices is the right call and it is the acquisition channel your own research identified. Three things follow from it that are easy to miss.

**One terms line has to go.** *"Prices are shared privately and are not intended for public posts"* is now false. It stays in the PDF's client-specific context only if reworded — suggest *"This quotation is prepared for your business. Standard package pricing is published at fskcodehouse.com/pricing."*

**Competitors will read it.** iBuild.PH and Redkite currently publish nothing. Within a quarter of you publishing, expect at least one to match or undercut the ₱8,999 tier. The defence is not price — it is the care plan attached to it and the case studies underneath. Both are already in the plan.

**Prices become a maintenance obligation.** A published price that drifts from what you actually quote is worse than no price. This is why §4 puts everything in one typed data file rather than in JSX across three pages.

---

## 3. Information architecture

| Route | Purpose | Indexed |
| --- | --- | --- |
| `/` § Services | Three service cards, each with a "from ₱X" and a link | yes |
| `/pricing` | Full package tables, care plans, terms summary, FAQ | yes — the SEO target |
| `/pricing#business` · `#real-estate` · `#care` | Anchor targets from the homepage cards | — |
| Canva PDF | Tailored proposal, sent after discovery | no |

**Why a separate page rather than expanding the homepage section.** Eight tiers across two categories plus three care plans is roughly 1,400 words of tabular content. Dropping that into the homepage buries Selected Work and the contact form below a wall of pricing, and the homepage is currently doing the job of introducing the company. `/pricing` also gives you a single URL to send, to link from Facebook, and to rank.

---

## 4. Data layer

One file, `src/lib/packages.ts`, following the pattern already established by `apps.ts` and `projects.ts`.

```ts
export type PackageCategory = "business" | "real-estate";

export interface CarePolicy {
  required: boolean;
  monthly: number;         // 1500 on entry tiers, 2500 elsewhere
  minimumMonths?: number;  // 12 on entry tiers
  note?: string;
}

export interface PackageTier {
  slug: string;            // "launch-page"
  name: string;
  category: PackageCategory;
  price: number | null;    // null = private quotation
  priceNote?: string;      // "Private quotation"
  bestFor: string;
  includes: string[];
  care: CarePolicy;
  timeline: string;
  revisions: string;
  /** Renders the amber "Most chosen" badge. Exactly one per category. */
  recommended: boolean;
  /** The honest limitation. Rendered in an amber-ruled callout. */
  limitation?: string;
  order: number;
}

export interface CarePlan { … }   // Basic / Plus / Pro
```

**Rules the file enforces:**

- Prices are `number`, never a formatted string, so currency formatting happens once in a `formatPeso()` helper and cannot drift between pages.
- `recommended: true` on exactly one tier per category — add a dev-time assertion, because two badges is a common and embarrassing bug.
- `limitation` exists because "Properties are manually displayed. This package does not include a dashboard" is the single most valuable sentence in the real-estate menu. Making it a required consideration in the type means nobody quietly drops it.

**This file becomes the single source of truth.** The three pricing spreadsheets get marked superseded in the same commit — that was item 4 on the review's list and it is free to do here.

---

## 5. Components

| Component | Notes |
| --- | --- |
| `PricingTable.tsx` | The at-a-glance comparison. Horizontal scroll below 768px with a sticky first column — four columns cannot shrink to 375px legibly. |
| `PackageCard.tsx` | One tier: name, price, care line, includes list, limitation callout, CTA. |
| `CarePlanTable.tsx` | Three plans. Reused on both category sections. |
| `PricingFaq.tsx` | Accordion, `<details>`-based so it works without JS and is indexable. |
| `ServiceCard.tsx` | Homepage. Replaces the inline `services` array in `page.tsx`. |

All follow the existing editorial system: hard corners, hairline rules, `.display` serif for names, mono for labels, amber used once per section.

---

## 6. Page composition

### Homepage `003 — Services`

Three cards. Each: number, name, one line, a "from" figure, a link.

| Service | From | Links to |
| --- | --- | --- |
| Business websites | ₱8,999 | `/pricing#business` |
| Real-estate websites | ₱8,999 | `/pricing#real-estate` |
| Web and mobile applications | Quoted after discovery | `/#contact` |

The third card deliberately carries no number. Stating "from ₱450,000" beside ₱8,999 makes the two look like different companies; saying "quoted after discovery" reads as considered rather than evasive.

### `/pricing`

1. **Hero** — "Published prices. No estimate without a scope."
2. **Business websites** — comparison table, then four `PackageCard`s
3. **Real-estate websites** — same structure
4. **Care plans** — the three-tier table, positioned before terms
5. **Applications** — short block, no figures, discovery CTA
6. **How we work** — abbreviated terms, six clauses, links to full terms in the proposal
7. **FAQ** — see §8
8. **Contact** — the lead form, with package pre-selection

---

## 7. Lead form changes

`ProjectLeadForm.tsx` currently offers four project types. It needs to carry which package the visitor was reading.

- Add a hidden `package` field populated from a `?package=growth-website` query parameter. Every CTA on `/pricing` links to `/#contact?package=<slug>`.
- Expand the `projectType` options to `Business website · Real-estate website · Web or mobile application · Care plan only · Product partnership · Something else`.
- **`ALLOWED_PROJECT_TYPES` in `src/app/api/leads/route.ts` must change in the same commit.** The route validates server-side against that set; changing only the form silently 400s every submission.
- Add `package` to the lead email body. Knowing someone was reading Brokerage Listings when they enquired is the most useful thing the form can tell you.

---

## 8. SEO — the actual point of doing this publicly

This is the part that earns the decision.

**Structured data.** Add `Service` and `Offer` schema to `/pricing` via the existing `JsonLd.tsx` component, alongside the `Organization` node already in `structured-data.ts`. Each tier becomes an `Offer` with `priceCurrency: "PHP"` and a real `price`. This is what produces price ranges in search results.

**FAQ schema.** An `FAQPage` block, six questions, matching the on-page accordion. Draft questions, all of which are real search queries:

- How much does a website cost in the Philippines?
- What is included in a ₱8,999 website?
- Do I need a maintenance plan?
- How long does it take to build a business website?
- Do I own the website after it is built?
- What does a real-estate listing website cost?

**Metadata.** Title: `Website Pricing Philippines — Packages and Costs | FSK Codehouse`. This is the exact phrase Qadra, Praferosa, Sinag, and OOm all rank for, and none of them is a real-estate specialist.

**Sitemap and nav.** Add `/pricing` at priority 0.9 in `sitemap.ts`. Add "Pricing" to the navbar between Work and Services — six items still fits the `lg` breakpoint.

---

## 9. Sequencing

| Phase | Work | Depends on |
| --- | --- | --- |
| **1** | `packages.ts` with all 8 tiers and 3 care plans; mark the three spreadsheets superseded | — |
| **2** | `PackageCard`, `PricingTable`, `CarePlanTable`, `PricingFaq` | 1 |
| **3** | `/pricing` route assembled | 2 |
| **4** | Homepage Services section → three `ServiceCard`s | 1 |
| **5** | Lead form + API route project types, `?package=` capture | 3 |
| **6** | JSON-LD, FAQ schema, metadata, sitemap, navbar | 3 |
| **7** | Verify — build, lint, 375px, keyboard, schema validator, no price appears twice | all |

Phases 1 and 2 are the bulk. Phases 4 through 6 are small once the data layer exists.

---

## 10. Verification checklist

- `next build` and `eslint` clean
- Comparison tables scroll correctly at 375px with the first column pinned
- Every price on the page traces to `packages.ts` — grep for `₱` in `.tsx` files should return nothing outside the formatter
- Exactly one "Most chosen" badge per category
- Every `limitation` renders — particularly the Property Launch dashboard caveat
- Lead form submits successfully for every `projectType` value (this is the regression that will bite)
- `?package=` populates and appears in the delivered email
- Schema passes the Rich Results Test
- `/pricing` present in `sitemap.xml`
- Reduced-motion and keyboard navigation on the FAQ accordion

---

## 11. Open questions

1. **Care plan on the entry tier — contract or honour system?** Requiring 12 months only works if something enforces it. A signed engagement letter is the practical answer; worth deciding before publishing "required."
2. **Payment rails.** Publishing prices invites "can I pay now?" GCash, Maya, or PayMongo links would convert that moment. Your competitor research flags local payments as an unmarketed differentiator — this could be a small phase 8.
3. **Do the Canva PDFs still get built?** Yes, and the plan assumes so — but their role narrows to tailored proposals. Consider trimming them to 6 pages, since the website now carries the general explanation.
4. **Currency.** Prices are PHP only. A USD column, or a note that international clients are quoted in USD, matters if you still want the global band from `FSK_Pricing_PH_Global.xlsx`.
