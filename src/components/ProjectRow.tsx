import Image from "next/image";
import Link from "next/link";
import type { ProjectData } from "@/lib/projects";

/**
 * One project as a numbered editorial row. Used on the homepage and on the
 * /work index so both stay identical without a second implementation.
 */
export default function ProjectRow({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const cover = project.images[0];
  const contain = project.coverFit === "contain";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group grid gap-5 border-t border-border-default py-8 md:grid-cols-[3rem_minmax(0,1fr)_15rem] md:gap-8 md:py-10"
    >
      <p className="font-mono text-xs text-text-muted">
        {String(index + 1).padStart(2, "0")}
      </p>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="display text-3xl text-text-primary md:text-4xl">
            {project.name}
          </h3>
          <span className="font-mono text-xs text-text-muted">
            {project.category} · {project.year}
          </span>
        </div>

        <p className="mt-3 max-w-xl text-[15px] leading-7 text-text-secondary">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="border border-border-default px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-text-secondary"
            >
              {item}
            </span>
          ))}
        </div>

        <span className="mt-6 inline-block border-b border-text-primary pb-0.5 text-sm text-text-primary transition-colors group-hover:border-accent-bright">
          Read the case study
        </span>
      </div>

      {cover ? (
        <div
          className={`relative h-40 w-full overflow-hidden border border-border-default md:h-32 ${
            contain ? "bg-ink p-2" : "bg-bg-surface"
          }`}
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            className={
              contain
                ? "object-contain"
                : "object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            }
          />
        </div>
      ) : null}
    </Link>
  );
}
