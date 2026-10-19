import { findOnSpotify, getSpotifyNowPlaying, lastFmCover, lastFmUrl, type Track } from "../../music";

export type { Track };

// Short CDN cache: at most one Spotify/Last.fm call per few seconds, while staying near real time.
const headers = { "Cache-Control": "public, s-maxage=5, stale-while-revalidate=5" };

// What's on your Spotify right now; when nothing is, your last Last.fm scrobble (see app/music.ts).
export async function GET() {
  const live = await getSpotifyNowPlaying().catch(() => null);
  if (live) return Response.json(live satisfies Track, { headers });

  const url = lastFmUrl("user.getrecenttracks", { limit: "1" });
  if (!url) return Response.json(null);
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(5000) });
  const track = res.ok ? (await res.json())?.recenttracks?.track?.[0] : null;
  if (!track) return Response.json(null, { headers });

  const title: string = track.name;
  const artist: string = track.artist?.["#text"] ?? "";
  const spotify = await findOnSpotify(title, artist);
  return Response.json(
    {
      title,
      artist,
      cover: lastFmCover(track.image) ?? spotify.cover,
      playing: track["@attr"]?.nowplaying === "true",
      spotifyUrl: spotify.url,
    } satisfies Track,
    { headers }
  );
}
