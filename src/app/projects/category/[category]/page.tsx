import Link from "next/link";
import { notFound } from "next/navigation";
import projects from "@/lib/project";
import type { Project } from "@/lib/project";
import { CATEGORY_LIST } from "@/data/categories";
import ProjectCard from "@/components/ProjectCard";

type Params = { category: string };
type PageProps = { params: Promise<Params> };

const byNewest = (a: Project, b: Project) => (b.dateSort ?? "").localeCompare(a.dateSort ?? "");

export const dynamicParams = false;

const usedCategorySet = new Set(
  projects.filter((project) => project.visibility !== "private").map((project) => project.category)
);

const usedCategories = CATEGORY_LIST.filter((category) => usedCategorySet.has(category.slug));

export function generateStaticParams(): Params[] {
  return usedCategories.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const entry = usedCategories.find((item) => item.slug === category);
  if (!entry) return notFound();

  const filtered = projects
    .filter((p) => p.visibility !== "private")
    .filter((p) => p.category === entry.slug)
    .sort(byNewest);

  if (filtered.length === 0) return notFound();

  return (
    <main className="container mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Link
          href="/projects"
          className="text-sm text-white/70 hover:underline"
          aria-label="Back to all projects"
        >
          Back to Projects
        </Link>
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

