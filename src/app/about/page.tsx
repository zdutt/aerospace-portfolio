import type { Metadata } from "next";
import Link from "next/link";
import ResumeTimeline, { EXPERIENCE } from "@/components/ResumeTimeline";
import { Button } from "@/components/ui/button";
import about from "@/data/about";

export const metadata: Metadata = {
  title: "About & Qualifications | Zachary Dutton",
  description:
    "Qualifications, resume, and engineering approach for Zachary Dutton across CAD, FEA, manufacturing, and systems builds.",
};

const resumePath = "/resume/Resume-Dutton.pdf";

export default function AboutPage() {
  return (
    <main className="container mx-auto space-y-8">
      <section className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-white/5 md:p-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">About & Qualifications</h1>
          <p className="text-white/75">{about.tagline}</p>
          <p className="text-sm text-white/60">
            {about.location} {"|"}{" "}
            <a className="underline hover:no-underline" href={`mailto:${about.email}`}>
              {about.email}
            </a>
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={resumePath} target="_blank" rel="noreferrer noopener">
                Download Resume (PDF)
              </Link>
            </Button>
          </div>
        </header>

        <p className="mt-5 max-w-3xl text-white/85">{about.bio}</p>
      </section>

      <section className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-white/5 md:p-8">
        <h2 className="text-xl font-semibold">How I work</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-white/85">
          {about.howIWork.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-white/5 md:p-8">
        <h2 className="text-xl font-semibold">Core skills</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {about.coreSkills.map((skill) => (
            <article key={skill.area} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200">{skill.area}</h3>
              <p className="mt-2 text-sm text-white/85">{skill.evidence}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-white/5 md:p-8">
        <h2 className="text-xl font-semibold">What I&apos;m looking for</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-white/85">
          {about.lookingFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-white/5 md:p-8">
        <ResumeTimeline items={EXPERIENCE} />
      </section>
    </main>
  );
}
