"use client";

import { useState } from "react";

/**
 * Newsletter sign-up.
 *
 * There is no backend for this yet, and rather than fake one, the component
 * renders nothing until an endpoint is configured. Set
 * NEXT_PUBLIC_NEWSLETTER_ENDPOINT to a URL that accepts
 * `POST { email: string }` — a Supabase Edge Function, a Resend contact
 * endpoint, or any email provider's subscribe URL — and the form goes live
 * with no other changes.
 *
 * Before enabling: confirm the wording and consent language match the website
 * privacy policy at /privacy.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

type Status = "idle" | "submitting" | "success" | "error";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (!ENDPOINT) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(ENDPOINT as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(response.ok ? "success" : "error");
      if (response.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border border-border-default bg-bg-surface p-6 sm:p-8">
      <h2 className="text-lg font-semibold tracking-tight text-text-primary">
        New articles, occasionally
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-7 text-text-secondary">
        Practical notes on building web and mobile software. No sales sequences.
        Unsubscribe any time.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-full border border-border-default bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none sm:max-w-xs"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-600 disabled:opacity-60"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      <p aria-live="polite" className="mt-3 text-sm text-text-secondary">
        {status === "success" ? "Thanks — you're on the list." : null}
        {status === "error" ? "Something went wrong. Please try again." : null}
      </p>
    </section>
  );
}
