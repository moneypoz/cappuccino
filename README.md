# Cappuccino — Design Principles

A reference to prevent drift. Read before adding or changing visual decisions.

---

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Dev server at `localhost:4321`             |
| `npm run build`   | Build to `./dist/`                         |
| `npm run preview` | Preview production build locally           |

---

## Voice and register

This is a publication, not a product. Every design choice should read like editorial considered by a human, not a UI template chosen by default. When in doubt, ask: would this look at home in a well-designed print magazine?

---

## Color

| Token       | Hex        | Role |
|-------------|------------|------|
| `bone`      | `#F5F1EA`  | Page background. Warm, slightly yellowed — never cold white. |
| `cream`     | `#EBE3D5`  | Cards, surface lifts, footer background. One step warmer. |
| `espresso`  | `#2B1810`  | Body text. Rich near-black, never `#000`. |
| `ink`       | `#14110F`  | Headlines, max-contrast moments. |
| `ember`     | `#B8553A`  | **Single accent. Use sparingly.** One CTA, one pull-quote rule, blockquote borders. Never decorative. |

If you're reaching for `ember` more than once per page, reconsider. The accent works because it's rare.

---

## Typography

**Display / headlines:** Fraunces Variable (loaded via `@fontsource-variable/fraunces`)
- Optical size axis: use the default optical sizing behavior
- Use tight tracking (`-0.03em` to `-0.04em`) at display sizes
- Fraunces is expressive — let it be. Don't regularize it with `normal` tracking

**Body:** Inter (loaded via `@fontsource/inter`, weights 400 and 500 only)
- Never bold body copy for emphasis — use italics
- Small caps (`small-caps` class) for labels, categories, meta text

**Type scale:** Perfect fourth (1.333 ratio). Don't add intermediate sizes. The scale has gaps by design.

**Display size:** `clamp(4.5rem, 8vw + 1rem, 7.5rem)` — used only for hero headlines.

---

## Spacing

Generous whitespace is a deliberate editorial choice, not laziness.

```
18 = 4.5rem  (72px)  — tight section padding
22 = 5.5rem  (88px)
28 = 7rem    (112px) — standard section padding
36 = 9rem    (144px) — generous section padding, above-fold
```

Resist the urge to tighten sections. White space signals confidence.

---

## Layout

- Max content width: `max-w-6xl` (72rem / 1152px)
- Prose measure: `max-w-prose` (65ch) for article body
- Consistent horizontal padding: `px-6` on the container

---

## Header

- Wordmark only — no logomark, no icon
- No CTA button in the header (ever)
- Sticky with a subtle blur backdrop, not a hard border on scroll
- Nav items are lowercase, normal weight — editorial, not corporate

---

## Footer

- Three columns: Publication, Navigate, Legal
- Set in small caps Inter (`small-caps` class)
- FTC Disclosure link lives in the Legal column — visible, not buried
- Keep the footer light. It's an exit, not a feature.

---

## Component conventions

- **React islands** only for interactive tools (brew timer, grind calculator, etc.). Static content is `.astro` only.
- No animation for decoration. Transitions are `150ms` only on interactive state changes (hover, focus).
- No shadows. Depth is expressed through color steps (`bone` → `cream`) and borders (`border-cream`).

---

## What not to do

- Don't use full black (`#000`) or full white (`#fff`) anywhere
- Don't add a third typeface
- Don't use `ember` for hover states, links, or decoration
- Don't break the type scale with one-off sizes
- Don't add a hamburger menu before mobile nav actually breaks
