---
version: alpha
name: Dua Tinta
description: >-
  Dua Tinta ("two inks" in Indonesian), the design system of Taufiq Dwi Purnomo's site.
  A two-ink zine: dense condensed type, flat ink on newsprint paper, one bright accent ink,
  original-color photographs.
colors:
  # Default ink pair (Medium Blue + Orange). Tokens are the light/default theme.
  primary: "#3255A4"
  secondary: "#FF6C2F"
  neutral: "#F4F4F1"
  on-primary: "#F4F4F1"
  scrim: "#000000D9"
  avatar-ground: "#FFFFFF"
  # Alternative ink pairs offered by the ink switcher (primary = type, secondary = accent).
  pink-primary: "#0078BF"
  pink-secondary: "#FF48B0"
  green-primary: "#407060"
  green-secondary: "#FFB511"
  burgundy-primary: "#914E72"
  burgundy-secondary: "#FFE800"
  black-primary: "#000000"
  black-secondary: "#FF4C65"
typography:
  headline-display:
    fontFamily: Archivo
    fontSize: 176px
    fontWeight: 900
    lineHeight: 0.84
    fontVariation: "'wdth' 70"
  headline-xl:
    fontFamily: Archivo
    fontSize: 80px
    fontWeight: 900
    lineHeight: 0.9
    fontVariation: "'wdth' 75"
  headline-lg:
    fontFamily: Archivo
    fontSize: 64px
    fontWeight: 900
    lineHeight: 0.9
    fontVariation: "'wdth' 75"
  headline-md:
    fontFamily: Archivo
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1
    fontVariation: "'wdth' 80"
  headline-sm:
    fontFamily: Archivo
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1.25
    fontVariation: "'wdth' 80"
  body-lg:
    fontFamily: Archivo
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.375
  body-md:
    fontFamily: Archivo
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.5
  body-prose:
    fontFamily: Archivo
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: Archivo
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  label-md:
    fontFamily: Archivo
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.4
  label-sm:
    fontFamily: Archivo
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  code:
    fontFamily: Roboto Mono
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  page-max-width: 1440px
  page-margin-sm: 16px
  page-margin-md: 24px
  page-margin-lg: 40px
  page-top: 20px
  column-gap: 72px
  section-gap: 48px
  section-padding-top: 36px
  heading-gap: 24px
  gallery-gap: 8px
  item-gap: 16px
  breakpoint-two-column: 768px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  section-heading:
    textColor: "{colors.primary}"
    typography: "{typography.headline-lg}"
  section-divider:
    backgroundColor: "{colors.secondary}"
    height: 2px
  link:
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
  masthead-name:
    textColor: "{colors.primary}"
    typography: "{typography.headline-display}"
  header-photo:
    backgroundColor: "{colors.secondary}"
    rounded: "{rounded.none}"
  halftone-placeholder:
    backgroundColor: "{colors.secondary}"
    rounded: "{rounded.none}"
  gallery-thumbnail:
    rounded: "{rounded.none}"
  photo-dialog-scrim:
    backgroundColor: "{colors.scrim}"
  avatar:
    backgroundColor: "{colors.avatar-ground}"
    rounded: "{rounded.full}"
    size: 84px
  ink-switcher-swatch:
    rounded: "{rounded.full}"
    size: 14px
  now-playing-bar:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    height: 48px
    padding: 10px
  code-inline:
    backgroundColor: "color-mix(in srgb, #3255A4 8%, #F4F4F1)"
    textColor: "{colors.primary}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
  code-block:
    backgroundColor: "color-mix(in srgb, #3255A4 5%, #F4F4F1)"
    textColor: "{colors.primary}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
  # Alternative ink pairs from the ink switcher: page text and accent rule for each.
  theme-pink-page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.pink-primary}"
  theme-pink-accent:
    backgroundColor: "{colors.pink-secondary}"
    height: 2px
  theme-green-page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.green-primary}"
  theme-green-accent:
    backgroundColor: "{colors.green-secondary}"
    height: 2px
  theme-burgundy-page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.burgundy-primary}"
  theme-burgundy-accent:
    backgroundColor: "{colors.burgundy-secondary}"
    height: 2px
  theme-black-page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.black-primary}"
  theme-black-accent:
    backgroundColor: "{colors.black-secondary}"
    height: 2px
---

# Dua Tinta

**Dua Tinta** ("two inks" in Indonesian) is the design system of taufiqdp.com, by Taufiq Dwi
Purnomo. Every screen is two inks on paper. The source of truth in code is `app/global.css`
(ink tokens, halftone, display type) and the components in `app/`. Keep this file in step with them.

## Overview

The site reads like a two-colour risograph zine printed on newsprint: an off-white paper ground,
one dark ink for all type, one bright ink for accents, and huge condensed uppercase headlines.
It is personal and a little loud, but the layout underneath is plain and calm so the writing,
photos and music carry it.

