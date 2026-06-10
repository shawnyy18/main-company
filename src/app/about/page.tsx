import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about FSK Codehouse Corp. — a Philippine-based software company building mobile apps and digital products people actually use.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="relative z-10 flex-grow pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Ambient glow */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-dim border border-border-default text-accent text-xs font-medium mb-8">
              About Us
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
              We&apos;re{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                FSK Codehouse Corp.
              </span>
            </h1>

            <div className="space-y-6 text-text-secondary leading-relaxed text-base md:text-lg">
              <p>
                FSK Codehouse Corp. is a Philippine-based software company that
                builds mobile apps and digital products. We&apos;re a small,
                focused team that believes in doing fewer things, but doing them
                exceptionally well.
              </p>

              <p>
                Every product we build starts with a simple question:{" "}
                <span className="text-text-primary font-medium">
                  &ldquo;Would we use this ourselves?&rdquo;
                </span>{" "}
                If the answer is no, we don&apos;t build it. This philosophy
                keeps us honest and our products genuine.
              </p>

              <p>
                We handle the full lifecycle — from concept and design, through
                engineering and testing, all the way to the App Store and Play
                Store. Our stack is modern, our code is clean, and our apps are
                built to last.
              </p>
            </div>

            {/* Values */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: "✦",
                  title: "Quality Over Quantity",
                  text: "We'd rather ship one great app than ten mediocre ones. Every pixel and every line of code matters.",
                },
                {
                  icon: "⚡",
                  title: "Ship Fast, Ship Right",
                  text: "We move quickly without cutting corners. Rapid iteration with a commitment to solid engineering.",
                },
                {
                  icon: "🤝",
                  title: "User-First",
                  text: "Our users aren't metrics — they're real people. We build for them, listen to them, and respect their data.",
                },
                {
                  icon: "🇵🇭",
                  title: "Proudly Filipino",
                  text: "Based in the Philippines, building for the world. Global standards, local heart.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border-default bg-bg-card p-6 hover:border-amber-400/30 transition-colors duration-300"
                >
                  <span className="text-2xl mb-3 block">{value.icon}</span>
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-16 rounded-2xl border border-border-default bg-bg-card p-8 text-center">
              <h2 className="text-xl font-bold mb-3">Work with us</h2>
              <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
                Interested in what we do? Have an idea you want to bring to
                life? We&apos;d love to hear from you.
              </p>
              <a
                href="mailto:hello@fskcodehouse.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-bg-primary font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-400/20"
              >
                hello@fskcodehouse.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
