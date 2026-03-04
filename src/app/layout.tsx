import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://zdutt.github.io/aerospace-portfolio"),
  title: {
    default: "Zachary Dutton | Aerospace Engineering Portfolio",
    template: "%s | Zachary Dutton",
  },
  description:
    "Aerospace engineering portfolio featuring CAD, FEA, manufacturing test work, electrical builds, and software tools.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Zachary Dutton | Aerospace Engineering Portfolio",
    description:
      "Aerospace engineering portfolio featuring CAD, FEA, manufacturing test work, electrical builds, and software tools.",
    url: "https://zdutt.github.io/aerospace-portfolio/",
    siteName: "Zachary Dutton Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zachary Dutton engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zachary Dutton | Aerospace Engineering Portfolio",
    description:
      "Aerospace engineering portfolio featuring CAD, FEA, manufacturing test work, electrical builds, and software tools.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden bg-black text-white`} suppressHydrationWarning>
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
          tailBrightAtHead
          trailBlend="source-over"
          trailOpacity={0.22}
          trailWidth={1.2}
          headOpacity={0.55}
          glowOpacity={0.18}
        />
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">{children}</main>
      </body>
    </html>
  );
}
