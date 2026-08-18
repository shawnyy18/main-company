"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectData } from "@/lib/projects";

const SLIDE_MS = 6000;

/**
 * The homepage showcase.
 *
 * Replaces the old hand-drawn mockup animation with real project captures.
 * Behaviour rules, in order of importance:
 *  - Every frame is a real screenshot of shipped work.
 *  - Auto-advance stops when the visitor is not looking at it (offscreen),
 *    is interacting with it (hover/focus), or has asked for reduced motion.
 *  - Tabs are a real ARIA tablist, so the whole thing is keyboard operable
 *    and does not depend on the timer to be usable.
 */
export default function WorkShowcase({ projects }: { projects: ProjectData[] }) {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = projects.length;

  // Only run while visible and while motion is welcome.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || count < 2) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    // Very old browsers: no visibility gating, just start the timer. Deferred
    // to a task so this is not a synchronous setState inside the effect body.
    if (typeof IntersectionObserver === "undefined") {
      const kickoff = window.setTimeout(() => setRunning(true), 0);
      return () => window.clearTimeout(kickoff);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % count),
      SLIDE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [running, active, count]);

  const select = useCallback((index: number) => {
    setActive(index);
  }, []);

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % count;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = count - 1;
    }
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const current = projects[active];

  return (
    <div
      ref={containerRef}
      className="border border-border-default bg-ink"
      onMouseEnter={() => setRunning(false)}
      onMouseLeave={() => setRunning(true)}
      onFocusCapture={() => setRunning(false)}
      onBlurCapture={() => setRunning(true)}
    >
      {/* Frame header — the three blocks echo the logo mark. */}
      <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-[3px]" aria-hidden="true">
            <span className="h-2.5 w-2.5 bg-accent-bright" />
            <span className="h-2.5 w-2.5 bg-accent-bright" />
            <span className="h-2.5 w-2.5 bg-accent-blue" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
            Shipped work
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.12em] text-white/45">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Featured projects"
          aria-orientation="vertical"
          className="flex border-b border-white/12 md:flex-col md:border-b-0 md:border-r"
        >
          {projects.map((project, index) => {
            const isActive = index === active;
            return (
              <button
                key={project.slug}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                role="tab"
                id={`showcase-tab-${project.slug}`}
                aria-selected={isActive}
                aria-controls={`showcase-panel-${project.slug}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`relative flex-1 cursor-pointer border-white/12 px-4 py-4 text-left transition-colors last:border-r-0 sm:px-5 md:flex-none md:border-b ${
                  index < count - 1 ? "border-r md:border-r-0" : ""
                } ${isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.03]"}`}
              >
                <span className="font-mono text-[10px] text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`mt-1.5 block text-sm ${
                    isActive ? "text-white" : "text-white/55"
                  }`}
                >
                  {project.name}
                </span>
                <span className="mt-0.5 block font-mono text-[10px] text-white/35">
                  {project.category}
                </span>

                {/* Progress rule. Keyed on the active index so the animation
                    restarts on every change rather than resuming mid-way. */}
                {isActive && running ? (
                  <span
                    key={`progress-${active}`}
                    className="showcase-progress absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent-bright"
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                    aria-hidden="true"
                  />
                ) : isActive ? (
                  <span
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-accent-bright"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div className="relative min-h-[320px] overflow-hidden sm:min-h-[400px] md:min-h-[440px]">
          {projects.map((project, index) => {
            const isActive = index === active;
            const image = project.images[0];
            const contain = project.coverFit === "contain";

            return (
              <div
                key={project.slug}
                role="tabpanel"
                id={`showcase-panel-${project.slug}`}
                aria-labelledby={`showcase-tab-${project.slug}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {image ? (
                  <div
                    className={`absolute inset-0 ${
                      contain ? "flex items-start justify-center pt-6" : ""
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      {...(contain
                        ? {
                            width: 976,
                            height: 2124,
                            className:
                              "h-[calc(100%+3rem)] w-auto border-x border-t border-white/15 object-contain object-top",
                          }
                        : {
                            fill: true,
                            className: "object-cover object-top",
                          })}
                      sizes="(max-width: 768px) 100vw, 720px"
                      priority={index === 0}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Caption. Sits above the stage and reads from the active project. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent p-4 pt-16 sm:p-5 sm:pt-20">
            <p className="max-w-md text-[13px] leading-6 text-white/70">
              {current.summary}
            </p>
            <Link
              href={`/work/${current.slug}`}
              className="pointer-events-auto mt-3 inline-block border-b border-white/40 pb-0.5 text-[13px] text-white transition-colors hover:border-accent-bright"
            >
              Read the case study
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
