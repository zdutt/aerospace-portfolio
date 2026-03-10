"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useEffectEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import homeExperience, { type HomeExperienceItem } from "@/data/homeExperience";
import { withBasePath } from "@/lib/paths";

const AUTO_ROTATE_MS = 9600;

function hasImage(item: HomeExperienceItem) {
  return Boolean(item.image?.src?.trim());
}

function wrapIndex(total: number, nextIndex: number) {
  if (total <= 0) return 0;
  if (nextIndex < 0) return total - 1;
  if (nextIndex >= total) return 0;
  return nextIndex;
}

export default function HomeExperienceCarousel({
  items = homeExperience,
  title = "Engineering Snapshots",
}: {
  items?: HomeExperienceItem[];
  title?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [missingImages, setMissingImages] = useState<Record<string, boolean>>({});

  const visibleItems = items.filter(
    (item) => hasImage(item) && !missingImages[item.id]
  );
  const safeActiveIndex = visibleItems[activeIndex] ? activeIndex : 0;
  const activeItem = visibleItems[safeActiveIndex];

  const advanceSlide = useEffectEvent(() => {
    if (isPaused || visibleItems.length <= 1) {
      return;
    }

    setActiveIndex(wrapIndex(visibleItems.length, safeActiveIndex + 1));
  });

  useEffect(() => {
    if (visibleItems.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      advanceSlide();
    }, AUTO_ROTATE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [visibleItems.length]);

  if (!visibleItems.length) {
    return (
      <section className="rounded-2xl border border-sky-300/20 bg-slate-950/70 p-6 text-sm text-white/75">
        <h2 className="text-xl font-medium text-white">{title}</h2>
        <p className="mt-2">
          Gallery images are not configured yet. Add images to{" "}
          <code>/public/home/experience/</code> and reference them in{" "}
          <code>src/data/homeExperience.ts</code>.
        </p>
      </section>
    );
  }

  return (
    <section
      className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/75 shadow-xl shadow-black/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      aria-label={title}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-6">
        <h2 className="text-xl font-medium text-white">{title}</h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex(wrapIndex(visibleItems.length, safeActiveIndex - 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-sky-300/40 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Show previous engineering snapshot"
            disabled={visibleItems.length <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex(wrapIndex(visibleItems.length, safeActiveIndex + 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-sky-300/40 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Show next engineering snapshot"
            disabled={visibleItems.length <= 1}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative min-h-[320px] overflow-hidden md:min-h-[420px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={activeItem.id}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={withBasePath(activeItem.image!.src)}
              alt={activeItem.image!.alt}
              width={activeItem.image!.width}
              height={activeItem.image!.height}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={() =>
                setMissingImages((prev) =>
                  prev[activeItem.id] ? prev : { ...prev, [activeItem.id]: true }
                )
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70">
                <span>{activeItem.subtitle}</span>
                <span className="text-sky-300/60">/</span>
                <span>{activeItem.date}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                {activeItem.label ?? activeItem.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/82 md:text-base">
                {activeItem.caption}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {visibleItems.map((item, index) => {
                    const isActive = index === safeActiveIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition ${
                          isActive
                            ? "w-8 bg-sky-300"
                            : "w-2.5 bg-white/35 hover:bg-white/55"
                        }`}
                        aria-label={`Show ${item.title}`}
                        aria-pressed={isActive}
                      />
                    );
                  })}
                </div>

                <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                  {safeActiveIndex + 1} / {visibleItems.length}
                </p>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
