import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Section } from "../components/section";
import {
  getLastFmUser,
  getListening,
  PERIODS,
  type Period,
  type TopAlbum,
  type TopArtist,
} from "../music";

export const metadata = {
  title: "Listening",
  description: "What Taufiq Dwi Purnomo has been listening to: top albums and artists from Last.fm.",
};

const plays = (n: number) => `${n.toLocaleString("en-US")} plays`;

// Covers tilted and taped on, each with a paper price sticker for its rank; #1 is twice the size.
function TopAlbums({ albums }: { albums: TopAlbum[] }) {
  return (
    <ol className="paste grid grid-cols-2 gap-x-[18px] gap-y-[30px] px-1 pt-2.5 lg:grid-cols-3">
      {albums.map((album, i) => {
        const first = i === 0;
        // Last.fm sizes covers by URL; the big one gets 600px so it stays sharp.
        const cover = first ? album.cover?.replace("/300x300/", "/600x600/") : album.cover;
        return (
          <li key={album.url} className={first ? "col-span-2 lg:row-span-2" : undefined}>
            <a href={album.url} target="_blank" rel="noopener noreferrer" className="group block">
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
                className={`mt-3 block group-hover:ink-link ${
                  first
                    ? "display text-[length:clamp(22px,2.4vw,32px)] leading-[0.95]"
                    : "line-clamp-2 text-sm leading-tight font-extrabold"
                }`}
              >
                {album.title}
              </b>
              <span className={`block leading-snug ${first ? "text-[15px]" : "text-[13px]"}`}>
                {album.artist}
              </span>
              <span className={`block leading-snug tabular-nums ${first ? "text-[15px]" : "text-[13px]"}`}>
                {plays(album.plays)}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

// Ranked rows with a photo and a pop bar measured against #1; the top three get bigger photos.
function TopArtists({ artists }: { artists: TopArtist[] }) {
  const most = artists[0]?.plays || 1;
  return (
    <ol className="grid gap-4">
      {artists.map((artist, i) => (
        <li key={artist.name}>
          <a href={artist.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
            <span className="w-7 shrink-0 text-[13px] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className={`halftone relative shrink-0 ${i < 3 ? "size-22" : "size-14"}`}>
              {artist.image && (
                <img src={artist.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-3">
                <b className="display block text-2xl leading-tight font-extrabold [font-stretch:80%] group-hover:ink-link">
                  {artist.name}
                </b>
                <span className="shrink-0 text-[13px] tabular-nums">{plays(artist.plays)}</span>
              </span>
              <span className="mt-1.5 block h-2 bg-pop" style={{ width: `${(artist.plays / most) * 100}%` }} />
            </span>
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
  // Only the four known periods; anything else (or none) shows this month.
  const { period: asked } = await searchParams;
  const period: Period =
    typeof asked === "string" && Object.hasOwn(PERIODS, asked) ? (asked as Period) : "1month";

  const [user, { albums, artists }] = await Promise.all([
    getLastFmUser().catch(() => null),
    getListening(period).catch(() => ({ albums: [], artists: [] })),
  ]);
  if (!user) notFound(); // no Last.fm keys, or Last.fm is down

  const since = new Date(user.since).toLocaleString("en-US", { month: "long", year: "numeric" });
  const facts = [
    ["Plays", user.plays],
    ["Artists", user.artists],
    ["Albums", user.albums],
    ["Tracks", user.tracks],
  ] as const;

  return (
    <div className="grid gap-14 md:grid-cols-2 md:gap-[clamp(24px,5vw,72px)]">
      <div className="md:sticky md:top-5 md:self-start">
        <h1 className="display mt-10 text-[length:clamp(56px,8.4vw,130px)] leading-[0.84] [font-stretch:70%]">
          Listening
        </h1>
        <p className="mt-5 max-w-[26ch] text-[length:clamp(20px,2vw,26px)] leading-snug">
          What&apos;s been playing since {since}.
        </p>
        <dl className="mt-7 grid max-w-[420px] grid-cols-2 gap-x-6 gap-y-4">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[13px]">{label}</dt>
              <dd className="mt-0.5 font-bold tabular-nums">{value.toLocaleString("en-US")}</dd>
            </div>
          ))}
        </dl>
        <nav aria-label="Period" className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(PERIODS) as Period[]).map((key) => (
            <Link
              key={key}
              href={`/music?period=${key}`}
              scroll={false}
              aria-current={key === period ? "page" : undefined}
              className="rounded-full border-2 border-ink px-3.5 py-1 text-sm font-bold hover:bg-ink/10 aria-[current=page]:bg-ink aria-[current=page]:text-paper"
            >
              {PERIODS[key]}
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <Section title="Top albums">
          {albums.length > 0 ? <TopAlbums albums={albums} /> : <p>Nothing played {PERIODS[period].toLowerCase()} yet.</p>}
        </Section>
        <Section title="Top artists">
          {artists.length > 0 ? <TopArtists artists={artists} /> : <p>Nothing played {PERIODS[period].toLowerCase()} yet.</p>}
          {/* Last.fm's API terms ask for a credit and link wherever its data is shown. */}
          <p className="mt-5 text-[13px]">
            Charts via{" "}
            <a
              href={`https://www.last.fm/user/${encodeURIComponent(process.env.LAST_FM_USERNAME ?? "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link font-bold"
            >
              Last.fm
            </a>
            ; artist photos from Spotify.
          </p>
        </Section>
      </div>
    </div>
  );
}
