/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projects from "@/lib/project";
import Gallery from "@/components/Gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/paths";
import { CATEGORIES } from "@/data/categories";
import Link from "next/link";

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project || project.visibility === "private") return {};
  const title = project.title;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      images: project.cover
        ? [
            {
              url: withBasePath(project.cover.src),
              width: project.cover.width,
              height: project.cover.height,
              alt: project.cover.alt,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project || project.visibility === "private") return notFound();

  const galleryImages = project.gallery ?? [];
  const techList = project.technologies?.length ? project.technologies : project.tags;
  const categoryLabel = CATEGORIES[project.category]?.label ?? project.category;

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Link href="/projects" className="text-sm text-white/70 hover:text-white" aria-label="Back to projects">
          Back to Projects
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
          {project.date ? <span>{project.date}</span> : null}
          <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
          <span>{categoryLabel}</span>
        </div>
        <p className="text-white/85 max-w-prose">{project.summary}</p>

        {!!techList.length && (
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-white/60">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {techList.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {project.links?.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} for ${project.title}`}
              >
                <Button variant="outline" size="sm">
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
            src={withBasePath(project.cover.src)}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            className="h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}

      {project.sections?.length ? (
        <section className="space-y-6">
          {project.sections.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h2 className="text-lg font-semibold">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-white/80 max-w-prose">
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="list-disc space-y-1 pl-5 text-white/80">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
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
