# Music from Spotify Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every Last.fm call with Spotify's own API, so "On repeat", `/music` and the now-playing bar keep working after Last.fm's API becomes Pro-only on 1 Dec 2026.

**Architecture:** `app/music.ts` keeps one user-token helper and adds `spotifyMe(path)` for `/v1/me/*` calls. Top tracks and top artists come from `/me/top/*`, and the bar's fallback comes from `/me/player/recently-played`. Last.fm and the Spotify search helpers go away, because top items already include links and covers.

**Tech Stack:** Next.js 16 (App Router, `unstable_cache`), React 19, Tailwind v4, Spotify Web API, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-23-spotify-music-design.md`

## Global Constraints

- Use pnpm only. Add no new dependencies.
- AGENTS.md: before touching Next APIs, read the relevant guide in `node_modules/next/dist/docs/`. This plan keeps `unstable_cache` exactly as it's used today and adds no new Next APIs.
- Every Spotify fetch uses `cache: "no-store"` and `signal: AbortSignal.timeout(TIMEOUT)` (5000 ms), and callers fall back on failure. This is the existing pattern in `app/music.ts`.
- Chart caching stays hourly (`revalidate: 3600`). `/api/now-playing` keeps `s-maxage=5, stale-while-revalidate=5`.
- Period keys and labels, verbatim: `short_term: "Last 4 weeks"`, `medium_term: "Last 6 months"`, `long_term: "Last year"`. The default is `short_term`.
- DESIGN.md tokens and rules still apply: no new colours, the paste-up is the only tilt, and text never uses the pop colour.
- Work on branch `spotify-music`, not `master`.
- There is no test runner. Checks are `pnpm build` (type check) plus `curl` against `pnpm dev` on `http://localhost:3000`.

## Review Focus

1. **Deploy before the new refresh token reaches Vercel.** The old token gets 403 on `/me/top/*` and `recently-played`. Expected: the home page renders without "On repeat", `/music` returns 404, and the bar still shows a live song. Nothing returns a 500. Pinned in Task 3 Step 6 with an empty token.
2. **Old or junk `?period=` values** (`7day`, `overall`, `x`, repeated `?period=a&period=b`) show "Last 4 weeks". Pinned in Task 3 Step 5.
3. **A range with fewer items than asked, or none.** The grid renders what exists, and zero items shows the empty-state line. Reviewer reads `TopTracks` and the `length > 0` guards.
4. **A track whose album has no images.** `cover`/`coverLarge` are `null` and the halftone block shows. `pickCover([])` already returns `null`, and `coverLarge` must use `images[0]?.url ?? null`.
5. **Spotify stalls on the fallback.** `getSpotifyLastPlayed` returns `null` on any throw, including a timeout, so `/api/now-playing` answers `null` with a 200 instead of a 500. Pinned in Task 2 Step 5.

---

### Task 1: Ask Spotify for the two new read-only permissions

**Files:**
- Modify: `scripts/spotify-login.mjs:1` (comment), `:26` (scope)
- Add (commit only): `docs/superpowers/specs/2026-11-23-spotify-music-design.md`, `docs/superpowers/plans/2026-11-23-spotify-music.md`

**Interfaces:**
- Produces: a `SPOTIFY_REFRESH_TOKEN` in `.env` granted `user-read-currently-playing user-top-read user-read-recently-played`.

- [ ] **Step 1: Branch.** `git switch -c spotify-music`
- [ ] **Step 2: Write the check (expect fail).** Put the script below in the session scratchpad as `spotify-scopes.mjs`, outside the repo. Run it with `node --env-file=.env <path>`. Expected now: `user-top-read` and `user-read-recently-played` missing, and `403` for both endpoints.

