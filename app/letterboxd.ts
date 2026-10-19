import { unstable_cache } from "next/cache";
import { letterboxdUrl } from "./data";

// Recently watched films from the Letterboxd diary's RSS feed. Letterboxd has no public API,
// but the feed is open: no keys needed, just the profile (letterboxdUrl in app/data.ts).

export type WatchedFilm = {
  title: string;
  year: string;
  rating: number | null; // out of 5, in halves
  watched: string; // YYYY-MM-DD, or "" when the entry has no date
  poster: string | null;
  url: string; // the diary entry on Letterboxd
};

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#039": "'", "#39": "'" };
const decode = (text: string) => text.replace(/&(amp|lt|gt|quot|#0?39);/g, (_, name) => ENTITIES[name]);

// The latest five diary entries, refreshed hourly.
export const getRecentlyWatched = unstable_cache(
  async (): Promise<WatchedFilm[]> => {
    // Give up after 5 s rather than hold the page open; the section is just skipped this time.
    const res = await fetch(`${letterboxdUrl}rss/`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`Letterboxd feed failed: ${res.status}`);
    const xml = await res.text();

    // ponytail: regexes over Letterboxd's own flat feed, not a general XML parser.
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, item]) => {
        const tag = (name: string) => item.match(new RegExp(`<${name}>([^<]*)</${name}>`))?.[1];
        const title = tag("letterboxd:filmTitle");
        if (!title) return null; // new lists show up in the feed too
        const rating = tag("letterboxd:memberRating");
        return {
          title: decode(title),
          year: tag("letterboxd:filmYear") ?? "",
          rating: rating ? Number(rating) : null,
          watched: tag("letterboxd:watchedDate") ?? "",
          // The feed's poster is 600x900; the 150x225 size is plenty for a thumbnail.
          poster: item.match(/<img src="([^"]+)"/)?.[1].replace("-0-600-0-900-", "-0-150-0-225-") ?? null,
          url: tag("link") ?? letterboxdUrl,
        };
      })
      .filter((film) => film !== null)
      .slice(0, 5);
  },
  ["recently-watched"],
  { revalidate: 3600 }
);

// 3.5 -> ★★★½
export const stars = (rating: number) => "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");
