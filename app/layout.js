import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
    <html lang="en" className={geistMono.className}>
      <body>
        <Navbar />
        <main className="bg-[#f3f4f6] min-h-screen py-20 lg:px-40 md:px-20 sm:px-10 px-5">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
