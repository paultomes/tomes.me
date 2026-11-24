# Homepage review and concept notes

## What is already working

- The live site and the checked-in `index.html` are identical. The centred
  colour ring, almost-empty composition, fine grain and changeable ambient
  light give tomes.me a distinctive, private character without revealing
  anything personal.
- It has real dark-mode styling, local favicon/app-icon coverage and a
  low-bandwidth, dependency-free implementation.
- The visual motif can scale. The hidden panel, keyboard handling and motion
  reduction show the right intent even though the entry interaction needs work.

## What should change in a production direction

- Discovery currently depends on a 1.2-second hold or hover. The on-screen
  instruction literally says “hold the ring”; a tap/click does not open it
  until it is already open. This is the reported usability failure and makes
  the homepage feel like a secret handshake.
- The current expanded menu is incomplete for the new purpose: it omits
  Musings, Karaoke and Christmas, and treats the current ski destination as a
  transient campaign chip. It should become a set of enduring destinations
  with Ski trips as the collection label.
- `aria-hidden` alone does not remove hidden links from keyboard focus. A
  production build should use `hidden`/`inert` (or otherwise manage focus), a
  native button for the trigger, focus restoration, visible focus rings and
  no competing global keyboard shortcut.
- The page metadata is intentionally sparse. Keep public metadata generic:
  a neutral title/description, the existing favicon family, explicit
  `theme-color`, `color-scheme`, `viewport-fit=cover`, canonical URL and a
  generic social card (or no social card). Do not place destination lists,
  trips, people or photographs in Open Graph, manifest text or image assets.
- Update the web manifest's light white theme/background if the selected
  direction uses a dark home surface, and ensure its icons are the chosen
  master mark. This is a consistency task, not a privacy feature.

## Sibling identity cues retained in the previews

- **Tomes Karaoke:** its circular microphone mark and orange → coral → pink
  gradient, taken from its shared mark component.
- **Tomes Christmas:** its North Star monogram and evergreen/gold restraint,
  taken from its shared mark component and palette.
- **Musings:** an understated italic `m`, deliberately a literary signal
  rather than a brand mark.
- **Ski trips:** a cool, abstract contour/trace rather than a destination,
  resort name or personal imagery.

## The three studies

1. **Ring** is the smallest, safest evolution. The ring remains central but
   becomes an unmistakable button labelled “Enter”; one tap opens a compact
   four-place grid.
2. **Aperture** is the clearest everyday experience. A quiet concentric mark
   and the plain verb “Open” lead into a typographic two-column list. It feels
   editorial rather than like a dashboard.
3. **Threshold** is the creative interpretation: a small door opens onto a
   constellation of rooms. It is the most atmospheric and the least literal;
   it needs the most careful final motion and copy polish.

All three use tap/click, `Enter`/`Space`, `Escape`, focus transfer and
`prefers-reduced-motion`. Mail and Calendar are deliberately quiet secondary
links. They contain no personal data, photography or application previews.
