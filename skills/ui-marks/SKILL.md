---
name: ui-marks
description: >
  Icons / SVG / small motion after just-works. No infinite pulse. Tape fade is
  a mask not glass. Not Lottie. ship-motion is git. Use when: icons, SVG, spinner,
  page-turn, motion, /ui-marks.
---

# ui-marks

Icons / SVG / small motion **after** just-works.

One icon family. Inline SVG or one sprite.

Motion 150–250ms, transform/opacity, reduced-motion, no keyboard fight.

**No infinite pulse as “live.”** Colour is the off-state. Motion is enter / update, once.

Log overflow hides with a **mask or from-bg gradient**, not `backdrop-filter` glass.

Did **not** install LottieFiles motion-design, GSAP packs, or glassmorphism skills.

just-works **chains this at 3b**. Skip when no icons, faces, or motion were asked.

`ship-motion` is git. This skill is on-screen motion.

## When

After the just-works bar, or when they ask for icons / SVG / a page-turn / spinner.

Still load ui-thrift anti-slop first.

## Icons

- One family. Inline SVG or one `<symbol>` sprite
- `currentColor`, ~24px, one stroke or fill language
- Named mark: `role="img"` + title. Decorative: `aria-hidden`
- No emoji nav. Vendor the few marks — no Iconify at runtime for chrome

## Motion

- 150–250ms, ease-out, transform + opacity only
- One idea (sheet, page-turn, type settle, route-in)
- No infinite pulse. Colour is off-state
- Tape fade = mask / `from-bg`, not glass
- `prefers-reduced-motion: reduce` → instant or fade
- Do not animate layout while the keyboard is up (`KB_COVER`)
- No Lottie / GSAP / Framer unless FEATURE.md says so
