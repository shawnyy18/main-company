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
  privacyLastUpdated: string;
  termsLastUpdated: string;
  privacyContent: string;
  termsContent: string;
  supportEmail: string;
}

export const apps: AppData[] = [
  {
    slug: "lens",
    name: "Lens",
    tagline: "Share moments. Live on their screen.",
    description:
      "A home screen widget photo sharing app. Send real photos directly to your friends' home screens. No feed. No algorithm. Just the people you care about.",
    status: "coming-soon",
    platforms: ["ios", "android"],
    iconColor: "amber",
    privacyLastUpdated: "January 1, 2025",
    termsLastUpdated: "January 1, 2025",
    supportEmail: "support@fskcodehouse.com",
    privacyContent: `## Privacy Policy — Lens

**Effective date: January 1, 2025**
**Company: FSK Codehouse Corp.**

### What we collect
- Account info: name, email, username, profile photo
- Photos and videos you choose to share
- Device info: device model, OS version, push token
- Usage data: app activity, widget interactions

### How we use it
- To display photos on your friends' home screen widgets
- To send push notifications for new moments and reactions
- To authenticate your account via Apple or Google Sign-In

### Third parties
- **Supabase** — database, authentication, file storage
- **Apple / Google** — sign-in authentication only
- We do not sell your data. Ever.

### Your rights
- Delete your account and all data: Settings → Delete Account
- Request a data export: privacy@fskcodehouse.com
- Philippine Data Privacy Act (RA 10173) compliant
- GDPR compliant for EU users

### Contact
privacy@fskcodehouse.com`,
    termsContent: `## Terms of Service — Lens

**Effective date: January 1, 2025**
**Governing law: Republic of the Philippines**

### Eligibility
You must be 13 or older to use Lens.

### Your content
You own your photos. By sharing them you grant FSK Codehouse a limited license to display them to your accepted friends only.

### Acceptable use
No harassment, illegal content, or impersonation. Violations result in immediate account termination.

### Subscriptions & purchases
In-app purchases are processed by Apple/Google. Refunds follow their respective store policies.

### Termination
We may suspend accounts that violate these terms.

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
