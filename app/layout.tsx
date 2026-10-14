import "./global.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { NowPlaying } from "./components/now-playing";
import React from "react";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

// Runs before first paint so a saved ink choice never flashes the default colors.
const inkScript = `try{var i=localStorage.getItem("ink");if(i)document.documentElement.dataset.ink=i}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://taufiqdp.com"),
  title: "Taufiq Dwi Purnomo",
  description:
    "Taufiq Dwi Purnomo: AI Engineer and AI Consultant building NLP, LLM, computer vision and AI agent solutions, plus web applications.",
  keywords:
    "Machine Learning, Web Development, AI, Portfolio, Taufiq Dwi Purnomo",
  authors: [
    {
      name: "Taufiq Dwi Purnomo",
      url: "https://taufiqdp.com",
    },
  ],
  openGraph: {
    title: "Taufiq Dwi Purnomo - AI Engineer",
    description:
      "Explore the projects, skills and blogs of Taufiq Dwi Purnomo, an AI Engineer and AI Consultant.",
    type: "website",
    url: "https://taufiqdp.com",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Taufiq Dwi Purnomo, AI engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // "./" resolves per page, so each page is its own canonical URL (not all pointing at the home page).
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: inkScript sets data-ink before React hydrates.
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: inkScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Taufiq Dwi Purnomo",
              jobTitle: "AI Engineer",
              url: "https://taufiqdp.com",
              sameAs: [
                "https://www.linkedin.com/in/taufiqdp",
                "https://github.com/taufiqdp",
              ],
              knowsAbout: [
                "Machine Learning",
                "Deep Learning",
                "Web Development",
                "Artificial Intelligence",
                "Large Language Models",
                "Python",
              ],
              image: "https://taufiqdp.com/og-profile-image.png",
            }),
          }}
        />
      </head>
      <body className="mx-auto max-w-[1440px] px-4 pt-5 pb-10 font-sans text-[17px] leading-normal antialiased sm:px-6 lg:px-10">
        <Navbar />
        <main className="min-w-0">{children}</main>
        <Footer />
        <NowPlaying />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
