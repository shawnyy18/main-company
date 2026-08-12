"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared cookie-consent primitives.
 *
 * `CookieConsent.tsx` owns the banner and writes the cookie. Anything that
 * needs to *read* the visitor's choice — advertising, embeds, any future
 * third-party script — imports from here so the cookie name and change event
 * can never drift apart.
 */

export const CONSENT_COOKIE = "fsk_cookie_consent";
export const CONSENT_CHANGED_EVENT = "fsk:cookie-consent-changed";

function readConsentCookie(): string {
  return (
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))
      ?.split("=")
      .slice(1)
      .join("=") ?? ""
  );
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
}

function hasMarketingConsent(rawCookie: string): boolean {
  if (!rawCookie) return false;
  try {
    return JSON.parse(decodeURIComponent(rawCookie)).marketing === true;
  } catch {
    return false;
  }
}

/**
 * True only once the visitor has actively accepted marketing cookies.
 *
 * The server snapshot is an empty string, so anything gated on this renders
 * nothing during SSR and nothing for visitors who declined — no third-party
 * request is made until consent exists.
 */
export function useMarketingConsent(): boolean {
  const rawCookie = useSyncExternalStore(subscribe, readConsentCookie, () => "");
  return hasMarketingConsent(rawCookie);
}
