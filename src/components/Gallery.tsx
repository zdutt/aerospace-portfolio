/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";

type GalleryProps = {
  images: string[];
  title: string;
  className?: string;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function Gallery({ images, title, className }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const total = images.length;

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev, close]);

  return (
    <div className={cx("w-full", className)}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className="group relative block overflow-hidden rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            aria-label={`Open image ${i + 1} of ${total}`}
          >
            <div className="aspect-square w-full bg-black/40">
              <img
                src={withBasePath(src)}
                alt={`${title} image ${i + 1}`}
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
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl">
            <img
              src={withBasePath(images[index])}
              alt={`${title} image ${index + 1}`}
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
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur hover:bg-white/20"
              onClick={(event) => {
                event.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              Prev
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur hover:bg-white/20"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              Next
            </button>

            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur hover:bg-white/20"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
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
