import Link from "next/link";
import { apps } from "@/lib/apps";

export default function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-text-primary text-sm font-semibold text-white">
                F
              </span>
              <span className="text-sm font-semibold tracking-tight text-text-primary">
                FSK Codehouse Corp.
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-text-secondary">
              A Philippine-based software company building mobile apps and
              digital products people actually use.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              Product
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/#products"
                className="text-sm text-text-secondary transition-colors hover:text-accent"
              >
                Apps
              </Link>
              {apps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/apps/${app.slug}`}
                  className="text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  {app.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              Legal
            </h2>
            <div className="flex flex-col gap-3">
              {apps.map((app) => (
                <div key={app.slug} className="flex flex-col gap-3">
                  <Link
                    href={`/apps/${app.slug}/privacy`}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    Privacy
                  </Link>
                  <Link
                    href={`/apps/${app.slug}/terms`}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    Terms
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              Contact
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="text-sm text-text-secondary transition-colors hover:text-accent"
              >
                About
              </Link>
              <a
                href="mailto:hello@fskcodehouse.com"
                className="text-sm text-text-secondary transition-colors hover:text-accent"
              >
                hello@fskcodehouse.com
              </a>
              <a
                href="https://x.com"
                className="text-sm text-text-muted transition-colors hover:text-accent"
                aria-label="Social link placeholder"
              >
                Social slot
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-default pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} FSK Codehouse Corp. All rights
            reserved.
          </p>
          <p>Made in the Philippines.</p>
        </div>
      </div>
    </footer>
  );
}
