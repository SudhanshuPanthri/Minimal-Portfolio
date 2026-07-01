# studio-portfolio

A dark, editorial single-page portfolio for **Sudhanshu Panthri**, built with Next.js
(App Router) + TypeScript. The design language — near-black canvas, Bebas Neue display
type over Manrope body, a 10-column margin grid, smooth scrolling, marquees, a pulsing
"available" status dot, and an animated canvas footer — is modelled on the
`mats.zip/web-design` reference. All content is Sudhanshu's own.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm start
```

## Where things live

| Path | What |
| --- | --- |
| `lib/data.ts` | **All content** — profile, projects, stack, about, experience, contact. Edit here. |
| `app/globals.css` | The whole design system (tokens, grid, typography, every component style). |
| `app/layout.tsx` | Fonts (`next/font/local`), metadata, smooth-scroll wrapper. |
| `app/fonts/` | Bebas Neue + Manrope `.woff2`, loaded locally (no external font requests). |
| `app/page.tsx` | Section assembly order. |
| `components/` | One file per section + helpers. |
| `public/Sudhanshu-Panthri-Resume.pdf` | Linked from the contact section. |

## Sections

`StickyNav` (appears on scroll, with availability dot) · `CategoryNav` · `Hero`
(giant display name + keyword marquee) · `Works` (hover-to-swap project media) ·
`Stack` · `About` + experience table · `Contact` (copy-email) · `Footer`
(WebGL shader headline — animated fbm-noise displacement + cursor ripple + chromatic
aberration, with a static DOM fallback when WebGL is unavailable).

## Notes

- Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis); it and
  all animations respect `prefers-reduced-motion`.
- Project thumbnails are pure-CSS gradient art (`.art-1`…`.art-6` in `globals.css`).
  Swap them for real screenshots by dropping images in `public/` and pointing the
  `art`/`media` fields in `lib/data.ts` at them.
- Project years are approximate placeholders — adjust in `lib/data.ts`.
