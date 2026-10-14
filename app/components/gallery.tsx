"use client";

import Image from "next/image";
import React from "react";
import type { Photo } from "../gallery/data";

const altText = (photo: Photo) => photo.caption || "Photo by Taufiq";

// wide: more columns, for the full-width /gallery page.
export function Gallery({ photos, wide = false }: { photos: Photo[]; wide?: boolean }) {
  const dialog = React.useRef<HTMLDialogElement>(null);
  const [open, setOpen] = React.useState<Photo | null>(null);

  const show = (photo: Photo) => {
    setOpen(photo);
    dialog.current?.showModal();
  };

  return (
    <>
      {/* Masonry: portrait and landscape shots stack into two columns on their own.
          next/image compresses everything: small thumbnails here, a large version only when opened. */}
      <div className={wide ? "columns-2 gap-2 md:columns-3 xl:columns-4" : "columns-2 gap-2"}>
        {photos.map((photo) => (
          <figure key={photo.src} className="mb-3 break-inside-avoid">
            <button
              type="button"
              onClick={() => show(photo)}
              aria-label={`Open ${altText(photo)}`}
              className="block w-full cursor-zoom-in"
            >
              <Image
                src={photo.src}
                alt={altText(photo)}
                width={photo.width}
                height={photo.height}
                sizes={
                  wide
                    ? "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                    : "(min-width: 768px) 25vw, 50vw"
                }
                // Tinted box holds the space until the photo arrives.
                className="h-auto w-full bg-ink/10"
              />
            </button>
            {photo.caption && (
              <figcaption className="mt-1.5 text-[13px]">{photo.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Native dialog: Esc closes it; so does clicking anywhere outside the photo. */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85"
      >
        {open && (
          <figure className="m-0 flex flex-col items-center gap-2">
            <Image
              src={open.src}
              alt={altText(open)}
              width={open.width}
              height={open.height}
              sizes="94vw"
              // Lazy images inside a modal dialog never start loading; load right away.
              loading="eager"
              className="h-auto max-h-[88vh] w-auto max-w-[94vw] bg-white/10"
            />
            {open.caption && (
              <figcaption className="text-sm text-white">{open.caption}</figcaption>
            )}
          </figure>
        )}
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="fixed top-4 right-4 cursor-pointer rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-black"
        >
          Close
        </button>
      </dialog>
    </>
  );
}
