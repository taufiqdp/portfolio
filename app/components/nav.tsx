import Link from "next/link";
import React from "react";
import { InkSwitcher } from "./ink-switcher";

// Pages only; the home page's sections are one scroll away.
const navItems = [
  { href: "/", name: "Home" },
  { href: "/blog", name: "Writing" },
  { href: "/gallery", name: "Gallery" },
  { href: "/music", name: "Listening" },
];

export function Navbar() {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-sm font-bold">
      <nav className="flex flex-wrap gap-x-5 gap-y-2">
        {navItems.map(({ href, name }) => (
          <Link key={href} href={href} className="hover:ink-link">
            {name}
          </Link>
        ))}
      </nav>
      <InkSwitcher />
    </header>
  );
}
