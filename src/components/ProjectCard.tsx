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
  const imgSrc = withBasePath(project.image ?? PLACEHOLDER);
  const clickable = Boolean(project.link);
  const external = clickable && isExternal(project.link!);

  const CardInner = (
    <Card
      className={`relative z-10 overflow-hidden rounded-2xl border border-white/10
                  bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30
                  transition hover:border-white/20 transition-shadow duration-300
                  ${clickable
                    ? "hover:bg-black/50 cursor-pointer hover:shadow-[0_0_32px_rgba(255,255,255,0.12)]"
                    : "cursor-default"}`}
      aria-disabled={!clickable}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        {!clickable && (
          <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-white/10 px-2 py-[2px] text-[11px] ring-1 ring-white/10">
            Coming soon
          </div>
        )}
      </div>

      <CardHeader className="pt-4">
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <span className="rounded-full bg-white/10 px-2 py-[2px] text-[11px] ring-1 ring-white/10 whitespace-nowrap">
            {CATEGORIES[project.category]?.label ?? project.category}
          </span>
        </div>
        {project.date ? <p className="text-xs text-white/60">{project.date}</p> : null}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-neutral-300">{project.summary}</p>
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
                className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] ring-1 ring-white/10 hover:bg-white/15"
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

  return clickable ? (
    <Link
      href={project.link!}
      prefetch={!external}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative block focus:outline-none"
    >
      {CardInner}
    </Link>
  ) : (
    <div className="group relative block">{CardInner}</div>
  );
}
