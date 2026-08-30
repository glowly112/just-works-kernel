# Flavourful production — art direction without breaking the floor

Production (states, a11y, tokens, NN/g) is **non-negotiable**.  
**Flavour** is also non-negotiable: a sterile “correct” UI is a **FAIL**, not a soft miss.

## Definition

**Flavourful** = a stranger can name the product world from a 1-second glance *without* reading the logo — via type, control geometry, materials, and skeleton — not only via accent colour.

**Sterile production** = WCAG-green, soft 8–12px rect CTAs, serif display + neutral sans body, same mast/hero/form shell as every other one-shot. Checklist-complete, **soulless**. That is the **production-beige median**.

## Lock before CSS (memo fields)

Add to the design memo (required in ui-bp):

```
FLAVOUR:
  TYPE_PAIR:     <two named families or system stacks — not "serif + sans">
  CONTROL:       <one geometry family for primary actions>
  MATERIAL:      <subject-true surfaces: paper, metal, plastic, ink, timber…>
  VOICE:         <3 adjectives max for the product world>
  BAN_THIS_RUN:  <fonts / radius / shells you refuse as free defaults>
```

### CONTROL family (pick **one** per build)

| Family | Use when | Avoid turning into |
|--------|----------|--------------------|
| **sharp-0** | industrial, legal, ops, print | only borders with no weight hierarchy |
| **soft-rect** | default consumer SaaS | **banned as free default** unless SUBJECT is that genre |
| **pill** | mobile, health, soft consumer | every control pill including dense tables |
| **ink-underline** | editorial, text-first | unusable hit targets (still need ≥24px) |
| **chunk-border** | workshop, craft, hardware | muddy low-contrast borders |
| **ticket / stamp** | events, bookings, logs | pure decoration with weak affordance |

Primary CTA must express the chosen family. Secondary can quiet; do not mix three geometries.

### TYPE_PAIR rules

- Name real stacks (e.g. `IBM Plex Mono + Source Serif`, `Archivo Black + Newsreader`, system `ui-monospace + Georgia`).
- **Banned as free personality** (second-wave median): Inter-only, Roboto-only, **Fraunces + Source Sans 3 as the automatic “tasteful” pair**, Georgia + Trebuchet as the automatic Codex pair, system-ui alone with no display character.
- Contrast the pair: weight, era, or genre must differ (mono/UI vs editorial; grotesque vs old-style; condensed display vs wide body).
- Still max two identity families (+ mono only if data needs it).

### MATERIAL / VOICE

- Surfaces from the **subject** (peat, brass, newsprint, enamel, wet concrete) — not generic cream + one accent.
- One atmosphere move max (grain, ruled lines, chart grid, perforation) — do not carpet the page.

## Production still wins conflicts

| Conflict | Winner |
|----------|--------|
| Flavour wants 2.5:1 grey text | **A11y** — fix contrast, keep type face |
| Flavour wants hover-only CTA on mobile | **NN/g / mobile** — add visible control |
| Flavour wants pure motif on same shell as peers | **SKELETON** — redesign structure |
| Flavour wants no focus ring | **A11y** — style a beautiful ring; never remove |

Flavour is **how** the floor is expressed, not an excuse to skip the floor.

## Self-check (30 seconds)

1. Blur logo: still recognisably *this* world?  
2. Screenshot buttons only: could they belong to a different product without changing radius/font? If yes → re-pick CONTROL + TYPE.  
3. Would Fraunces + soft-rect + cream paper still “work” if you swapped the copy? If yes → **production beige** → FAIL flavour.  

## Do / Don’t

**Do:** subject-true type + one control family + material atmosphere + structural SIGN.  
**Don’t:** checklist states on a twin of every other AI landing; “premium clean modern” with no VOICE; new hex only.
