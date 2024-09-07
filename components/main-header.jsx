import userImage from "@/assets/placeholder-user.png";
import Image from "next/image";
import Link from "next/link";

import { FaDownload } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

export default function MainHeader() {
  return (
    <section id="about" className="w-full md:pt-12">
      <div className="container grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4 lg:order-1 order-2">
          <div className="space-y-10">
            <div className="space-y-5">
              <h1 className="text-xl font-bold text-[#42b883]">
                Hi 👋, my name is
              </h1>
              <h1 className="text-4xl font-bold tracking-tighter text-neutral-700">
                Taufiq Dwi Purnomo
              </h1>
              <hr className="border-[#42b883] border-2 md:w-60 sm:w-40 w-32" />
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl text-gray-600">
              I&apos;m a passionate machine learning engineer and web developer
              with a strong background in artificial intelligence technologies
              and full-stack development.
            </p>
            <div className="flex items-center md:justify-start gap-4">
              <Link
                href="/"
                className="flex w-fit items-center gap-2 border py-2 px-3 rounded-lg bg-[#42b883] hover:bg-[#4bd497] text-white"
              >
                <FaDownload />
                <p>Download CV</p>
              </Link>
              <Link
                href="https://github.com/taufiqdp"
                className="border p-2 rounded-lg bg-white text-2xl"
                target="_blank"
              >
                <FaGithub />
              </Link>
              <Link
                href="https://hf.co/taufiqdp"
                className="border p-2 rounded-lg bg-white text-2xl"
                target="_blank"
              >
                <SiHuggingface />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex lg:justify-end justify-center md:m-0 m-10 h-fit lg:order-2 order-1">
          <div className="rounded-full border border-neutral-300">
            <div className="rounded-full border border-neutral-300 p-6">
              <Image
                src={userImage}
                height={350}
                width={350}
                className="rounded-full border border-neutral-300 p-6"
                alt="user image"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
