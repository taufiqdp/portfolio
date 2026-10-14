import { FaBluesky, FaGithub, FaLinkedin, FaSpotify } from "react-icons/fa6";
import { SiHuggingface, SiLetterboxd } from "react-icons/si";

// Personal content for the home page. Each section stays hidden until its
// list has at least one entry.

// Newest first. note is optional: a line on what you worked on.
export const experience: {
  role: string;
  company: string;
  period: string;
  note?: string;
}[] = [
  { role: "AI Consultant", company: "MSBU Group", period: "Jul 2025 – now" },
  {
    role: "Project Manager of Natural Language Processing",
    company: "Data Sorcerers (part-time)",
    period: "Nov 2024 – Aug 2025",
  },
  {
    role: "Artificial Intelligence Developer",
    company: "UTY Software House (part-time)",
    period: "Aug 2024 – Jul 2025",
  },
];

// Photos come from the bucket's photos/ folder (see app/gallery/data.ts).
// Optional captions, keyed by the photo's path in the bucket.
export const captions: Record<string, string> = {
  // "photos/DSCF0186.JPG": "Clouds after the rain",
};

// Music (the On repeat section and the now-playing bar) comes from Last.fm; see app/music.ts.

// Favourite films and games, four of each. poster is a file in public/favourites/;
// leave it out and a halftone block stands in. href is optional too.
export type Favourite = { title: string; year?: number; poster?: string; href?: string };

export const letterboxdUrl = "https://letterboxd.com/taufiqdp/";

// The Letterboxd top four, kept in step by hand: Letterboxd has no public API.
export const films: Favourite[] = [
  {
    title: "The Florida Project",
    year: 2017,
    poster: "/favourites/the-florida-project.jpg",
    href: "https://letterboxd.com/film/the-florida-project/",
  },
  {
    title: "The Apartment",
    year: 1960,
    poster: "/favourites/the-apartment.jpg",
    href: "https://letterboxd.com/film/the-apartment/",
  },
  {
    title: "Room",
    year: 2015,
    poster: "/favourites/room.jpg",
    href: "https://letterboxd.com/film/room-2015/",
  },
  {
    title: "Some Like It Hot",
    year: 1959,
    poster: "/favourites/some-like-it-hot.jpg",
    href: "https://letterboxd.com/film/some-like-it-hot/",
  },
];

// The top four games, each linking to its Steam page. Covers are Steam's 600x900 library art,
// cropped to 3:4 on the cartridge label.
export const games: Favourite[] = [
  {
    title: "Terraria",
    year: 2011,
    poster: "/favourites/terraria.jpg",
    href: "https://store.steampowered.com/app/105600/",
  },
  {
    title: "Kingdom Come: Deliverance II",
    year: 2025,
    poster: "/favourites/kingdom-come-deliverance-2.jpg",
    href: "https://store.steampowered.com/app/1771300/",
  },
  {
    title: "Cyberpunk 2077",
    year: 2020,
    poster: "/favourites/cyberpunk-2077.jpg",
    href: "https://store.steampowered.com/app/1091500/",
  },
  {
    title: "Baldur's Gate 3",
    year: 2023,
    poster: "/favourites/baldurs-gate-3.jpg",
    href: "https://store.steampowered.com/app/1086940/",
  },
];

export const hobbies: { name: string; note: string }[] = [
  // { name: "Photography", note: "Walking around town with a camera." },
];

// Shown as icons under the name and spelled out in Say hi.
export const links = [
  { name: "GitHub", href: "https://github.com/taufiqdp", icon: FaGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/taufiqdp", icon: FaLinkedin },
  { name: "Hugging Face", href: "https://huggingface.co/taufiqdp", icon: SiHuggingface },
  { name: "Bluesky", href: "https://bsky.app/profile/taufiqdp.com", icon: FaBluesky },
  { name: "Letterboxd", href: letterboxdUrl, icon: SiLetterboxd },
  { name: "Spotify", href: "https://open.spotify.com/user/2qnyyb7sw3va7ohd7yqg3zqs6", icon: FaSpotify },
];
