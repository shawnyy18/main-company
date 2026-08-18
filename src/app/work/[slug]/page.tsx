import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  sortedProjects,
} from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Work" };

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} — FSK Codehouse`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const others = sortedProjects.filter((item) => item.slug !== project.slug);

  return (
    <>
      <Navbar />

      <main className="flex-grow px-5 pb-24 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <article className="mx-auto max-w-6xl">
          <Link
            href="/work"
            className="font-mono text-xs text-text-muted transition-colors hover:text-text-primary"
          >
            ← All work
          </Link>

          <header className="mt-8 grid gap-8 border-b border-border-default pb-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] md:gap-16">
            <div>
              <p className="eyebrow">
                {project.category} · {project.year}
              </p>
              <h1 className="display mt-5 text-5xl text-text-primary md:text-7xl">
                {project.name}
              </h1>
              {project.client ? (
                <p className="mt-4 text-sm text-text-muted">
                  Client: {project.client}
                </p>
              ) : null}
            </div>

            <div className="md:pt-12">
              <p className="text-[17px] leading-8 text-text-secondary">
                {project.summary}
              </p>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block border-b border-text-primary pb-0.5 text-sm text-text-primary transition-colors hover:border-accent-bright"
                >
                  Visit the live site ↗
                </a>
              ) : null}
            </div>
          </header>

          {project.facts?.length ? (
            <dl className="grid border-b border-border-default sm:grid-cols-3">
              {project.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-border-default py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
                >
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className="display mt-2 text-3xl text-text-primary">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="grid gap-12 py-14 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:gap-16">
            <h2 className="display text-3xl text-text-primary md:text-4xl">
              The problem
            </h2>
            <p className="text-[17px] leading-8 text-text-secondary">
              {project.problem}
            </p>
          </div>

          {project.images[0] ? (
            <figure className="border border-border-default bg-bg-surface">
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                width={1530}
                height={784}
                className="h-auto w-full"
                priority
              />
            </figure>
          ) : null}

          <div className="grid gap-12 py-14 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:gap-16">
            <h2 className="display text-3xl text-text-primary md:text-4xl">
              What we built
            </h2>
            <ul className="border-t border-border-default">
              {project.built.map((item) => (
                <li
                  key={item}
                  className="border-b border-border-default py-4 text-[15px] leading-7 text-text-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {project.images.length > 1 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.images.slice(1).map((image) => (
                <figure
                  key={image.src}
                  className="border border-border-default bg-bg-surface"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1242}
                    height={2688}
                    className="h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          ) : null}

          <div className="grid gap-12 border-t border-border-default py-14 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:gap-16">
            <h2 className="display text-3xl text-text-primary md:text-4xl">
              Built with
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-border-default px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {project.outcome ? (
            <div className="grid gap-12 border-t border-border-default py-14 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:gap-16">
              <h2 className="display text-3xl text-text-primary md:text-4xl">
                Outcome
              </h2>
              <p className="text-[17px] leading-8 text-text-secondary">
                {project.outcome}
              </p>
            </div>
          ) : null}

          <section className="border-t border-border-default pt-14">
            <p className="eyebrow">Next</p>
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="display text-3xl text-text-primary underline decoration-border-default underline-offset-8 transition-colors hover:decoration-accent-bright md:text-4xl"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-14 border-t border-border-default pt-10">
              <h2 className="display max-w-xl text-3xl text-text-primary md:text-4xl">
                Want something like this built?
              </h2>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center justify-center bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-text-secondary"
              >
                Start a project
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
