import Link from "next/link";
import Image from "next/image";
import { apps } from "@/lib/apps";
import { sortedProjects } from "@/lib/projects";
import { companyLinks } from "@/lib/company";
import ManageCookiesButton from "@/components/ManageCookiesButton";

export default function Footer() {
  return (
    <footer className="border-t border-border-default">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
              <Image
                src="/fsk-logo-icon.png"
                alt="FSK Codehouse logo"
                width={32}
                height={32}
                className="h-8 w-8 object-cover"
              />
              <span className="text-sm font-medium tracking-tight text-text-primary">
                FSK Codehouse
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-text-secondary">
              A Philippine software studio building real-estate platforms and
              web and mobile applications.
            </p>
          </div>

          <div>
            <h2 className="eyebrow mb-4">Work</h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/work"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                All work
              </Link>
              {sortedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow mb-4">Company</h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/#services"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                Services
              </Link>
              <Link
                href="/#partnerships"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                How we work
              </Link>
              <Link
                href="/blog"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                About
              </Link>
            </div>
          </div>

          <div>
            <h2 className="eyebrow mb-4">Legal</h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                Website privacy
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                Cookie Policy
              </Link>
              <ManageCookiesButton />
              {apps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/apps/${app.slug}/terms`}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {app.name} terms
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow mb-4">Contact</h2>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@fskcodehouse.com"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                hello@fskcodehouse.com
              </a>
              <a
                href={companyLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                Facebook
              </a>
              <a
                href={companyLinks.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Registration details. Kept to the business name and registration
            number — the certificate itself is not published. */}
        <div className="mt-12 border-t border-border-default pt-6 text-xs leading-6 text-text-muted">
          <p>
            Registered with the Philippine Department of Trade and Industry as
            F.S.K Codehouse Software Development Services · BN No. 8395635 ·
            Valid to August 3, 2031.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FSK Codehouse. All rights reserved.</p>
          <p>Made in the Philippines.</p>
        </div>
      </div>
    </footer>
  );
}
