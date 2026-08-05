import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Website Privacy Policy",
  description: "How FSK Codehouse Corp. handles personal data on its website.",
};

export default function WebsitePrivacyPage() {
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
            <span className="text-text-secondary">Website Privacy Policy</span>
          </nav>

          <header className="mb-10 border border-border-default bg-bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
              Website Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-text-muted">
              FSK Codehouse Corp. · Last updated July 21, 2026
            </p>
          </header>

          <p>
            FSK Codehouse Corp. (&quot;FSK Codehouse,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;)
            respects your privacy. This policy explains how we collect and use
            personal data when you visit fskcodehouse.com, contact us, request
            services, or purchase a digital product from us.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              Information you provide, such as your name, email address,
              company, project details, support requests, and communications.
            </li>
            <li>
              Transaction details needed to fulfill digital product purchases.
              Payment providers process payment card information under their
              own privacy policies; we do not need to store full card details.
            </li>
            <li>
              Technical and usage data, such as pages viewed, approximate
              location, device type, browser, referral source, and campaign
              interactions, when you allow analytics or marketing cookies.
            </li>
          </ul>

          <h2>How we use information</h2>
          <ul>
            <li>Respond to inquiries and provide requested services.</li>
            <li>Process, deliver, and support digital product purchases.</li>
            <li>Operate, secure, measure, and improve our website.</li>
            <li>Measure advertising and understand campaign performance.</li>
            <li>Meet legal, accounting, and regulatory obligations.</li>
          </ul>

          <h2>Our basis for processing</h2>
          <p>
            Depending on the activity, we process personal data with your
            consent, to take steps at your request or perform a contract, to
            comply with legal obligations, or for legitimate business interests
            that do not override your privacy rights. Optional analytics and
            marketing technologies are used only after you consent.
          </p>

          <h2>Cookies and similar technologies</h2>
          <p>
            We use an essential cookie to remember your privacy settings. If
            you agree, we may also use Google Analytics to understand site use
            and Meta Pixel to measure advertising. Read our{" "}
            <Link href="/cookies">Cookie Policy</Link> or change your choices
            through the Cookie settings link in the footer.
          </p>

          <h2>Sharing and international transfers</h2>
          <p>
            We may share limited data with service providers that help us host
            the website, process payments, deliver products, provide support,
            analyze traffic, or measure advertising. Some providers may process
            data outside the Philippines. We require appropriate protections
            and share only what is needed for their role.
          </p>

          <h2>Retention and security</h2>
          <p>
            We retain personal data only as long as needed for the purposes in
            this policy, including legal, accounting, dispute, and security
            requirements. We use reasonable organizational and technical
            safeguards, but no internet transmission or storage system can be
            guaranteed completely secure.
          </p>

          <h2>Your rights</h2>
          <p>
            Subject to the Philippine Data Privacy Act of 2012 and other
            applicable law, you may have rights to be informed, access, correct,
            object to or restrict processing, request deletion or blocking,
            obtain data portability, withdraw consent, and lodge a complaint
            with the National Privacy Commission. Withdrawing consent does not
            affect processing that was lawful before withdrawal.
          </p>

          <h2>Contact us</h2>
          <p>
            For privacy questions or requests, contact FSK Codehouse Corp. at{" "}
            <a href="mailto:hello@fskcodehouse.com">
              hello@fskcodehouse.com
            </a>
            . We may ask for information needed to verify your identity before
            completing a request.
          </p>

          <h2>Policy updates</h2>
          <p>
            We may update this policy as our website, products, or legal
            obligations change. The date above shows the latest revision.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
