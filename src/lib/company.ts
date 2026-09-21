export const companyLinks = {
  /**
   * Used for both the social link and every "message us" CTA.
   *
   * Deliberately NOT an m.me link. Meta shut messenger.com down as a messaging
   * surface in April 2026 and now redirects to facebook.com/messages, so m.me
   * sends desktop visitors through a redirect chain. The page URL lands
   * everyone somewhere that works, and the Message button is right there.
   *
   * Someone tapping this is starting the conversation themselves, which is
   * unrelated to Meta's rules on automated outbound messaging — those govern
   * bulk DMs we would send, not replies we receive.
   */
  facebook: "https://www.facebook.com/fskcodehouse",
  linkedIn: "https://www.linkedin.com/company/fsk-codehouse-corp/",
} as const;
