"use client";

import React from "react";

// Each id matches a [data-ink] block in global.css.
const inks = [
  { id: "orange", name: "Medium Blue + Orange" },
  { id: "pink", name: "Blue + Fluorescent Pink" },
  { id: "green", name: "Hunter Green + Sunflower" },
  { id: "burgundy", name: "Burgundy + Yellow" },
  { id: "black", name: "Black + Fluorescent Red" },
];

export function InkSwitcher() {
  const [ink, setInk] = React.useState("orange");

  // The inline script in layout.tsx applied the saved ink before paint; sync to it.
  React.useEffect(() => {
    setInk(document.documentElement.dataset.ink ?? "orange");
  }, []);

  const choose = (id: string) => {
    setInk(id);
    document.documentElement.dataset.ink = id;
    try {
      localStorage.setItem("ink", id);
    } catch {}
  };

  return (
    <div role="group" aria-label="Ink colors" className="flex gap-1">
      {inks.map(({ id, name }) => (
        // data-ink scopes --ink/--pop to this button, so its swatch shows its own pair.
        <button
          key={id}
          type="button"
          data-ink={id}
          title={name}
          aria-label={name}
          aria-pressed={ink === id}
          onClick={() => choose(id)}
          className="flex cursor-pointer rounded-full p-1 ring-ink aria-pressed:ring-2"
        >
          <span className="size-3.5 rounded-full bg-ink" />
          <span className="-ml-1.5 size-3.5 rounded-full bg-pop" />
        </button>
      ))}
    </div>
  );
}
