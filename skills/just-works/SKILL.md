---
name: just-works
description: >
  PRODUCT PATH from brief to something usable on a phone. HARD DEFAULT for any
  app/site/feature a person will tap. Load first; ui-thrift stays the pixel path.
  Use when: app, site, feature, phone, prototype, ship, just works, /just-works.
---

# just-works

Status: **PRODUCT PATH** · next gate only · does not replace ui-thrift for pixels

**Grok path** `~/.grok/skills/just-works/` (SOT `$MULTIVIBE_ROOT/skills/just-works/`).

## Path

read-me → repo-memory → feature-plan (SOT if an existing system) → **iOS?** ios-26 (native chrome + product charm) → ui-thrift (if pixels) → **ui-marks** (if icons / faces / motion) → build → tdd-one → hammer → verify-done → debug-once if needed → unlazy (first-paint) → STATE.md

`ship-motion` is git / Vercel / STATE. In-product animation is **ui-marks**.

## Bar (all or it is a prototype)

1. Primary job works on the first tap path
2. Empty, loading, error (offline if networked). **Off-state is designed** (OFF, frozen stamp, empty score) — not a spinner
3. Phone-width, keyboard open, no `KB_COVER`
4. Thumb-sized controls, not hover-only
5. Fresh evidence this turn
6. FEATURE.md Done is true
7. **iOS:** stock iOS 26 chrome *and* the thrift keepers (paper, type, voice). A web wrap is not just-works. A generic Notes clone that lost the product is not just-works.
8. Operator lists that have a why / owner **click through** to detail
9. **iOS ship:** Mini sim-confirm this turn before TestFlight. `linux-hammer` is not a launch pass. Old stores still open after a schema change (`STORE_MIGRATE`). Locked store name is the home-screen name.

## Speed

Thin first pass is fine. The bar still applies to what shipped. One surface. Extra settings wait **unless they asked for theme, type, or size** — then one Settings screen, this device only. Reuse the stack. Do not load every skill at once. Infinite pulse is not “live.”

## Input

Ordinary English is enough. `read-me` runs unless this turn already has file + behaviour + done. Never ask the user to speak fail codes.

## Proof (print even on next-gate-only)

```yaml
just_works:
  loaded: yes
  gate: read-me|plan|thrift|marks|build|hammer|verify|debug|ship
  bar: pass|prototype
ui_marks: yes|skipped
sot: <the number that must not be invented, or n/a>
```

If pixels changed, also print ui-thrift `load:`.
