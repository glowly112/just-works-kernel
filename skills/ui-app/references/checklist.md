# ui-app ship checklist (exit gate)

Use **with** ui-bp ship checklist. All applicable boxes PASS before claiming app production.

---

## A · Locks present **and valid**

- [ ] Micro-brief includes PLATFORM · NAV · SHELL · DENSITY · IX  
- [ ] Every ID exists in `app-axes.tsv` (or named row):  
  - PLATFORM ∈ `mobile-phone|mobile-tablet|desktop-web|desktop-native-like|responsive-app`  
  - NAV starts with `NAV-` (never `IX-`)  
  - SHELL starts with `SH-`  
  - IX starts with `IX-`  
  - DENSITY ∈ `D-COMFORTABLE|D-DEFAULT|D-COMPACT|D-TOUCH-COMFORT`  
- [ ] **Compat:** phone platform ⇏ desk shell; desk platform ⇏ phone shell; NAV meta allows platform (see axes `meta`)  
- [ ] APP_ID from `app-patterns-named.tsv` with `quarantine=0` **or** combo_id from regen pools (post-2026-07 fix)  
- [ ] IMPL_MUST listed (tech_ids from `app-impl-techniques.tsv`) or explicit N/A  
- [ ] SIGN = structure (regions/nav), not motif only  
- [ ] BAN_THIS_RUN names refused peer shells  

### Compat quick rules

| PLATFORM | Shell family allowed | NAV meta must include |
|----------|----------------------|------------------------|
| mobile-phone | `SH-PHONE-*` or responsive | mobile or any |
| mobile-tablet | phone, tablet, responsive | mobile\|tablet\|desktop\|any |
| desktop-web / desktop-native-like | `SH-DESK-*`, tablet, responsive | desktop\|tablet\|any |
| responsive-app | any shell with documented collapse | any |

**FAIL** if: `desktop-web` + `SH-PHONE-TABS`, `IX-*` in NAV field, or quarantined pattern used as production shell.

## A2 · Dialect lock

- [ ] **DIALECT** locked to valid value (ios/android/macos/windows/web-neutral/demo)  
- [ ] Corresponding platform file loaded from `references/platforms/<dialect>.md` **before CSS**  
- [ ] **FIDELITY** declared (native-faithful-web / native-handoff / native-binary)  
- [ ] REFERENCE_APPS named (1–3 per dialect pack)  
- [ ] DIALECT BAN flags checked (e.g. IOS_FAB, ANDROID_IOS_CLONE, MAC_BOTTOM_TABS, WIN_PHONE_TABS_ONLY)  
- [ ] Dialect-specific checklist add-on applied (see dialect file)

## B · Structure visible

- [ ] Chrome regions match SHELL (blur: app silhouette readable)  
- [ ] Primary NAV behaviour works (switch root / push / sheet / split)  
- [ ] Active destination: not colour-only (`aria-current` + visual)  
- [ ] Responsive collapse documented **and** implemented if PLATFORM=responsive-app  
- [ ] Not marketing mast→hero→footer masquerading as app  

## C · Mobile (phone / touch primary)

- [ ] Primary targets ≥ 44×44  
- [ ] Safe-area on fixed bottom chrome / sticky CTA  
- [ ] No hover-only primary actions  
- [ ] Back / history sensible  
- [ ] Forms: field stays visible with keyboard  
- [ ] Gesture actions have visible alternative  

## D · Desktop (pointer / keyboard primary)

- [ ] Keyboard reaches primary job; focus visible  
- [ ] Shortcuts or command palette if IA deep / power tool  
- [ ] Panes have min width; layout not broken mid-size  
- [ ] Multi-select/bulk has clear exit if present  
- [ ] Third inspector column only if job needs it  

## E · States & a11y

- [ ] default · loading · empty · error · success on primary path  
- [ ] Offline/permission if job requires  
- [ ] Landmarks + one h1 + labels  
- [ ] Focus trap + restore on overlays  
- [ ] `prefers-reduced-motion` path  

## F · Implementation truth

- [ ] Each IMPL_MUST present in code (or N/A justified)  
- [ ] If using `form-novalidate`: custom validation **blocks** invalid submit (no fail-open)  
- [ ] ui-bp floor + flavour checklist still PASS  
- [ ] Style-pool STYLE_ID optional — structure still matches app locks  

## G · Catalog hygiene (when sampling pool)

- [ ] Sampled from post-fix pools (0 strict-compat errors) **or** hand-picked named row  
- [ ] `quarantine=1` rows not used for ship builds  
- [ ] `brief_lock` fields match structured NAV/SHELL/PLATFORM  

---

**Done** = A–F PASS (applicable) + A2 PASS + ui-bp PASS; G when pool-sampled.  
**Fail examples:** APP_ID comment-only; desktop + phone tabs; IX in NAV; safe-area missing; AI triple desk without brief.
