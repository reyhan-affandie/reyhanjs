// app/layout.tsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reyhanjs.com"),
  title: {
    default: "Reyhan Emir Affandie — Full-Stack Engineer",
    template: "%s | Reyhan Emir Affandie",
  },
  description:
    "Full-Stack Engineer with 14 years of experience. JavaScript/TypeScript, React, Next.js, Node.js, Prisma, SQL, and more. Certified Frontend Engineer (Micro1).",
  keywords: ["Reyhan Emir Affandie", "Full-Stack Engineer", "Frontend Engineer", "Next.js", "React", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
  authors: [{ name: "Reyhan Emir Affandie", url: "https://reyhanjs.com" }],
  creator: "Reyhan Emir Affandie",
  alternates: {
    canonical: "https://reyhanjs.com",
    languages: { en: "https://reyhanjs.com" },
  },
  openGraph: {
    type: "website",
    url: "https://reyhanjs.com",
    siteName: "Reyhan Emir Affandie",
    title: "Reyhan Emir Affandie — Full-Stack Engineer",
    description: "Full-Stack Engineer specializing in modern JavaScript frameworks.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Reyhan Emir Affandie — Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reyhan Emir Affandie — Full-Stack Engineer",
    description: "Full-Stack Engineer specializing in modern JavaScript frameworks.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const dynamic = "force-static";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Helpful connection hints for your CDNs */}
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="preconnect" href="https://drive.google.com" crossOrigin="" />
        {/* Person JSON-LD */}
        <Script id="ld-person" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Reyhan Emir Affandie",
            url: "https://reyhanjs.com",
            jobTitle: "Full-Stack Engineer",
            sameAs: ["https://www.linkedin.com/in/reyhan-affandie-69478457", "mailto:reyhanz1988@gmail.com"],
            knowsAbout: [
              "Typescript",
              "Javascript",
              "React",
              "Next.js",
              "React Native",
              "Node.js",
              "Express.js",
              "Nest.js",
              "Fullstack Engineer",
              "Frontend Engineer",
              "Backend Engineer",
            ],
          })}
        </Script>
      </head>
      <body className="relative min-h-screen bg-background text-foreground font-sans">
        <main>{children}</main>
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          duration={4000}
        />
      </body>
    </html>
  );
}
