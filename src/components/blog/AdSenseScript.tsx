"use client";

import Script from "next/script";

import { useMarketingConsent } from "@/lib/consent";

/**
 * Loads the AdSense library, and only after the visitor accepts marketing
 * cookies — the same gate the site already applies to Google Analytics and the
 * Meta Pixel.
 *
 * Individual units call `adsbygoogle.push({})` themselves (see AdSlot), so
 * there is no global push here.
 */
const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function AdSenseScript() {
  const marketingConsent = useMarketingConsent();

  if (!CLIENT_ID || !marketingConsent) return null;

  return (
    <Script
      id="adsbygoogle-lib"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`}
    />
  );
}
