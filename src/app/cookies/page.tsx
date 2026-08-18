import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ManageCookiesButton from "@/components/ManageCookiesButton";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How FSK Codehouse uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow px-5 pb-20 pt-28 sm:px-6 md:pt-36">
        <article className="prose-policy mx-auto max-w-3xl">
          <nav className="mb-8 flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span>/</span>
            <span className="text-text-secondary">Cookie Policy</span>
          </nav>

          <header className="mb-10 border border-border-default bg-bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
              Cookie Policy
            </h1>
            <p className="mt-3 text-sm text-text-muted">
              FSK Codehouse · Last updated July 21, 2026
            </p>
          </header>

          <p>
            Cookies are small text files saved by your browser. This policy
            explains which cookies fskcodehouse.com may use, why we use them,
            and how you can control them.
          </p>

          <h2>Cookie categories</h2>
          <h3>Essential</h3>
          <p>
            These are required for the site to remember your privacy choice and
            cannot be switched off through our consent manager.
          </p>
          <h3>Analytics</h3>
          <p>
            If you consent, Google Analytics may help us understand traffic,
            referral sources, popular pages, and general site performance.
          </p>
          <h3>Marketing</h3>
          <p>
            If you consent, Meta Pixel may help us measure Facebook and
            Instagram campaigns, understand actions taken after an ad, and
            build audiences for relevant advertising.
          </p>

          <h2>Cookies we may use</h2>
          <div className="my-6 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border-default text-text-primary">
                  <th className="py-3 pr-4 font-semibold">Cookie</th>
                  <th className="py-3 pr-4 font-semibold">Provider</th>
                  <th className="py-3 pr-4 font-semibold">Purpose</th>
                  <th className="py-3 font-semibold">Typical duration</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <CookieRow cookie="fsk_cookie_consent" provider="FSK Codehouse" purpose="Stores your consent choices" duration="6 months" />
                <CookieRow cookie="_ga" provider="Google" purpose="Distinguishes website visitors for analytics" duration="Up to 2 years" />
                <CookieRow cookie="_ga_*" provider="Google" purpose="Maintains analytics session state" duration="Up to 2 years" />
                <CookieRow cookie="_fbp" provider="Meta" purpose="Measures and supports advertising delivery" duration="Up to 3 months" />
              </tbody>
            </table>
          </div>
          <p>
            Analytics and marketing cookies are not placed unless the related
            category is enabled and the service has been configured on our site.
            Providers may update cookie names or durations over time.
          </p>

          <h2>Change your choices</h2>
          <p>
            You can withdraw or change consent at any time. Your browser can
            also block or delete cookies, although deleting the essential
            consent cookie will cause the banner to appear again.
          </p>
          <div className="my-6 inline-flex border border-border-default px-4 py-2.5 font-semibold hover:bg-bg-surface">
            <ManageCookiesButton />
          </div>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href="mailto:hello@fskcodehouse.com">
              hello@fskcodehouse.com
            </a>
            . For more information about personal data, read our{" "}
            <Link href="/privacy">Website Privacy Policy</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

function CookieRow({
  cookie,
  provider,
  purpose,
  duration,
}: {
  cookie: string;
  provider: string;
  purpose: string;
  duration: string;
}) {
  return (
    <tr className="border-b border-border-subtle align-top">
      <td className="py-3 pr-4 font-mono text-xs text-text-primary">{cookie}</td>
      <td className="py-3 pr-4">{provider}</td>
      <td className="py-3 pr-4">{purpose}</td>
      <td className="py-3">{duration}</td>
    </tr>
  );
}
