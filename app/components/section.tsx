import React from "react";

// A titled block with the pop rule above it; the first one in a column has no rule.
export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mt-12 scroll-mt-6 border-t-2 border-pop pt-9 first:mt-0 first:border-0 first:pt-0"
    >
      <h2 className="display mb-6 text-[length:clamp(40px,4.6vw,64px)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
