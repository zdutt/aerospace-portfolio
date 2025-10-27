import projects from "@/lib/project";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import type { Project } from "@/lib/project";

const byNewest = (a: Project, b: Project) => (b.dateSort ?? "").localeCompare(a.dateSort ?? "");

export default function ProjectsPage() {
  // Category chips: All + each category
  return (
    <main className="container mx-auto space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>

      <div className="flex flex-wrap gap-2">
        <Link href="/projects" className="rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/10 hover:bg-white/15">
          All
        </Link>
        {Object.values(CATEGORIES).map((c) => (
          <Link
            key={c.slug}
            href={`/projects/category/${c.slug}`}
            className="rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/10 hover:bg-white/15"
          >
            {c.label}
          </Link>
        ))}
      </div>

      {Object.values(CATEGORIES).map((c) => {
        const group = projects.filter((p) => p.category === (c.slug as any)).sort(byNewest);
        if (group.length === 0) return null;
        return (
          <section key={c.slug} className="space-y-4">
            <h2 className="text-xl font-semibold">{c.label}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
