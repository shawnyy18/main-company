import Link from "next/link";
import { apps } from "@/lib/apps";
import { featuredProjects } from "@/lib/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";
import ProjectRow from "@/components/ProjectRow";
import ProjectLeadForm from "@/components/ProjectLeadForm";
import Reveal from "@/components/Reveal";
import WorkShowcase from "@/components/WorkShowcase";

const services = [
  {
    number: "01",
    title: "Real-estate websites and listing systems",
    description:
      "Property sites, searchable inventory, agent pages, and the inquiry flow behind them. Built so listings can be kept current without a developer.",
    deliverables: ["Listing management", "Agent pages", "Lead capture"],
  },
  {
    number: "02",
    title: "Web and mobile applications",
    description:
      "Production software for clients, co-build partnerships, and FSK-owned ideas — from product strategy through launch and iteration.",
    deliverables: ["iOS apps", "Web platforms", "Product partnerships"],
  },
];

const engagementModels = [
  {
    label: "Build for you",
    title: "A clear scope, professionally delivered.",
    text: "You own the business vision. We turn it into a working website, catalogue, or application.",
  },
  {
    label: "Build with you",
    title: "A product partnership with shared ambition.",
    text: "For strong ideas and aligned founders, we can explore a deeper technical and product partnership.",
  },
  {
    label: "Built by FSK",
    title: "Original products we operate and grow.",
    text: "We also create our own software, using what we learn from real users to build better products over time.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Reveal />

      <main className="flex-grow">
        {/* Hero */}
        <section className="px-5 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-40 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">001 — Philippines</p>
            <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] md:items-end md:gap-14">
              <h1 className="display text-[3.25rem] text-text-primary sm:text-7xl lg:text-[5.75rem]">
                Real-estate platforms and mobile products.
              </h1>
              <div className="md:pb-3">
                <p className="text-[17px] leading-8 text-text-secondary">
                  We build the systems businesses actually run on, and ship our
                  own apps to the App Store.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-text-secondary"
                  >
                    See the work
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center border border-border-default px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-text-primary"
                  >
                    Start a project
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-14 md:mt-16">
              <WorkShowcase projects={featuredProjects} />
            </div>
          </div>
        </section>

        {/* Selected work */}
        <section id="work" className="scroll-mt-20 px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="eyebrow">002 — Selected work</p>
              <Link
                href="/work"
                className="border-b border-border-default pb-0.5 text-sm text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
              >
                All work
              </Link>
            </div>

            <div className="reveal mt-10 border-b border-border-default">
              {featuredProjects.map((project, index) => (
                <ProjectRow key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-20 px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">003 — Services</p>
            <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-14">
              <h2 className="display text-4xl text-text-primary md:text-6xl">
                Two things, done properly.
              </h2>
              <p className="text-[15px] leading-7 text-text-secondary md:pb-2">
                Every engagement starts with the business result, not a list of
                technologies.
              </p>
            </div>

            <div className="reveal mt-12 grid border-t border-border-default md:grid-cols-2">
              {services.map((service, index) => (
                <article
                  key={service.number}
                  className={`border-b border-border-default py-9 md:border-b-0 ${
                    index === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10"
                  }`}
                >
                  <p className="font-mono text-xs text-text-muted">
                    {service.number}
                  </p>
                  <h3 className="display mt-4 text-2xl text-text-primary md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-text-secondary">
                    {service.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.deliverables.map((deliverable) => (
                      <span
                        key={deliverable}
                        className="border border-border-default px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-secondary"
                      >
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section id="partnerships" className="scroll-mt-20 px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">004 — How we work</p>
            <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
              <h2 className="display text-4xl text-text-primary md:text-5xl">
                The right model for the right idea.
              </h2>
              <div className="reveal border-t border-border-default">
                {engagementModels.map((model) => (
                  <article
                    key={model.label}
                    className="grid gap-2 border-b border-border-default py-6 sm:grid-cols-[9rem_1fr] sm:gap-7"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      {model.label}
                    </p>
                    <div>
                      <h3 className="text-lg font-medium text-text-primary">
                        {model.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">
                        {model.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="scroll-mt-20 bg-ink px-5 py-16 text-white sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/45">
              005 — FSK products
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-14">
              <h2 className="display text-4xl md:text-6xl">
                Software we own and operate.
              </h2>
              <p className="text-[15px] leading-7 text-white/60 md:pb-2">
                Running our own products keeps us close to the realities of
                launching, supporting, and growing software — not just
                delivering it.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
            </div>
          </div>
        </section>

        {/* Credibility */}
        <section className="px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 border-y border-border-default py-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Registered</p>
              <p className="mt-3 text-[15px] leading-7 text-text-secondary">
                DTI registered business · BN No. 8395635 · Valid to August 2031
              </p>
            </div>
            <div>
              <p className="eyebrow">Based in</p>
              <p className="mt-3 text-[15px] leading-7 text-text-secondary">
                The Philippines, working with clients across time zones
              </p>
            </div>
            <div>
              <p className="eyebrow">Shipping since</p>
              <p className="mt-3 text-[15px] leading-7 text-text-secondary">
                Live client sites and an app on the App Store
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 px-5 pb-24 sm:px-6 md:pb-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">006 — Start here</p>
            <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
              <div>
                <h2 className="display text-4xl text-text-primary md:text-5xl">
                  Tell us what you want to launch or improve.
                </h2>
                <p className="mt-5 text-[17px] leading-8 text-text-secondary">
                  We&apos;ll help identify the right first version and a
                  practical path from concept to release.
                </p>
                <p className="mt-7 text-sm leading-6 text-text-secondary">
                  Prefer email?{" "}
                  <a
                    className="border-b border-text-primary pb-0.5 text-text-primary"
                    href="mailto:hello@fskcodehouse.com?subject=Project%20inquiry"
                  >
                    hello@fskcodehouse.com
                  </a>
                </p>
              </div>
              <ProjectLeadForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
