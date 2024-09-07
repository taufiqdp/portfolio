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
  title: "Taufiq",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistMono.className}>
      <body>
        <Navbar />
        <div className="bg-[#f3f4f6] h-full py-20 lg:px-40 md:px-20 sm:px-10 px-5 ">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
