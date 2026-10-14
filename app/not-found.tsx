import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <section>
      <h1 className="display mt-10 mb-6 text-[length:clamp(56px,9vw,120px)] leading-[0.84] [font-stretch:70%]">
        404
      </h1>
      <p className="mb-8">
        This page doesn't exist.{" "}
        <Link href="/" className="ink-link font-bold">
          Go to the homepage
        </Link>
      </p>
      <img
        src="https://c.tenor.com/uqDNFL83d7cAAAAd/tenor.gif"
        alt="Not Found GIF"
      />
    </section>
  );
}
