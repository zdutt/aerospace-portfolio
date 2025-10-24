import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";

const inter = Inter({ subsets: ["latin"] });

// Global metadata with OpenGraph and Twitter cards
export const metadata: Metadata = {
  title: "Aerospace Portfolio | Zachary Dutton",
  description:
    "Portfolio of aerospace projects, experiments, and research by Zachary Dutton.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Aerospace Portfolio | Zachary Dutton",
    description:
      "Portfolio of aerospace projects, experiments, and research by Zachary Dutton.",
    url: "https://zdutt.github.io/aerospace-portfolio/",
    siteName: "Zachary Dutton | Aerospace Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aerospace Portfolio by Zachary Dutton",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerospace Portfolio | Zachary Dutton",
    description:
      "Portfolio of aerospace projects, experiments, and research by Zachary Dutton.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-black text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
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
          frameFade={1}
          tailBrightAtHead={true}
          trailBlend="source-over"
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