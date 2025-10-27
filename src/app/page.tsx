import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projects from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/project";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Home • Zachary Dutton | Aerospace Portfolio",
  description:
    "Discover Zachary Dutton’s aerospace portfolio – hands-on builds, simulations and manufacturing projects.",
};

const byNewest = (a: Project, b: Project) =>
  (b.dateSort ?? "").localeCompare(a.dateSort ?? "");

export default function HomePage() {
  const featured = projects
    .filter((p) => p.visibility !== "private")
    .sort(byNewest)
    .slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero section with name and tagline */}
      <section className="rounded-2xl border border-white/10 p-8 shadow-xl shadow-white/5">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Zachary&nbsp;Dutton
        </h1>
        <p className="mt-2 text-lg md:text-xl font-medium text-sky-300">
          Aerospace‑focused engineer
        </p>
        <p className="mt-3 max-w-3xl text-base md:text-lg text-white/80">
          I’m an aerospace‑focused engineer with hands‑on experience across metal
          additive manufacturing, repair design for aerospace components and
          rapid prototyping.
        </p>
        <p className="mt-3 max-w-3xl text-base md:text-lg text-white/80">
          This portfolio is a curated set of builds, simulations and manufacturing
          work — static, fast and clean, just the highlights.
        </p>

        {/* Calls to action */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* Link to projects */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </Link>
          {/* Contact link retains original white styling */}
          <a
            href="mailto:zdutton04@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
          >
            Contact
          </a>
          {/* LinkedIn button matches résumé button formatting */}
          <Button asChild variant="primary" className="rounded-xl">
            <a
              href="https://www.linkedin.com/in/zachary-dutton-315b30201"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </a>
          </Button>
        </div>
      </section>

      {/* Featured projects list */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-medium">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-white/70 hover:text-white"
          >
            See all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
