/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";
import type { ProjectImage } from "@/lib/project";

type GalleryProps = {
  images: ProjectImage[];
  title: string;
  className?: string;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Gallery({ images, title, className }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const galleryImages = images ?? [];
  const total = galleryImages.length;

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => {
    if (total <= 0) return;
    setIndex((value) => (value + 1) % total);
  }, [total]);
  const prev = useCallback(() => {
    if (total <= 0) return;
    setIndex((value) => (value - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
        return;
      }

      if (event.key !== "Tab") return;

      const container = dialogRef.current;
      if (!container) return;

      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !container.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || !container.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  useEffect(() => {
    if (open) return;
    const target = triggerRef.current ?? previouslyFocusedRef.current;
    target?.focus();
  }, [open]);

  if (total === 0) return null;

  return (
    <div className={cx("w-full", className)}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {galleryImages.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className="group relative block overflow-hidden rounded-xl border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
              setIndex(i);
              setOpen(true);
            }}
            aria-label={`Open image ${i + 1} of ${total}`}
          >
            <div className="aspect-square w-full bg-black/40">
              <img
                src={withBasePath(image.src)}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          onClick={close}
        >
          <div
            ref={dialogRef}
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={withBasePath(galleryImages[index].src)}
              alt={galleryImages[index].alt}
              width={galleryImages[index].width}
              height={galleryImages[index].height}
              className="mx-auto max-h-[80vh] w-auto rounded-xl border border-white/15 object-contain"
              loading="eager"
            />

            <div className="mt-3 flex items-center justify-between text-sm text-white/80">
              <span>
                {index + 1} / {total}
              </span>
              <span className="truncate">{title}</span>
            </div>

            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              onClick={prev}
              aria-label="Previous image"
            >
              Prev
            </button>

            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              onClick={next}
              aria-label="Next image"
            >
              Next
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              className="absolute right-2 top-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              onClick={close}
              aria-label="Close viewer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
