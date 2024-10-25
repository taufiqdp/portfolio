import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import localFont from "next/font/local";
import MainHeader from "@/components/main-header";
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
      <body className="flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 p-4 sm:p-10">
        <main className="sm:w-3/4 md:w-2/4 flex-grow">
          <MainHeader />
          <div className="sm:px-0 px-12">{children}</div>
        </main>
        <Footer className="mt-auto" />
        <Analytics />
      </body>
    </html>
  );
}
