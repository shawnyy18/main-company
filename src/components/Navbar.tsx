"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-default bg-bg-primary/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/fsk-logo-icon.png"
            alt="FSK Codehouse logo"
            width={32}
            height={32}
            className="h-8 w-8 object-cover"
            priority
          />
          <span className="text-[15px] font-medium tracking-tight text-text-primary">
            FSK Codehouse
          </span>
        </Link>

        {/* Six items plus the CTA no longer fit at 768px, so the inline nav
            starts at lg; tablets get the same slide-down menu as phones. */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-text-secondary"
          >
            Start a project
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center border border-border-default text-text-primary lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          id="mobile-menu-toggle"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border-default bg-bg-primary transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-border-subtle py-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center justify-center bg-ink px-4 py-3 text-sm font-medium text-white"
          >
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}
