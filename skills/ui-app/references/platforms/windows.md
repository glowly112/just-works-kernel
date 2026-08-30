# DIALECT=windows — placement, flow, reference apps

**Success:** WinUI/Fluent citizen — base vs content layer, NavigationView or documented silhouette, elevation, keyboard.  
**Fail:** pure Mac sidebar clone with no Fluent signals; phone tabs only; no back/frame story.

## Region map — pick one silhouette (MS Learn)

### Left navigation (Settings-class)
```
[ title bar ]
[ NavigationView left — base layer ][ content layer ]
```

### Top navigation (Photos-class)
```
[ title bar + top nav ]
[ content — max vertical ]
```

### Menu bar (Notepad-class)
```
[ title bar ]
[ menu bar + command bar — base ]
[ content ]
```

### Tab view (Terminal-class)
```
[ title bar integrated tabs ]
[ content panes ]
```

**Layering:** base = nav/commands; content = job. Elevation: dialog > flyout > card > control.

## Navigation & back

| Rule | Required behaviour |
|------|-------------------|
| Structure | Flat peers if &lt;~8 unordered; hierarchical if parent/child |
| Depth | Breadcrumbs if &gt;2 levels |
| Back | Follow MS back-stack rules: pages yes; transient UI no; item enumerate often no |
| Controls | Frame + NavigationView and/or TabView + list/details |
| Commands | CommandBar / app bar / context menu  
| Search | Often top of nav pane |
| Person/identity | Standard NavigationView placement patterns |

## Chrome & materials

- Mica/acrylic/solid per Fluent; elevation shadows with purpose  
- Segoe UI Variable / system  
- Reveal/focus: visible keyboard focus always  
- Density: compact OK for grids; 12epx utility margins vs larger media margins  
- Snap/multiwindow: don’t assume single fixed phone frame  

## Flow recipes

| Flow | Placement |
|------|-----------|
| Settings-like | Left nav + search + content |
| Mail-like | List/details split |
| Document | Menu + command bar + canvas |
| Dev multi-doc | TabView + panes |
| Dense data | Datagrid + filters + command bar |

## Reference apps

### First-party / MS
| App | Steal |
|-----|--------|
| **Settings** | Left NavigationView |
| **Photos** | Top nav silhouette |
| **Notepad** | Menu + commands |
| **Terminal** | Tabs in title bar |
| **File Explorer** | Tree + tabs + commands |
| **WinUI 3 Gallery** | Control grammar |
| **PowerToys** | Utility + Run launcher |

### Third-party consensus
| App | Steal |
|-----|--------|
| **Files** app | Fluent file manager |
| **VS Code** | Activity bar shell |
| **Notion / Obsidian / Spotify** | Cross-platform polish on Win |
| **Affinity** | Pro personas |

## BAN

- `DIALECT_WIN_NO_BASE_LAYER` — flat cards, no nav/command layering  
- `DIALECT_WIN_PHONE_TABS_ONLY` — mobile tab bar as sole desktop nav  
- `DIALECT_WIN_NO_FOCUS` — no keyboard focus  
- `BACK_STACK_LIE` — random history  
- Unbounded triple AI desk without brief  

## IMPL must

`focus-visible` · `keyboard-nav` · landmark nav · optional breadcrumb · command region · pane min-widths · reduced-motion · high-contrast aware borders  

## Checklist add-on (windows)

- [ ] DIALECT=windows + silhouette chosen (left/top/menu/tabs)  
- [ ] Base vs content layer visible  
- [ ] REFERENCE_APPS named  
- [ ] Back/frame rules stated  
- [ ] Keyboard primary path works  
