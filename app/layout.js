import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weights: ["400"],
});

export const metadata = {
  title: "Taufiq Dwi Purnomo",
  description:
    "Taufiq Dwi Purnomo: Experienced Machine Learning Engineer and Web Developer specializing in AI and web applications. View my projects and skills.",
  keywords:
    "Machine Learning, Web Development, AI, Portfolio, Taufiq Dwi Purnomo",
  author: "Taufiq Dwi Purnomo",
  openGraph: {
    title: "Taufiq Dwi Purnomo - ML & Web Developer",
    description:
      "Explore the projects and skills of Taufiq Dwi Purnomo, a Machine Learning Engineer and Web Developer.",
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
  },
  alternates: {
    canonical: "https://taufiqdp.com",
  },
  structuredData: {
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
      "Python",
    ],
    image: "https://taufiqdp.com/og-profile-image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
