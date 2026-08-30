# Implementation techniques — apply locks for real

Catalogue: `app-impl-techniques.tsv` (61 rows). This file is the **how / when** map. Agents must implement **IMPL_MUST**, not only cite IDs.

**Covers:** mobile-web / PWA **and** desktop web app shells.

---

## 1) By platform pack

### Mobile pack (default phone)
`viewport-meta` · `safe-area-css` · `dvh-units` · `touch-action` · `tap-highlight` · `min-touch` · `bottom-nav-fixed` or `sticky-footer-cta` · `overscroll` · `history-stack` · `matchmedia` · `coarse-pointer` · `prefers-reduced-motion` · `focus-visible` · `scroll-padding`

### Desktop pack (default tool)
`grid-app-shell` · `focus-visible` · `roving-tabindex` · `hotkeys` · `focus-trap` · `url-state` · `resize-observer` · `hover-media` · `fine-pointer` · `container-queries` · `prefers-reduced-motion` · `live-region` · `aria-current`

### Forms pack
`inputmode` · `autocomplete` · `type-date` with fallback · `live-region` for status  

**`form-novalidate` — restricted**  
- Default: **prefer native constraint validation** (required, type, pattern).  
- Use `form-novalidate` **only** when custom UX fully replaces it.  
- **Hard rule:** if `novalidate` is set, invalid submit **must** be blocked in JS (set `aria-invalid`, focus first error, do not POST).  
- Checklist **FAIL** if novalidate + no blocking handler (fail-open).

### Overlay pack
`dialog-element` or accessible modal · `focus-trap` · `popover-api` (non-modal desktop) · restore focus

### List pack
`virtual-list` · `intersection-infinite` · `skeleton-css` · `debounce-search` · `abort-controller` · `empty` UI

### Resilience pack
`network-information` / online events · `service-worker-offline` (when PWA) · `optimistic-ui` · `error-boundary-ui`

---

## 2) Technique → UX requirement

| tech_id | Forces |
|---------|--------|
| safe-area-css | Tabs/CTAs clear home indicator |
| dvh-units | Address bar show/hide doesn’t clip |
| min-touch | Primary hit areas |
| focus-trap | Modal usability + a11y |
| command-palette-js | Power navigation real |
| roving-tabindex | Toolbar keyboard |
| virtual-list | Long list performance |
| url-state | Shareable place in app |
| matchmedia | Real nav swap responsive |
| aria-current | Nav state for AT |
| live-region | Save/sync announcements |
| prefers-reduced-motion | Motion floor |
| form-novalidate | **Only with** custom blocking validation |

---

## 3) Agent rules

1. Put 3–6 `IMPL_MUST` in the brief for every app build.  
2. After HTML, verify each technique **behaviourally** where possible (not comment-only).  
3. If a technique is N/A (e.g. no list → no virtual-list), write **N/A: reason** in RESULT.  
4. Never claim PWA/offline without SW/manifest work when those IDs are listed.  
5. Never put `IX-*` in the NAV field — interactions stay under IX / IMPL.

---

## 4) Minimal CSS snippets (illustrative)

```css
:root { --sat: env(safe-area-inset-top, 0px); --sab: env(safe-area-inset-bottom, 0px); }
.app-tabs { padding-bottom: max(8px, var(--sab)); }
.btn-primary { min-height: 44px; min-width: 44px; touch-action: manipulation; }
.stage { min-height: 100dvh; }
@media (hover: hover) and (pointer: fine) { /* denser hit targets ok */ }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

---

## 5) Verify (smoke — stronger than string presence alone)

```bash
# 1) Catalog integrity (after regen)
python3 ~/.grok/skills/ui-app/scripts/validate_catalogs.py

# 2) Token / structure presence in build file
rg -n "safe-area|100dvh|min-height:\\s*44|aria-current|focus-visible" <file>

# 3) Behavioural (manual or UI test)
# - Tab to primary action; focus ring visible
# - Phone: fixed tab/CTA not under home indicator
# - Submit empty required form → blocked + error text (native or custom)
# - Overlay: focus trapped; Esc/back restores focus
```

String grep **alone** is not enough for PASS on IMPL_MUST.
