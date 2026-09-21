import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about FSK Codehouse, a Philippine software studio building real-estate platforms and web and mobile applications.",
};

const values = [
  {
    number: "01",
    title: "Quality over quantity",
    text: "We would rather ship one excellent product than spread attention across things that should not exist.",
  },
  {
    number: "02",
    title: "Fast, deliberate shipping",
    text: "We move quickly, but keep the foundations boring in the best way: maintainable code, clear interfaces, and stable releases.",
  },
  {
    number: "03",
    title: "User-first decisions",
    text: "Every feature earns its place by making the product easier, more useful, or more trustworthy for real people.",
  },
  {
    number: "04",
    title: "Built from the Philippines",
    text: "FSK Codehouse is based in the Philippines and builds products to global standards.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow px-5 pb-24 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">About</p>
          <h1 className="display mt-6 max-w-4xl text-[3.25rem] text-text-primary md:text-[5.25rem]">
            We build useful software around real opportunities.
          </h1>

          <div className="mt-10 grid gap-10 border-t border-border-default pt-10 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:gap-16">
            <p className="eyebrow">Who we are</p>
            <div className="lede space-y-6">
              <p>
                FSK Codehouse is a Philippine software studio building
                real-estate platforms and web and mobile applications.
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
          </div>

          <div className="mt-14 grid gap-10 border-t border-border-default pt-10 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:gap-16">
            <p className="eyebrow">How we think</p>
            <div className="border-t border-border-default">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="grid gap-2 border-b border-border-default py-6 sm:grid-cols-[3rem_1fr] sm:gap-6"
                >
                  <p className="font-mono text-xs text-text-muted">
                    {value.number}
                  </p>
                  <div>
                    <h2 className="text-lg font-medium text-text-primary">
                      {value.title}
                    </h2>
                    <p className="mt-2 text-[15px] leading-[1.7] text-text-secondary">
                      {value.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-10 border-t border-border-default pt-10 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:gap-16">
            <p className="eyebrow">Registration</p>
            <div>
              <p className="lede">
                FSK Codehouse is a registered Philippine business. Our business
                name, F.S.K Codehouse Software Development Services, is
                registered with the Department of Trade and Industry under BN
                No. 8395635, valid to August 3, 2031.
              </p>
              <p className="mt-4 text-[15px] leading-[1.7] text-text-muted">
                Registration can be verified through the DTI Business Name
                Registration System.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-border-default pt-12">
            <h2 className="display max-w-2xl text-[2.75rem] text-text-primary md:text-[3.5rem]">
              Work with us
            </h2>
            <p className="lede mt-5 max-w-xl">
              Have a property business or an application you want to bring to
              market? Tell us where you are headed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center bg-ink px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-text-secondary"
              >
                Start a project
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center border border-border-default px-7 py-3.5 text-[15px] font-medium text-text-primary transition-colors hover:border-text-primary"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
