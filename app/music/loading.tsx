import React from "react";
import { Section } from "../components/section";
import { PERIODS } from "../music";

const pulse = "animate-pulse motion-reduce:animate-none";

// The Listening page's own shape while its charts load: the real title, labels and pills, with
// taped halftone squares for the covers and blank rows for the artists.
export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading charts"
      className="grid gap-14 md:grid-cols-2 md:gap-[clamp(24px,5vw,72px)]"
    >
      <div className="md:sticky md:top-5 md:self-start">
        <h1 className="display mt-10 text-[length:clamp(56px,8.4vw,130px)] leading-[0.84] [font-stretch:70%]">
          Listening
        </h1>
        <div className={`mt-5 h-14 max-w-[26ch] bg-ink/10 ${pulse}`} />
        <div className="mt-7 grid max-w-[420px] grid-cols-2 gap-x-6 gap-y-4">
          {["Plays", "Artists", "Albums", "Tracks"].map((label) => (
            <div key={label}>
              <p className="text-[13px]">{label}</p>
              <div className={`mt-1 h-5 w-20 bg-ink/10 ${pulse}`} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {Object.values(PERIODS).map((label) => (
            <span key={label} className="rounded-full border-2 border-ink px-3.5 py-1 text-sm font-bold">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div>
        <Section title="Top albums">
          <ol className="paste grid grid-cols-2 gap-x-[18px] gap-y-[30px] px-1 pt-2.5 lg:grid-cols-3">
            {Array.from({ length: 9 }, (_, i) => (
              <li key={i} className={i === 0 ? "col-span-2 lg:row-span-2" : undefined}>
                <span className={`tape halftone relative block aspect-square ${pulse}`} />
              </li>
            ))}
          </ol>
        </Section>
        <Section title="Top artists">
          <div className="grid gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-7 shrink-0" />
                <span className={`halftone relative shrink-0 ${i < 3 ? "size-22" : "size-14"} ${pulse}`} />
                <span className="h-5 w-48 bg-ink/10" />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
