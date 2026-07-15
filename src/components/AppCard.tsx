import Link from "next/link";
import Image from "next/image";
import type { AppData } from "@/lib/apps";

const statusStyles: Record<string, { label: string; className: string }> = {
  "coming-soon": {
    label: "Coming soon",
    className: "bg-accent-soft text-accent border-indigo-100",
  },
  live: {
    label: "Live",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  beta: {
    label: "Beta",
    className: "bg-sky-50 text-sky-700 border-sky-100",
  },
};

export default function AppCard({ app }: { app: AppData }) {
  const status = statusStyles[app.status] ?? statusStyles["coming-soon"];

  return (
    <Link
      href={`/apps/${app.slug}`}
      id={`app-card-${app.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border-default bg-bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_24px_70px_rgba(79,70,229,0.14)]"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        {app.iconImage ? (
          <Image
            src={app.iconImage}
            alt={`${app.name} app icon`}
            width={60}
            height={60}
            className="h-[60px] w-[60px] rounded-2xl shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-accent text-xl font-semibold text-white shadow-sm">
            {app.name.charAt(0)}
          </div>
        )}
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-semibold tracking-tight text-text-primary">
          {app.name}
        </h3>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {app.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {app.platforms.includes("ios") && <PlatformBadge label="iOS" />}
          {app.platforms.includes("android") && (
            <PlatformBadge label="Android" />
          )}
        </div>
      </div>
    </Link>
  );
}

function PlatformBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-default bg-bg-surface px-3 py-1 text-xs font-medium text-text-secondary">
      {label}
    </span>
  );
}
