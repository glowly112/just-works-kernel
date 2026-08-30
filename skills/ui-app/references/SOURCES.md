# Sources & research basis (ui-app)

Skills encode **actionable locks**, not full vendor docs. Prefer official docs at build time for native platforms.  
**Scope of this skill:** web / PWA / responsive **app shells** that behave like mobile or desktop apps — not native Swift/Kotlin binaries.  
**Quarantine:** watch / 10-foot TV / automotive rows are brief-only (`quarantine=1`) and excluded from combo sampling.

---

## Platform guidelines (primary)

| Source | URL | Used for |
|--------|-----|----------|
| Apple HIG — Foundations / Navigation | https://developer.apple.com/design/human-interface-guidelines | Tabs, nav bars, sheets, modality, layout margins |
| Apple HIG — Accessibility | https://developer.apple.com/design/human-interface-guidelines/accessibility | Dynamic type, contrast, targets (adapted to web) |
| Material Design 3 | https://m3.material.io | Nav bar/rail, FAB, sheets, motion, density |
| Material — Accessibility | https://m3.material.io/foundations/accessible-design | Touch, contrast patterns |
| Microsoft Fluent / WinUI | https://learn.microsoft.com/windows/apps/design/ | NavigationView, focus, density |
| GNOME HIG | https://developer.gnome.org/hig/ | Sidebar / header bar patterns (when targeted) |

## UX research & standards

| Source | URL | Used for |
|--------|-----|----------|
| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | AA floor via ui-bp |
| WCAG 2.5.8 Target Size (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum | ≥24×24 CSS px minimum; mobile BP prefer ~44 |
| WAI-ARIA APG | https://www.w3.org/WAI/ARIA/apg/patterns/ | Tabs, dialog, tree, toolbar, combobox |
| Nielsen Norman Group — mobile & navigation | https://www.nngroup.com/topic/mobile-web/ | Mental models, gesture risks (summary literacy) |
| GOV.UK Design System | https://design-system.service.gov.uk | Plain language, error recovery (civic-adjacent) |

## Web / PWA implementation

| Source | URL | Used for |
|--------|-----|----------|
| MDN — `env()` safe-area | https://developer.mozilla.org/en-US/docs/Web/CSS/env | Notch / home indicator |
| MDN — viewport units (`dvh`/`svh`) | https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-relative_lengths | Mobile browser chrome |
| MDN — `@media` hover/pointer | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover | Progressive pointer UX |
| MDN — `<dialog>` | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog | Modal patterns |
| MDN — Popover API | https://developer.mozilla.org/en-US/docs/Web/API/Popover_API | Non-modal overlays |
| web.dev — PWA | https://web.dev/explore/progressive-web-apps | Manifest, offline shell (when asked) |
| WHATWG HTML — constraint validation | https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constraint-validation | Forms; prefer native before `novalidate` |

## Industry pattern literacy (encoded as `industry-app` rows)

Ops consoles, mail/master-detail, fintech ledgers, health flows, field offline lists, commerce checkout, messaging, map+sheet, document editors — structural patterns only, not brand clones.

## Deliberate non-goals

- Pixel-perfect iOS/Android chrome in CSS as success  
- Replacing **ui-bp** a11y floor or **style-pool** visual diversity  
- Blind use of quarantined wearable/TV/auto rows as web production shells  

## Related skills

| Skill | Role |
|-------|------|
| `ui-app` (this) | App structure pool + BP (mobile **and** desktop web apps) |
| `ui-bp` | Production Hard Contract + flavour |
| `ui-bp` style-pool | Visual diversity |
| `ui-design` | Designer process / Design Packet |
| `ui-craft` | Craft floor / anti-slop / SIGN |

## Maintenance

When platform guidance shifts, update axes/patterns first; keep SOURCES URLs current.  
After catalog regen, run: `python3 ~/.grok/skills/ui-app/scripts/validate_catalogs.py` (must exit 0).
