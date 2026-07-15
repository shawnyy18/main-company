import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex flex-grow items-center justify-center px-5 py-32 sm:px-6">
        <div className="max-w-md rounded-2xl border border-border-default bg-bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <p className="mb-4 text-7xl font-semibold tracking-tight text-text-primary md:text-8xl">
            404
          </p>
          <h1 className="mb-3 text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
            Page not found
          </h1>
          <p className="mx-auto mb-8 text-sm leading-6 text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-600"
          >
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
