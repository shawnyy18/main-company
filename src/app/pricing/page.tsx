import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import PackageCard from "@/components/pricing/PackageCard";
import PricingTable from "@/components/pricing/PricingTable";
import CarePlanTable from "@/components/pricing/CarePlanTable";
import PricingFaq, { faqs } from "@/components/pricing/PricingFaq";
import ContactBlock from "@/components/ContactBlock";
import { carePlans, formatPeso, getPackageBySlug, packagesByCategory, startingPrice } from "@/lib/packages";
import { pricingFaqSchema, pricingOfferSchema } from "@/lib/blog/structured-data";

export const metadata: Metadata = {
  title: "Website Pricing Philippines — Packages and Costs",
  description:
    `Published pricing for business and real-estate websites in the Philippines. Packages from ${formatPeso(startingPrice("business"))}, care plans from ${formatPeso(carePlans[0].monthly)} a month, and what each tier includes.`,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Website Pricing Philippines — FSK Codehouse",
    description:
      `Published packages for business and real-estate websites. From ${formatPeso(startingPrice("business"))}.`,
    type: "website",
  },
};

const terms = [
  ["Payment", "50% deposit before work begins, 50% before launch."],
  ["Validity", "Quotations are valid for 14 days."],
  [
    "What you provide",
    "Final text, logo, photographs, and business information. Timelines begin once the deposit and complete content are received.",
  ],
  [
    "Revisions",
    "A revision round is one consolidated set of written feedback, submitted within 5 business days.",
  ],
  [
    "After launch",
    "Every project includes 30 days of bug fixes. A bug is something that does not work as specified.",
  ],
  [
    "Ownership",
    "Ownership transfers to you on final payment. We retain the right to show the work in our portfolio.",
  ],
  [
    "Not included",
    "Domain, hosting, business email, paid plugins, and third-party subscriptions, unless a care plan covers them.",
  ],
  ["Taxes", "Prices are exclusive of any applicable taxes."],
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <JsonLd data={pricingOfferSchema()} />
      <JsonLd data={pricingFaqSchema(faqs)} />

      <main className="flex-grow px-5 pb-24 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <p className="eyebrow">Pricing</p>
          <h1 className="display mt-6 max-w-4xl text-[3.25rem] text-text-primary md:text-[5.25rem]">
            Published prices. No estimate without a scope.
          </h1>
          <p className="lede mt-7 max-w-2xl">
            Most studios here make you ask. These are our actual package prices.
            Anything outside them is quoted after a discovery call, because a
            number without a scope is a guess.
          </p>

          {/* Business */}
          <section id="business" className="mt-20 scroll-mt-24">
            <p className="eyebrow">001 — Business websites</p>
            <h2 className="display mt-5 text-[2.75rem] text-text-primary md:text-[3.5rem]">
              For businesses that need to be found.
            </h2>
            <div className="mt-10">
              <PricingTable category="business" />
            </div>
            <div className="mt-14">
              {packagesByCategory("business").map((tier) => (
                <PackageCard key={tier.slug} tier={tier} />
              ))}
            </div>
          </section>

          {/* Real estate */}
          <section id="real-estate" className="mt-28 scroll-mt-24">
            <p className="eyebrow">002 — Real-estate websites</p>
            <h2 className="display mt-5 max-w-3xl text-[2.75rem] text-text-primary md:text-[3.5rem]">
              For agents who want the enquiry, not the platform.
            </h2>
            <p className="lede mt-5 max-w-xl">
              When listings live only on a marketplace, the lead belongs to the
              marketplace. On your own site it arrives in your inbox.
            </p>
            <div className="mt-10">
              <PricingTable category="real-estate" />
            </div>
            <div className="mt-14">
              {packagesByCategory("real-estate").map((tier) => (
                <PackageCard key={tier.slug} tier={tier} />
              ))}
            </div>
          </section>

          {/* Care */}
          <section id="care" className="mt-28 scroll-mt-24">
            <p className="eyebrow">003 — Care plans</p>
            <h2 className="display mt-5 text-[2.75rem] text-text-primary md:text-[3.5rem]">
              Optional, and worth it on some packages more than others.
            </h2>
            <p className="lede mt-5 max-w-2xl">
              A single static page has very little to go wrong, so we do not
              require a plan on the entry packages. Once there is a content
              system, a listing dashboard, or a payment integration, something
              is always changing — and that is where a plan pays for itself.
            </p>
            <div className="mt-10">
              <CarePlanTable />
            </div>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-text-muted">
              Every plan is optional and month-to-month — cancel any time. The{" "}
              {formatPeso(startingPrice("business"))} packages include{" "}
              {getPackageBySlug("launch-page")!.care.includedHostingMonths}{" "}
              months of hosting, SSL, and backups in the build price, so you do
              not need a plan to stay online.
            </p>
            <Link
              href="/pricing?package=care-basic#enquire"
              className="mt-7 inline-flex items-center justify-center border border-border-default px-7 py-3.5 text-[15px] font-medium text-text-primary transition-colors hover:border-text-primary"
            >
              Ask about a care plan
            </Link>
          </section>

          {/* Applications */}
          <section id="applications" className="mt-28 scroll-mt-24 border-t border-border-default pt-14">
            <p className="eyebrow">004 — Web and mobile applications</p>
            <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
              <h2 className="display text-[2.75rem] text-text-primary md:text-[3.5rem]">
                Applications are quoted, not packaged.
              </h2>
              <div>
                <p className="lede">
                  Software with accounts, payments, dashboards, or a mobile app
                  cannot be priced from a menu — the scope varies too much for a
                  number to mean anything. We run a discovery session first, then
                  give you a written scope, timeline, and fixed price.
                </p>
                <p className="mt-4 text-[16px] leading-[1.75] text-text-secondary">
                  Lenso, our own iOS app, is the clearest example of what this
                  work looks like.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/pricing?package=application#enquire"
                    className="inline-flex items-center justify-center bg-ink px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-text-secondary"
                  >
                    Book a discovery call
                  </Link>
                  <Link
                    href="/work/lenso"
                    className="inline-flex items-center justify-center border border-border-default px-7 py-3.5 text-[15px] font-medium text-text-primary transition-colors hover:border-text-primary"
                  >
                    See Lenso
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Terms */}
          <section className="mt-28">
            <p className="eyebrow">005 — How we work</p>
            <h2 className="display mt-5 text-[2.75rem] text-text-primary md:text-[3.5rem]">
              The terms, before you ask.
            </h2>
            <dl className="mt-10 border-t border-border-default">
              {terms.map(([label, body]) => (
                <div
                  key={label}
                  className="grid gap-1.5 border-b border-border-default py-6 sm:grid-cols-[13rem_1fr] sm:gap-10"
                >
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.09em] text-text-muted">
                    {label}
                  </dt>
                  <dd className="text-[16.5px] leading-[1.75] text-text-secondary">
                    {body}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[15px] leading-[1.7] text-text-muted">
              Full terms are included with every written quotation.
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-28">
            <p className="eyebrow">006 — Questions</p>
            <h2 className="display mt-5 text-[2.75rem] text-text-primary md:text-[3.5rem]">
              Asked often enough to answer here.
            </h2>
            <div className="mt-10">
              <PricingFaq />
            </div>
          </section>

          {/* Enquire */}
          <section id="enquire" className="mt-28 scroll-mt-24 border-t border-border-default pt-14">
            <ContactBlock
              eyebrow="007 — Enquire"
              heading="Not sure which one fits?"
              body="Tell us what your business does and what you need it to do online. We will tell you which package fits, or that none of them do."
            />
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
