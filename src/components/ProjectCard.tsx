import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl shadow-white/5">
      <div className="relative aspect-video w-full bg-gradient-to-br from-white/10 to-white/[0.03]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="px-3 py-1 text-xs uppercase tracking-wide text-white/60">
            {project.tags[0] ?? "Project"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-white/70">{project.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
        {/* The original component included a 'Learn more' link here, but it simply redirected to
            the projects page without providing additional information. The link has been
            removed for clarity. */}
      </div>
    </article>
  );
}