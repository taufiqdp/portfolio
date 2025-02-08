import { BlogPosts } from "./components/posts";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col mb-4">
        <img
          src="https://taufiqdp.com/og-profile-image.png"
          alt="Taufiq Dwi Purnomo"
          className="mb-4 rounded-full w-20 h-20 xl:w-28 xl:h-28"
        />
        <h1 className="text-2xl font-semibold tracking-tighter">
          Taufiq Dwi Purnomo
        </h1>
      </div>
      <p className="mb-4">
        {`I am a machine learning engineer and web developer who enjoys working with AI 🤗.`}
      </p>

      <div className="my-10">
        <BlogPosts />
      </div>
    </section>
  );
}
