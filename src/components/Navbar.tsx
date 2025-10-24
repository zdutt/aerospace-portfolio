// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Match your next.config.js basePath for production
const BASE_PATH = "/aerospace-portfolio";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname() || "/";

  // Remove the basePath when running in production
  const cleaned = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length) || "/"
    : pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[88rem] items-center justify-between px-3 md:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Aerospace Portfolio
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label }) => {
            // Active if the path matches exactly or is a nested route
            const active =
              cleaned === href || cleaned.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={[
                  "rounded-xl border px-3 py-1.5 text-sm transition",
                  active
                    ? "border-sky-400/40 bg-white/10 text-sky-300"
                    : "border-transparent text-white/80 hover:bg-white/10",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
