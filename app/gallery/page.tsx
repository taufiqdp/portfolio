import { notFound } from "next/navigation";
import React from "react";
import { Gallery } from "../components/gallery";
import { getPhotos, type Photo } from "./data";

export const metadata = {
  title: "Gallery",
  description: "Photos by Taufiq Dwi Purnomo.",
};

// Rebuilt at most hourly, in step with the cached bucket listing.
export const revalidate = 3600;

export default async function Page() {
  const photos = await getPhotos().catch((): Photo[] => []);
  if (photos.length === 0) notFound();

  return (
    <section>
      <h1 className="display mt-10 mb-12 text-[length:clamp(56px,9vw,120px)] leading-[0.84] [font-stretch:70%]">
        Gallery
      </h1>
      <Gallery photos={photos} wide />
    </section>
  );
}
