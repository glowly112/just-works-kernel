# WCAG 2.2 floor (AA unless noted)

Normative: https://www.w3.org/TR/WCAG22/

## Contrast
| Criterion | Rule |
|-----------|------|
| 1.4.3 Contrast (Minimum) AA | Normal text ≥ **4.5:1**; large text (~18pt / 14pt bold+) ≥ **3:1** |
| 1.4.11 Non-text Contrast AA | UI components + graphical objects ≥ **3:1** vs adjacent |
| Gradients | Test text against the **worst** stop under the glyphs |

Understanding: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

## Focus & keyboard
| Criterion | Rule |
|-----------|------|
| 2.4.7 Focus Visible AA | Never strip focus without a visible replacement |
| 2.4.11 Focus Not Obscured AA | Focused control not fully hidden by sticky/fixed chrome — use `scroll-padding` |
| 2.4.13 Focus Appearance AAA | Strong ring (≈2px+ perimeter, high contrast) — aim here even if AA only requires “visible” |
| Practical | Prefer `:focus-visible` rings; see https://www.sarasoueidan.com/blog/focus-indicators/ |

## Target size
| Criterion | Rule |
|-----------|------|
| 2.5.8 Target Size (Minimum) AA | Pointer targets ≥ **24×24 CSS px**, or spacing equivalent |
| Mobile comfort | Prefer **~44×44** (Apple HIG / WCAG 2.5.5 AAA spirit) for primary controls |

https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

## Other AA musts for UI
- **1.4.1 Use of Color** — color not the only status cue  
- **2.3.3 / motion** — respect `prefers-reduced-motion` (also WCAG 2.2.2 pause/stop for continuous motion)  
- **Structure** — one primary `h1`, logical heading order, landmarks (`header` `nav` `main` `footer`)  
- **Name, Role, Value** — controls have accessible names; buttons say outcomes  

## Forms (a11y + Baymard-aligned)
- Visible labels (not placeholder-only)  
- Required fields indicated  
- Errors: what failed + how to fix, associated with fields  
- Submit control named by outcome (“Save changes”, “Create account”)
