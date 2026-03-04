"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Project } from "@/lib/project";
import { withBasePath } from "@/lib/paths";
import { CATEGORIES } from "@/data/categories";

const PLACEHOLDER = "/vercel.svg";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export default function ProjectCard({
  project,
  onTagClick,
}: {
  project: Project;
  onTagClick?: (tag: string) => void;
}) {
  const cover = project.cover ?? {
    src: PLACEHOLDER,
    alt: `${project.title} cover`,
    width: 1200,
    height: 675,
  };
  const imgSrc = withBasePath(cover.src);
  const href = project.link ?? `/projects/${project.slug}`;
  const external = href ? isExternal(href) : false;
  const clickable = project.visibility !== "private";

  const CardInner = (
    <Card
      className={`project-card relative z-10 overflow-hidden rounded-2xl border border-sky-300/20
                  bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/65
                  transition duration-300
                  ${clickable
                    ? "cursor-pointer hover:-translate-y-0.5 hover:border-sky-300/40 hover:bg-slate-900/70 hover:shadow-[0_0_34px_rgba(14,165,233,0.16)]"
                    : "cursor-default"}`}
      aria-disabled={!clickable}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={cover.alt || project.title}
          width={cover.width}
          height={cover.height}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-transparent to-slate-950/40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(56,189,248,0.25),transparent_55%)]" />
      </div>

      <CardHeader className="pt-4">
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-50">{project.title}</h3>
          <span className="whitespace-nowrap rounded-full border border-sky-300/20 bg-sky-300/10 px-2 py-[2px] text-[11px] text-sky-100">
            {CATEGORIES[project.category]?.label ?? project.category}
          </span>
        </div>
        {project.date ? <p className="text-xs text-white/60">{project.date}</p> : null}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-slate-200/85">{project.summary}</p>
        {!!project.tags?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onTagClick?.(tag);
                }}
                className="rounded-full border border-sky-300/15 bg-sky-300/10 px-2 py-0.5 text-[11px] text-sky-100/90 transition hover:bg-sky-300/20"
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!clickable) return <div className="group relative block">{CardInner}</div>;

  if (external && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        aria-label={`Open ${project.title}`}
      >
        {CardInner}
      </a>
    );
  }

  return (
    <Link
      href={href!}
      prefetch
      className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      aria-label={`View ${project.title} project`}
    >
      {CardInner}
    </Link>
  );
}
