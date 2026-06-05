import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { profile } from "@/lib/content/profile";
import { getMetadataBase, getSiteUrl } from "@/lib/seo";
import "./globals.css";

const siteUrl = getSiteUrl();
const metadataBase = getMetadataBase();
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: "AI/ML Engineer",
      email: profile.email,
      url: siteUrl,
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: ["LLM systems", "RAG", "vLLM", "Computer vision", "OCR", "C++ simulation", "FastAPI"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Lakshay Kumar AI Systems Portfolio",
      url: siteUrl,
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      about: { "@id": `${siteUrl}/#person` },
      name: "Lakshay Kumar Portfolio",
      description: profile.headline,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Lakshay Kumar | AI Systems Portfolio",
    template: "%s | Lakshay Kumar",
  },
  description:
    "Portfolio of Lakshay Kumar: evidence-backed LLM systems, multimodal/OCR benchmarking, and C++/VTK simulation engineering with full-stack delivery depth.",
  keywords: [
    "Lakshay Kumar",
    "AI engineer",
    "LLM systems",
    "vLLM",
    "RAG",
    "computer vision",
    "OCR",
    "C++",
    "VTK",
    "FastAPI",
    "Next.js",
  ],
  openGraph: {
    title: "Lakshay Kumar | AI Systems Portfolio",
    description:
      "Advanced-first engineering portfolio spanning LLM optimization, multimodal/OCR benchmarking, and simulation-grade C++ workflows.",
    url: siteUrl,
    siteName: "Lakshay Kumar Portfolio",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lakshay Kumar AI Systems Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakshay Kumar | AI Systems Portfolio",
    description:
      "From full-stack foundations to LLM, multimodal/OCR, and C++ simulation systems engineering.",
    images: ["/twitter-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-950 text-slate-100 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[70] rounded-md bg-amber-300 px-3 py-2 text-sm font-semibold text-slate-950 focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-amber-200"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <SiteShell>{children}</SiteShell>
        <SiteFooter />
      </body>
    </html>
  );
}
