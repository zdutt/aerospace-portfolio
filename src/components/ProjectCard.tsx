/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/project";
import { withBasePath } from "@/lib/paths";
import { CATEGORIES } from "@/data/categories";

const PLACEHOLDER = "/vercel.svg"; // lives in /public

export default function ProjectCard({ project }: { project: Project }) {
  const href = project.link ?? `/projects/${project.slug}`;
  const imgSrc = withBasePath(project.image ?? PLACEHOLDER);

  return (
    <Link
      href={href}
      className="block rounded-2xl border border-white/10 bg-white/3 shadow-md transition hover:border-white/20 hover:bg-white/5"
    >
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imgSrc}
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <CardHeader>
          <div className="mt-1 flex items-center gap-2">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <span className="rounded-full bg-white/10 px-2 py-[2px] text-[11px] ring-1 ring-white/10">
              {CATEGORIES[project.category]?.label ?? project.category}
            </span>
          </div>
          {project.date ? (
            <p className="text-xs text-white/60">{project.date}</p>
          ) : null}
        </CardHeader>

        <CardContent>
          <p className="text-sm text-neutral-300">{project.summary}</p>
          {!!project.tags?.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
