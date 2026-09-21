import { Suspense } from "react";
import ProjectLeadForm from "@/components/ProjectLeadForm";
import { companyLinks } from "@/lib/company";

/**
 * Contact section, used on both the homepage and the pricing page so a visitor
 * never has to change page to enquire.
 *
 * The Suspense boundary is required: ProjectLeadForm calls useSearchParams,
 * which opts a statically rendered page into client-side search param reading.
 * Without it the build fails.
 *
 * CTA order is deliberate. The form is primary because it captures the package
 * and the details needed to quote; Facebook is offered second because in this
 * market a good number of buyers will never fill in a form, and losing them
 * costs more than an unstructured first message.
 */
export default function ContactBlock({
  eyebrow = "Start here",
  heading = "Tell us what you want to launch or improve.",
  body = "We'll help identify the right first version and a practical path from concept to release.",
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-5 text-[2.75rem] text-text-primary md:text-[3.5rem]">
          {heading}
        </h2>
        <p className="lede mt-6">{body}</p>

        <div className="mt-9 border-t border-border-default pt-7">
          <p className="eyebrow">Rather not fill in a form?</p>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={companyLinks.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2.5 border border-border-default px-6 py-3 text-[15px] font-medium text-text-primary transition-colors hover:border-text-primary"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
              </svg>
              Message us on Facebook
            </a>
            <a
              href="mailto:hello@fskcodehouse.com?subject=Project%20inquiry"
              className="w-fit border-b border-border-default pb-0.5 text-[15px] text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
            >
              hello@fskcodehouse.com
            </a>
          </div>
        </div>
      </div>

      {/*
        The form reads ?package= with useSearchParams, which makes it
        client-rendered. That is an acceptable trade here because the form
        cannot submit without JavaScript anyway — it posts to /api/leads via
        fetch. Visitors without JS still have Facebook and email above.

        The fallback mirrors the form's real dimensions and chrome so there is
        no layout shift and nothing looks broken during hydration.
      */}
      <Suspense
        fallback={
          <div className="border border-border-default bg-bg-surface p-6 sm:p-8">
            <p className="text-[15px] text-text-muted">Loading the form…</p>
            <div className="mt-6 space-y-5" aria-hidden="true">
              {[0, 1, 2, 3].map((row) => (
                <div key={row}>
                  <div className="h-3 w-24 bg-border-default" />
                  <div className="mt-2 h-11 border border-border-default" />
                </div>
              ))}
              <div className="h-8 border border-border-default" />
              <div className="h-14 bg-border-default" />
            </div>
          </div>
        }
      >
        <ProjectLeadForm />
      </Suspense>
    </div>
  );
}