```js
const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
const res = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: { Authorization: `Basic ${btoa(`${id}:${secret}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
});
const { access_token, scope } = await res.json();
console.log("scope:", scope);
for (const path of ["me/top/tracks?limit=1", "me/top/artists?limit=1", "me/player/recently-played?limit=1"]) {
  const r = await fetch(`https://api.spotify.com/v1/${path}`, { headers: { Authorization: `Bearer ${access_token}` } });
  console.log(path.split("?")[0], r.status);
}
```

- [ ] **Step 3: Widen the scope.** In `scripts/spotify-login.mjs`, set `scope` to `"user-read-currently-playing user-top-read user-read-recently-played"`. Update the line-1 comment and the scope comment to say the login reads what's playing, your top tracks and artists, and what you last played, all read-only.
- [ ] **Step 4: Re-login (human step).** Run `pnpm spotify:login` in the background and give the user the printed link. Wait for "Saved SPOTIFY_REFRESH_TOKEN to .env." Never print the token.
- [ ] **Step 5: Run the check again (expect pass).** All three scopes are listed, and the three endpoints return `200`.
- [ ] **Step 6: Commit.**

```bash
git add scripts/spotify-login.mjs docs/superpowers
git commit -m "Ask Spotify for top items and recently played at login"
```

---

### Task 2: Now-playing bar falls back to Spotify's last played song

**Files:**
- Modify: `app/music.ts` (add `spotifyMe`, `getSpotifyLastPlayed`; keep the existing Spotify token code)
- Modify: `app/api/now-playing/route.ts` (whole `GET`)

**Interfaces:**
- Consumes: `Track`, `getSpotifyNowPlaying()`, `getSpotifyUserToken()` and `pickCover()` as they exist in `app/music.ts`.
- Produces:
  - `async function spotifyMe(path: string): Promise<any>` (module-private). It GETs `https://api.spotify.com/v1/me/${path}` with the user token. It throws if there's no token or `!res.ok`, and returns the parsed JSON.
  - `export async function getSpotifyLastPlayed(): Promise<Track | null>`. It reads `player/recently-played?limit=1`, maps `items[0].track` to `Track` with `playing: false`, artists joined with `", "`, `pickCover(album.images)` and `external_urls.spotify`. It returns `null` when there are no items **or on any throw**.

- [ ] **Step 1: Write the check (expect fail).** With `pnpm dev` running: `grep -c "lastFm" app/api/now-playing/route.ts` should print `0`, which it doesn't yet. Separately, `curl -s localhost:3000/api/now-playing` should return JSON whose `spotifyUrl` starts with `https://open.spotify.com/track/`.
- [ ] **Step 2: Add `spotifyMe` and `getSpotifyLastPlayed`** in `app/music.ts`, next to `getSpotifyNowPlaying`.
- [ ] **Step 3: Rewrite `GET`** in `app/api/now-playing/route.ts`. Call `getSpotifyNowPlaying().catch(() => null)`, and if that's `null`, call `getSpotifyLastPlayed()`. Return `Response.json(track, { headers })` in every case, `null` included. Drop the Last.fm imports and the `findOnSpotify` call. Update the line-8 comment to name Spotify's last played song.
- [ ] **Step 4: Run the Step 1 checks (expect pass).** Also run `pnpm build`. Expected: it succeeds, because Task 3's removals haven't happened yet and the old exports still compile.
- [ ] **Step 5: Stall/failure check.** Restart dev with `SPOTIFY_REFRESH_TOKEN=` set to empty: `SPOTIFY_REFRESH_TOKEN= pnpm dev`. Expected: `curl -s -o /dev/null -w "%{http_code}" localhost:3000/api/now-playing` prints `200` and the body is `null`. Restart dev normally afterwards.
- [ ] **Step 6: Commit.**

```bash
git add app/music.ts app/api/now-playing/route.ts
git commit -m "Fall back to Spotify's last played song in the now-playing bar"
```

---

### Task 3: Charts from Spotify, Last.fm removed

**Files:**
- Modify: `app/music.ts` (replace everything from `LAST_FM` through `getLastFmUser`; delete the search helpers)
- Modify: `app/page.tsx:79-129` (`OnRepeat`)
- Modify: `app/music/page.tsx` (whole file)
- Modify: `app/music/loading.tsx`
- Modify: `app/data.ts:33` (comment), `DESIGN.md:310-311, 331-335, 355-357`

**Interfaces:**
- Consumes: `spotifyMe(path)` and `pickCover()` from Task 2.
- Produces (all in `app/music.ts`):
  - `export const PERIODS = { short_term: "Last 4 weeks", medium_term: "Last 6 months", long_term: "Last year" } as const;` and `export type Period = keyof typeof PERIODS;`
  - `export type TopTrack = { title: string; artist: string; cover: string | null; coverLarge: string | null; url: string };`. `cover` is `pickCover(album.images)`, the ≤300px image. `coverLarge` is `album.images[0]?.url ?? null`, the largest image.
  - `export type TopArtist = { name: string; image: string | null; url: string };`. `image` is `pickCover(images)`.
  - `export const getOnRepeat: () => Promise<TopTrack[]>`: `top/tracks?time_range=short_term&limit=5`. It uses `unstable_cache` with key `["on-repeat"]`, revalidates every 3600s, and throws on failure.
  - `export const getListening: (period: Period) => Promise<{ tracks: TopTrack[]; artists: TopArtist[] }>`: `top/tracks?time_range=${period}&limit=9` and `top/artists?time_range=${period}&limit=10`, fetched in parallel. It uses `unstable_cache` with key `["listening"]`, revalidates every 3600s, and throws on failure, including a missing login.
  - Removed: `lastFmUrl`, `lastFmCover`, `getLastFmUser`, `RepeatTrack`, `TopAlbum`, `findOnSpotify`, `findAlbumOnSpotify`, `findArtistOnSpotify`, `normalize`, `found`, `getSpotifyToken`, `appToken`.

- [ ] **Step 1: Write the checks (expect fail).** With `pnpm dev` running:
  - `grep -rniE "last\.?fm|LAST_FM|audioscrobbler" app scripts DESIGN.md` → no output
  - `curl -s localhost:3000/ | grep -c "open.spotify.com/track/"` → at least `1`, and `curl -s localhost:3000/ | grep -c " plays<"` → `0`
  - `curl -s localhost:3000/music | grep -o "Top tracks\|Last 6 months" | sort -u` → both strings
- [ ] **Step 2: Rewrite the data layer** in `app/music.ts` to the Produces list above. Replace the header comment so it says the music comes from your Spotify account and needs `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` (from `pnpm spotify:login`). Remove the `TIMEOUT` comment's mention of Last.fm.
- [ ] **Step 3: Home `OnRepeat`** in `app/page.tsx`:
  - Use `getOnRepeat().catch((): TopTrack[] => [])`, link each row to `track.url`, and show `track.cover`.
  - Delete the `{track.plays} plays` span.
  - Replace the credit paragraph with plain text: `Top tracks of the last 4 weeks, from Spotify.` (no link).
  - Update the comment above `OnRepeat`.
- [ ] **Step 4: `/music`** in `app/music/page.tsx`:
  - Change `metadata.description` to `What Taufiq Dwi Purnomo has been listening to: top tracks and artists from Spotify.`
  - Rename `TopAlbums` to `TopTracks({ tracks }: { tracks: TopTrack[] })`. Keep the same markup, key by `track.url`, use `first ? track.coverLarge : track.cover`, and remove the `/300x300/` replace and the plays line.
  - `TopArtists`: remove the plays span, the pop bar and `most`.
  - Page: `const listening = await getListening(period).catch(() => null); if (!listening) notFound();`. Remove the facts `<dl>` and `since`. The intro reads `What's been playing lately.`
  - Section titles are `Top tracks` and `Top artists`. The empty state is `` `Nothing played in the ${PERIODS[period].toLowerCase()}.` ``
  - The credit line becomes plain text: `Charts, covers and artist photos from Spotify.`
  - The default period is `"short_term"`. Keep the `Object.hasOwn` guard.
- [ ] **Step 5: Loading and docs.**
  - `app/music/loading.tsx`: delete the facts block and change "Top albums" to "Top tracks".
  - `app/data.ts:33`: the comment names Spotify.
  - DESIGN.md:
    - line 311: drop "and play counts".
    - Paste-up (331): "Listening's top tracks".
    - Artist chart (334-335): "ranked rows with a square photo (larger for the top three) and the name in display type".
    - Credits (355-357): Letterboxd links and Spotify links with unmodified album art and artist photos. No Last.fm.
- [ ] **Step 6: Run the Step 1 checks (expect pass).** Then:
  - `pnpm build` → succeeds.
  - For each of `7day`, `overall`, `x`, and `a&period=b`, `curl -s "localhost:3000/music?period=$p" | grep -o 'aria-current="page"[^<]*Last 4 weeks'` → one match each.
  - `curl -s -o /dev/null -w "%{http_code}" "localhost:3000/music?period=long_term"` → `200`.
  - Missing-login path: restart with `SPOTIFY_REFRESH_TOKEN= pnpm dev`. `/` returns `200` without "On repeat", `/music` returns `404`, and `/api/now-playing` returns `200` with `null`. Restart dev normally.
- [ ] **Step 7: Look at it.** Open `/` and `/music` in the browser at desktop and mobile widths. Check that the taped covers, the double-size #1 and the artist rows look right, and that switching pills changes the charts.
- [ ] **Step 8: Commit.**

```bash
git add app DESIGN.md
git commit -m "Take On repeat and the Listening page from Spotify instead of Last.fm"
```

---

## After merging (human)

- Put the new `SPOTIFY_REFRESH_TOKEN` into Vercel's env vars **before or with** the deploy (see Review Focus 1).
- Delete `LAST_FM_API_KEY`, `LAST_FM_API_SECRET` and `LAST_FM_USERNAME` from `.env` and from Vercel.
