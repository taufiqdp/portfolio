import Link from "next/link";
import { BlogPosts } from "./components/posts";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { SiHuggingface } from "react-icons/si";

export default function Page() {
  return (
    <>
      <section className="mb-20">
        <div className="flex flex-col mb-4">
          <img
            src="https://taufiqdp.com/og-profile-image.png"
            alt="Taufiq Dwi Purnomo"
            className="mb-4 rounded-full w-20 h-20 xl:w-28 xl:h-28"
          />
          <h1 className="text-3xl font-semibold tracking-tighter">
            Taufiq Dwi Purnomo
          </h1>
        </div>
        <p className="mb-4 text-neutral-600">
          {`I am a machine learning engineer and web developer based in Yogyakarta, Indonesia.`}
        </p>
        <div className="flex mt-10 space-x-4 text-neutral-600">
          <Link
            href="https://github.com/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-black"
          >
            <FaGithub className="mr-2" size={20} />
          </Link>
          <Link
            href="https://linkedin.com/in/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-black"
          >
            <FaLinkedin className="mr-2" size={20} />
          </Link>
          <Link
            href="https://huggingface.co/taufiqdp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-black"
          >
            <SiHuggingface className="mr-2" size={20} />
          </Link>
          <Link
            href="https://bsky.app/profile/taufiqdp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-black"
          >
            <FaBluesky className="mr-2" size={20} />
          </Link>
        </div>
      </section>

      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tighter mb-4">
          Blog Posts
        </h1>
        <BlogPosts />
      </div>
    </>
  );
}
