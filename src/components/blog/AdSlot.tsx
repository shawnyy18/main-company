"use client";

import { useEffect, useRef } from "react";

import { useMarketingConsent } from "@/lib/consent";

/**
 * A single AdSense unit.
 *
 * Renders **nothing at all** unless all three are true:
 *   1. NEXT_PUBLIC_ADSENSE_CLIENT_ID is set
 *   2. a slot id is available
 *   3. the visitor has accepted marketing cookies
 *
 * That means no empty containers, no reserved gaps, and no request to Google
 * for visitors who declined. Both slots sit below the fold, so the one-time
 * reflow when a unit fills does not count against Cumulative Layout Shift.
 */
const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const IN_ARTICLE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE;

/** Two placements only. Anything denser reads as a content farm. */
export type AdPlacement = "mid-article" | "article-end";

export default function AdSlot({
  placement,
  slotId = IN_ARTICLE_SLOT,
}: {
  placement: AdPlacement;
  slotId?: string;
}) {
  const marketingConsent = useMarketingConsent();
  const enabled = Boolean(CLIENT_ID && slotId && marketingConsent);
  const requested = useRef(false);

  useEffect(() => {
    // Each <ins> needs exactly one push. Pushing twice makes AdSense drop the
    // unit with "All ins elements already have ads in them".
    if (!enabled || requested.current) return;
    requested.current = true;

    try {
      const adWindow = window as typeof window & { adsbygoogle?: unknown[] };
      adWindow.adsbygoogle = adWindow.adsbygoogle ?? [];
      adWindow.adsbygoogle.push({});
    } catch {
      // A blocked or failed ad request must never break the article.
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside
      className="my-10 border border-border-subtle bg-bg-surface px-4 py-4"
      data-ad-placement={placement}
      aria-label="Advertisement"
    >
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 250 }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
