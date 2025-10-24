import Link from "next/link";
import ResumeTimeline, { EXPERIENCE } from "@/components/ResumeTimeline";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About • Résumé | Zachary Dutton",
  description: "About page with a horizontal timeline of experience and a downloadable résumé.",
};

export default function AboutPage() {
  const resumePath = "/resume/Dutton-Resume-2025.pdf";

  return (
    <div className="relative">
      <div className="container mx-auto max-w-[88rem] px-3 md:px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">About & Résumé</h1>
          <p className="mt-3 max-w-3xl text-base md:text-lg text-white/80">
            I’m an aerospace-focused engineer with hands-on experience across metal additive manufacturing,
            repair design for aerospace components, and rapid prototyping. Below is a quick timeline of my roles.
          </p>
          <div className="mt-5">
            <Button asChild variant="primary" className="rounded-xl">
              <Link href={resumePath} target="_blank" rel="noreferrer noopener">
                Download Résumé (PDF)
              </Link>
            </Button>
          </div>
        </header>

        {/* No resumeHref here to avoid a duplicate button */}
        <ResumeTimeline items={EXPERIENCE} />
      </div>
    </div>
  );
}
