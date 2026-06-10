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

      <main className="relative z-10 flex-grow flex items-center justify-center px-6 py-32">
        <div className="text-center">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <p className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-400/30 to-amber-400/5 mb-6">
              404
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Page not found
            </h1>
            <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-bg-primary font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-400/20"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
