import { unstable_cache } from "next/cache";

// Music from your Spotify account: what's playing, what you last played, and your top tracks and
// artists. Needs SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN (from
// `pnpm spotify:login`). Set them in .env locally and in Vercel's env vars.

// Give up on a stalled Spotify call rather than hold the page open until the host cuts it off
// (the browser then shows "This page couldn't load"). Callers fall back, as on any failure.
const TIMEOUT = 5000;

// Kept in memory per server instance.
let userToken: { value: string; expires: number } | null = null;

// Your own token, from the one-time `pnpm spotify:login`; null when there's no login.
async function getSpotifyUserToken() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;
  if (!userToken || userToken.expires <= Date.now()) {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!res.ok) return null;
    const { access_token, expires_in } = await res.json();
    userToken = { value: access_token, expires: Date.now() + (expires_in - 60) * 1000 };
  }
  return userToken.value;
}

// GET /v1/me/<path> as you; throws when there's no login or Spotify says no, so callers fall back.
async function spotifyMe(path: string) {
  const token = await getSpotifyUserToken();
  if (!token) throw new Error("No Spotify login");
  const res = await fetch(`https://api.spotify.com/v1/me/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`Spotify ${path} failed: ${res.status}`);
  return res.json();
}

type Image = { url: string; width: number };

// Spotify lists images largest first (640, 300, 64); 300 is plenty for small thumbnails.
const pickCover = (images: Image[]) =>
  images.find((image) => image.width <= 300)?.url ?? images[0]?.url ?? null;

// ---------- Now playing ----------

export type Track = {
  title: string;
  artist: string;
  cover: string | null;
  playing: boolean;
  spotifyUrl: string;
};

// The song on your Spotify right now (playing or paused); null when nothing is on,
// it's a podcast, or there's no login.
export async function getSpotifyNowPlaying(): Promise<Track | null> {
  const token = await getSpotifyUserToken();
  if (!token) return null;
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (res.status !== 200) return null; // 204 means nothing is playing
  const data = await res.json();
  const item = data.item;
  if (!item || data.currently_playing_type !== "track") return null;
  return {
    title: item.name,
    artist: item.artists.map((a: { name: string }) => a.name).join(", "),
    cover: pickCover(item.album.images),
    playing: data.is_playing,
    spotifyUrl: item.external_urls.spotify,
  };
}

// The last song you played on Spotify; null when there's none or Spotify is unavailable.
export async function getSpotifyLastPlayed(): Promise<Track | null> {
  try {
    const item = (await spotifyMe("player/recently-played?limit=1")).items?.[0]?.track;
    if (!item) return null;
    return {
      title: item.name,
      artist: item.artists.map((a: { name: string }) => a.name).join(", "),
      cover: pickCover(item.album.images),
      playing: false,
      spotifyUrl: item.external_urls.spotify,
    };
  } catch {
    return null;
  }
}

// ---------- Top tracks and artists (On repeat, the Listening page) ----------

// Spotify's three windows for top items.
export const PERIODS = {
  short_term: "Last 4 weeks",
  medium_term: "Last 6 months",
  long_term: "Last year",
} as const;
export type Period = keyof typeof PERIODS;

export type TopTrack = {
  title: string;
  artist: string;
  cover: string | null; // ~300px
  coverLarge: string | null; // ~640px, for the big #1 on the Listening page
  url: string;
};
export type TopArtist = { name: string; image: string | null; url: string };

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: { images: Image[] };
  external_urls: { spotify: string };
};
type SpotifyArtist = { name: string; images: Image[]; external_urls: { spotify: string } };

const toTopTrack = (item: SpotifyTrack): TopTrack => ({
  title: item.name,
  artist: item.artists.map((a) => a.name).join(", "),
  cover: pickCover(item.album.images),
  coverLarge: item.album.images[0]?.url ?? null,
  url: item.external_urls.spotify,
});

// Your top five songs of the last 4 weeks, refreshed hourly.
export const getOnRepeat = unstable_cache(
  async (): Promise<TopTrack[]> =>
    ((await spotifyMe("top/tracks?time_range=short_term&limit=5")).items ?? []).map(toTopTrack),
  ["on-repeat"],
  { revalidate: 3600 }
);

// Top nine tracks and top ten artists for a period, refreshed hourly.
export const getListening = unstable_cache(
  async (period: Period): Promise<{ tracks: TopTrack[]; artists: TopArtist[] }> => {
    const [tracks, artists] = await Promise.all([
      spotifyMe(`top/tracks?time_range=${period}&limit=9`),
      spotifyMe(`top/artists?time_range=${period}&limit=10`),
    ]);
    return {
      tracks: (tracks.items ?? []).map(toTopTrack),
      artists: (artists.items ?? []).map((artist: SpotifyArtist) => ({
        name: artist.name,
        image: pickCover(artist.images),
        url: artist.external_urls.spotify,
      })),
    };
  },
  ["listening"],
  { revalidate: 3600 }
);
