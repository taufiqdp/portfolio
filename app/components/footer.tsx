import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
      <p>© {new Date().getFullYear()} Taufiq Dwi Purnomo</p>
      <Link href="/rss" target="_blank" className="ink-link font-bold">
        RSS feed
      </Link>
    </footer>
  );
}
