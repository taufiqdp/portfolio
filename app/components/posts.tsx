import React from "react";
import Link from "next/link";
import { formatDate, getBlogPosts } from "../blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col space-y-4 -mx-2 md:-mx-4 p-2 md:p-4 hover:bg-gray-100 rounded-2xl">
              <p className="text-neutral-500 tabular-nums border-l-3 rounded-sm border-l-neutral-400 pl-2">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 tracking-tight font-semibold hover:underline hover:underline-offset-2">
                {post.metadata.title}
              </p>
              <p className="text-neutral-600">{post.metadata.summary}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
