import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projects from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-white/10 p-8 shadow-xl shadow-white/5">
        <h1 className="text-4xl font-semibold tracking-tight">
          Aerospace Portfolio
        </h1>
        <p className="mt-3 max-w-2xl text-white/70">
          A curated set of hands-on builds, simulations, and manufacturing work.
          Static, fast, and clean—just the highlights.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:zdutton04@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
          >
            Contact
          </a>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-medium">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-white/70 hover:text-white">
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

