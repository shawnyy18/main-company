"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { CONSENT_CHANGED_EVENT, CONSENT_COOKIE } from "@/lib/consent";

export const COOKIE_SETTINGS_EVENT = "fsk:open-cookie-settings";

type ConsentPreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const SIX_MONTHS = 60 * 60 * 24 * 180;

function getConsentCookieValue() {
  return (
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))
      ?.split("=")
      .slice(1)
      .join("=") ?? ""
  );
}

function parseConsent(value: string): ConsentPreferences | null {
  if (!value) return null;

  try {
    const stored = JSON.parse(decodeURIComponent(value));
    return {
      essential: true,
      analytics: stored.analytics === true,
      marketing: stored.marketing === true,
      updatedAt: stored.updatedAt,
    };
  } catch {
    return null;
  }
}

function writeConsent(preferences: ConsentPreferences) {
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(
    JSON.stringify(preferences),
  )}; Path=/; Max-Age=${SIX_MONTHS}; SameSite=Lax; Secure`;
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

function removeCookie(name: string) {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;

  const hostnameParts = window.location.hostname.split(".");
  if (hostnameParts.length > 1) {
    const rootDomain = hostnameParts.slice(-2).join(".");
    document.cookie = `${name}=; Path=/; Domain=.${rootDomain}; Max-Age=0; SameSite=Lax`;
  }
}

function applyTrackingChoice(
  previous: ConsentPreferences | null,
  next: ConsentPreferences,
) {
  const trackingWindow = window as typeof window & {
    [key: string]: unknown;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  };
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (googleAnalyticsId) {
    trackingWindow[`ga-disable-${googleAnalyticsId}`] = !next.analytics;
  }

  if (next.analytics && !previous?.analytics) {
    trackingWindow.gtag?.("consent", "update", {
      analytics_storage: "granted",
    });
  }

  if (!next.analytics) {
    trackingWindow.gtag?.("consent", "update", {
      analytics_storage: "denied",
    });
    document.cookie
      .split("; ")
      .map((cookie) => cookie.split("=")[0])
      .filter((name) => name === "_ga" || name.startsWith("_ga_"))
      .forEach(removeCookie);
  }

  if (next.marketing && !previous?.marketing) {
    trackingWindow.fbq?.("consent", "grant");
  }

  if (!next.marketing) {
    trackingWindow.fbq?.("consent", "revoke");
    removeCookie("_fbp");
  }
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
}

function newPreferences(analytics: boolean, marketing: boolean) {
  return {
    essential: true as const,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
}

function TrackingScripts({ consent }: { consent: ConsentPreferences | null }) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const trackingWindow = window as typeof window & {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };

    if (consent?.analytics && googleAnalyticsId) {
      trackingWindow.gtag?.("event", "page_view", {
        page_path: pathname,
      });
    }

    if (consent?.marketing && metaPixelId) {
      trackingWindow.fbq?.("track", "PageView");
    }
  }, [consent?.analytics, consent?.marketing, googleAnalyticsId, metaPixelId, pathname]);

  return (
    <>
      {consent?.analytics && googleAnalyticsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="fsk-google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {consent?.marketing && metaPixelId ? (
        <Script id="fsk-meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}

export default function CookieConsent() {
  const consentCookie = useSyncExternalStore(
    subscribeToConsent,
    getConsentCookieValue,
    () => "__server__",
  );
  const consent =
    consentCookie === "__server__" ? null : parseConsent(consentCookie);
  const ready = consentCookie !== "__server__";
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const openSettings = () => {
      const current = parseConsent(getConsentCookieValue());
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setShowSettings(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const save = (next: ConsentPreferences) => {
    applyTrackingChoice(consent, next);
    writeConsent(next);
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    setShowSettings(false);
  };

  if (!ready) return null;

  return (
    <>
      <TrackingScripts consent={consent} />

      {!consent && !showSettings ? (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-5xl border border-border-default bg-white p-5 shadow-[0_20px_70px_rgba(15,17,21,0.18)] sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-base font-semibold text-text-primary">
                Your privacy choices
              </h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                We use essential cookies to remember your choices. With your
                permission, analytics helps us improve the site and marketing
                cookies let us measure campaigns and show ads on our blog. See
                our{" "}
                <a className="text-accent underline" href="/cookies">
                  Cookie Policy
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <button
                type="button"
                onClick={() => save(newPreferences(false, false))}
                className="w-full border border-border-default px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-surface sm:w-auto"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="w-full border border-border-default px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-surface sm:w-auto"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={() => save(newPreferences(true, true))}
                className="w-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-600 sm:w-auto"
              >
                Accept all
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {showSettings ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 p-4 sm:items-center"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && consent) {
              setShowSettings(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="cookie-settings-title"
                  className="text-xl font-semibold text-text-primary"
                >
                  Cookie settings
                </h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Choose which optional cookies FSK Codehouse may use. You can
                  change these settings at any time.
                </p>
              </div>
              {consent ? (
                <button
                  type="button"
                  aria-label="Close cookie settings"
                  onClick={() => setShowSettings(false)}
                  className="h-9 w-9 shrink-0 text-xl text-text-muted hover:text-text-primary"
                >
                  ×
                </button>
              ) : null}
            </div>

            <div className="mt-7 divide-y divide-border-default border-y border-border-default">
              <PreferenceRow
                title="Essential"
                description="Required to remember your privacy choice and keep the site working."
                checked
                disabled
                onChange={() => undefined}
              />
              <PreferenceRow
                title="Analytics"
                description="Helps us understand visits, popular pages, and where the site can be improved."
                checked={analytics}
                onChange={setAnalytics}
              />
              <PreferenceRow
                title="Marketing"
                description="Measures our campaigns and allows advertising on our blog, including cookies set by Google and its advertising partners."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => save(newPreferences(false, false))}
                className="border border-border-default px-4 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-surface"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => save(newPreferences(analytics, marketing))}
                className="bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600"
              >
                Save choices
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-5 py-5">
      <span>
        <span className="block text-sm font-semibold text-text-primary">
          {title}
        </span>
        <span className="mt-1 block text-sm leading-6 text-text-secondary">
          {description}
        </span>
      </span>
      <span className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="block h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-300 peer-disabled:opacity-70" />
        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
