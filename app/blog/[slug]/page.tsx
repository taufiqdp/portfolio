import React from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "../../components/mdx";
import { formatDate, getBlogPosts } from "../utils";
import { baseUrl } from "../../sitemap";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Import icons

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = await params;
  let posts = getBlogPosts();
  let post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  } else {
    // Sort posts by published date (newest first)
    posts.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );

    // Find the index of the current post in the sorted array
    const currentIndex = posts.findIndex((p) => p.slug === post.slug);

    // Calculate the indices for previous and next posts
    const prevIndex = currentIndex + 1;
    const nextIndex = currentIndex - 1;

    // Get the previous and next posts, handling boundary conditions
    const prevPost = prevIndex < posts.length ? posts[prevIndex] : null;
    const nextPost = nextIndex >= 0 ? posts[nextIndex] : null;

    return (
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "Taufiq",
              },
            }),
          }}
        />
        <h1 className="title font-semibold text-3xl tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-4 mb-8 text-sm">
          <p className="text-sm text-neutral-600">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
        <div className="flex justify-between mt-12 items-center">
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="text-neutral-600 hover:text-neutral-800 hover:underline hover:underline-offset-2 flex items-center"
            >
              <FiChevronLeft className="mr-2" size={20} />
              <span>previous</span>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="text-neutral-600 hover:text-neutral-800 hover:underline hover:underline-offset-2 flex items-center ml-auto"
            >
              <span>next</span>
              <FiChevronRight className="ml-2" size={20} />
            </Link>
          )}
        </div>
      </section>
    );
  }
}
