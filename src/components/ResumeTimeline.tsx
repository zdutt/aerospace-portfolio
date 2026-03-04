"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, ChevronLeft, ChevronRight, Wrench } from "lucide-react";

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  rangeLabel?: string;
  blurb: string;
  location?: string;
  tags?: string[];
  kind?: "internship" | "work";
};

const toKey = (value: string) => value.toLowerCase().trim();
const toTs = (value: string) =>
  toKey(value) === "present" ? Number.POSITIVE_INFINITY : Date.parse(value);

function sortChronological(items: ExperienceItem[]) {
  return [...items].sort((a, b) => toTs(b.start) - toTs(a.start));
}

function yearMonthLabel(iso: string) {
  if (toKey(iso) === "present") return "Present";
  const date = new Date(iso);
  return date.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function rangeOf(item: ExperienceItem) {
  if (item.rangeLabel) return item.rangeLabel;
  return `${yearMonthLabel(item.start)} - ${yearMonthLabel(item.end)}`;
}

function KindIcon({ kind }: { kind?: ExperienceItem["kind"] }) {
  return kind === "work" ? (
    <Wrench className="h-4 w-4" aria-hidden />
  ) : (
    <Briefcase className="h-4 w-4" aria-hidden />
  );
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "sig-2025",
    title: "Additive Intern (Return)",
    company: "SIG SAUER",
    start: "2025-05-20",
    end: "2025-08-20",
    rangeLabel: "May 2025 - Aug 2025",
    blurb:
      "Returned to support additive manufacturing operations, improve reliability, and collaborate across production workflows.",
    tags: ["Additive Manufacturing", "Operations"],
    kind: "internship",
  },
  {
    id: "pratt-2025",
    title: "Aftermarket Sustainment Engineer Co-Op",
    company: "Pratt & Whitney",
    start: "2025-01-01",
    end: "2025-05-15",
    rangeLabel: "Jan 2025 - May 2025",
    blurb:
      "Supported part damage assessment and repair planning using approved documentation and trend-based review.",
    tags: ["Sustainment", "Repair Analysis"],
    kind: "internship",
  },
  {
    id: "sig-2024",
    title: "Additive Intern",
    company: "SIG SAUER",
    start: "2024-05-01",
    end: "2024-08-15",
    rangeLabel: "May 2024 - Aug 2024",
    blurb:
      "Worked with metal additive systems and supporting workflows, including daily troubleshooting and process support.",
    tags: ["DMLS", "Process Support"],
    kind: "internship",
  },
  {
    id: "pirouette-2023",
    title: "Engineering Intern",
    company: "Pirouette Medical",
    start: "2023-05-01",
    end: "2023-08-15",
    rangeLabel: "May 2023 - Aug 2023",
    blurb:
      "Contributed to build and test activities, documented findings, and helped troubleshoot engineering issues.",
    tags: ["Testing", "Documentation"],
    kind: "internship",
  },
  {
    id: "dover-honda-2022",
    title: "Lube Mechanic",
    company: "Dover Honda",
    start: "2022-06-01",
    end: "2022-08-15",
    rangeLabel: "Jun 2022 - Aug 2022",
    blurb:
      "Supported customer-facing basic mechanical service in a fast-paced team environment.",
    tags: ["Automotive", "Service"],
    kind: "work",
  },
  {
    id: "target-2021",
    title: "Closing Expert",
    company: "Target",
    start: "2021-05-01",
    end: "2022-06-01",
    rangeLabel: "May 2021 - Jun 2022",
    blurb:
      "Worked across departments while following process standards and prioritizing work under time constraints.",
    tags: ["Operations", "Teamwork"],
    kind: "work",
  },
];

export default function ResumeTimeline({
  items = EXPERIENCE,
  title = "Experience Timeline",
}: {
  items?: ExperienceItem[];
  title?: string;
}) {
  const [showWork, setShowWork] = useState(true);
  const [showInternships, setShowInternships] = useState(true);

  const ordered = useMemo(() => sortChronological(items), [items]);
  const filtered = useMemo(
    () =>
      ordered.filter((item) => {
        if (item.kind === "work") return showWork;
        if (item.kind === "internship") return showInternships;
        return false;
      }),
    [ordered, showWork, showInternships]
  );

  const railRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const scrollBy = (delta: number) => {
    const element = railRef.current;
    if (!element) return;
    element.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") scrollBy(-520);
      if (event.key === "ArrowRight") scrollBy(520);
    };
    root.addEventListener("keydown", onKey);
    return () => root.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="relative w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label="Experience timeline"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>

        <div className="flex items-center gap-2">
          <KindPill
            label="Internships"
            active={showInternships}
            onClick={() => setShowInternships((value) => !value)}
          />
          <KindPill label="Work" active={showWork} onClick={() => setShowWork((value) => !value)} />

          <button
            type="button"
            onClick={() => scrollBy(-520)}
            aria-label="Scroll experience timeline left"
            className="ml-1 hidden rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(520)}
            aria-label="Scroll experience timeline right"
            className="hidden rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="relative overflow-x-auto overflow-y-visible [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex w-max gap-6 py-6 pr-6">
          {filtered.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} count={filtered.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  index,
  count,
}: {
  item: ExperienceItem;
  index: number;
  count: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative snap-center"
      aria-label={`${item.title} at ${item.company}, ${rangeOf(item)}`}
    >
      <Card className="group relative w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-0 shadow-md backdrop-blur transition hover:border-sky-400/40 hover:bg-white/10 md:w-[360px]">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center gap-2 text-sky-300">
            <KindIcon kind={item.kind} />
            <span className="text-xs uppercase tracking-widest opacity-80">
              {index + 1} / {count}
            </span>
          </div>

          <div className="mb-1 text-base font-semibold leading-tight md:text-lg">{item.title}</div>
          <div className="mb-2 text-sm text-white/80">{item.company}</div>
          <div className="mb-3 text-xs text-white/60">{rangeOf(item)}</div>
          <p className="mb-3 text-sm text-white/80">{item.blurb}</p>

          {item.tags && item.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full border border-white/10 bg-white/10 text-[10px] font-medium text-white/85"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function KindPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
        active
          ? "border-sky-400/60 bg-sky-500/20 text-sky-100"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
