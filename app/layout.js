import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";

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
    image: "https://taufiqdp.com/og-profile-image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistMono.className}>
      <Head>
        <link rel="canonical" href="https://taufiqdp.com" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Taufiq Dwi Purnomo",
              "jobTitle": "Machine Learning Engineer & Web Developer",
              "url": "https://taufiqdp.com",
              "sameAs": [
                "https://www.linkedin.com/in/taufiq-dwi-purnomo/",
                "https://github.com/taufiqdp"
              ],
              "knowsAbout": ["Machine Learning", "Web Development", "Artificial Intelligence", "Python"],
              "image": "https://taufiqdp.com/og-profile-image.png"
            }
          `}
        </script>
      </Head>
      <body>
        <Navbar />
        <main className="bg-[#f3f4f6] min-h-screen py-20 lg:px-40 md:px-20 sm:px-10 px-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
