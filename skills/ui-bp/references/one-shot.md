# One-shot production — states, density, verify

Companion to `ui-bp` SKILL.md. Keep this short; enforce in code.

## State matrix (MUST for production claim)

Every primary control/surface must account for:

| State | Requirement |
|-------|-------------|
| **default** | Ready for primary job; clear primary CTA |
| **loading** | Progress or skeleton; no double-submit; announce busy if live region needed |
| **empty** | Explain void + next action (not a blank card) |
| **error** | Plain language + recovery (retry / fix fields); not colour-only |
| **success** | Confirm outcome; next step or dismiss |
| **dirty** (forms) | Unsaved signal; confirm before destructive discard when appropriate |
| **disabled** | Why disabled when not obvious; still focusable rules per pattern |

Demo technique: `data-state="..."` toggles or a small “Preview states” control in prototypes is fine — **states must exist in CSS/DOM**, not only in a comment.

## Density modes

| Mode | Bias | Fail if |
|------|------|---------|
| **app** | Dense, tables/lists over card farms; chrome taxes width only if job needs it | Marketing hero + three features for a tool screen |
| **marketing** | Bold thesis, fewer modules, generous air | Crowded dashboard chrome |
| **mobile-web** | Thumb reach, bottom or easy primary, no hover-only actions | Desktop-only hover menus as sole path |

## Token minimum

```css
:root {
  --surface; --surface-2; --ink; --ink-muted;
  --brand; --brand-ink;
  --border; --focus;
  --ok; --warn; --danger;
  /* CONTROL family: express one geometry — not soft-rect by habit */
  --radius-control; /* 0 | sm | pill(999px) | etc. matching FLAVOUR.CONTROL */
  --radius-sm; --radius-md;
  --space-1: 4px; /* then 8-based: 8,12,16,24,32,48,64 */
  --font-display; --font-sans; /* named TYPE_PAIR — max 2 + optional mono */
  --text-body; --text-label; --leading-body;
}
```

No raw `indigo-600` / `#6366f1` personality as the whole brand unless SUBJECT demands it.

**Flavour tokens:** `--font-*` and `--radius-control` must match the memo’s TYPE_PAIR + CONTROL. See `flavour.md`. Soft 8–12px on every CTA is **production beige** unless CONTROL is explicitly soft-rect for that product.

## Self-verify (before RESULT PASS)

1. Open primary surface (or static file in browser).  
2. Tab: skip/chrome → primary action; focus ring visible.  
3. Toggle or trigger loading / empty / error / success.  
4. Check contrast on body text and CTAs (eyeball + known token pairs).  
5. Mentally apply reduced-motion: does anything essential break?  
6. **Flavour:** logo-blur + “would soft-rect + Fraunces still fit if copy swapped?” — if yes, FAIL flavour.  
7. Re-read ship checklist in parent skill (floor **and** flavour).

No full e2e suite required for skill PASS — **state completeness + floor + flavour + checklist** is the one-shot bar.

## Depth ceiling

One-shot = **one critical path, fully stated**.  
Not one-shot: design system + every settings subpage + i18n + dark/light marketing site. User must say **full** to expand.