Every theme is exactly **two inks on paper**. A visitor can swap the ink pair with the ink
switcher in the header; the choice is saved per visitor and applied before first paint. The
default pair is Medium Blue + Orange.

Photographs are the exception to the two-ink rule: they always show in their original colours,
as shot.

## Colors

Colours are CSS variables: `--paper`, `--ink` and `--pop`, exposed to Tailwind as `paper`, `ink`
and `pop`. Never hard-code a hex value in a component; use the tokens so the ink switcher works.

- **Ink / Primary (#3255A4, Medium Blue):** all text, headings, the name, outlines, the
  now-playing bar background, the dots of the halftone. 6.4:1 on paper.
- **Pop / Secondary (#FF6C2F, Orange):** accents only: section divider rules, link underlines,
  the halftone ground, the equalizer bars, the photo placeholder, the cartridge grip ridges, the
  paste-up tape and the artist chart bars. It is never used for text on paper or for small text
  on ink (2.5:1 on Medium Blue).
- **Paper / Neutral (#F4F4F1):** the page ground and the text colour on ink surfaces.
- **Scrim (#000000 at 85%):** behind an opened photo.
- **Avatar ground (#FFFFFF):** the round profile doodle keeps its original white background.

The ink switcher offers these risograph-style ink pairs (type ink + accent ink), set with
`data-ink` on `<html>`:

| Pair | Ink | Pop | Text on paper |
|---|---|---|---|
| Medium Blue + Orange (default) | #3255A4 | #FF6C2F | 6.4:1 |
| Blue + Fluorescent Pink | #0078BF | #FF48B0 | 4.3:1 (AA large text only) |
| Hunter Green + Sunflower | #407060 | #FFB511 | 5.2:1 |
| Burgundy + Yellow | #914E72 | #FFE800 | 5.4:1 |
| Black + Fluorescent Red | #000000 | #FF4C65 | 19:1 |

Shared link previews (`/og`) always use the default pair, since a visitor's choice is unknown.

## Typography

One family: **Archivo**, a variable font loaded with its width axis. The personality comes from
the width and weight extremes, not from a second typeface.

- **Display headlines** (`headline-*`): Archivo Black weight (900, or 800 for smaller levels),
  condensed to 70–80% width, **always uppercase**, tight line height (0.84–1), `text-wrap: balance`.
  Used for the name, section headings, page titles, post titles, song titles and job titles.
- **The name** (`headline-display`): 70% width, stacked on three lines (TAUFIQ / DWI / PURNOMO),
  fluid size `clamp(56px, min(10.4vw, 15vh), 176px)` on two-column layouts and `21vw` on phones.
- **Section headings** (`headline-lg`): fluid `clamp(40px, 4.6vw, 64px)`.
- **Body** (`body-md`): normal width, weight 400, 17px, sentence case. Blog prose (`body-prose`)
  is capped at 68 characters per line with relaxed line height.
- **Lede** (`body-lg`): the "Who I am" sentence, fluid `clamp(20px, 2vw, 26px)`.
- **Labels** (`label-*`): navigation is 14px bold; captions, dates and fact labels are 13–14px
  regular. Labels stay in sentence case; uppercase belongs to display headlines only.
- **Code**: a monospace face (Roboto Mono, falling back to Consolas) in blog code blocks only.

## Layout

- Page width is capped at 1440px, with side margins of 16px (phones), 24px and 40px (desktop).
- From 768px up, the home page is **two columns**. The left column is a sticky masthead: the
  3:2 header photo (max 50% of the viewport height) with the name overlapping its bottom edge
  by 0.6em, then the "AI engineer" tagline with the social icons on the same line. The right
  column scrolls through the sections.
  Below 768px everything stacks in one column and the masthead is not sticky.
- Sections are separated by a 2px pop-coloured rule, with 48px above it and 36px below. The
  first section has no rule.
- Other pages (writing, a post, gallery) are a single left-aligned column. Listening (`/music`)
  borrows the home page's two columns: a sticky masthead (title, totals, period pills) on the left.
- Content is left-aligned everywhere. Nothing is centred except the opened photo.
- The gallery is a CSS-columns masonry: two columns on the home page; two, three and four columns
  (phone, tablet, wide) on `/gallery`. Gaps are 8px; photos keep their real aspect ratios.
- The now-playing bar is fixed to the bottom of every page; a matching spacer keeps the footer
  from hiding behind it.

## Elevation & Depth

The design is flat, like print. There are **no drop shadows** and no gradient decoration.
Hierarchy comes from type size and weight, the pop divider rules, and overlap: the name sits on
top of the header photo with `mix-blend-mode: multiply`, so where it crosses the photo it darkens
like overprinted ink.

The only layered surfaces are the fixed now-playing bar (solid ink) and the opened photo dialog
(scrim behind the photo).

## Shapes

Print has square corners.

- Photos, the header block, the halftone placeholder and cover thumbnails: **no rounding**.
- Fully round: the profile avatar (with a 2px ink ring), ink-switcher swatches and their
  selected ring, and outlined pill elements.
- Blog code only: inline code at 4px, code blocks at 8px.

## Components

- **Section heading:** display type in ink, 24px below. Sections that have no content (for
  example hobbies) are hidden entirely.
- **Navigation:** pages only (Home, Writing, Gallery, Listening), not anchors to home page sections.
- **Social icons:** beside the tagline (wrapping under it on narrow columns), 22px ink icons 16px
  apart, no text; each link carries its name as `aria-label` and a tooltip. Hover or keyboard
  focus shows a 2px pop underline. Say hi lists the same links as words. The masthead must clear
  the now-playing bar on short laptop screens (1366x768), which is why the icons share a line.
- **Links:** ink text with a 2px pop underline offset 4px (`ink-link`). Navigation shows the
  underline on hover only.
- **Header photo:** a fixed photo (`HERO_KEY` in `app/page.tsx`), centre-cropped to 3:2, original
  colours, over the halftone while it loads.
- **Halftone placeholder:** ink dots (14px grid) on pop, fading out diagonally. Used wherever a
  photo or cover is still loading or missing, and pulsed gently as a loading state (respecting
  reduced motion).
- **Gallery thumbnail and photo dialog:** square-cornered thumbnails compressed by `next/image`;
  clicking opens a native `<dialog>` with the large version, a scrim and a Close button. Esc or a
  click outside closes it.
- **List rows** (experience, on repeat, recently watched, posts): left-aligned, display-type title, a regular-weight
  line under it; numbers such as dates and play counts use tabular figures.
- **Now-playing bar:** solid ink bar with paper text; three pop equalizer bars that bounce only
  while a song is playing; "Now playing" / "Last played", cover, title, artist and "Listen on
  Spotify". The whole bar is one link.
- **Film strip** (Top four): film posters at 2:3 as frames of one ink 35mm strip, square
  paper sprocket holes along both edges, 6px of ink between frames; title and year under each.
- **Cartridge** (Favourite games): an ink shell with its top-right corner clipped and three pop grip
  ridges, the game cover inset at 3:4 as its label; title under each. A missing cover shows the
  halftone as the label.
- **Loading screens:** shown the moment a link is clicked, until the page arrives. Gallery and
  Listening keep their real titles and labels with pulsing halftone blocks in their own shapes
  (masonry columns; taped covers and artist rows); other pages get a halftone title block and
  three lines.
- **Pending link:** a nav link that's still loading shows the pop equalizer beside it, after a
  150ms pause so fast navigations don't flash it; a clicked period pill fills with ink at once.
- **Period pills** (Listening): outlined pills linking to `?period=`; the current one is filled
  with ink and paper text.
- **Paste-up** (Listening's top albums): covers tilted between -3.5° and 3.5°, each held on by a
  strip of pop tape that multiplies over the art, with a paper price sticker ("No.1") in a 2px ink
  border for the rank. #1 is twice the size. Hover or focus straightens and lifts a cover.
- **Artist chart** (Listening): ranked rows with a square photo (larger for the top three), the
  name in display type, plays, and a pop bar measured against #1.
- **Ink switcher:** five two-dot swatches (ink + pop of each pair) in the header; the selected one
  gets a 2px ink ring.

## Do's and Don'ts

- Do use only the `ink`, `pop` and `paper` tokens for colour, so every ink pair works.
- Do keep each theme to two inks; don't introduce a third colour or a grey.
- Do show photographs in their original colours; don't duotone or tint them.
- Don't set text in the pop colour, on paper or on ink. Pop is for rules, underlines, dots and
  the equalizer.
- Do keep body text at 4.5:1 contrast or better; check new ink pairs before adding them.
- Do set headlines uppercase, condensed and heavy; don't use uppercase for body text or labels.
- Don't add drop shadows, rounded cards or gradient washes.
- Don't round photos or blocks; round only the avatar, swatches and pills.
- Don't tilt things; the paste-up on Listening is the one deliberate exception.
- Don't centre content blocks; keep the left edge strong.
- Do give every photo real alt text (its caption when it has one) and keep visible keyboard focus.
- Do respect `prefers-reduced-motion`: the equalizer, loading pulses and paste-up hover stop.
- Do credit outside data where it's shown: "via Last.fm" under On repeat, a Letterboxd link
  under Top four and Recently watched, "Charts via Last.fm" on Listening, and Spotify links with
  unmodified album art and artist photos.
