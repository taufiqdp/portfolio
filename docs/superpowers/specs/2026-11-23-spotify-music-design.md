# Music from Spotify instead of Last.fm

## Why

From 1 December 2026, Last.fm API keys only work on paid Pro accounts. Taufiq doesn't want to pay
for it just for the site. The Spotify app the site already uses keeps working, because its owner
has Premium (checked on 23 Nov: search, token refresh and currently-playing all return 200).

## Goals

- The home page's "On repeat", the Listening page (`/music`) and the now-playing bar keep working
  after 1 December with no paid Last.fm account.
- The site no longer depends on Last.fm at all.

## Non-goals

- Keeping play counts, lifetime totals or the "listening since" date. Spotify doesn't expose them.
- Keeping Last.fm listening history.

## Approaches

- **ListenBrainz** (free, and it can log Spotify plays): keeps every number and chart, but it's
  a new service, its charts aren't live, and history needs importing. Not chosen.
- **Spotify only** (chosen): one service the site already uses, and it's live. It loses play
  counts, top albums and lifetime totals.
- **Drop the charts**: least code, but loses the Listening page. Not chosen.

## Design

- **Login:** `scripts/spotify-login.mjs` asks for `user-top-read` and `user-read-recently-played`
  as well as `user-read-currently-playing`, all read-only. Taufiq re-runs `pnpm spotify:login`
  once and puts the new `SPOTIFY_REFRESH_TOKEN` into Vercel.
- **On repeat (home):** top 5 tracks from `GET /me/top/tracks?time_range=short_term` (roughly the
  last 4 weeks), linked to Spotify with Spotify album covers. There's no plays column, and the
  credit line names Spotify instead of Last.fm.
- **Listening (`/music`):**
  - The period pills become `short_term`/`medium_term`/`long_term`, labelled
    "Last 4 weeks / Last 6 months / Last year". The default is short_term, and unknown or old
    `?period=` values fall back to it, as they do now.
  - The paste-up shows **top tracks** (9) instead of top albums, in the same taped covers with
    "No." stickers and #1 at double size. Each cover is the track's album cover and links to the
    track.
  - Top artists (10) come from `GET /me/top/artists`. Rows keep the rank and photo but lose the
    plays and the pop bar.
  - The header loses the facts list and the "since" date. The intro line no longer depends on
    Last.fm. The page 404s only when the Spotify login is missing or fails.
  - The loading skeleton matches the new shapes.
- **Now-playing bar:** when nothing is playing, it shows the last song from
  `GET /me/player/recently-played?limit=1`.
- **Cleanup:** remove the Last.fm helpers, the `LAST_FM_*` env vars from code and docs, and the
  Last.fm credits. Update DESIGN.md: the paste-up holds top tracks, the artist chart has no plays
  or bar, and the credit rule drops Last.fm.
- **Caching:** keep the hourly `unstable_cache` for charts and the short CDN cache on
  `/api/now-playing`.

## Left to the builder

- The exact intro and credit copy, in the site's existing voice.
- Whether the Spotify search helpers (`findOnSpotify`, etc.) are still needed anywhere. Top items
  come with links and covers already, so they can probably go.
