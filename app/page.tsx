import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import React, { Suspense } from "react";
import { BlogPosts } from "./components/posts";
import { Gallery } from "./components/gallery";
import { experience, hobbies, links } from "./data";
import { getOnRepeat, type RepeatTrack } from "./music";
import { BUCKET_URL, getPhotos, type Photo } from "./gallery/data";

const facts = [
  ["Works on", "AI solutions and web apps"],
  ["Into", "NLP, LLMs, computer vision, AI agents"],
];

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mt-12 scroll-mt-6 border-t-2 border-pop pt-9 first:mt-0 first:border-0 first:pt-0"
    >
      <h2 className="display mb-6 text-[length:clamp(40px,4.6vw,64px)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

// The header photo, by its path in the bucket. It's center-cropped to the header's 3:2 box.
const HERO_KEY = "photos/DSCF0186.JPG";

// A random few here; the rest are in /gallery.
const HOME_PHOTOS = 4;

// Fisher–Yates, then take the first n.
function pickRandom<T>(items: T[], n: number) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

async function HomeGallery() {
  // Render per request so the photo picks change on every visit.
  await connection();
  const photos = await getPhotos().catch((): Photo[] => []);
  if (photos.length === 0) return null;

  const isLandscape = (photo: Photo) => photo.width > photo.height;
  const rest = photos.filter((photo) => photo.key !== HERO_KEY);
  const portraits = pickRandom(rest.filter((p) => !isLandscape(p)), HOME_PHOTOS);
  const landscapes = pickRandom(rest.filter(isLandscape), 2);
  // Two of each, staggered so each column gets a portrait and a landscape.
  // Short on landscapes, the extra portraits fill in.
  const homePhotos = [portraits[0], landscapes[0], landscapes[1], portraits[1], ...portraits.slice(2)]
    .filter((photo) => photo !== undefined)
    .slice(0, HOME_PHOTOS);

  return (
    <Section id="gallery" title="Gallery">
      <Gallery photos={homePhotos} />
      {photos.length > HOME_PHOTOS && (
        <Link href="/gallery" className="ink-link mt-3 inline-block font-bold">
          See all {photos.length} photos
        </Link>
      )}
    </Section>
  );
}

// Same shape as the 2 + 2 grid, as halftone blocks.
function GalleryLoading() {
  return (
    <Section id="gallery" title="Gallery">
      <div aria-busy="true" aria-label="Loading photos" className="columns-2 gap-2">
        {["aspect-[2/3]", "aspect-[3/2]", "aspect-[3/2]", "aspect-[2/3]"].map((shape, i) => (
          <div
            key={i}
            className={`halftone relative mb-3 break-inside-avoid animate-pulse motion-reduce:animate-none ${shape}`}
          />
        ))}
      </div>
    </Section>
  );
}

// Most played songs of the past month from Last.fm, each linking to Spotify.
async function OnRepeat() {
  const tracks = await getOnRepeat().catch((): RepeatTrack[] => []);
  if (tracks.length === 0) return null;

  return (
    <Section id="music" title="On repeat">
      <ol className="grid gap-4">
        {tracks.map((track) => (
          <li key={`${track.title}-${track.artist}`}>
            <a
              href={track.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              {track.cover ? (
                <img src={track.cover} alt="" className="size-16 shrink-0 bg-ink/10" />
              ) : (
                <span aria-hidden="true" className="halftone relative size-16 shrink-0" />
              )}
              <span className="min-w-0">
                <b className="display block text-2xl leading-tight font-extrabold [font-stretch:80%] group-hover:ink-link">
                  {track.title}
                </b>
                {track.artist}
              </span>
              <span className="ml-auto shrink-0 text-sm tabular-nums">
                {track.plays} plays
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function OnRepeatLoading() {
  return (
    <Section id="music" title="On repeat">
      <div aria-busy="true" aria-label="Loading songs" className="grid gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="halftone relative size-16 shrink-0 animate-pulse motion-reduce:animate-none" />
            <span className="h-5 w-48 bg-ink/10" />
          </div>
        ))}
      </div>
    </Section>
  );
}

export default function Page() {
  return (
    <div className="grid gap-16 md:grid-cols-2 md:gap-[clamp(24px,5vw,72px)]">
      <div className="md:sticky md:top-5 md:self-start">
        {/* The fixed header photo, over a halftone that shows while it loads. */}
        <div className="halftone relative aspect-[3/2] overflow-hidden md:max-h-[50vh]">
          <Image
            src={`${BUCKET_URL}/${HERO_KEY}`}
            alt="Clouds, photo by Taufiq"
            fill
            preload
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <h1 className="display relative -mt-[0.6em] text-[21vw] leading-[0.84] mix-blend-multiply [font-stretch:70%] md:text-[length:clamp(56px,min(10.4vw,15vh),176px)]">
          Taufiq
          <br />
          Dwi
          <br />
          Purnomo
        </h1>
        <p className="mt-4 text-[15px] font-bold">AI engineer</p>
      </div>

      <div>
        <Section title="Who I am">
          <div className="mb-7 flex items-start gap-5">
            <Image
              src="/og-profile-image.png"
              alt="Doodle self-portrait of Taufiq"
              width={84}
              height={84}
              className="shrink-0 rounded-full bg-white ring-2 ring-ink"
            />
            <p className="max-w-[32ch] text-[length:clamp(20px,2vw,26px)] leading-snug">
              I build AI solutions with NLP, LLMs, computer vision and AI
              agents, and responsive, interactive web apps.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-[13px]">{label}</dt>
                <dd className="mt-0.5 font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {experience.length > 0 && (
          <Section id="experience" title="Experience">
            <ol className="grid gap-7">
              {experience.map((job) => (
                <li
                  key={`${job.role}-${job.company}-${job.period}`}
                  className="grid gap-x-6 gap-y-1 sm:grid-cols-[150px_minmax(0,1fr)]"
                >
                  <span className="text-sm whitespace-nowrap tabular-nums sm:pt-1.5">
                    {job.period}
                  </span>
                  <div>
                    <b className="display block text-2xl leading-tight font-extrabold [font-stretch:80%]">
                      {job.role}
                    </b>
                    <span className="font-bold">{job.company}</span>
                    {job.note && <p className="mt-1 max-w-[52ch]">{job.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section id="writing" title="Writing">
          <BlogPosts />
        </Section>

        {/* Only this section waits on the bucket; the rest of the page renders right away. */}
        <Suspense fallback={<GalleryLoading />}>
          <HomeGallery />
        </Suspense>

        <Suspense fallback={<OnRepeatLoading />}>
          <OnRepeat />
        </Suspense>

        {hobbies.length > 0 && (
          <Section title="Off the clock">
            <dl className="grid gap-4.5">
              {hobbies.map((hobby) => (
                <div key={hobby.name}>
                  <dt className="text-[19px] font-extrabold">{hobby.name}</dt>
                  <dd className="mt-0.5">{hobby.note}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        <Section id="contact" title="Say hi">
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-[length:clamp(22px,2.4vw,32px)] font-bold">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:ink-link"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
