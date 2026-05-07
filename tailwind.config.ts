/**
 * Cappuccino design tokens — TypeScript reference.
 *
 * NOTE: Tailwind v4 is CSS-first. The live tokens Tailwind consumes are the
 * @theme block in src/styles/global.css. Keep these two in sync.
 * This file exists so component code can import token values without
 * magic strings, and so the design system is legible in one place.
 */

export const colors = {
  bone: '#F5F1EA',    // page background — warm, slightly yellowed off-white
  cream: '#EBE3D5',   // card/surface — one step warmer than bone
  espresso: '#2B1810', // primary text on light — rich near-black
  ink: '#14110F',     // true near-black for headlines, max contrast
  ember: '#B8553A',   // accent — use SPARINGLY: one CTA, one highlight, never decorative
} as const;

export const fonts = {
  display: '"Fraunces Variable", Georgia, serif',
  body: '"Inter", system-ui, sans-serif',
} as const;

/**
 * Editorial type scale — perfect fourth (1.333 ratio).
 * Values as rem strings; actual clamp() sizes are in global.css @theme.
 */
export const typeScale = {
  xs:      '0.75rem',
  sm:      '0.875rem',
  base:    '1rem',
  lg:      '1.333rem',
  xl:      '1.777rem',   // 1.333²
  '2xl':   '2.369rem',   // 1.333³
  '3xl':   '3.157rem',   // 1.333⁴
  '4xl':   '4.209rem',   // 1.333⁵
  display: 'clamp(4.5rem, 8vw + 1rem, 7.5rem)', // 72px → 120px hero
} as const;

/**
 * Extra spacing stops layered on top of Tailwind v4's default arithmetic
 * scale (1 unit = 0.25rem). These numeric stops already resolve correctly
 * in the default scale; they're listed here for semantic documentation.
 * Semantic aliases are defined in global.css @theme for use as utilities.
 */
export const spacing = {
  18: '4.5rem',   // p-18 / m-18 — section padding tight
  22: '5.5rem',   // p-22 / m-22
  28: '7rem',     // p-28 / m-28 — section padding standard
  36: '9rem',     // p-36 / m-36 — section padding generous
} as const;
