"use client";

import { COOKIE_SETTINGS_EVENT } from "@/components/CookieConsent";

export default function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      className="text-left text-sm text-text-secondary transition-colors hover:text-accent"
    >
      Cookie settings
    </button>
  );
}
