import { unstable_cache } from "next/cache";

// Music from Last.fm (Spotify scrobbles to it), linked to Spotify.
// Needs LAST_FM_API_KEY and LAST_FM_USERNAME; SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET add
// exact track links and album covers. Set them in .env locally and in Vercel's env vars.

const LAST_FM = "https://ws.audioscrobbler.com/2.0/";

// Last.fm's grey star stand-in when it has no artwork.
const NO_ART = "2a96cbd8b46e442fc41c2b86b821562f";
export const lastFmCover = (images?: { "#text": string }[]) => {
  const url = images?.at(-1)?.["#text"] ?? "";
  return url && !url.includes(NO_ART) ? url : null;
};

export function lastFmUrl(method: string, params: Record<string, string>) {
  const key = process.env.LAST_FM_API_KEY;
  const user = process.env.LAST_FM_USERNAME;
  if (!key || !user) return null;
  const query = new URLSearchParams({ method, user, api_key: key, format: "json", ...params });
  return `${LAST_FM}?${query}`;
}

export type RepeatTrack = {
  title: string;
  artist: string;
  plays: number;
  cover: string | null;
  spotifyUrl: string;
};

// Your most played songs of the past month, refreshed hourly.
export const getOnRepeat = unstable_cache(
  async (): Promise<RepeatTrack[]> => {
    const url = lastFmUrl("user.gettoptracks", { period: "1month", limit: "5" });
    if (!url) return [];
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Last.fm top tracks failed: ${res.status}`);
    const top: { name: string; playcount: string; artist: { name: string }; image?: { "#text": string }[] }[] =
      (await res.json())?.toptracks?.track ?? [];

    return Promise.all(
      top.map(async (track) => {
        const spotify = await findOnSpotify(track.name, track.artist.name);
        return {
          title: track.name,
          artist: track.artist.name,
          plays: Number(track.playcount),
          cover: spotify.cover ?? lastFmCover(track.image),
          spotifyUrl: spotify.url,
        };
      })
    );
  },
  ["on-repeat"],
  { revalidate: 3600 }
);

// ---------- Spotify ----------

// Kept in memory per server instance. ponytail: the map only grows by songs you play;
// fine for one person's listening, swap for a TTL cache if it ever matters.
type Token = { value: string; expires: number } | null;
let appToken: Token = null;
let userToken: Token = null;
const found = new Map<string, { url: string; cover: string | null }>();

async function requestSpotifyToken(body: Record<string, string>): Promise<Token> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) return null;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const { access_token, expires_in } = await res.json();
  return { value: access_token, expires: Date.now() + (expires_in - 60) * 1000 };
}

// App-only token (client credentials): enough for search, no Spotify login needed.
async function getSpotifyToken() {
  if (!appToken || appToken.expires <= Date.now()) {
    appToken = await requestSpotifyToken({ grant_type: "client_credentials" });
  }
  return appToken?.value ?? null;
}

// Your own token, from the one-time `pnpm spotify:login`; needed to read what you're playing.
async function getSpotifyUserToken() {
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!refresh) return null;
  if (!userToken || userToken.expires <= Date.now()) {
    userToken = await requestSpotifyToken({ grant_type: "refresh_token", refresh_token: refresh });
  }
  return userToken?.value ?? null;
}

// Spotify lists covers largest first (640, 300, 64); 300 is plenty for small thumbnails.
const pickCover = (images: { url: string; width: number }[]) =>
  images.find((image) => image.width <= 300)?.url ?? images[0]?.url ?? null;

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

// Last.fm and Spotify differ on quote marks and spacing; compare without them.
const normalize = (text: string) =>
  text.replace(/[‘’`´]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim().toLowerCase();

// The exact track on Spotify plus its album cover; a Spotify search (and no cover) when there's
// no exact match or Spotify is unavailable.
export async function findOnSpotify(title: string, artist: string) {
  const search = {
    url: `https://open.spotify.com/search/${encodeURIComponent(`${title} ${artist}`)}`,
    cover: null,
  };
  const cacheKey = `${normalize(title)}\n${normalize(artist)}`;
  const known = found.get(cacheKey);
  if (known) return known;

  try {
    const token = await getSpotifyToken();
    if (!token) return search;
    const res = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=5&q=${encodeURIComponent(`${title} artist:${artist}`)}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );
    if (!res.ok) return search;
    const items: {
      name: string;
      artists: { name: string }[];
      external_urls: { spotify: string };
      album: { images: { url: string; width: number }[] };
    }[] = (await res.json()).tracks?.items ?? [];

    // Only trust the same title by the same artist, so a cover or a reprise never gets linked.
    const match = items.find(
      (item) =>
        normalize(item.name) === normalize(title) &&
        item.artists.some((a) => normalize(a.name) === normalize(artist))
    );
    if (!match) return search;

    const result = { url: match.external_urls.spotify, cover: pickCover(match.album.images) };
    found.set(cacheKey, result);
    return result;
  } catch {
    return search;
  }
}
