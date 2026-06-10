import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { marked } from "marked";
import { getAppBySlug, getAllSlugs } from "@/lib/apps";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    title: `Privacy Policy — ${app.name}`,
    description: `Privacy Policy for ${app.name} by FSK Codehouse Corp. Last updated ${app.privacyLastUpdated}.`,
  };
}

export default async function PrivacyPage({ params }: { params: Params }) {
  const { appname } = await params;
  const app = getAppBySlug(appname);
  if (!app) notFound();

  const htmlContent = await marked.parse(app.privacyContent);

  return (
    <>
      <Navbar />

      <main className="relative z-10 flex-grow pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
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
              <span className="text-text-secondary">Privacy Policy</span>
            </nav>

            {/* Banner */}
            <div className="rounded-2xl border border-border-default bg-bg-card p-6 md:p-8 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
                <h1 className="text-xl md:text-2xl font-bold">
                  Privacy Policy — {app.name}
                </h1>
              </div>
              <p className="text-sm text-text-muted">
                by FSK Codehouse Corp. · Last updated{" "}
                {app.privacyLastUpdated}
              </p>
            </div>

            {/* Content */}
            <div
              className="prose-policy"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-border-subtle">
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
