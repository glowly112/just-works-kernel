# Shared app practices (mobile + desktop)

Cross-cutting rules. Platform-specific detail stays in `mobile.md` / `desktop.md`.

---

## 1) Information architecture

1. Name **primary job** (one sentence).  
2. List **roots** (≤5 for mobile tabs; more ok on desktop with search/palette).  
3. Map **depth** (push vs replace vs sheet vs modal).  
4. Choose **NAV + SHELL** that match that map — then content.  
5. Overflow destinations go to drawer / settings / palette — not new tabs forever.

---

## 2) State matrix (apps)

| State | App meaning |
|-------|-------------|
| **default** | Happy path with real-looking data shape |
| **loading** | Skeleton / progressive; preserve layout |
| **empty** | First-run or zero results + one CTA |
| **error** | Recoverable; retry; no blame jargon |
| **success** | Confirm outcome; next step clear |
| **offline** | When network-dependent (esp. mobile) |
| **permission denied** | Explain + settings path |
| **partial** | Stale cache / syncing indicator |

ui-bp MUST STATES still apply; apps add offline/permission when relevant.

---

## 3) Forms

- Visible labels (placeholder ≠ label).  
- Group related fields; one column on narrow.  
- Inline validation after submit or on blur — not only on keypress thrash.  
- Primary submit sticky on mobile when long forms.  
- Destructive actions separated from primary submit.

---

## 4) Feedback patterns

| Pattern | Use |
|---------|-----|
| Toast / snackbar | Low-severity + undo |
| Banner | Persistent system status (offline, read-only) |
| Dialog | Blocking decisions, legal, destructive |
| Inline | Field and row-level |
| Optimistic | Fast UX with rollback (`IX-OPTIMISTIC`) |

---

## 5) Accessibility (app-shaped)

- Landmarks: `header` / `nav` / `main` / complementary inspector.  
- One `h1` per view; heading order.  
- Colour never sole selected/error cue.  
- Focus restore after sheet/modal close.  
- Live regions for async save/sync.  
- Respect `prefers-reduced-motion`, `prefers-contrast`, `prefers-color-scheme` when theming.

---

## 6) Responsive collapse (when PLATFORM=responsive-app)

Document explicitly:

```
≥1100px:  SHELL-A (e.g. master-detail)
≥768px:   SHELL-B (e.g. rail collapses)
<768px:   SHELL-C (stack + bottom tabs or push)
```

Do not merely shrink desktop chrome. **Swap nav pattern** with `matchMedia` when needed.

---

## 7) Security / session UX (web apps)

- Session timeout: warn → extend → logout (`session-timeout`).  
- CSRF-safe form patterns when applicable.  
- No secrets in client UI copy or logs.  
- WebAuthn/passkeys when auth job asks (`biometric-webauthn` careful).

---

## 8) Performance UX

- Virtualize long lists.  
- Debounce search 150–300ms.  
- Abort stale fetches.  
- `content-visibility` for long pages when safe.  
- Prefer skeletons over layout thrash.
