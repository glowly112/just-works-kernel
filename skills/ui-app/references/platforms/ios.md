# DIALECT=ios — iOS 26 / 27 placement (Liquid Glass)

**Success:** prototype reads as **iOS 26+ citizen** (floating glass chrome, tab+stack, correct search mode, inset lists, safe areas) even if HTML.  
**Fail:** pre-26 flat tab strip, Android FAB-as-default, Material nav rail, wrong Search tab, missing back, stretch aspect.

**Full protocol SOT:** `/Users/jamie.matheson/.openvibe/templates/ios26-phone-shell/PROTOCOL.md`  
**GOLD_BAR (canonical working prototype):** `/Users/jamie.matheson/.openvibe/templates/ios26-phone-shell/baseline.html`  
**How to use gold bar:** `/Users/jamie.matheson/.openvibe/templates/ios26-phone-shell/BASELINE.md`  
**Kit:** `/Users/jamie.matheson/.openvibe/templates/ios26-phone-shell/` — open **baseline.html** first; `shell.css`/`shell.js` optional primitives; `demo.html` = **legacy catalog only** (not gold bar)

**One line:** same **placement standard** as Vaulted baseline; different **product look** via Track D FLAVOUR (not all apps must look like Vaulted).

---

## Device shell (default phone product)

When the user asks for a **mobile / phone app** and does not name another device:

| Lock | Default |
|------|---------|
| **DEVICE** | **iPhone 17 Pro** |
| Logical layout | **402 × 874** CSS px — **do not change aspect** |
| Safe area (portrait) | top **~62** (status + island), bottom **~34** (home indicator) |
| **On-page display** | **Scale** whole device (`transform: scale`) to fit lab; keep 402:874 |
| **Lab board** | Details **LEFT** · device **RIGHT** (not lab stacked only above) |
| Chrome | **Floating Liquid Glass** tabs/toolbars — not full-bleed flat bars |
| Type / materials | System grammar for chrome; **product personality** = Track D FLAVOUR |

**Research:** App Store peers (A) + HIG/WWDC Liquid Glass (B) + personality (D) before locks — `ui-team` §1.

**Display scale (prototypes):** use kit `.ios26-stage` / `IOS26Shell.updatePhoneScale`, or:

```css
.device-stage {
  --phone-w: 402px;
  --phone-h: 874px;
  --phone-scale: min(1, (100dvh - 120px) / 874, (100vw - 32px) / 402);
  width: calc(var(--phone-w) * var(--phone-scale));
  height: calc(var(--phone-h) * var(--phone-scale));
}
.device {
  width: var(--phone-w);
  height: var(--phone-h);
  transform: scale(var(--phone-scale));
  transform-origin: top left;
}
```

---

## Region map (phone — iOS 26+)

```
[status / island — system]
[nav bar transparent OR large title — stack root]
[ scroll content — scrolls UNDER floating chrome ]
[ optional L2 accessory: toolbar search | mini player ]
[ floating glass tab bar 3–5 — inset capsule ]
[home indicator]
```

**iPad / wide:** sidebar + detail continuum with tabs (WWDC 219); don’t force phone density on desktop without brief.

---

## Navigation & back

| Rule | Required behaviour |
|------|-------------------|
| Peers | Bottom **floating** tab bar, labels **always on** when expanded; max 5 |
| Minimize | Optional **onScrollDown** — inactive tabs collapse; expand on reverse scroll |
| Depth | **Push** stack **per tab**; independent history |
| Back | Leading control + **content** backswipe (not edge-only only) |
| Tab re-select | Prefer pop-to-root of that tab |
| Transient | **Sheet** / full-screen cover — not a fake 6th tab |
| Create | Toolbar / list trailing / sheet / context menu — **FAB not default** (`CREATE_PATTERN`) |
| Settings | Inset **grouped** lists → push detail |
| **Search** | Lock **one** mode — see below |
| Modality | Sheet detents; confirm destructive |

---

## Search placement (choose **one** — do not invent a 4th)

| Mode | When | Law |
|------|------|-----|
| **toolbar** (default list/vault) | Find-in-list, Mail-class | Bottom glass field/button above tabs; **no Search tab** |
| **content** | Scoped to this list only | Field under large title / in scroll; copy matches scope |
| **search_tab** | Global multi-section search home | Semantic trailing Search tab (`TabRole.search`) only |

**Illegal:** Search tab for simple vault “find this login” without brief (`DIALECT_IOS26_SEARCH_TAB_SCOPED`).

