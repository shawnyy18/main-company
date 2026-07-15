import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAppBySlug, getAllSlugs } from "@/lib/apps";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportForm from "./SupportForm";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ appname: slug }));
}

type Params = Promise<{ appname: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { appname } = await params;
  const app = getAppBySlug(appname);
  if (!app) return {};
  return {
    title: `Support — ${app.name}`,
    description: `Get support for ${app.name} by FSK Codehouse Corp. Contact us at ${app.supportEmail}.`,
    openGraph: {
      title: `Support — ${app.name}`,
      description: `Get support for ${app.name} by FSK Codehouse Corp.`,
      images: [{ url: "/og-fsk.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function SupportPage({ params }: { params: Params }) {
  const { appname } = await params;
  const app = getAppBySlug(appname);
  if (!app) notFound();

  return (
    <>
      <Navbar />

      <main className="flex-grow px-5 pb-20 pt-28 sm:px-6 md:pt-36">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/apps/${app.slug}`}
                className="hover:text-accent transition-colors"
              >
                {app.name}
              </Link>
              <span>/</span>
              <span className="text-text-secondary">Support</span>
            </nav>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-dim border border-border-default mb-5">
                <svg
                  className="w-7 h-7 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                {app.name} Support
              </h1>
              <p className="text-text-secondary text-sm max-w-md mx-auto">
                Need help with {app.name}? Send us a message below or email us
                directly.
              </p>
            </div>

            {/* Direct email */}
            <div className="rounded-2xl border border-border-default bg-bg-card p-5 mb-8 flex items-center justify-between gap-4 flex-wrap shadow-[var(--shadow-card)]">
              <div>
                <p className="text-xs text-text-muted mb-1">
                  Email us directly
                </p>
                <a
                  href={`mailto:${app.supportEmail}`}
                  className="text-accent text-sm font-medium hover:underline"
                >
                  {app.supportEmail}
                </a>
              </div>
              <a
                href={`mailto:${app.supportEmail}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold hover:bg-indigo-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                Open Mail
              </a>
            </div>

            {/* Contact form */}
            <SupportForm appName={app.name} supportEmail={app.supportEmail} />

            {/* Back link */}
            <div className="mt-10 text-center">
              <Link
                href={`/apps/${app.slug}`}
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Back to {app.name}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
