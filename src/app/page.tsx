import Image from "next/image";
import Link from "next/link";
import { apps } from "@/lib/apps";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";

const trustStats = [
  { value: "PH", label: "Based in the Philippines" },
  { value: "1", label: "Focused product in launch prep" },
  { value: "A-Z", label: "From idea to App Store" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow">
        <section className="px-5 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="mb-6 inline-flex rounded-full border border-border-default bg-bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary">
                Philippine-based software company
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                We build apps people actually use.
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-8 text-text-secondary sm:text-lg">
                FSK Codehouse Corp. designs and ships mobile apps and digital
                products from first sketch to App Store launch. Clean code,
                thoughtful interfaces, and real user value.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-600"
                >
                  View apps
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-border-default bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-accent"
                >
                  About FSK Codehouse
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="rounded-[2rem] border border-border-default bg-white p-3 shadow-[var(--shadow-card)]">
                <Image
                  src="/LensoCamera (1242 x 2688 px)/1 (2).png"
                  alt="Lenso fresh moments feed shown on an iPhone"
                  width={1242}
                  height={2688}
                  priority
                  className="h-auto max-h-[720px] w-full rounded-[1.5rem] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="bg-bg-surface px-5 py-18 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold text-accent">
                  Our products
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                  Apps with a clear reason to exist.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-text-secondary md:text-base">
                Each product is shaped around a real workflow, a focused user,
                and a launch path we can support for the long run.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl border border-border-default bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                  Small team, product-grade execution.
                </h2>
                <p className="mt-4 text-[17px] leading-8 text-text-secondary">
                  We focus on products we can design, build, launch, and keep
                  improving. The work is practical, polished, and grounded in
                  what people will actually open again tomorrow.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                {trustStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border-default bg-bg-surface p-4"
                  >
                    <p className="text-2xl font-semibold text-text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-20 sm:px-6 md:pb-28 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border-default bg-bg-card p-8 text-center shadow-[var(--shadow-card)] md:p-12">
            <p className="text-sm font-semibold text-accent">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              Have a product idea or partnership in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-text-secondary">
              Send a note and we&apos;ll get back to you with a clear next step.
            </p>
            <a
              href="mailto:hello@fskcodehouse.com"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-600"
            >
              hello@fskcodehouse.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
