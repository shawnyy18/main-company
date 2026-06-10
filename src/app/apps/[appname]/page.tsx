import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { apps, getAppBySlug, getAllSlugs } from "@/lib/apps";
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
    title: `${app.name} — ${app.tagline}`,
    description: app.description,
  };
}

const iconColorMap: Record<string, string> = {
  amber: "from-amber-400 to-amber-600",
  blue: "from-blue-400 to-blue-600",
  emerald: "from-emerald-400 to-emerald-600",
  violet: "from-violet-400 to-violet-600",
  rose: "from-rose-400 to-rose-600",
  sky: "from-sky-400 to-sky-600",
  teal: "from-teal-400 to-teal-600",
};

export default async function AppPage({ params }: { params: Params }) {
  const { appname } = await params;
  const app = getAppBySlug(appname);
  if (!app) notFound();

  const gradient = iconColorMap[app.iconColor] ?? iconColorMap.amber;
  const isComingSoon = app.status === "coming-soon";

  return (
    <>
      <Navbar />

      <main className="relative z-10 flex-grow pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Ambient glow */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
              <Link
                href="/"
                className="hover:text-accent transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-text-secondary">{app.name}</span>
            </nav>

            {/* App header */}
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
              <div
                className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center text-bg-primary font-bold text-3xl shadow-xl shrink-0`}
              >
                {app.name.charAt(0)}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {app.name}
                  </h1>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                      app.status === "live"
                        ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                        : app.status === "beta"
                          ? "bg-sky-400/10 text-sky-400 border-sky-400/20"
                          : "bg-amber-400/10 text-amber-400 border-amber-400/20"
                    }`}
                  >
                    {app.status === "coming-soon"
                      ? "Coming Soon"
                      : app.status === "beta"
                        ? "Beta"
                        : "Live"}
                  </span>
                </div>
                <p className="text-text-secondary text-lg">
                  {app.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-border-default bg-bg-card p-6 md:p-8 mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                About {app.name}
              </h2>
              <p className="text-text-secondary leading-relaxed text-base">
                {app.description}
              </p>
            </div>

            {/* Store buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              {app.platforms.includes("ios") && (
                <StoreButton
                  platform="ios"
                  url={app.appStoreUrl}
                  disabled={isComingSoon}
                />
              )}
              {app.platforms.includes("android") && (
                <StoreButton
                  platform="android"
                  url={app.playStoreUrl}
                  disabled={isComingSoon}
                />
              )}
            </div>

            {/* Links grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href={`/apps/${app.slug}/privacy`}
                className="flex items-center gap-3 rounded-xl border border-border-default bg-bg-card px-5 py-4 hover:border-amber-400/30 hover:bg-bg-card-hover transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors"
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
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    Privacy Policy
                  </span>
                  <p className="text-xs text-text-muted">
                    Updated {app.privacyLastUpdated}
                  </p>
                </div>
              </Link>

              <Link
                href={`/apps/${app.slug}/terms`}
                className="flex items-center gap-3 rounded-xl border border-border-default bg-bg-card px-5 py-4 hover:border-amber-400/30 hover:bg-bg-card-hover transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors"
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
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    Terms of Service
                  </span>
                  <p className="text-xs text-text-muted">
                    Updated {app.termsLastUpdated}
                  </p>
                </div>
              </Link>

              <Link
                href={`/apps/${app.slug}/support`}
                className="flex items-center gap-3 rounded-xl border border-border-default bg-bg-card px-5 py-4 hover:border-amber-400/30 hover:bg-bg-card-hover transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors"
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
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    Support
                  </span>
                  <p className="text-xs text-text-muted">
                    {app.supportEmail}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function StoreButton({
  platform,
  url,
  disabled,
}: {
  platform: "ios" | "android";
  url?: string;
  disabled: boolean;
}) {
  const content = (
    <div
      className={`inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-300 ${
        disabled
          ? "border-border-subtle bg-bg-card opacity-50 cursor-not-allowed"
          : "border-border-default bg-bg-card hover:border-amber-400/30 hover:bg-bg-card-hover cursor-pointer"
      }`}
    >
      {platform === "ios" ? (
        <svg className="w-6 h-6 text-text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.27-.86-.31-.16-.69-.04-.86.27l-1.87 3.23c-1.38-.59-2.87-.92-4.44-.92s-3.06.33-4.44.92L5.73 5.71c-.17-.31-.55-.43-.86-.27-.31.17-.43.55-.27.86L6.44 9.48C2.94 11.24.63 14.48 0 18.3h24c-.63-3.82-2.94-7.06-6.4-8.82zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
        </svg>
      )}
      <div className="text-left">
        <p className="text-[10px] text-text-muted leading-none">
          {disabled ? "Coming soon on" : "Download on the"}
        </p>
        <p className="text-sm font-semibold text-text-primary leading-tight">
          {platform === "ios" ? "App Store" : "Google Play"}
        </p>
      </div>
    </div>
  );

  if (disabled || !url) return content;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}
