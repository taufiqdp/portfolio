import { findOnSpotify, lastFmCover, lastFmUrl } from "../../music";

// Your latest Last.fm scrobble, with a link to the song on Spotify (see app/music.ts).
export type Track = {
  title: string;
  artist: string;
  cover: string | null;
  playing: boolean;
  spotifyUrl: string;
};

export async function GET() {
  const url = lastFmUrl("user.getrecenttracks", { limit: "1" });
  if (!url) return Response.json(null);

  const res = await fetch(url, { next: { revalidate: 30 } });
  const track = res.ok ? (await res.json())?.recenttracks?.track?.[0] : null;
  if (!track) return Response.json(null);

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
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
  );
}
