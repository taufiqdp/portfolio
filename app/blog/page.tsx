import { BlogPosts } from "../components/posts";
import React from "react";

export const metadata = {
  title: "Writing",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="max-w-3xl">
      <h1 className="display mt-10 mb-12 text-[length:clamp(56px,9vw,120px)] leading-[0.84] [font-stretch:70%]">
        Writing
      </h1>
      <BlogPosts />
    </section>
  );
}
