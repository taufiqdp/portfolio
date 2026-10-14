"use client";

import React from "react";
import type { Track } from "../api/now-playing/route";

// Polls the route every 15 seconds while the tab is visible.
function useNowPlaying() {
  const [track, setTrack] = React.useState<Track | null>(null);
  React.useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/now-playing")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => alive && setTrack(data))
        .catch(() => {});
    load();
    const timer = setInterval(() => !document.hidden && load(), 15_000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);
  return track;
}

// Thin bar fixed to the bottom of every page, in the ink color.
export function NowPlaying() {
  const track = useNowPlaying();
  if (!track) return null;
  const label = track.playing ? "Now playing" : "Last played";

  return (
    <>
      {/* Keeps the page's last lines from hiding behind the bar. */}
      <div aria-hidden="true" className="h-12" />
      <a
        // The exact track, or a Spotify search when it can't be matched (see the route).
        href={track.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label}: ${track.title} by ${track.artist}. Listen on Spotify`}
        className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 bg-ink px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] text-sm text-paper sm:px-6 lg:px-10"
      >
        <span aria-hidden="true" className={`eq text-pop ${track.playing ? "playing" : ""}`}>
          <i />
          <i />
          <i />
        </span>
        <span className="hidden shrink-0 text-xs text-pop sm:inline">{label}</span>
        {track.cover && <img src={track.cover} alt="" className="size-7 shrink-0" />}
        <span className="min-w-0 truncate">
          <b className="font-bold">{track.title}</b>
          <span className="ml-2 opacity-80">{track.artist}</span>
        </span>
        <span className="ml-auto shrink-0 text-xs font-bold text-pop">Listen on Spotify</span>
      </a>
    </>
  );
}
