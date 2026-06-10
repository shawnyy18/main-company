import Link from "next/link";
import { apps } from "@/lib/apps";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle bg-bg-primary/60">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-bg-primary font-bold text-xs">
                F
              </div>
              <span className="font-semibold text-text-primary text-sm tracking-tight">
                FSK Codehouse Corp.
              </span>
            </div>
            <p className="text-text-muted text-xs leading-relaxed max-w-xs">
              A Philippine-based software company building mobile apps and
              digital products people actually use.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              Company
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                href="/#products"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                Products
              </Link>
            </div>
          </div>

          {/* App Legal Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-2.5">
              {apps.map((app) => (
                <div key={app.slug} className="flex flex-col gap-1.5">
                  <span className="text-xs text-text-muted">{app.name}</span>
                  <div className="flex gap-4 pl-2">
                    <Link
                      href={`/apps/${app.slug}/privacy`}
                      className="text-xs text-text-secondary hover:text-accent transition-colors"
                    >
                      Privacy
                    </Link>
                    <Link
                      href={`/apps/${app.slug}/terms`}
                      className="text-xs text-text-secondary hover:text-accent transition-colors"
                    >
                      Terms
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} FSK Codehouse Corp. All rights
            reserved.
          </p>
          <p className="text-xs text-text-muted">
            Made with 🇵🇭 in the Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
