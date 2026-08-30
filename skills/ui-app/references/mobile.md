# Mobile app best practices (web / PWA / mobile-web app shells)

Research-aligned floor for **phone-first product UIs**. Complements HIG / Material principles adapted to web. Not a native SDK guide.

---

## 1) Navigation

| Prefer | When |
|--------|------|
| **Bottom tabs (3–5)** | Peer top-level jobs; frequent switching |
| **Tab + stack per root** | Each tab has independent history |
| **Stack push + back** | Hierarchical depth (list → detail → edit) |
| **Bottom / modal sheet** | Transient tasks without losing root |
| **Drawer** | **Secondary** destinations only — not the only 4 primaries |
| **Wizard / none-focus** | Onboarding, auth, checkout, capture |

**Rules**
- Tab labels always visible (icon-only fails recognition).  
- Active destination: `aria-current="page"` + non-colour cue.  
- Back must match history; don’t invent a fake stack that traps users.  
- FAB: **one** primary create — not competing with tab bar actions.

---

## 2) Touch & reach

- Primary controls **≥ 44×44 CSS px** (use `min-height` / padding).  
- Spacing between adjacent destructive vs safe actions.  
- Primary CTA in **easy thumb zone** for one-handed jobs (sticky footer above home indicator).  
- **No hover-only** menus; progressive enhance with `@media (hover:hover)`.  
- `@media (pointer:coarse)` → prefer touch-comfort density.  
- Long-press / swipe: always provide **visible alternative**.

---

## 3) Safe areas & viewport

```css
/* chrome */
padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
/* full-bleed stage */
min-height: 100dvh; /* prefer dvh/svh over 100vh alone */
```

- Fixed bottom tabs / sticky CTAs honour **safe-area-inset-***.  
- Content not under status bar / notch (`safe-area-inset-top`).  
- `viewport-fit=cover` only when you handle insets.  
- `overscroll-behavior: contain` on scroll roots to avoid chain scroll.  
- `touch-action: manipulation` on controls to reduce double-tap zoom delay.

---

## 4) Content patterns

| Pattern | Shell / IX notes |
|---------|------------------|
| Feed / list | Skeleton load; pull-refresh; infinite end state |
| Chat | Composer pinned above keyboard/safe-area |
| Map | Stage + sheet for job; large map targets |
| Capture | Minimal chrome; clear shutter/confirm |
| Settings | Grouped lists; push to detail |
| Search | Dedicated tab or sticky field; debounced query |
| Checkout | Linear steps; sticky pay; progress |
| Forms | One column; sectioned; `inputmode`; visible errors |

---

## 5) Feedback & resilience

- Skeleton or content-shaped loading — not only full-page spinners.  
- Empty states: explain + **one** CTA.  
- Errors: plain language + retry.  
- Offline banner when network matters; queue if offline-first.  
- Undo window for destructive list actions (snackbar pattern).  
- Permission: **rationale UI before** system prompt (camera, location, notifications).

---

## 6) Motion

- One motion family; 150–280ms.  
- Sheet present/dismiss with reduced-motion → instant or fade only.  
- Honour `prefers-reduced-motion: reduce`.

---

## 7) Mobile IMPL must (typical)

From `app-impl-techniques.tsv`:  
`viewport-meta`, `safe-area-css`, `dvh-units`, `touch-action`, `min-touch`, `sticky-footer-cta` or `bottom-nav-fixed`, `focus-visible`, `prefers-reduced-motion`, `inputmode` (forms), `history-stack`, `matchmedia`.

PWA when asked: `install-pwa`, careful `push-web`, `share-api`.

---

## 8) Anti-patterns

- Hamburger hiding the main 4 destinations  
- Tiny icon hits in dense toolbars  
- Desktop table squeezed to 320px without card/list redesign  
- Modal on modal  
- Infinite scroll with no failure/end  
- Relying on iOS swipe-back visuals without real history  
