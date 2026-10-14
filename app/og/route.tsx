import React from "react";
import { ImageResponse } from "next/og";

// Link-preview card in the zine style: /og for the site, /og?title=… for a blog post.
// Uses the site's default inks (Medium Blue + Orange); shared links can't know a visitor's pick.
const PAPER = "#F4F4F1";
const INK = "#3255A4";
const POP = "#FF6C2F";

// Google Fonts serves a static instance of variable Archivo for fixed axis values, subset to `text`.
async function archivo(axes: string, text: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@${axes}&text=${encodeURIComponent(text)}`
    )
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("Couldn't load Archivo for the preview image");
  return (await fetch(url)).arrayBuffer();
}

export async function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title")?.trim().slice(0, 100);
  const lines = title ? [title.toUpperCase()] : ["TAUFIQ DWI", "PURNOMO"];
  const left = title ? "Taufiq Dwi Purnomo" : "AI engineer";
  const right = "taufiqdp.com";
  // Long post titles get smaller type so they fit above the footer.
  const size = !title ? 160 : title.length <= 24 ? 120 : title.length <= 48 ? 96 : 76;

  const [display, body] = await Promise.all([
    archivo("75,900", lines.join("")),
    archivo("100,600", left + right),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 60,
          backgroundColor: PAPER,
          color: INK,
        }}
      >
        {/* Halftone block, as on the site before the header photo loads. */}
        <div
          style={{
            display: "flex",
            position: "relative",
            height: 220,
            backgroundColor: POP,
            backgroundImage: `radial-gradient(circle, ${INK} 38%, transparent 40%)`,
            backgroundSize: "18px 18px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // Fade to see-through orange, not `transparent` (black), so the fade stays clean.
              backgroundImage: `linear-gradient(155deg, ${POP}00 15%, ${POP} 80%)`,
            }}
          />
        </div>
        {/* The name (or post title) overlaps the block's bottom edge, like the site's masthead. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: -Math.round(size * 0.45),
            fontFamily: "Display",
            fontSize: size,
            lineHeight: 0.86,
          }}
        >
          {lines.map((line) => (
            <div key={line} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
            fontFamily: "Body",
            fontSize: 30,
          }}
        >
          <span>{left}</span>
          <span>{right}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Display", data: display, weight: 900, style: "normal" },
        { name: "Body", data: body, weight: 600, style: "normal" },
      ],
    }
  );
}
