import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { LinkPending } from "../components/link-pending";
import { Section } from "../components/section";
import { getListening, PERIODS, type Period, type TopArtist, type TopTrack } from "../music";

export const metadata = {
  title: "Listening",
  description: "What Taufiq Dwi Purnomo has been listening to: top tracks and artists from Spotify.",
};

// Covers tilted and taped on, each with a paper price sticker for its rank; #1 is twice the size.
function TopTracks({ tracks }: { tracks: TopTrack[] }) {
  return (
    <ol className="paste grid grid-cols-2 gap-x-[18px] gap-y-[30px] px-1 pt-2.5 lg:grid-cols-3">
      {tracks.map((track, i) => {
        const first = i === 0;
        // The big one gets Spotify's 640px cover so it stays sharp.
        const cover = first ? track.coverLarge : track.cover;
        return (
          <li key={track.url} className={first ? "col-span-2 lg:row-span-2" : undefined}>
            <a href={track.url} target="_blank" rel="noopener noreferrer" className="group block">
              <span className="tape halftone relative block aspect-square">
                {cover && (
                  <img
                    src={cover}
                    alt=""
                    loading={i < 3 ? "eager" : "lazy"}
                    className="absolute inset-0 size-full object-cover"
                  />
                )}
                <span
                  className={`absolute -right-2 bottom-3 rotate-[7deg] border-2 border-ink bg-paper leading-none font-black [font-stretch:75%] ${
                    first ? "px-3 py-1.5 text-3xl" : "px-2 py-1 text-lg"
                  }`}
                >
                  No.{i + 1}
                </span>
              </span>
              <b
                // line-clamp-2 sets its own display; adding block there would cancel the clamp.
                className={`mt-3 group-hover:ink-link ${
                  first
                    ? "display block text-[length:clamp(22px,2.4vw,32px)] leading-[0.95]"
                    : "line-clamp-2 text-sm leading-tight font-extrabold"
                }`}
              >
                {track.title}
              </b>
              <span className={`block leading-snug ${first ? "text-[15px]" : "text-[13px]"}`}>
                {track.artist}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

// Ranked rows with a photo; the top three get bigger photos.
function TopArtists({ artists }: { artists: TopArtist[] }) {
  return (
    <ol className="grid gap-4">
      {artists.map((artist, i) => (
        <li key={artist.url}>
          <a href={artist.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
            <span className="w-7 shrink-0 text-[13px] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className={`halftone relative shrink-0 ${i < 3 ? "size-22" : "size-14"}`}>
              {artist.image && (
                <img src={artist.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
              )}
            </span>
            <b className="display block min-w-0 text-2xl leading-tight font-extrabold [font-stretch:80%] group-hover:ink-link">
              {artist.name}
            </b>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Only the three known periods; anything else (or none) shows the last 4 weeks.
  const { period: asked } = await searchParams;
  const period: Period =
    typeof asked === "string" && Object.hasOwn(PERIODS, asked) ? (asked as Period) : "short_term";

  const listening = await getListening(period).catch(() => null);
  if (!listening) notFound(); // no Spotify login, or Spotify is down
  const { tracks, artists } = listening;
  const nothing = <p>Nothing played in the {PERIODS[period].toLowerCase()}.</p>;

  return (
    <div className="grid gap-14 md:grid-cols-2 md:gap-[clamp(24px,5vw,72px)]">
      <div className="md:sticky md:top-5 md:self-start">
        <h1 className="display mt-10 text-[length:clamp(56px,8.4vw,130px)] leading-[0.84] [font-stretch:70%]">
          Listening
        </h1>
        <p className="mt-5 max-w-[26ch] text-[length:clamp(20px,2vw,26px)] leading-snug">
          What&apos;s been playing lately.
        </p>
        <nav aria-label="Period" className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(PERIODS) as Period[]).map((key) => (
            <Link
              key={key}
              href={`/music?period=${key}`}
              scroll={false}
              aria-current={key === period ? "page" : undefined}
              // The clicked pill fills right away, before its charts arrive.
              className="rounded-full border-2 border-ink px-3.5 py-1 text-sm font-bold hover:bg-ink/10 aria-[current=page]:bg-ink aria-[current=page]:text-paper has-[[data-pending]]:bg-ink has-[[data-pending]]:text-paper"
            >
              {PERIODS[key]}
              <LinkPending className="hidden" />
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <Section title="Top tracks">{tracks.length > 0 ? <TopTracks tracks={tracks} /> : nothing}</Section>
        <Section title="Top artists">
          {artists.length > 0 ? <TopArtists artists={artists} /> : nothing}
          <p className="mt-5 text-[13px]">Charts, covers and artist photos from Spotify.</p>
        </Section>
      </div>
    </div>
  );
}
