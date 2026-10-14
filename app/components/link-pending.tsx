"use client";

import { useLinkStatus } from "next/link";

// Shown inside a <Link> while its page loads: the now-playing equalizer, bouncing. It carries
// data-pending, so the link itself can restyle with has-[[data-pending]]. Must sit inside a <Link>.
export function LinkPending({ className = "" }: { className?: string }) {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <span data-pending aria-hidden="true" className={`eq playing delayed-show ${className}`}>
      <i />
      <i />
      <i />
    </span>
  );
}
