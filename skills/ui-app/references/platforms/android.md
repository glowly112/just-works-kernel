# DIALECT=android — placement, flow, reference apps

**Success:** Material-class citizen (nav bar/rail, FAB when create-heavy, top app bar, system back).  
**Fail:** iOS-only large title without top app bar patterns; missing system-back story; iOS tab semantics only.

## Region map (phone)

```
[status bar — system]
[ top app bar — title, nav icon, actions ]
[ content ]
[ optional FAB — above bottom bar, 16dp margin ]
[ navigation bar 3–5 — peers ]
[ system gesture/nav bar — safe inset ]
```

**Large / fold / tablet:** **navigation rail** or drawer for many destinations; bottom bar may promote to rail.

## Navigation & back

| Rule | Required behaviour |
|------|-------------------|
| Peers | Bottom **navigation bar** (labelled) on phone |
| Many peers | Modal **drawer** or rail — not 7 bottom items |
| Depth | Top app bar **Up** + **system Back** must agree |
| Back | System back dismisses sheet → pops stack → exits app; document stack |
| Create | **FAB** or extended FAB idiomatic for primary create |
| Sheets | Modal bottom sheet; scrim; drag handle |
| Snackbar | Above nav/FAB; undo for destructive |
| Search | Top bar or destination |

## Chrome & materials

- M3 roles: surface, primary container, tonal elevation  
- Dynamic/tonal colour OK; keep contrast AA  
- Shape: FAB circular/extended; cards 12–16dp; avoid iOS continuous-only language  
- Type: Roboto / system; clear hierarchy  
- Targets ≥ 48×48 dp preferred (min 44 web)  
- Predictive back: avoid horizontal gesture wars with carousels  

## Flow recipes

| Flow | Placement |
|------|-----------|
| Hub | Top app bar title + content; FAB if create is #1 job |
| List→detail | Push; Up + system back |
| Create | FAB → full screen or sheet |
| Filter | Bottom sheet chips |
| Settings | Hierarchical list |
| Offline | Snackbar or banner; queue writes |

## Reference apps

### First-party grammar
| App | Steal |
|-----|--------|
| **Maps** | Sheet + search + map stage |
| **Gmail** | List + FAB + drawer/rail |
| **Photos** | Grid + search-first |
| **Messages** | Conversation + compose |
| **Clock / Files by Google** | Expressive Material; suggestion cards |
| **Settings** | Hierarchy + search |
| **Chrome** | Tabs + omnibox |

### Play / craft
| App | Steal |
|-----|--------|
| **Partiful** | Invite flow simplicity (Play Best App 2024) |
| **MacroFactor** | Macro tracker essential UX |
| **Infinite Painter** | Large-screen creative density |
| **Max** | Multi-device continue watching |
| **Todoist** | Material task + FAB |
| **Citymapper / Transit** | Multimodal timeline |
| **Telegram** | Fast chat gestures |

## BAN

- `DIALECT_ANDROID_NO_BACK` — in-app only back, ignores system back story  
- `DIALECT_ANDROID_IOS_CLONE` — pure iOS chrome with no M3 signals when dialect=android  
- `DIALECT_ANDROID_7_TABS` — overcrowded bottom bar  
- `FAB_MISSING` when create is primary job and dialect=android  
- `SAFE_AREA_MISS` · `HOVER_ONLY`

## IMPL must

`safe-area` · top-app-bar landmark · FAB z-order above content · snackbar region · system-back handler (history.back / popstate) · 48dp comfort · reduced-motion  

## Checklist add-on (android)

- [ ] DIALECT=android + REFERENCE_APPS  
- [ ] Bottom nav or rail/drawer justified  
- [ ] FAB present if create-primary  
- [ ] System back behaviour described + implemented  
- [ ] Top app bar on hierarchical screens  
