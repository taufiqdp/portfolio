/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/EWXBSuH24hx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Archivo } from 'next/font/google'
import { Libre_Franklin } from 'next/font/google'

archivo({
  subsets: ['latin'],
  display: 'swap',
})

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <BriefcaseIcon className="h-6 w-6" />
          <span className="sr-only">Portfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Skills
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Education
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Projects
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Hi, I'm John Doe
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  I'm a passionate web developer with a strong background in
                  front-end technologies. I love creating beautiful and
                  functional websites that provide a great user experience.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </section>
        <section
          id="skills"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Skills
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the technologies and tools I'm proficient in:
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Front-End</h3>
                  <p className="text-muted-foreground">
                    React, Next.js, HTML, CSS, JavaScript, TypeScript, Tailwind
                    CSS
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Back-End</h3>
                  <p className="text-muted-foreground">
                    Node.js, Express, MongoDB, PostgreSQL, Firebase
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Tools</h3>
                  <p className="text-muted-foreground">
                    Git, GitHub, VS Code, Figma, Postman
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="education"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Education
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are the degrees and certifications I've earned:
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-muted-foreground">
                    University of California, Berkeley
                  </p>
                  <p className="text-muted-foreground">Graduated: May 2018</p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Certified Scrum Master</h3>
                  <p className="text-muted-foreground">Scrum Alliance</p>
                  <p className="text-muted-foreground">Certified: June 2020</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Projects
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of the projects I've worked on:
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <img
                    src="/placeholder.svg"
                    width="550"
                    height="310"
                    alt="Project 1"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Project 1</h3>
                    <p className="text-muted-foreground">
                      A responsive e-commerce website built with React, Next.js,
                      and Tailwind CSS.
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <img
                    src="/placeholder.svg"
                    width="550"
                    height="310"
                    alt="Project 2"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Project 2</h3>
                    <p className="text-muted-foreground">
                      A real-time chat application built with React, Socket.IO,
                      and Firebase.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <img
                    src="/placeholder.svg"
                    width="550"
                    height="310"
                    alt="Project 3"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Project 3</h3>
                    <p className="text-muted-foreground">
                      A data visualization dashboard built with React, D3.js,
                      and Recharts.
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <img
                    src="/placeholder.svg"
                    width="550"
                    height="310"
                    alt="Project 4"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  />
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Project 4</h3>
                    <p className="text-muted-foreground">
                      A mobile-first landing page built with React, Gatsby, and
                      Tailwind CSS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Contact Me
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Feel free to reach out to me with any questions or
                  opportunities.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form
                  className="flex flex-col gap-4"
                  action="https://formsubmit.co/b7171fa3403e16474f87d962926c4b7c"
                  method="POST"
                >
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="max-w-lg flex-1"
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="max-w-lg flex-1"
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Message"
                    className="max-w-lg flex-1"
                    required
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 John Doe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