HIG: [Search fields](https://developer.apple.com/design/human-interface-guidelines/search-fields) · WWDC25 284 / 323 · Adopting Liquid Glass.

---

## Chrome & materials (Liquid Glass)

- Glass = **interactive floating layer** (blur + translucent fill + hairline + soft shadow)  
- Content scrolls **under** tabs/toolbars; pad scroll bottoms  
- Nav **transparent**; bar buttons = **glass capsules** (not opaque pre-26 slabs)  
- Continuous corner radius; hairline separators; grouped inset lists  
- SF Symbols–like **line icons**; tabular nums for codes/metrics  
- Type: system-ui / -apple-system for chrome; large title on roots  
- Targets ≥ **44×44**; `env(safe-area-inset-*)`  
- `prefers-reduced-motion` · `:focus-visible`  
- Product FLAVOUR may style **content** — do not neon-arcade the chrome (`GLASS_ARCADE`)

---

## Controls & presentations (must know)

| Pattern | Law |
|---------|-----|
| Primary button | Filled accent or prominent control |
| Switch / segmented | Standard row controls; 44pt hits |
| Sheet | Detents; grabber; not a tab |
| Alert | Title + message + 2–3 actions |
| Menu | Overflow / context — elevated glass |
| States | Loading · empty · error · offline · searching · success · permission on every primary list |

---

## Flow recipes (implement when job matches)

| Flow | Placement |
|------|-----------|
| List primary job | Root tab + **toolbar search** + push detail |
| Start session | Push full flow; sticky action above tab **or** hide tabs with Exit |
| Log set | Sheet or inline steppers; show **previous** values |
| Finish | Summary sheet → dismiss to hub |
| Settings | You/Settings tab → grouped list → push |
| Empty | Short UK micro-copy + one CTA |
| Offline | Banner; local write still works when possible |

---

## Reference apps (steal placement, not brand)

### First-party grammar
| App | Steal |
|-----|--------|
| **Settings** | Inset grouped → push |
| **Mail** | Toolbar / bottom search ergonomics |
| **Maps** | Full-bleed + detented sheet |
| **Music** | Tabs + mini player accessory; catalog Search tab |
| **TV** | Floating tabs + minimize; Search tab |
| **Health** | Summary spine; floating search button pattern |
| **Photos** | Content grid; search |
| **Notes** | Content-first; toolbar on demand |

### Award / craft
| App | Steal |
|-----|--------|
| **Gentler Streak** | Non-shaming fitness |
| **Things 3** | Calm type-driven IA |
| **Flighty** | Status timeline |
| **Copilot Money** | Warm finance |
| **Tide Guide / Moonlitt** | Liquid Glass-class polish |

---

## BAN (dialect fails)

| Code | Fail |
|------|------|
| `DIALECT_IOS26_FLAT_TAB` | Full-bleed flat tab flush to bezel |
| `DIALECT_IOS26_OPAQUE_NAV` | Opaque pre-26 nav as “glass” |
| `DIALECT_IOS26_SEARCH_TAB_SCOPED` | Search tab for scoped list-only find |
| `DIALECT_IOS26_NO_FLOAT` | Chrome never floats / content never under |
| `DIALECT_IOS_FAB` | FAB primary create without exception |
| `DIALECT_IOS_DRAWER_PRIMARY` | Hamburger for only 3–5 peers |
| `DIALECT_IOS_NO_TAB_STACK` | Single global stack across tabs |
| `DIALECT_IOS_MATERIAL_RAIL` | Android nav rail as phone primary |
| `BACK_STACK_LIE` | Back doesn’t pop |
| `SAFE_AREA_MISS` | Content under home indicator / island |
| `GLASS_ARCADE` | Neon multi-layer glass / generator home |
| `LAB_STACK_ONLY` | Lab only above phone |
| `ASPECT_STRETCH` | Not 402:874 scale |
| `HOVER_ONLY` | Desktop hover as only path |
| `STATE_MATRIX_MISS` | No empty/loading/error on primary list |

---

## IMPL must (native-faithful web)

Use kit when possible · `safe-area` · `dvh` · `touch-44` · `aria-current` on tabs · sheet/alert presenters · `prefers-reduced-motion` · tabular-nums · content backswipe · scroll padding under chrome

**Honest limit:** HTML ≠ Simulator. Ship-native → SwiftUI/UIKit + current HIG.

---

## Checklist add-on (ios26)

- [ ] `PROTOCOL.md` + **GOLD_BAR** linked (`baseline.html` / `BASELINE.md`); `DIALECT: ios` (or ios26) in locks  
- [ ] Placement matches baseline structure (tabs · stacks · search mode · glass · states) — personality may diverge  
- [ ] `SEARCH_MODE` locked (toolbar | content | search_tab)  
- [ ] Floating glass tabs + optional minimize + content under  
- [ ] Lab L/R · 402×874 scale  
- [ ] Tab+stack · back + content swipe  
- [ ] Inset grouped settings if Settings present  
- [ ] Sheet for transient; no 6th tab  
- [ ] State matrix on primary list  
- [ ] No FAB default · no flat tab · no wrong Search tab  
- [ ] Track D FLAVOUR without breaking chrome grammar (do **not** require Vaulted colours)  
- [ ] 2+ REFERENCE_APPS named in memo  
- [ ] Did **not** treat `demo.html` as gold bar 
