"use client";

import { type FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPackageBySlug, projectTypeForPackage } from "@/lib/packages";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-2 w-full border border-border-default bg-bg-primary px-4 py-3 text-[15px] text-text-primary placeholder:text-text-muted transition-colors focus:border-text-primary focus:outline-none";

/**
 * Lead form.
 *
 * Reads `?package=<slug>` with useSearchParams rather than an effect, so the
 * project-type select is correct on first paint and there is no setState
 * inside an effect body. Callers must wrap this in <Suspense> — that is a
 * requirement of useSearchParams on statically rendered pages.
 */
export default function ProjectLeadForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const packageSlug = (searchParams.get("package") ?? "").slice(0, 60);
  const presetType = packageSlug ? projectTypeForPackage(packageSlug) : undefined;
  const presetTier = packageSlug ? getPackageBySlug(packageSlug) : undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const payload = {
      ...Object.fromEntries(new FormData(form)),
      package: packageSlug,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "We could not send your inquiry.");
      }

      form.reset();
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send your inquiry. Please try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-border-default bg-bg-surface p-6 text-text-primary sm:p-8"
    >
      {/* Continuity from the pricing CTA. Confirms we know what they clicked. */}
      {presetTier ? (
        <p className="mb-6 border-l-[3px] border-accent-bright pl-4 text-[15px] leading-[1.7] text-text-secondary">
          Enquiring about{" "}
          <span className="font-medium text-text-primary">
            {presetTier.name}
          </span>
          . Add anything we should know below.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-[15px] font-medium text-text-secondary">
          Name
          <input
            className={fieldClass}
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            maxLength={100}
            required
          />
        </label>
        <label className="text-[15px] font-medium text-text-secondary">
          Work email
          <input
            className={fieldClass}
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={254}
            required
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="text-[15px] font-medium text-text-secondary">
          Company <span className="text-text-muted">(optional)</span>
          <input
            className={fieldClass}
            id="lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company or organization"
            maxLength={120}
          />
        </label>
        <label className="text-[15px] font-medium text-text-secondary">
          What can we help with?
          <select
            className={fieldClass}
            id="lead-project-type"
            name="projectType"
            defaultValue={presetType ?? ""}
            required
          >
            <option value="" disabled>
              Choose a project type
            </option>
            <option>Business website</option>
            <option>Real-estate website</option>
            <option>Web or mobile application</option>
            <option>Care plan only</option>
            <option>Product partnership</option>
            <option>Something else</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block text-[15px] font-medium text-text-secondary">
        Tell us about your idea
        <textarea
          className={`${fieldClass} min-h-32 resize-y`}
          id="lead-message"
          name="message"
          placeholder="What are you looking to launch or improve?"
          minLength={10}
          maxLength={3000}
          required
        />
      </label>

      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="mt-7 inline-flex w-full cursor-pointer items-center justify-center bg-ink px-7 py-4 text-[15px] font-medium text-white transition-colors hover:bg-text-secondary disabled:cursor-wait disabled:opacity-65"
      >
        {submitState === "submitting" ? "Sending…" : "Send project inquiry"}
      </button>

      <div className="mt-4 min-h-6 text-center text-[15px]" aria-live="polite">
        {submitState === "success" ? (
          <p className="font-medium text-text-primary">
            Thanks — your inquiry is in. We&apos;ll reply within two business days.
          </p>
        ) : null}
        {submitState === "error" ? (
          <p className="text-red-800">
            {errorMessage}{" "}
            <a
              className="font-medium underline underline-offset-2"
              href="mailto:hello@fskcodehouse.com?subject=Project%20inquiry"
            >
              Email us instead
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
