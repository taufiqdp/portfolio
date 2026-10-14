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

// Photos come from the bucket's photos/ folder (see app/photos/data.ts).
// Optional captions, keyed by the photo's path in the bucket.
export const captions: Record<string, string> = {
  // "photos/DSCF0186.JPG": "Clouds after the rain",
};

// cover is optional; put the image in public/music/.
export const tracks: { title: string; artist: string; cover?: string }[] = [
  // { title: "Evaluasi", artist: "Hindia", cover: "/music/evaluasi.jpg" },
];

export const hobbies: { name: string; note: string }[] = [
  // { name: "Photography", note: "Walking around town with a camera." },
];

export const links = [
  { name: "GitHub", href: "https://github.com/taufiqdp" },
  { name: "LinkedIn", href: "https://linkedin.com/in/taufiqdp" },
  { name: "Hugging Face", href: "https://huggingface.co/taufiqdp" },
  { name: "Bluesky", href: "https://bsky.app/profile/taufiqdp.com" },
];
