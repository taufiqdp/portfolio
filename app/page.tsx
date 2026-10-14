import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import React, { Suspense } from "react";
import { BlogPosts } from "./components/posts";
import { Gallery } from "./components/gallery";
import { experience, films, games, hobbies, letterboxdUrl, links, type Favourite } from "./data";
import { getOnRepeat, type RepeatTrack } from "./music";
import { getRecentlyWatched, stars, type WatchedFilm } from "./letterboxd";
import { formatDate } from "./blog/utils";
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
      {/* Last.fm's API terms ask for a credit and link wherever its data is shown. */}
      <p className="mt-5 text-[13px]">
        Most played this month, via{" "}
        <a
          href={`https://www.last.fm/user/${encodeURIComponent(process.env.LAST_FM_USERNAME ?? "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ink-link font-bold"
        >
          Last.fm
        </a>
      </p>
    </Section>
  );
}

// Four across: films as frames of one film strip, games as cartridges. The title under each
// names it, so the art itself has empty alt text, like the On repeat covers.
function Favourites({ items, kind }: { items: Favourite[]; kind: "film" | "game" }) {
  const film = kind === "film";
  return (
    <ol className={`grid grid-cols-4 ${film ? "" : "gap-2"}`}>
      {items.map((item, i) => {
        const body = (
          <>
            <span className={film ? "film-frame" : "cartridge"}>
              <span className={`halftone relative block overflow-hidden ${film ? "aspect-[2/3]" : "aspect-[3/4]"}`}>
                {item.poster && (
                  <Image
                    src={item.poster}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 12vw, 25vw"
                    className="object-cover"
                  />
                )}
              </span>
            </span>
            <span className="mt-2 block px-1 text-sm leading-tight font-bold group-hover:ink-link">
              {item.title}
            </span>
            {item.year && <span className="block px-1 text-[13px] tabular-nums">{item.year}</span>}
          </>
        );
        return (
          <li key={`${item.title}-${i}`}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                {body}
              </a>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ol>
  );
}

// Latest entries from the Letterboxd diary, each linking to the entry there.
async function RecentlyWatched() {
  const diary = await getRecentlyWatched().catch((): WatchedFilm[] => []);
  if (diary.length === 0) return null;

  return (
    <Section id="watched" title="Recently watched">
      <ol className="grid gap-4">
        {diary.map((film) => (
          <li key={`${film.url}-${film.watched}`}>
            <a
              href={film.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              {film.poster ? (
                <img src={film.poster} alt="" className="h-18 w-12 shrink-0 bg-ink/10" />
              ) : (
                <span aria-hidden="true" className="halftone relative h-18 w-12 shrink-0" />
              )}
              <span className="min-w-0">
                <b className="display block text-2xl leading-tight font-extrabold [font-stretch:80%] group-hover:ink-link">
                  {film.title}
                </b>
                {film.year}
                {film.watched && <> · watched {formatDate(film.watched)}</>}
              </span>
              {film.rating !== null && (
                <span
                  aria-label={`${film.rating} out of 5 stars`}
                  className="ml-auto shrink-0 text-sm whitespace-nowrap"
                >
                  {stars(film.rating)}
                </span>
              )}
            </a>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[13px]">
        Latest from my diary, via{" "}
        <a href={letterboxdUrl} target="_blank" rel="noopener noreferrer" className="ink-link font-bold">
          Letterboxd
        </a>
      </p>
    </Section>
  );
}

// Halftone thumbnails and blank lines while a list loads.
function RowsLoading({ id, title, label, thumb }: { id: string; title: string; label: string; thumb: string }) {
  return (
    <Section id={id} title={title}>
      <div aria-busy="true" aria-label={label} className="grid gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <span className={`halftone relative shrink-0 animate-pulse motion-reduce:animate-none ${thumb}`} />
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
        {/* Icons share the tagline's line so the sticky masthead still clears the
            now-playing bar on short laptop screens; on narrow columns they wrap below. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="text-[15px] font-bold">AI engineer</p>
          <ul className="flex flex-wrap gap-4">
            {links.map(({ name, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="block border-b-2 border-transparent pb-1 text-[22px] hover:border-pop focus-visible:border-pop"
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
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

        <Suspense fallback={<RowsLoading id="music" title="On repeat" label="Loading songs" thumb="size-16" />}>
          <OnRepeat />
        </Suspense>

        {films.length > 0 && (
          <Section id="films" title="Top four">
            <Favourites items={films} kind="film" />
            <p className="mt-5 text-[13px]">
              Favourite films, from{" "}
              <a href={letterboxdUrl} target="_blank" rel="noopener noreferrer" className="ink-link font-bold">
                Letterboxd
              </a>
            </p>
          </Section>
        )}

        <Suspense fallback={<RowsLoading id="watched" title="Recently watched" label="Loading films" thumb="h-18 w-12" />}>
          <RecentlyWatched />
        </Suspense>

        {games.length > 0 && (
          <Section id="games" title="High scores">
            <Favourites items={games} kind="game" />
          </Section>
        )}

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
