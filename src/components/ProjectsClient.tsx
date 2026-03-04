"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import projects from "@/lib/project";
import type { Project } from "@/lib/project";
import { CATEGORY_LIST } from "@/data/categories";
import ProjectCard from "@/components/ProjectCard";

const byNewest = (a: Project, b: Project) => (b.dateSort ?? "").localeCompare(a.dateSort ?? "");

const usedCategorySet = new Set(
  projects.filter((project) => project.visibility !== "private").map((project) => project.category)
);

const usedCategories = CATEGORY_LIST.filter((category) => usedCategorySet.has(category.slug));
const usedCategorySlugSet = new Set(usedCategories.map((category) => category.slug));

export default function ProjectsClient() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl space-y-8 px-4 pb-16">
          <section className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-white/5 md:p-8">
            <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          </section>
        </main>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const requestedCategory = params.get("category") ?? "";
  const initialCategory = usedCategorySlugSet.has(requestedCategory as Project["category"])
    ? requestedCategory
    : "";

  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const clearTags = () => setActiveTags(new Set());

  const filtered = useMemo(() => {
    return projects
      .filter((project) => project.visibility !== "private")
      .filter((project) => (initialCategory ? project.category === initialCategory : true))
      .filter((project) => {
        if (!activeTags.size) return true;
        const tagSet = new Set((project.tags ?? []).map((tag) => tag.toLowerCase()));
        for (const tag of activeTags) {
          if (!tagSet.has(tag.toLowerCase())) return false;
        }
        return true;
      })
      .sort(byNewest);
  }, [initialCategory, activeTags]);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 pb-16">
      <section className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-white/5 md:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 max-w-3xl text-white/80">
          These are the projects I can share in detail. Each page includes context, what I did,
          tools, and takeaways.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-full px-3 py-1 ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
              !initialCategory ? "bg-white/15" : "bg-transparent"
            } ring-white/15`}
            onClick={() => router.push("/projects")}
            aria-label="Show all project categories"
            aria-pressed={!initialCategory}
          >
            All
          </button>
          {usedCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={`rounded-full px-3 py-1 ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                initialCategory === category.slug ? "bg-white/15" : "bg-transparent"
              } ring-white/15`}
              onClick={() => router.push(`/projects?category=${category.slug}`)}
              aria-label={`Filter by ${category.label}`}
              aria-pressed={initialCategory === category.slug}
            >
              {category.label}
            </button>
          ))}
        </div>

        {!!activeTags.size && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[...activeTags].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] ring-1 ring-white/20"
                aria-label={`Remove ${tag} filter`}
              >
                {tag} x
              </button>
            ))}
            <button
              type="button"
              onClick={clearTags}
              className="text-sm text-white/70 underline"
              aria-label="Clear all tag filters"
            >
              Clear
            </button>
          </div>
        )}
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} onTagClick={toggleTag} />
        ))}
      </section>
    </main>
  );
}
