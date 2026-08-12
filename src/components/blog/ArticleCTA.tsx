import Link from "next/link";

/**
 * Lead-generation call to action shown once, after the article body.
 *
 * The copy adapts to the article's category so the invitation stays relevant
 * instead of reading like an advert bolted onto every page. It links to the
 * existing project-inquiry form on the homepage — no new contact route.
 */
const CTA_BY_CATEGORY: Record<string, { title: string; body: string; label: string }> = {
  "app-development": {
    title: "Building an app?",
    body: "If you're weighing platforms, scoping a first release, or preparing for the App Store, we can talk through the decisions before you commit to a build.",
    label: "Start a project",
  },
  "web-development": {
    title: "Need a website that actually brings in work?",
    body: "We build business websites and listing platforms designed around enquiries, not just visuals.",
    label: "Start a project",
  },
  "ai-development": {
    title: "Modernising how your team ships software?",
    body: "We build production systems and can help you work out where AI-assisted tooling genuinely helps and where it gets in the way.",
    label: "Talk to us",
  },
  "startup-product": {
    title: "Have a product idea?",
    body: "We work with founders on scope, sequencing, and a realistic first release — as a build partner or a co-build partnership.",
    label: "Talk to us",
  },
  monetization: {
    title: "Planning to monetise your product?",
    body: "Subscriptions, in-app purchases, advertising, and digital products each pull the build in a different direction. We can help you pick before you write the code.",
    label: "Talk to us",
  },
  "case-studies": {
    title: "Need a custom software solution?",
    body: "We build for clients and partners, and we run our own products — so the tradeoffs we write about are ones we live with.",
    label: "Start a project",
  },
  tutorials: {
    title: "Want this built properly?",
    body: "If you'd rather have a team handle it end to end, we build web and mobile software for clients and partners.",
    label: "Start a project",
  },
};

const DEFAULT_CTA = {
  title: "Have a project in mind?",
  body: "FSK Codehouse builds real-estate platforms, digital commerce, and web and mobile applications. Tell us what you're trying to build.",
  label: "Start a project",
};

export default function ArticleCTA({ categorySlug }: { categorySlug?: string }) {
  const cta = (categorySlug && CTA_BY_CATEGORY[categorySlug]) || DEFAULT_CTA;

  return (
    <aside className="border border-border-default bg-bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        FSK Codehouse
      </p>
      <h2 className="mt-3 text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
        {cta.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">{cta.body}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-600"
        >
          {cta.label}
        </Link>
        <Link
          href="/#services"
          className="inline-flex items-center justify-center rounded-full border border-border-default bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-accent"
        >
          See what we do
        </Link>
      </div>
    </aside>
  );
}
