import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    title: `${app.name} — ${app.tagline}`,
    description: app.description,
    openGraph: {
      title: `${app.name} by FSK Codehouse Corp.`,
      description: app.description,
      images: [
        {
          url: "/og-fsk.svg",
          width: 1200,
          height: 630,
          alt: `${app.name} product page`,
        },
      ],
    },
  };
}

const statusStyles: Record<string, { label: string; className: string }> = {
  "coming-soon": {
    label: "Coming soon",
    className: "border-sky-100 bg-sky-50 text-sky-700",
  },
  live: {
    label: "Live",
    className: "border-emerald-100 bg-emerald-50 text-emerald-700",
  },
  beta: {
    label: "Beta",
    className: "border-violet-100 bg-violet-50 text-violet-700",
  },
};

const screenshotSlots = [
  {
    src: "/LensoCamera (1242 x 2688 px)/1 (2).png",
    alt: "Lenso fresh moments feed with close friends",
  },
  {
    src: "/LensoCamera (1242 x 2688 px)/1.png",
    alt: "Lenso home screen widget on an iPhone",
  },
  {
    src: "/LensoCamera (1242 x 2688 px)/3.png",
    alt: "Lenso memories search screen",
  },
  {
    src: "/LensoCamera (1242 x 2688 px)/4.png",
    alt: "Lenso photo capture and send screen",
  },
  {
    src: "/LensoCamera (1242 x 2688 px)/5.png",
    alt: "Lenso private friends list",
  },
  {
    src: "/LensoCamera (1242 x 2688 px)/6.png",
    alt: "Lenso activity inbox for reactions and messages",
  },
  {
    src: "/LensoCamera (1242 x 2688 px)/7.png",
    alt: "Lenso one-on-one private chat",
  },
  {
    src: "/LensoCamera (1242 x 2688 px)/8.png",
    alt: "Lenso private group chat",
  },
];

const features = [
  {
    title: "Home-screen widget",
    text: "Keep up with close friends through widget updates that bring fresh moments to the surface.",
    icon: "M3.75 5.25A2.25 2.25 0 0 1 6 3h12a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25V5.25Zm3 1.5v5.25h10.5V6.75H6.75Zm0 8.25v2.25h4.5V15h-4.5Zm7.5 0v2.25h3V15h-3Z",
  },
  {
    title: "Private friend groups",
    text: "Share photos, captions, reactions, and group media only with the people you choose.",
    icon: "M8.25 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.5 0a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25ZM3.75 19.5a4.5 4.5 0 0 1 9 0v.75h-9v-.75Zm10.5.75v-.75a5.93 5.93 0 0 0-1.02-3.33 4.125 4.125 0 0 1 7.02 2.95v1.13h-6Z",
  },
  {
    title: "Time capsules",
    text: "Schedule moments for later so memories arrive when they matter most.",
    icon: "M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm.75 4.5a.75.75 0 0 0-1.5 0v4.06c0 .2.08.39.22.53l2.7 2.7a.75.75 0 0 0 1.06-1.06l-2.48-2.48V8.25Z",
  },
  {
    title: "One-on-one and group chat",
    text: "Send direct messages or keep the whole group in sync with private conversations.",
    icon: "M4.5 5.25A2.25 2.25 0 0 1 6.75 3h10.5a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 17.25 15H9l-4.5 3.75V5.25Zm4.5 3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Zm0 3a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H9Z",
  },
];

