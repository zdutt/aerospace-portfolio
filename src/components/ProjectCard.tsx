// src/components/ProjectCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-2xl border border-white/10 bg-white/[0.03] shadow-md transition hover:border-white/20 hover:bg-white/5"
    >
      <Card className="overflow-hidden">
        {/* Render the image at the top */}
        {project.image ? (
          <div className="relative h-48 w-full">
            <Image
              src={project.image}      // e.g. "/images/coolant-tank.jpg"
              alt={project.title}
              fill                      // Use fill + object-cover for responsive sizing
              className="object-cover"
            />
          </div>
        ) : null}

        <CardHeader>
          <h3 className="text-lg font-semibold">{project.title}</h3>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-neutral-400">{project.summary}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-800/70 px-2 py-1 text-xs text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
