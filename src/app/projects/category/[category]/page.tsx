/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import projects from "@/lib/project";
import type { Project } from "@/lib/project";
import { CATEGORIES } from "@/data/categories";
import ProjectCard from "@/components/ProjectCard";

type Params = { category: string };

const byNewest = (a: Project, b: Project) => (b.dateSort ?? "").localeCompare(a.dateSort ?? "");

export function generateStaticParams(): Params[] {
  return Object.values(CATEGORIES).map((c) => ({ category: c.slug }));
}

export default function CategoryPage({ params }: { params: Params }) {
  const entry = Object.values(CATEGORIES).find((c) => c.slug === params.category);
  if (!entry) return notFound();

  const filtered = projects.filter((p) => p.category === (entry.slug as any)).sort(byNewest);

  return (
    <main className="container mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/projects" className="text-sm text-white/70 hover:underline">← All Projects</Link>
        <h1 className="text-2xl font-semibold tracking-tight">{entry.label}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </main>
  );
}

