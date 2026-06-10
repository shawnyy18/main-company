import { apps } from "@/lib/apps";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="relative z-10 flex-grow">
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Ambient glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-dim border border-border-default text-accent text-xs font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Philippine-based software company
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                We build apps
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  people actually use.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-10">
                FSK Codehouse Corp. designs and ships mobile apps and digital
                products — from idea to App Store. Clean code. Real users.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-bg-primary font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 hover:-translate-y-0.5"
                >
                  View Our Apps
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                  </svg>
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-text-secondary font-medium text-sm hover:border-amber-400/40 hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section id="products" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Our Products
              </h2>
              <p className="text-text-secondary text-sm max-w-md">
                Apps we&apos;re building and shipping. Each one solves a real
                problem for real people.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {apps.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </div>
          </div>
        </section>

        {/* About strip */}
        <section className="py-20 px-6 border-t border-border-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                About FSK Codehouse
              </h2>
              <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                FSK Codehouse Corp. is a Philippine-based software company
                focused on building mobile apps and digital products that solve
                real-world problems. We believe in clean design, solid
                engineering, and shipping products that people actually want to
                use every day. From concept to App Store — we handle the entire
                journey.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 px-6 border-t border-border-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-lg mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                Have a question, partnership idea, or just want to say hi?
              </p>
              <a
                href="mailto:hello@fskcodehouse.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-accent font-medium text-sm hover:border-amber-400/40 hover:bg-accent-dim transition-all duration-300"
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                hello@fskcodehouse.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
