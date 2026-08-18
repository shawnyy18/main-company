import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectRow from "@/components/ProjectRow";
import { sortedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from FSK Codehouse — real-estate platforms, distribution catalogues, and mobile applications built in the Philippines.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow px-5 pb-24 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Selected work</p>
          <h1 className="display mt-5 max-w-3xl text-5xl text-text-primary md:text-7xl">
            Things we built that are live.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-8 text-text-secondary">
            Every project below is running in production. Where a client agreed
            to be named, we name them.
          </p>

          <div className="mt-16 border-b border-border-default">
            {sortedProjects.map((project, index) => (
              <ProjectRow key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