export default async function AppPage({ params }: { params: Params }) {
  const { appname } = await params;
  const app = getAppBySlug(appname);
  if (!app) notFound();

  const status = statusStyles[app.status] ?? statusStyles["coming-soon"];
  const isComingSoon = app.status === "coming-soon";

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        <section className="px-5 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-36 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <nav
              className="mb-10 flex items-center gap-2 text-xs text-text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
              <span>/</span>
              <span className="text-text-secondary">{app.name}</span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-7 flex items-center gap-4">
                  {app.iconImage ? (
                    <Image
                      src={app.iconImage}
                      alt={`${app.name} app icon`}
                      width={76}
                      height={76}
                      className="h-[76px] w-[76px] rounded-3xl shadow-sm ring-1 ring-black/5"
                    />
                  ) : (
                    <div className="flex h-[76px] w-[76px] items-center justify-center rounded-3xl bg-sky-500 text-2xl font-semibold text-white">
                      {app.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span
                      className={`mb-2 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                    <p className="text-sm font-medium text-text-secondary">
                      FSK Codehouse product
                    </p>
                  </div>
                </div>

                <h1 className="text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                  {app.name}
                </h1>
                <p className="mt-4 text-2xl font-medium tracking-tight text-text-primary">
                  {app.tagline}
                </p>
                <p className="mt-6 max-w-2xl text-[17px] leading-8 text-text-secondary sm:text-lg">
                  {app.description}
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-border-default bg-bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {screenshotSlots.slice(0, 3).map((slot, index) => (
                    <Image
                      key={slot.src}
                      src={slot.src}
                      alt={slot.alt}
                      width={1242}
                      height={2688}
                      priority={index === 0}
                      className="h-auto w-[172px] shrink-0 rounded-[1.35rem] shadow-sm ring-1 ring-black/5 sm:w-[205px]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg-surface px-5 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm font-semibold text-accent">
                Screenshots
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                A closer look at private sharing.
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-text-secondary">
                Home screen updates, fresh moments, searchable memories, and
                private chats all stay centered on the people you choose.
              </p>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4">
              {screenshotSlots.map((slot, index) => (
                <Image
                  key={slot.src}
                  src={slot.src}
                  alt={slot.alt}
                  width={1242}
                  height={2688}
                  priority={index === 0}
                  className="h-auto w-[226px] shrink-0 rounded-[1.6rem] shadow-[var(--shadow-card)] ring-1 ring-black/5 md:w-[278px]"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold text-accent">
                  Features
                </p>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                  Private sharing for the people closest to you.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-text-secondary md:text-base">
                Lenso brings moments, messages, groups, widgets, and time
                capsules into one calm private space.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-border-default bg-bg-card p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {feature.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-6 md:pb-28 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl border border-border-default bg-bg-surface p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                  Get ready for {app.name}.
                </h2>
                <p className="mt-4 max-w-2xl text-[17px] leading-8 text-text-secondary">
                  Lenso is preparing for launch on iOS. Follow the app page for
                  privacy, terms, support, and App Store availability.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <Link
                    href={`/apps/${app.slug}/privacy`}
                    className="text-text-secondary transition-colors hover:text-accent"
                  >
                    Privacy
                  </Link>
                  <Link
                    href={`/apps/${app.slug}/terms`}
                    className="text-text-secondary transition-colors hover:text-accent"
                  >
                    Terms
                  </Link>
                  <Link
                    href={`/apps/${app.slug}/support`}
                    className="text-text-secondary transition-colors hover:text-accent"
                  >
                    Support
                  </Link>
                </div>
              </div>
              {app.platforms.includes("ios") && (
                <StoreButton
                  platform="ios"
                  url={app.appStoreUrl}
                  disabled={isComingSoon}
                />
              )}
            </div>
          </div>
        </section>
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
      className={`inline-flex min-w-[180px] items-center gap-3 rounded-full border px-5 py-3.5 text-left transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed border-border-default bg-white text-text-muted opacity-70"
          : "cursor-pointer border-text-primary bg-text-primary text-white hover:-translate-y-0.5 hover:bg-black"
      }`}
    >
      {platform === "ios" ? (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.27-.86-.31-.16-.69-.04-.86.27l-1.87 3.23c-1.38-.59-2.87-.92-4.44-.92s-3.06.33-4.44.92L5.73 5.71c-.17-.31-.55-.43-.86-.27-.31.17-.43.55-.27.86L6.44 9.48C2.94 11.24.63 14.48 0 18.3h24c-.63-3.82-2.94-7.06-6.4-8.82zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
        </svg>
      )}
      <span>
        <span className="block text-[10px] leading-none opacity-75">
          {disabled ? "Coming soon on" : "Download on the"}
        </span>
        <span className="mt-1 block text-sm font-semibold leading-tight">
          {platform === "ios" ? "App Store" : "Google Play"}
        </span>
      </span>
    </div>
  );

  if (disabled || !url) return content;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}
