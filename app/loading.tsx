// Shown the moment a link is clicked, until the page arrives: a halftone block where the title
// goes and a few lines. Gallery and Listening have their own, shaped like them.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-pulse motion-reduce:animate-none">
      <div className="halftone relative mt-10 h-[clamp(48px,7.5vw,100px)] w-full max-w-[520px]" />
      <div className="mt-12 grid max-w-3xl gap-3">
        {["w-full", "w-11/12", "w-2/3"].map((width) => (
          <div key={width} className={`h-5 bg-ink/10 ${width}`} />
        ))}
      </div>
    </div>
  );
}
