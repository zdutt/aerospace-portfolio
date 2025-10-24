import Link from "next/link";
import ResumeTimeline, { EXPERIENCE } from "@/components/ResumeTimeline";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About • Résumé | Zachary Dutton",
  description:
    "Learn more about Zachary Dutton, aerospace engineer and additive manufacturing expert, and see his résumé and timeline.",
};

export default function AboutPage() {
  // Path to your PDF résumé in the public folder
  const resumePath = "/resume/Dutton-Resume-2025.pdf";

  return (
    <div className="relative">
      <div className="container mx-auto max-w-[88rem] px-3 md:px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            About & Résumé
          </h1>
          <p className="mt-3 max-w-3xl text-base md:text-lg text-white/80">
            I’m <span className="font-semibold">Zachary Dutton</span>, an
            aerospace‑focused engineer with hands‑on experience across metal
            additive manufacturing, repair design for aerospace components and
            rapid prototyping. Below is a quick timeline of my roles.
          </p>
          {/* Buttons for résumé and LinkedIn */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="primary" className="rounded-xl">
              <Link
                href={resumePath}
                target="_blank"
                rel="noreferrer noopener"
              >
                Download Résumé (PDF)
              </Link>
            </Button>
            <Button asChild variant="primary" className="rounded-xl">
              <a
                href="https://www.linkedin.com/in/zachary-dutton-315b30201"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </header>

        {/* Timeline of work and internships */}
        <ResumeTimeline items={EXPERIENCE} />
      </div>
    </div>
  );
}