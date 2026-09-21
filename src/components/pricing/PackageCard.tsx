import Link from "next/link";
import { formatPeso, type PackageTier } from "@/lib/packages";
import { companyLinks } from "@/lib/company";

/**
 * One package tier. The `limitation` block is deliberately prominent — saying
 * what a tier does not do prevents the most common client disputes.
 */
export default function PackageCard({ tier }: { tier: PackageTier }) {
  return (
    <article
      id={tier.slug}
      className={`scroll-mt-24 py-12 md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 md:py-14 ${
        tier.recommended
          ? "border-t-2 border-text-primary"
          : "border-t border-border-default"
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="display text-[2.25rem] text-text-primary md:text-[2.75rem]">
            {tier.name}
          </h3>
          {tier.recommended ? (
            <span className="bg-accent-bright px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink">
              Most chosen
            </span>
          ) : null}
        </div>

        <p
          className={`price mt-5 text-text-primary ${
            tier.price === null
              ? "text-[2rem] md:text-[2.5rem]"
              : "text-[3.25rem] md:text-[4rem]"
          }`}
        >
          {tier.price === null ? "Private quotation" : formatPeso(tier.price)}
        </p>

        {tier.care.includedHostingMonths ? (
          <p className="mt-3 text-[16px] leading-[1.7] text-text-secondary">
            Includes {tier.care.includedHostingMonths} months of hosting, SSL,
            and backups
          </p>
        ) : null}

        {tier.care.recommended ? (
          <p className="mt-3 text-[16px] leading-[1.7] text-text-secondary">
            Care plan recommended, from {formatPeso(tier.care.monthly)}/month
            {" "}
            <span className="text-text-muted">(optional)</span>
          </p>
        ) : null}

        <p className="mt-6 max-w-sm text-[17px] leading-[1.75] text-text-secondary">
          {tier.bestFor}
        </p>

        <dl className="mt-7 space-y-1.5 font-mono text-[11.5px] uppercase tracking-[0.09em] text-text-muted">
          <div className="flex gap-2">
            <dt>Delivery</dt>
            <dd className="text-text-secondary">{tier.timeline}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Revisions</dt>
            <dd className="text-text-secondary">{tier.revisions}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={`/pricing?package=${tier.slug}#enquire`}
            className="inline-flex items-center justify-center bg-ink px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-text-secondary"
          >
            {tier.price === null ? "Book a discovery call" : "Start this package"}
          </Link>
          <a
            href={companyLinks.facebook}
            target="_blank"
            rel="noreferrer"
            className="border-b border-border-default pb-0.5 text-[15px] text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
          >
            Ask on Facebook
          </a>
        </div>
      </div>

      <div className="mt-8 md:mt-0">
        <p className="eyebrow">What you get</p>
        <ul className="mt-4 border-t border-border-subtle">
          {tier.includes.map((item) => (
            <li
              key={item}
              className="border-b border-border-subtle py-3 text-[16.5px] leading-[1.65] text-text-secondary"
            >
              {item}
            </li>
          ))}
        </ul>

        {tier.care.note ? (
          <div
            className={
              tier.care.recommended
                ? "mt-7 bg-ink p-6 text-white"
                : "mt-7 border border-border-default bg-bg-surface p-6"
            }
          >
            <p
              className={`font-mono text-[11.5px] uppercase tracking-[0.09em] ${
                tier.care.recommended ? "text-white/50" : "text-text-muted"
              }`}
            >
              {tier.care.recommended ? "On keeping it running" : "On care plans"}
            </p>
            <p
              className={`mt-3 text-[15.5px] leading-[1.7] ${
                tier.care.recommended ? "text-white/80" : "text-text-secondary"
              }`}
            >
              {tier.care.note}
            </p>
          </div>
        ) : null}

        {tier.limitation ? (
          <div className="mt-7 border-l-[3px] border-accent-bright pl-5">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.09em] text-text-muted">
              Be clear on this
            </p>
            <p className="mt-3 text-[16px] leading-[1.7] text-text-secondary">
              {tier.limitation}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
