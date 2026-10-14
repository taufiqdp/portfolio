import React from "react";
import Link from "next/link";
import { formatDate, getBlogPosts } from "../blog/utils";

export function BlogPosts() {
  return (
    <div className="grid gap-10">
      {getBlogPosts().map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
          <span className="text-sm">
            {formatDate(post.metadata.publishedAt, false)}
          </span>
          <h3 className="display mt-1 mb-2.5 text-[32px] leading-none font-extrabold [font-stretch:80%]">
            {post.metadata.title}
          </h3>
          <p className="mb-3 max-w-[52ch]">{post.metadata.summary}</p>
          <span className="ink-link font-bold">Read the post</span>
        </Link>
      ))}
    </div>
  );
}
