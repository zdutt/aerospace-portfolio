// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aerospace Portfolio",
  description: "Selected projects & experiments.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`} suppressHydrationWarning>
        {/* Background */}
        <Starfield
          className="fixed inset-0 -z-10"
            accentColor="#9ae6ff"
            density={0.2}
            cometEverySec={[10, 20]}
            parallax={0.05}
            cometTrail={110}
            cometHeadRadius={3.5}
            cometHeadGlow={10}

            // NEW knobs:
            frameFade={1}             // ← ensures ZERO persistent trail between frames
            tailBrightAtHead={true}  // ← flip so the far end of the tail is brighter
            trailBlend="source-over"  // subtler than "lighter"
            trailOpacity={0.22}
            trailWidth={1.2}
            headOpacity={0.55}
            glowOpacity={0.18}
        />
        {/* Nav + content container */}
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">{children}</main>
      </body>
    </html>
  );
}
