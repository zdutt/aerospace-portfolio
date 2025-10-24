"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[88rem] items-center justify-between px-3 md:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Aerospace Portfolio
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-xl border px-3 py-1.5 text-sm transition " +
                  (active
                    ? "border-sky-400/40 bg-white/10 text-sky-300"
                    : "border-transparent text-white/80 hover:bg-white/10")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
