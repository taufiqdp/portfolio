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
        <p className="mt-10 text-sm">{formatDate(post.metadata.publishedAt)}</p>
        <h1 className="display mt-2 max-w-4xl text-[length:clamp(40px,6vw,80px)]">
          {post.metadata.title}
        </h1>
        <article className="prose mt-8">
          <CustomMDX source={post.content} />
        </article>
        <div className="mt-12 flex max-w-[68ch] items-center justify-between border-t-2 border-pop pt-6 font-bold">
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="flex items-center hover:ink-link"
            >
              <FiChevronLeft className="mr-2" size={20} />
              <span>previous</span>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="ml-auto flex items-center hover:ink-link"
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
