export type AppStatus = "coming-soon" | "live" | "beta";
export type Platform = "ios" | "android";

export interface AppData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: AppStatus;
  platforms: Platform[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  iconColor: string;
  iconImage?: string;
  privacyLastUpdated: string;
  termsLastUpdated: string;
  privacyContent: string;
  termsContent: string;
  supportEmail: string;
}

export const apps: AppData[] = [
  {
    slug: "lenso",
    name: "Lenso",
    tagline: "Share moments. Stay close.",
    description:
      "A private photo-sharing and messaging app for close friends. Send real moments, keep up through a home screen widget, chat one-on-one or in groups, and schedule time capsules for later.",
    status: "coming-soon",
    platforms: ["ios"],
    iconColor: "sky",
    iconImage: "/lenso-icon.png",
    privacyLastUpdated: "June 30, 2026",
    termsLastUpdated: "June 30, 2026",
    supportEmail: "support@fskcodehouse.com",
    privacyContent: `## Privacy Policy — Lenso

**Effective date: June 30, 2026**
**Company: FSK Codehouse Corp.**
**Contact: privacy@fskcodehouse.com**

### Information we collect
- Account information: email address, username, display name, profile details, avatar, and authentication identifiers.
- Content you choose to share: photos, captions, reactions, direct messages, group messages, group names, group avatars, and scheduled time capsules.
- Social graph information: friend requests, accepted friends, group memberships, conversation membership, notification preferences, and read states.
- Device and app information: device push token, app version, operating system, and basic diagnostics needed to keep Lenso reliable.
- Support information: messages, screenshots, and contact details you send when asking for help.

### How we use information
- To create and secure your account.
- To deliver moments, messages, group chats, reactions, time capsules, and widget updates to the people you choose.
- To send push notifications you enable.
- To maintain safety, prevent abuse, troubleshoot issues, and improve app reliability.
- To respond to support, privacy, and legal requests.

### Service providers
Lenso uses trusted service providers to run the app:
- **Supabase** for authentication, database, realtime features, file storage, and backend functions.
- **Apple** for iOS platform services, app distribution, push notifications, and any Apple sign-in or store services we enable.

We do not sell your personal information.

### Photos, messages, and privacy
Your photos, avatars, messages, and group media are stored in private buckets and protected by access controls. Content is intended to be visible only to the people or groups you send it to, plus FSK Codehouse systems and personnel when necessary for security, support, legal compliance, or abuse investigation.

### Retention and deletion
We keep information for as long as needed to provide Lenso, comply with legal obligations, resolve disputes, and protect users. You can delete your account from the app when that feature is available in settings, or you can request deletion by emailing privacy@fskcodehouse.com. Account deletion removes or anonymizes personal data unless we need to keep limited records for legal, safety, fraud-prevention, or accounting reasons.

### Your rights
- Request access to, correction of, export of, or deletion of your personal information.
- Object to or restrict certain processing where applicable.
- Withdraw consent where processing is based on consent.
- Contact us about rights under the Philippine Data Privacy Act, GDPR, CCPA/CPRA, or other applicable privacy laws.

### Children
Lenso is not intended for children under 13. If you believe a child under 13 provided personal information, contact privacy@fskcodehouse.com so we can review and delete it where required.

### International transfers
FSK Codehouse Corp. is based in the Philippines, and our providers may process information in other countries. We use reasonable safeguards required by applicable law.

### Changes
We may update this Privacy Policy as Lenso changes. The latest version will be posted on this page with its effective date.

### Contact
privacy@fskcodehouse.com`,
    termsContent: `## Terms of Service — Lenso

**Effective date: June 30, 2026**
**Governing law: Republic of the Philippines**
**Company: FSK Codehouse Corp.**

### Eligibility
You must be at least 13 years old to use Lenso. If the law in your country requires a higher minimum age or parental consent, you must meet that requirement before using Lenso.

### Your account
You are responsible for the activity on your account and for keeping your login credentials secure. You must provide accurate information and may not impersonate another person or create accounts for abusive, deceptive, or illegal purposes.

### Your content
You keep ownership of the photos, captions, messages, reactions, avatars, and other content you upload or send in Lenso. By using Lenso, you grant FSK Codehouse Corp. a limited, worldwide license to host, store, process, display, transmit, and operate that content solely to provide, secure, support, and improve Lenso.

You are responsible for the content you share and for having the rights and permissions needed to share it.

### Acceptable use
You may not use Lenso to:
- Harass, threaten, exploit, or abuse others.
- Share illegal, hateful, sexually exploitative, non-consensual, or infringing content.
- Impersonate others or misrepresent your identity.
- Attempt to access accounts, conversations, groups, storage, or systems without permission.
- Reverse engineer, scrape, spam, disrupt, or overload Lenso.
- Use Lenso for unlawful commercial messaging or other illegal activity.

We may remove content, limit features, suspend accounts, or terminate accounts that violate these terms or create risk for users, FSK Codehouse Corp., or the service.

### Friends, groups, messages, and time capsules
Lenso is designed for private sharing with accepted friends and groups. You should only send content to people you trust. Time capsules and scheduled features may depend on network access, device settings, backend jobs, and platform services, so exact delivery times are not guaranteed.

### Subscriptions & purchases
If Lenso offers paid features, in-app purchases, or subscriptions, they will be processed by Apple or another applicable app-store provider. Refunds and billing issues are handled under that provider's policies unless applicable law requires otherwise.

### Availability
We work to keep Lenso reliable, but we do not guarantee uninterrupted, error-free, or permanent availability. Features may change, pause, or end as the product evolves.

### Disclaimers and liability
Lenso is provided "as is" and "as available" to the fullest extent permitted by law. FSK Codehouse Corp. is not liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, data, goodwill, or other intangible losses, except where the law does not allow such limits.

### Termination
You may stop using Lenso at any time. We may suspend or terminate access if you violate these terms, create legal or safety risk, or misuse the service.

### Changes
We may update these Terms as Lenso changes. The latest version will be posted on this page with its effective date. Continuing to use Lenso after changes means you accept the updated Terms.

### Contact
legal@fskcodehouse.com`,
  },
];

export function getAppBySlug(slug: string): AppData | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getAllSlugs(): string[] {
  return apps.map((app) => app.slug);
}
