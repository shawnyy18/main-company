import Link from "next/link";
import Image from "next/image";
import type { AppData } from "@/lib/apps";

const statusLabels: Record<string, string> = {
  "coming-soon": "Coming soon",
  live: "Live",
  beta: "Beta",
};

/**
 * Rendered on the dark products section, so colours are set against ink
 * rather than paper.
 */
export default function AppCard({ app }: { app: AppData }) {
  const status = statusLabels[app.status] ?? statusLabels["coming-soon"];

  return (
    <Link
      href={`/apps/${app.slug}`}
      id={`app-card-${app.slug}`}
      className="group flex h-full flex-col border border-white/15 p-6 transition-colors duration-300 hover:border-white/40"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        {app.iconImage ? (
          <Image
            src={app.iconImage}
            alt={`${app.name} app icon`}
            width={56}
            height={56}
            className="h-14 w-14 object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center bg-white/10 text-xl font-medium text-white">
            {app.name.charAt(0)}
          </div>
        )}
        <span className="border border-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">
          {status}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="display text-2xl text-white">{app.name}</h3>
        <p className="mt-3 text-sm leading-6 text-white/60">
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
    <span className="inline-flex items-center border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60">
      {label}
    </span>
  );
}
