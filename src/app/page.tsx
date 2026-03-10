import type { Metadata } from "next";
import Link from "next/link";
import projects from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import HomeExperienceCarousel from "@/components/HomeExperienceCarousel";
import type { Project } from "@/lib/project";
import { Button } from "@/components/ui/button";
import about from "@/data/about";

export const metadata: Metadata = {
  title: "Zachary Dutton",
  description:
    "Aerospace engineering student portfolio focused on CAD, FEA, manufacturing, and practical system builds.",
};

const byNewest = (a: Project, b: Project) => (b.dateSort ?? "").localeCompare(a.dateSort ?? "");

const featuredOrder = [
  "fe-sim-coolant-tank",
  "cad-portfolio",
  "engineering-ev-build",
  "portfolio-website",
];

export default function HomePage() {
  const visible = projects.filter((project) => project.visibility !== "private");
  const featured = featuredOrder
    .map((slug) => visible.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project))
    .sort(byNewest)
    .slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-white/10 p-8 shadow-xl shadow-white/5">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Zachary Dutton</h1>
        <p className="mt-2 text-lg font-medium text-sky-300 md:text-xl">
          Aerospace engineering student • CAD, FEA, manufacturing, and practical system builds
        </p>
        <p className="mt-4 max-w-3xl text-base text-white/85 md:text-lg">
          I like engineering that survives contact with reality: drawings that can be built,
          simulations that can be explained, and systems that can be wired safely.
        </p>
        <p className="mt-3 max-w-3xl text-base text-white/85 md:text-lg">
          This portfolio highlights a handful of projects I can speak to in detail: SolidWorks
          Simulation reporting, multi-CAD design work, small software/data tools, and hands-on
          system builds.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/projects" aria-label="View projects">
              View Projects
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link
              href="/resume/Dutton-Resume-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume PDF"
            >
              Download Resume (PDF)
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <a href={`mailto:${about.email}`} aria-label="Email Zachary Dutton">
              Email me
            </a>
          </Button>
        </div>
      </section>

      <HomeExperienceCarousel title="Experience Highlights" />

      <section className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-white/5 md:p-8">
        <h2 className="text-xl font-semibold">What I&apos;m good at</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-white/85">
          <li>Turning CAD concepts into build-ready models, assemblies, and drawings.</li>
          <li>Running and documenting FEA studies with clear assumptions and outputs.</li>
          <li>Supporting hands-on manufacturing and testing work with strong documentation.</li>
          <li>Building practical software tools for analysis, visualization, and reporting.</li>
        </ul>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-medium">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-white/70 hover:text-white">
            See all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
