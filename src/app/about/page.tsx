import Link from "next/link";
import ResumeTimeline, { EXPERIENCE } from "@/components/ResumeTimeline";
import { Button } from "@/components/ui/button";
import about from "@/data/about";

export const metadata = {
  title: "About & Resume | Zachary Dutton",
  description:
    "Learn more about Zachary Dutton, aerospace engineer and additive manufacturing specialist. Bio, skills, and experience timeline.",
};

export default function AboutPage() {
  const resumePath = "/resume/Dutton-Resume-2025.pdf";

  return (
    <main className="container mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-white/70">{about.tagline}</p>
        <p className="text-white/60 text-sm">
          {about.location} • <a className="underline hover:no-underline" href={`mailto:${about.email}`}>{about.email}</a>
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button asChild variant="primary" className="rounded-xl">
            <Link href={resumePath} target="_blank" rel="noreferrer noopener">
              Download Resume (PDF)
            </Link>
          </Button>
          <Button asChild variant="primary" className="rounded-xl">
            <a href="https://www.linkedin.com/in/zachary-dutton-315b30201" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </Button>
        </div>
      </header>

      <section className="prose prose-invert max-w-none">
        <p>{about.bio}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Quick Facts</h2>
        <ul className="list-disc pl-6 text-white/80">
          {about.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(about.skills).map(([bucket, items]) => (
            <div key={bucket} className="space-y-2">
              <h3 className="text-sm font-medium uppercase tracking-wide text-white/70">{bucket}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s: string) => (
                  <span key={s} className="rounded-full bg-white/10 px-2 py-[2px] text-xs ring-1 ring-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Experience Timeline</h2>
        <ResumeTimeline items={EXPERIENCE} />
      </section>
    </main>
  );
}
