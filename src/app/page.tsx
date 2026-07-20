import Image from "next/image";
import { apps } from "@/lib/apps";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";
import { companyLinks } from "@/lib/company";

const services = [
  {
    number: "01",
    title: "Real-estate websites & listing systems",
    description:
      "High-converting property websites, searchable listings, agent pages, inquiry flows, and the tools needed to keep inventory current.",
    deliverables: ["Landing pages", "Listing management", "Lead capture"],
  },
  {
    number: "02",
    title: "Digital product commerce",
    description:
      "Focused storefronts for templates, downloads, memberships, and other digital goods, built around a clean buying experience.",
    deliverables: ["Product storefronts", "Payments", "Digital delivery"],
  },
  {
    number: "03",
    title: "Web & mobile applications",
    description:
      "Production-ready software for clients, co-build partnerships, and FSK-owned ideas, from product strategy through launch and iteration.",
    deliverables: ["iOS apps", "Web platforms", "Product partnerships"],
  },
];

const engagementModels = [
  {
    label: "Build for you",
    title: "A clear scope, professionally delivered.",
    text: "You own the business vision. We turn it into a polished website, commerce experience, or application.",
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

      <main className="flex-grow">
        <section className="overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div>
              <p className="mb-6 inline-flex rounded-full border border-border-default bg-bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary">
                Philippine software company · Built for real business
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                We turn ideas into software people can use.
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-8 text-text-secondary sm:text-lg">
                FSK Codehouse builds real-estate platforms, digital product
                storefronts, and web and mobile apps for clients, partners, and
                our own portfolio.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-600"
                >
                  Explore our services
                </a>
                <a
                  href="mailto:hello@fskcodehouse.com?subject=Project inquiry"
                  className="inline-flex items-center justify-center rounded-full border border-border-default bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-accent"
                >
                  Start a conversation
                </a>
              </div>
            </div>

            <CompanyPreview />
          </div>
        </section>

        <section id="services" className="border-y border-border-default bg-bg-surface px-5 py-18 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold text-accent">What we do</p>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                  Three focused ways we create value.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-text-secondary md:justify-self-end md:text-base">
                We combine product thinking, interface design, engineering, and
                launch support. Every engagement starts with the business result,
                not a list of technologies.
              </p>
            </div>

            <div className="grid border-y border-border-default md:grid-cols-3 md:divide-x md:divide-border-default">
              {services.map((service) => (
                <article key={service.number} className="border-b border-border-default py-8 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0">
                  <p className="text-xs font-semibold text-accent">{service.number}</p>
                  <h3 className="mt-5 text-xl font-semibold leading-7 text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    {service.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.deliverables.map((deliverable) => (
                      <span key={deliverable} className="rounded-full border border-border-default bg-white px-3 py-1.5 text-xs font-medium text-text-secondary">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="partnerships" className="px-5 py-18 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold text-accent">How we work</p>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                  The right model for the right idea.
                </h2>
                <p className="mt-5 text-[17px] leading-8 text-text-secondary">
                  FSK Codehouse is both a software partner and a product company.
                  That gives us room to deliver client work, form selective
                  partnerships, and invest in products of our own.
                </p>
              </div>
              <div className="divide-y divide-border-default border-y border-border-default">
                {engagementModels.map((model) => (
                  <article key={model.label} className="grid gap-3 py-7 sm:grid-cols-[130px_1fr] sm:gap-7">
                    <p className="text-xs font-semibold uppercase text-accent">{model.label}</p>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{model.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{model.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="bg-[#111318] px-5 py-18 text-white sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold text-amber-300">FSK products</p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                  Software we believe should exist.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/60 md:text-base">
                Our owned products keep us close to the realities of launching,
                supporting, and growing software, not just delivering it.
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
          <div className="mx-auto grid max-w-7xl gap-8 border-b border-border-default pb-16 md:grid-cols-[1.35fr_0.65fr] md:items-end md:pb-20">
            <div>
              <p className="text-sm font-semibold text-accent">One accountable team</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                Strategy, design, engineering, and launch stay connected.
              </h2>
            </div>
            <p className="text-sm leading-7 text-text-secondary md:text-base">
              We keep the work close to the people making it, communicate clearly,
              and build foundations that can improve after launch.
            </p>
          </div>
        </section>

        <section id="contact" className="px-5 pb-20 sm:px-6 md:pb-28 lg:px-8">
          <div className="mx-auto max-w-7xl bg-accent px-7 py-10 text-white sm:px-10 md:flex md:items-center md:justify-between md:gap-10 md:px-14 md:py-14">
            <div>
              <p className="text-sm font-semibold text-indigo-100">Start with the idea</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
                Tell us what you want to launch, improve, or sell.
              </h2>
              <p className="mt-4 max-w-2xl text-[17px] leading-8 text-indigo-100">
                We&apos;ll help identify the right first version and a practical path
                from concept to release.
              </p>
            </div>
            <div className="mt-7 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0 md:flex-col">
              <a
                href="mailto:hello@fskcodehouse.com?subject=Project inquiry"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent transition-all hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                hello@fskcodehouse.com
              </a>
              <a
                href={companyLinks.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
                aria-label="Visit FSK Codehouse Corp. on LinkedIn"
              >
                Follow us on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function CompanyPreview() {
  return (
    <div className="company-preview relative mx-auto w-full max-w-[650px]" aria-label="Animated preview of FSK Codehouse services">
      <div className="relative overflow-hidden border border-white/10 bg-[#111318] shadow-[0_28px_80px_rgba(15,17,21,0.2)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="codehouse-mark relative flex h-11 w-11 items-center justify-center">
              <span className="codehouse-mark-ring" />
              <Image src="/fsk-logo-icon.png" alt="" width={36} height={36} className="relative z-10 h-9 w-9 object-cover" priority />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">FSK Codehouse</p>
              <p className="text-xs text-white/45">Ideas → useful products</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            Building
          </div>
        </div>

        <div className="grid min-h-[430px] sm:grid-cols-[150px_1fr]">
          <div className="flex border-b border-white/10 sm:block sm:border-b-0 sm:border-r">
            {[
              ["01", "Property"],
              ["02", "Commerce"],
              ["03", "Applications"],
            ].map(([number, label], index) => (
              <div key={label} className={`preview-service preview-service-${index + 1} flex flex-1 items-center gap-2 border-r border-white/10 px-3 py-4 last:border-r-0 sm:border-b sm:border-r-0 sm:px-4 sm:py-5`}>
                <span className="text-[10px] font-semibold text-white/30">{number}</span>
                <span className="text-xs font-medium text-white/55">{label}</span>
              </div>
            ))}
          </div>

          <div className="relative min-h-[370px] overflow-hidden bg-[#171a20] p-4 sm:p-6">
            <div className="preview-grid absolute inset-0 opacity-30" />

            <div className="preview-window preview-property absolute inset-x-4 top-5 z-10 overflow-hidden border border-white/10 bg-white shadow-2xl sm:inset-x-8">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div className="h-2.5 w-20 bg-slate-900" />
                <div className="flex gap-2"><span className="h-2 w-8 bg-slate-200" /><span className="h-2 w-8 bg-slate-200" /></div>
              </div>
              <div className="grid grid-cols-[1.15fr_0.85fr]">
                <div className="bg-[#dfe8e3] p-4 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase text-emerald-800">Featured property</p>
                  <p className="mt-2 text-lg font-semibold leading-5 text-slate-900">Find a place that feels right.</p>
                  <div className="mt-4 flex h-8 items-center bg-white px-3 text-[9px] text-slate-400">City, property, or neighborhood</div>
                </div>
                <div className="relative overflow-hidden bg-[#b8c5bc]">
                  <div className="absolute bottom-0 left-[18%] h-[72%] w-[66%] bg-white/80" />
                  <div className="absolute bottom-0 left-[27%] h-[54%] w-[10%] bg-slate-700" />
                  <div className="absolute bottom-[24%] right-[28%] h-8 w-8 bg-sky-200" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 p-3">
                {["₱4.8M", "₱7.2M", "₱12M"].map((price) => <div key={price} className="border border-slate-100 p-2"><div className="mb-2 h-9 bg-slate-100" /><p className="text-[9px] font-semibold text-slate-700">{price}</p></div>)}
              </div>
            </div>

            <div className="preview-window preview-commerce absolute inset-x-4 top-5 z-20 overflow-hidden border border-white/10 bg-[#fffaf2] shadow-2xl sm:inset-x-8">
              <div className="flex items-center justify-between border-b border-amber-100 px-4 py-3">
                <p className="text-[10px] font-bold text-slate-900">NORTH / MARKET</p>
                <div className="h-5 w-5 rounded-full bg-amber-300" />
              </div>
              <div className="grid grid-cols-[0.9fr_1.1fr] p-4 sm:p-5">
                <div className="pr-3">
                  <p className="text-[9px] font-semibold uppercase text-amber-700">Digital collection</p>
                  <p className="mt-2 text-lg font-semibold leading-5 text-slate-900">Tools made to move ideas forward.</p>
                  <div className="mt-4 inline-flex bg-slate-900 px-3 py-2 text-[9px] font-semibold text-white">Browse products</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#e3d8ff] p-3"><div className="mx-auto h-16 w-12 bg-white shadow-sm" /><p className="mt-2 text-[8px] font-semibold text-slate-700">Brand Kit</p></div>
                  <div className="bg-[#cdebdc] p-3"><div className="mx-auto h-16 w-12 bg-slate-800 shadow-sm" /><p className="mt-2 text-[8px] font-semibold text-slate-700">Planner</p></div>
                </div>
              </div>
              <div className="mx-4 mb-4 flex items-center justify-between border-t border-amber-100 pt-3 text-[9px] text-slate-500"><span>Instant access</span><span>Secure checkout</span><span>Built to scale</span></div>
            </div>

            <div className="preview-window preview-app absolute inset-x-4 top-5 z-30 flex min-h-[285px] items-center justify-center overflow-hidden border border-white/10 bg-[#eaf4ff] shadow-2xl sm:inset-x-8">
              <div className="absolute left-5 top-5 max-w-[145px]">
                <p className="text-[9px] font-semibold uppercase text-indigo-700">Mobile product</p>
                <p className="mt-2 text-lg font-semibold leading-5 text-slate-900">A focused app, ready for real users.</p>
                <div className="mt-4 flex gap-2"><span className="h-2 w-10 bg-indigo-400" /><span className="h-2 w-6 bg-amber-400" /></div>
              </div>
              <div className="absolute -bottom-8 right-7 h-[250px] w-[124px] rounded-[24px] border-[5px] border-slate-900 bg-white p-2 shadow-xl">
                <div className="mx-auto mb-3 h-2 w-10 rounded-full bg-slate-900" />
                <div className="h-20 bg-gradient-to-br from-indigo-400 to-sky-300 p-3"><div className="h-5 w-5 bg-white/80" /></div>
                <div className="mt-3 space-y-2"><div className="h-2 w-16 bg-slate-800" /><div className="h-2 w-20 bg-slate-200" /><div className="h-2 w-12 bg-slate-200" /></div>
                <div className="mt-4 grid grid-cols-2 gap-2"><div className="h-11 bg-amber-200" /><div className="h-11 bg-indigo-100" /></div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 z-40 flex items-center gap-2 bg-[#111318] px-3 py-2 text-[10px] font-medium text-white shadow-lg sm:left-6">
              <span className="preview-status-dot h-2 w-2 rounded-full bg-emerald-300" />
              Designed. Built. Ready to grow.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
