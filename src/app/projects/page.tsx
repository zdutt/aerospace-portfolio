"use client";

import projects from "@/lib/project";
import type { Project } from "@/lib/project";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES } from "@/data/categories";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useCallback, Suspense } from "react";

const byNewest = (a: Project, b: Project) =>
  (b.dateSort ?? "").localeCompare(a.dateSort ?? "");

export default function ProjectsPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-6xl px-4 py-12"><h1 className="text-3xl font-semibold">Projects</h1></main>}>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const initialCategory = params.get("category") ?? "";

  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }, []);

  const clearTags = () => setActiveTags(new Set());

  const filtered = useMemo(() => {
    const cat = (initialCategory || "") as keyof typeof CATEGORIES | "";
    return projects
      .filter((p) => p.visibility !== "private")
      .filter((p) => (cat ? p.category === cat : true))
      .filter((p) => {
        if (!activeTags.size) return true;
        const set = new Set((p.tags ?? []).map((t) => t.toLowerCase()));
        for (const t of activeTags) if (!set.has(t.toLowerCase())) return false;
        return true;
      })
      .sort(byNewest);
  }, [initialCategory, activeTags]);

  const allCats = Object.values(CATEGORIES);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Projects</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className={`rounded-full px-3 py-1 ring-1 ${!initialCategory ? "bg-white/15" : "bg-transparent"} ring-white/15`}
          onClick={() => router.push("/projects")}
        >
          All
        </button>
        {allCats.map((c) => (
          <button
            key={c.slug}
            className={`rounded-full px-3 py-1 ring-1 ${initialCategory === c.slug ? "bg-white/15" : "bg-transparent"} ring-white/15`}
            onClick={() => router.push(`/projects?category=${c.slug}`)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {!!activeTags.size && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {[...activeTags].map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] ring-1 ring-white/20"
            >
              {t} ×
            </button>
          ))}
          <button onClick={clearTags} className="text-sm text-white/70 underline">
            Clear
          </button>
        </div>
      )}

      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} onTagClick={toggleTag} />
        ))}
      </section>
    </main>
  );
}
