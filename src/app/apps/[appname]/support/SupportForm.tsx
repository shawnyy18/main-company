"use client";

import { useState } from "react";

export default function SupportForm({
  appName,
  supportEmail,
}: {
  appName: string;
  supportEmail: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`${appName} support request`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4">
          <svg
            className="w-6 h-6 text-emerald-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Message Sent!
        </h3>
        <p className="text-text-secondary text-sm">
          Your email app should open with your {appName} support request.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border-default bg-bg-card p-6 md:p-8 space-y-5 shadow-[var(--shadow-card)]"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
        Send a Message
      </h2>

      <div>
        <label
          htmlFor="support-name"
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="support-name"
          name="name"
          required
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-default text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-dim transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="support-email"
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="support-email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-default text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-dim transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="support-message"
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          Message
        </label>
        <textarea
          id="support-message"
          name="message"
          required
          rows={5}
          placeholder={`Describe your issue with ${appName}...`}
          className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-default text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-dim transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        id="support-submit"
        className="w-full py-3 rounded-full bg-accent text-white font-semibold text-sm hover:bg-indigo-600 transition-all duration-300 shadow-sm shadow-indigo-500/20 cursor-pointer"
      >
        Open Email Draft
      </button>
    </form>
  );
}
