import Link from "next/link";
import React from "react";
import { experience } from "../data";
import { InkSwitcher } from "./ink-switcher";

const navItems = [
  { href: "/", name: "Home", show: true },
  { href: "/#experience", name: "Experience", show: experience.length > 0 },
  { href: "/blog", name: "Writing", show: true },
  { href: "/gallery", name: "Gallery", show: true },
  { href: "/#music", name: "Music", show: !!process.env.LAST_FM_API_KEY },
  { href: "/#contact", name: "Contact", show: true },
];

export function Navbar() {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-sm font-bold">
      <nav className="flex flex-wrap gap-x-5 gap-y-2">
        {navItems
          .filter((item) => item.show)
          .map(({ href, name }) => (
            <Link key={href} href={href} className="hover:ink-link">
              {name}
            </Link>
          ))}
      </nav>
      <InkSwitcher />
    </header>
  );
}
