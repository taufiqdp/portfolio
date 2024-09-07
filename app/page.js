import userImage from "@/assets/placeholder-user.png";
import Image from "next/image";
import Link from "next/link";

import { FaDownload } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

export default function Home() {
  return (
    <main className="flex flex-col gap-24">
      {/* Main Header */}
      <section id="about" className="w-full md:py-12">
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
                I'm a passionate machine learning and web developer with a
                strong background in artificial intelligence technologies and
                full-stack development.
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

      {/* Skills */}
      <section id="skills" className="w-full bg-muted text-gray-600">
        <div className="container flex flex-col gap-8">
          <div className="flex items-center gap-8">
            <hr className="border border-[#94f7ca] w-full"></hr>
            <h2 className="flex text-3xl font-bold tracking-tighter sm:text-4xl text-neutral-700">
              <span className="text-[#42b883]">01. </span>Skills
            </h2>
            <hr className="border border-[#94f7ca] w-full"></hr>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here are some of the technologies and tools I'm proficient in:
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-4 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-neutral-700">
                  Front-End
                </h3>
                <p className="text-muted-foreground">
                  React, Next.js, HTML, CSS, JavaScript, TypeScript, Tailwind
                  CSS
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-neutral-700">Back-End</h3>
                <p className="text-muted-foreground">
                  Node.js, Express, MongoDB, PostgreSQL, Firebase
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-neutral-700">Tools</h3>
                <p className="text-muted-foreground">
                  Git, GitHub, VS Code, Figma, Postman
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
