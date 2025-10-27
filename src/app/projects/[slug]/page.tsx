import Image from 'next/image';
import { notFound } from 'next/navigation';
import projects from '@/lib/projects';

// This page renders individual project detail pages based on the slug.
// It works with the `/projects/[slug]` route and uses static generation
// to pre-render all project pages during the build.

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // In Next.js 16, `params` may be a Promise. Await it to obtain the slug.
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        {project.title}
      </h1>
      {project.image && (
        <div className="relative h-60 w-full">
          {/* Use next/image for optimized loading */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain rounded-2xl"
            priority
          />
        </div>
      )}
      {project.summary && (
        <p className="text-white/80 text-lg max-w-prose">
          {project.summary}
        </p>
      )}
      {project.description && (
        <div className="prose prose-invert max-w-none">
          {project.description}
        </div>
      )}
      {/* Show attachments inline when present. */}
      {project.link && (
        (() => {
          // Extract the file extension to decide how to render the attachment.
          const ext = project.link.split('.').pop()?.toLowerCase();
          if (ext === 'pdf') {
            // Embed PDF directly into the page using an <object> tag. If the browser
            // cannot render the PDF, provide a fallback download link.
            return (
              <div className="mt-6">
                <object
                  data={project.link}
                  type="application/pdf"
                  className="w-full h-[700px] rounded-xl border border-white/15"
                >
                  <p>
                    This PDF cannot be displayed in your browser. You can
                    <a href={project.link} className="text-sky-300 underline">download it here</a>.
                  </p>
                </object>
              </div>
            );
          }
          if (ext && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
            // Render image attachments using next/image for optimization.
            return (
              <div className="relative mt-6 w-full h-auto max-h-[600px]">
                <Image
                  src={project.link}
                  alt={project.title}
                  fill
                  className="object-contain rounded-xl border border-white/15"
                />
              </div>
            );
          }
          // Fallback: provide a link to download or view unsupported attachment types.
          return (
            <div className="mt-6">
              <a
                href={project.link}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Attachment
              </a>
            </div>
          );
        })()
      )}
    </div>
  );
}

// Pre-render all project pages at build time. Static export requires this function
// to enumerate the dynamic segments. If no static params are returned,
// Next.js would skip generating these pages and they would 404.
export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}