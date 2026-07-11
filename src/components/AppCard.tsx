import Link from "next/link";
import Image from "next/image";
import type { AppData } from "@/lib/apps";

const statusStyles: Record<string, { label: string; className: string }> = {
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  },
  live: {
    label: "Live",
    className: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  },
  beta: {
    label: "Beta",
    className: "bg-sky-400/10 text-sky-400 border-sky-400/20",
  },
};

const iconColorMap: Record<string, string> = {
  amber: "from-amber-400 to-amber-600",
  blue: "from-blue-400 to-blue-600",
  emerald: "from-emerald-400 to-emerald-600",
  violet: "from-violet-400 to-violet-600",
  rose: "from-rose-400 to-rose-600",
  sky: "from-sky-400 to-sky-600",
  teal: "from-teal-400 to-teal-600",
};

export default function AppCard({ app }: { app: AppData }) {
  const status = statusStyles[app.status] ?? statusStyles["coming-soon"];
  const gradient = iconColorMap[app.iconColor] ?? iconColorMap.amber;

  return (
    <Link
      href={`/apps/${app.slug}`}
      id={`app-card-${app.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border-default bg-bg-card p-6 transition-all duration-300 hover:bg-bg-card-hover hover:border-amber-400/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/5"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon + Status row */}
        <div className="flex items-start justify-between mb-5">
          {app.iconImage ? (
            <Image
              src={app.iconImage}
              alt={`${app.name} icon`}
              width={56}
              height={56}
              className="w-14 h-14 rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-bg-primary font-bold text-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
            >
              {app.name.charAt(0)}
            </div>
          )}
          <span
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        {/* Info */}
        <h3 className="text-lg font-semibold text-text-primary mb-1.5 group-hover:text-accent transition-colors duration-200">
          {app.name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-grow">
          {app.tagline}
        </p>

        {/* Platforms */}
        <div className="flex gap-2">
          {app.platforms.includes("ios") && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-text-muted bg-bg-surface px-2.5 py-1 rounded-md border border-border-subtle">
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              iOS
            </span>
          )}
          {app.platforms.includes("android") && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-text-muted bg-bg-surface px-2.5 py-1 rounded-md border border-border-subtle">
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.27-.86-.31-.16-.69-.04-.86.27l-1.87 3.23c-1.38-.59-2.87-.92-4.44-.92s-3.06.33-4.44.92L5.73 5.71c-.17-.31-.55-.43-.86-.27-.31.17-.43.55-.27.86L6.44 9.48C2.94 11.24 .63 14.48 0 18.3h24c-.63-3.82-2.94-7.06-6.4-8.82zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
              </svg>
              Android
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
