/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projects from "@/lib/project";
import Gallery from "@/components/Gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/paths";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) return {};
  const title = `${project.title} | Projects`;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      images: project.cover ? [{ url: project.cover }] : undefined,
    },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) return notFound();

  const galleryImages = project.gallery ?? [];

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        {project.date ? <p className="text-white/70 text-sm">{project.date}</p> : null}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-white/85 max-w-prose">{project.summary}</p>
        {project.links?.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm">
                  {link.label}
                </Button>
              </a>
            ))}
          </div>
        ) : null}
      </header>

      {project.cover ? (
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10">
          <img
            src={withBasePath(project.cover)}
            alt={`${project.title} cover`}
            className="h-auto w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      ) : null}

      {galleryImages.length > 0 ? (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Gallery</h2>
          <Gallery images={galleryImages} title={project.title} />
        </section>
      ) : null}
    </article>
  );
}
