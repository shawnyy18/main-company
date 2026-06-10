"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle backdrop-blur-xl bg-bg-primary/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-bg-primary font-bold text-sm transition-transform duration-300 group-hover:scale-110">
            F
          </div>
          <span className="font-semibold text-text-primary tracking-tight text-[15px]">
            FSK Codehouse
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#products"
            className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle"
        >
          <span
            className={`block w-5 h-0.5 bg-text-secondary transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-secondary transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-secondary transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-border-subtle bg-bg-primary/95 backdrop-blur-xl overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <Link
            href="/#products"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            Products
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            About
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
