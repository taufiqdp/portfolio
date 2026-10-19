import { imageSize } from "image-size";
import { unstable_cache } from "next/cache";
import { captions } from "../data";

// Upload a photo to this bucket's photos/ folder and it shows up on the site within an hour.
// A bucket policy makes photos/ publicly readable and listable; Next.js compresses on the fly.
export const BUCKET_URL =
  "https://kencana.basic.box.cloudeka.id/portfolio-taufiqdp-pcw5em";

export type Photo = {
  key: string;
  src: string;
  width: number;
  height: number;
  caption: string;
};

// The bucket now and then stalls a single request for 10–30 s. Give up long before that: a page
// left streaming that long gets cut off by the host, and the browser shows "This page couldn't load".
const TIMEOUT = 5000;

// A photo's size never changes, so it's read once and kept for good. A failed or stalled read
// throws, which isn't cached, so the next refresh tries that photo again.
const getSize = unstable_cache(
  async (src: string) => {
    // Size and EXIF orientation sit in the first KBs; no need to download the whole file.
    const head = await fetch(src, {
      headers: { Range: "bytes=0-131071" },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const { width, height, orientation = 1 } = imageSize(
      new Uint8Array(await head.arrayBuffer())
    );
    const sideways = orientation >= 5; // EXIF 5–8: stored rotated by 90°
    return sideways ? { width: height, height: width } : { width, height };
  },
  ["photo-size"]
);

async function listPhotos(): Promise<Photo[]> {
  const res = await fetch(`${BUCKET_URL}?list-type=2&prefix=photos/`, {
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`Listing photos failed: ${res.status}`);

  // ponytail: reads one listing page (up to 1000 photos); follow NextContinuationToken past that.
  const keys = [...(await res.text()).matchAll(/<Key>([^<]+)<\/Key>/g)]
    .map(([, key]) => key.replaceAll("&amp;", "&"))
    .filter((key) => /\.(jpe?g|png|webp)$/i.test(key))
    .sort()
    .reverse(); // camera numbers count up, so this is newest first

  const photos = await Promise.all(
    keys.map(async (key) => {
      const src = `${BUCKET_URL}/${encodeURI(key)}`;
      try {
        return { key, src, ...(await getSize(src)), caption: captions[key] ?? "" };
      } catch {
        return null; // unreadable or stalled: leave it out this hour rather than hold up the page
      }
    })
  );
  return photos.filter((photo) => photo !== null);
}

// Cached for an hour; a failed listing throws and isn't cached.
export const getPhotos = unstable_cache(listPhotos, ["photos"], {
  revalidate: 3600,
});
