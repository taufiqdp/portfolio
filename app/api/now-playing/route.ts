import { getSpotifyLastPlayed, getSpotifyNowPlaying, type Track } from "../../music";

export type { Track };

// Short CDN cache: at most one Spotify call per few seconds, while staying near real time.
const headers = { "Cache-Control": "public, s-maxage=5, stale-while-revalidate=5" };

// What's on your Spotify right now; when nothing is, the last song you played there.
export async function GET() {
  const track: Track | null =
    (await getSpotifyNowPlaying().catch(() => null)) ?? (await getSpotifyLastPlayed());
  return Response.json(track, { headers });
}
