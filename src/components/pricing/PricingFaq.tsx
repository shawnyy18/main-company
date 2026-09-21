import { carePlans, formatPeso, getPackageBySlug } from "@/lib/packages";

/**
 * FAQ.
 *
 * Built on native <details> so it works with JavaScript disabled and the
 * answers are present in the HTML for crawlers — the FAQPage structured data
 * on this page has to match visible content or Google ignores it.
 *
 * Every peso figure is interpolated from packages.ts. Prose is the easiest
 * place for a published price to go stale, so none of these numbers are typed
 * by hand. Market comparison figures are the exception and carry a dated
 * comment, because they describe other companies, not us.
 */

const launch = getPackageBySlug("launch-page")!;
const growth = getPackageBySlug("growth-website")!;
const property = getPackageBySlug("property-launch")!;
const agent = getPackageBySlug("agent-portfolio")!;
const brokerage = getPackageBySlug("brokerage-listings")!;
const basicCare = carePlans[0];

const basic = formatPeso(basicCare.monthly);

export const faqs = [
  {
    question: "How much does a website cost in the Philippines?",
    answer: `Our published packages run from ${formatPeso(launch.price!)} for a single-page site to ${formatPeso(brokerage.price!)} for a brokerage listing system. Anything with custom workflows, an online store, or a large catalogue is quoted after a discovery call. Across the wider Philippine market, a basic business site typically runs ₱15,000 to ₱40,000, and genuinely custom work ₱75,000 upward. (Market figures verified August 2026.)`,
  },
  {
    question: `What is included in a ${formatPeso(launch.price!)} website?`,
    answer: `A one-page responsive site with up to five sections, a contact form, Messenger and WhatsApp links, basic on-page SEO, and one revision round, delivered in ${launch.timeline}. Hosting, SSL, and daily backups are included for the first ${launch.care.includedHostingMonths} months, so there is nothing further to pay to stay online in year one.`,
  },
  {
    question: "Do I need a maintenance plan?",
    answer: `Not on the ${formatPeso(launch.price!)} packages — a single static page has almost nothing to maintain, and hosting is already included for ${launch.care.includedHostingMonths} months. We recommend one from the ${formatPeso(getPackageBySlug("business-website")!.price!)} tier upward, where there is a content system, a listing dashboard, or an integration that needs watching. Plans start at ${basic} per month, are month-to-month, and can be cancelled any time.`,
  },
  {
    question: "How long does it take to build a business website?",
    answer: `${launch.timeline} for a Launch Page, ${getPackageBySlug("business-website")!.timeline} for a Business Website, and ${growth.timeline} for a Growth Website. Timelines start once the deposit and your complete content have been received, not from the date of enquiry.`,
  },
  {
    question: "Do I own the website after it is built?",
    answer:
      "Yes. Ownership of the delivered website transfers to you on final payment. We retain only the right to show the work in our portfolio.",
  },
  {
    question: "What does a real-estate listing website cost?",
    answer: `${formatPeso(property.price!)} for a single-page agent site with three featured properties, ${formatPeso(agent.price!)} for an agent portfolio with 10 listings and individual property pages, and ${formatPeso(brokerage.price!)} for a brokerage system with a listing dashboard your staff manage themselves. Larger databases, external listing feeds, and buyer accounts are quoted individually.`,
  },
];

export default function PricingFaq() {
  return (
    <div className="border-t border-border-default">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group border-b border-border-default py-6"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[19px] leading-[1.5] text-text-primary marker:content-none">
            {faq.question}
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-xl text-text-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-[16px] leading-[1.75] text-text-secondary">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
