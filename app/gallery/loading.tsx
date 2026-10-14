// The real title over the gallery's masonry columns, as pulsing halftone blocks in a mix of
// portrait and landscape, until the photos arrive.
const SHAPES = [
  "aspect-[2/3]", "aspect-[3/2]", "aspect-[3/2]", "aspect-[2/3]",
  "aspect-[3/2]", "aspect-[2/3]", "aspect-[2/3]", "aspect-[3/2]",
  "aspect-[2/3]", "aspect-[3/2]", "aspect-[3/2]", "aspect-[2/3]",
];

export default function Loading() {
  return (
    <section aria-busy="true" aria-label="Loading photos">
      <h1 className="display mt-10 mb-12 text-[length:clamp(56px,9vw,120px)] leading-[0.84] [font-stretch:70%]">
        Gallery
      </h1>
      <div className="columns-2 gap-2 md:columns-3 xl:columns-4">
        {SHAPES.map((shape, i) => (
          <div
            key={i}
            className={`halftone relative mb-3 break-inside-avoid animate-pulse motion-reduce:animate-none ${shape}`}
          />
        ))}
      </div>
    </section>
  );
}
