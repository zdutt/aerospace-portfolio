"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type ExperienceItem = {
  id: string;
  title: string;            // Role title
  company: string;          // Company or org
  start: string;            // ISO date string (YYYY-MM-DD)
  end: string;              // ISO date string or "Present"
  rangeLabel?: string;      // Optional human label like "Summer 2024"
  blurb: string;            // Short 1–3 sentence description
  location?: string;
  tags?: string[];
  kind?: "internship" | "work"; // ⬅️ limited to just these two
};

// ---- Helpers ----
const toKey = (s: string) => s.toLowerCase().trim();
const toTs = (s: string) =>
  toKey(s) === "present" ? Number.POSITIVE_INFINITY : Date.parse(s);

// Sort descending (newest first) by start date
function sortChronological(items: ExperienceItem[]) {
  return [...items].sort((a, b) => toTs(b.start) - toTs(a.start));
}

function yearMonthLabel(iso: string) {
  if (toKey(iso) === "present") return "Present";
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function rangeOf(item: ExperienceItem) {
  if (item.rangeLabel) return item.rangeLabel;
  return `${yearMonthLabel(item.start)} – ${yearMonthLabel(item.end)}`;
}

function KindIcon({ kind }: { kind?: ExperienceItem["kind"] }) {
  return kind === "work"
    ? <Wrench className="h-4 w-4" aria-hidden />
    : <Briefcase className="h-4 w-4" aria-hidden />;
}

// ---- Experience data (Work + Internships only) ----
export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "target-2021",
    title: "Closing Expert",
    company: "Target",
    start: "2021-05-01",
    end: "2022-06-01",
    blurb:
      "Supported multiple departments, followed defined processes, and triaged tasks to keep nightly operations on track.",
    tags: ["Retail Ops", "Teamwork"],
    kind: "work",
  },
  {
    id: "dover-honda-2022",
    title: "Lube Mechanic",
    company: "Dover Honda",
    start: "2022-06-01",
    end: "2022-08-15",
    rangeLabel: "Summer 2022",
    blurb:
      "Handled customer-facing basic service in a fast-paced shop; sharpened troubleshooting and hands-on skills.",
    tags: ["Automotive", "Service"],
    kind: "work",
  },
  {
    id: "pirouette-2023",
    title: "Engineering Intern",
    company: "Pirouette Medical",
    start: "2023-05-01",
    end: "2023-08-15",
    rangeLabel: "Summer 2023",
    blurb:
      "Supported build & test of a new auto-injector; set up a clean room, executed device tests, and documented results.",
    tags: ["Med Device", "Testing"],
    kind: "internship",
  },
  {
    id: "sig-2024",
    title: "Additive Intern",
    company: "SIG SAUER",
    start: "2024-05-01",
    end: "2024-08-15",
    rangeLabel: "Summer 2024",
    blurb:
      "Operated EOS M290/M400 DMLS printers and supporting systems; resolved errors and helped improve processes.",
    tags: ["DMLS", "AddMan"],
    kind: "internship",
  },
  {
    id: "pratt-2025",
    title: "Aftermarket Sustainment Engineer Co-Op",
    company: "Pratt & Whitney",
    start: "2025-01-01",
    end: "2025-05-15",
    rangeLabel: "Jan – May 2025",
    blurb:
      "Partnered with repair technicians to assess damage and craft compliant repairs; analyzed trends to reduce recurrence.",
    tags: ["Aero", "Repairs"],
    kind: "internship",
  },
  {
    id: "sig-2025",
    title: "Additive Intern (Return)",
    company: "SIG SAUER",
    start: "2025-05-20",
    end: "2025-08-20",
    rangeLabel: "Summer 2025",
    blurb:
      "Returned to support metal AM ops and coordinate with molding vendors while driving reliability improvements.",
    tags: ["AM Ops", "Vendors"],
    kind: "internship",
  },
];

// ---- Component ----
export default function ResumeTimeline({
  items = EXPERIENCE,
  title = "Experience",
}: {
  items?: ExperienceItem[];
  title?: string;
}) {
  // Only “work” and “internship” filters
  const [showWork, setShowWork] = useState(true);
  const [showIntern, setShowIntern] = useState(true);

  const ordered = useMemo(() => sortChronological(items), [items]);

  const filtered = useMemo(
    () =>
      ordered.filter((i) => {
        if (i.kind === "work") return showWork;
        if (i.kind === "internship") return showIntern;
        return false; // ignore anything else
      }),
    [ordered, showWork, showIntern]
  );

  const railRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const scrollBy = (dx: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  // Keyboard: ← / → to scroll (kept)
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollBy(-520);
      if (e.key === "ArrowRight") scrollBy(520);
    };
    root.addEventListener("keydown", onKey);
    return () => root.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      ref={sectionRef as React.MutableRefObject<HTMLElement>}
      tabIndex={0}
      className="relative w-full outline-none"
      aria-label="Experience timeline"
    >
      {/* Header with only Work/Internships filters and arrows */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>

        <div className="flex items-center gap-2">
          <KindPill
            label="Internships"
            active={showIntern}
            onClick={() => setShowIntern((v) => !v)}
          />
          <KindPill
            label="Work"
            active={showWork}
            onClick={() => setShowWork((v) => !v)}
          />

          {/* Arrows (md+) */}
          <button
            onClick={() => scrollBy(-520)}
            aria-label="Scroll left"
            className="ml-1 hidden rounded-full border border-white/10 bg-white/10 p-2 text-white/80 hover:bg-white/20 md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(520)}
            aria-label="Scroll right"
            className="hidden rounded-full border border-white/10 bg-white/10 p-2 text-white/80 hover:bg-white/20 md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll rail (no baseline, no 'now' line) */}
      <div
        ref={railRef}
        className="relative overflow-x-auto overflow-y-visible [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex w-max gap-6 py-6 pr-6">
          {filtered.map((item, i) => (
            <TimelineCard key={item.id} item={item} index={i} count={filtered.length} />
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

          <div className="mb-1 text-base font-semibold leading-tight md:text-lg">
            {item.title}
          </div>
          <div className="mb-2 text-sm text-white/80">{item.company}</div>

          <div className="mb-3 text-xs text-white/60">{rangeOf(item)}</div>

          <p className="mb-3 text-sm text-white/80">{item.blurb}</p>

          {item.tags && item.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-full border border-white/10 bg-white/10 text-[10px] font-medium text-white/85"
                >
                  {t}
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
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition ${
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