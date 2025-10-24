"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" }, // <-- Your new About link
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          ZD<span className="text-sky-300">•</span>Portfolio
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-xl px-3 py-1.5 text-sm transition hover:bg-white/10 " +
                  (active
                    ? "text-sky-300 border border-sky-400/40 bg-white/10"
                    : "text-white/80 border border-transparent")
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

/*
USAGE
-----
1) Save this file as `src/components/SiteHeader.tsx`.
2) In `app/layout.tsx`, import and render it above your page content:

   import SiteHeader from "@/components/SiteHeader";

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>
           <SiteHeader />
           {children}
         </body>
       </html>
     );
   }

That’s it — the **About** link points to `/about` and is highlighted when active.
*/
