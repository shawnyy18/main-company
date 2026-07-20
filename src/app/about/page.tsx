import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about FSK Codehouse Corp., a Philippine software company building real-estate systems, digital commerce, and web and mobile products.",
};

const values = [
  {
    title: "Quality over quantity",
    text: "We would rather ship one excellent product than spread attention across things that should not exist.",
  },
  {
    title: "Fast, deliberate shipping",
    text: "We move quickly, but keep the foundations boring in the best way: maintainable code, clear UX, and stable releases.",
  },
  {
    title: "User-first decisions",
    text: "Every feature earns its place by making the product easier, more useful, or more trustworthy for real people.",
  },
  {
    title: "Built from the Philippines",
    text: "FSK Codehouse Corp. is based in the Philippines and builds products with global standards.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow px-5 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 inline-flex rounded-full border border-border-default bg-bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary">
            About us
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-text-primary md:text-6xl">
            We build useful software around real opportunities.
          </h1>

          <div className="mt-8 space-y-6 text-[17px] leading-8 text-text-secondary">
            <p>
              FSK Codehouse Corp. is a Philippine software company building
              real-estate platforms, digital commerce experiences, and web and
              mobile applications.
            </p>
            <p>
              We work in three ways: delivering software for clients, forming
              selective product partnerships, and creating products owned and
              operated by FSK Codehouse.
            </p>
            <p>
              We handle the full lifecycle from concept and design through
              engineering, testing, launch, and ongoing product support.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-border-default bg-bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {value.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border-default bg-bg-surface p-8 text-center md:p-10">
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary">
              Work with us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-text-secondary">
              Have a property business, digital product, or application you
              want to bring to market? Tell us where you are headed.
            </p>
            <a
              href="mailto:hello@fskcodehouse.com"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-600"
            >
              hello@fskcodehouse.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
