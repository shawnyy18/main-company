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
    title: `Terms of Service — ${app.name}`,
    description: `Terms of Service for ${app.name} by FSK Codehouse Corp. Last updated ${app.termsLastUpdated}.`,
  };
}

export default async function TermsPage({ params }: { params: Params }) {
  const { appname } = await params;
  const app = getAppBySlug(appname);
  if (!app) notFound();

  const htmlContent = await marked.parse(app.termsContent);

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
              <span className="text-text-secondary">Terms of Service</span>
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <h1 className="text-xl md:text-2xl font-bold">
                  Terms of Service — {app.name}
                </h1>
              </div>
              <p className="text-sm text-text-muted">
                by FSK Codehouse Corp. · Last updated{" "}
                {app.termsLastUpdated}
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
