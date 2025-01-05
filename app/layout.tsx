import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import React from "react";

export const metadata: Metadata = {
  title: "Taufiq Dwi Purnomo",
  description:
    "Taufiq Dwi Purnomo: Experienced Machine Learning Engineer and Web Developer specializing in AI and web applications. View my projects and skills.",
  keywords:
    "Machine Learning, Web Development, AI, Portfolio, Taufiq Dwi Purnomo",
  authors: [
    {
      name: "Taufiq Dwi Purnomo",
      url: "https://taufiqdp.com",
    },
  ],
  openGraph: {
    title: "Taufiq Dwi Purnomo - ML & Web Developer",
    description:
      "Explore the projects, skills and blogs of Taufiq Dwi Purnomo, a Machine Learning Engineer and Web Developer.",
    type: "website",
    url: "https://taufiqdp.com",
    images: [
      {
        url: "https://taufiqdp.com/og-profile-image.png",
        width: 800,
        height: 600,
        alt: "Taufiq Dwi Purnomo",
      },
    ],
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
  alternates: {
    canonical: "https://taufiqdp.com",
  },
};

const cx = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        `text-black bg-white dark:text-white dark:bg-black font-sans`
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Taufiq Dwi Purnomo",
              jobTitle: "Machine Learning Engineer & Web Developer",
              url: "https://taufiqdp.com",
              sameAs: [
                "https://www.linkedin.com/in/taufiq-dwi-purnomo/",
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
      <body className="antialiased max-w-xl mx-4 mt-4 lg:mt-8 sm:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
