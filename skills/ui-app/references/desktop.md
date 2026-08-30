# Desktop app best practices (web app / dense tool UI)

Research-aligned floor for **pointer + keyboard** product UIs. WinUI / macOS HIG / dense web-app patterns adapted to HTML.

---

## 1) Navigation

| Prefer | When |
|--------|------|
| **Side rail** | 4–10 peer sections; collapsible labels |
| **Side tree** | Deep hierarchy (files, orgs, settings trees) |
| **Master–detail** | Browse list + inspect/edit (mail, tickets) |
| **Top tabs / segments** | Few peers **within** a section |
| **Menubar + toolbar** | Document/creation tools |
| **Command palette** | Power users; large IA; keyboard-first |
| **Breadcrumb** | Depth > 2 with shareable path |
| **Wizard** | Rare linear setup — not every form |

**Rules**
- Don’t combine **full rail + full top mega-nav + tabs** without need.  
- Active item: `aria-current` + clear selected surface.  
- Collapse rail to icons only if labels remain available (tooltip **and** expand).  
- Third column (inspector): **only if selection drives it**; ban as free default.

---

## 2) Shells

| Shell | Use |
|-------|-----|
| `SH-DESK-RAIL-MAIN` | Standard product |
| `SH-DESK-RAIL-MAIN-INSP` | Selection inspector (cap in bakeoffs) |
| `SH-DESK-DATAGRID` | Admin, ops, tables-first |
| `SH-DESK-DASH` | Monitoring: few KPIs + one primary viz |
| `SH-DESK-DOCUMENT` | Editors, docs, design docs |
| `SH-DESK-TOOL-CANVAS` | Design/map/board tools |
| `SH-DESK-IDE-LITE` | Code-like — util panes **on demand** |
| `SH-TABLET-SPLIT` | Wide tablet / narrow desktop |

Resizable panes: min widths; store widths in prefs when useful (`localstorage-prefs`).

---

## 3) Keyboard & density

- Full **Tab** cycle; visible `:focus-visible`.  
- Roving tabindex in toolbars and option lists.  
- Document **shortcuts** for primary power paths; avoid browser-reserved chords.  
- Command palette: `/` or `⌘K` / `Ctrl+K` with focus trap.  
- Density: `D-COMPACT` for grids; `D-COMFORTABLE` for reading; optional toggle (`IX-WINDOW-DENSITY`).  
- Multi-select: clear selection count + bulk bar + **exit/clear**.  
- Inline edit: explicit save/cancel or autosave status (`IX-AUTOSAVE`).

---

## 4) Data & lists

- Virtualize long lists (`virtual-list`).  
- Prefer pagination when totals, audits, or jump-to-page matter.  
- Filters as chips with **clear all**.  
- Empty and error inside the grid region, not a blank app.  
- Row actions: visible overflow; destructive confirm or undo.

---

## 5) Pointer UX

- Hover enhancements only under `@media (hover:hover)`.  
- Drag-reorder **with** keyboard alternative.  
- Context menus: keyboard-openable; don’t hide sole path.  
- Double-click open is ok if single-click selects — document behaviour.

---

## 6) Desktop IMPL must (typical)

`grid-app-shell` or equivalent regions, `focus-visible`, `roving-tabindex`, `focus-trap` (dialogs), `command-palette-js` when palette locked, `hotkeys`, `resize-observer` / split resize, `url-state`, `prefers-reduced-motion`, `container-queries` when component density adapts, `aria-current`, `live-region` for save status.

---

## 7) Anti-patterns

- AI **triple desk** as default for non-AI jobs  
- Hover-only icon toolbars with no labels ever  
- Tables without keyboard row focus  
- Modal form for every field edit in power tools  
- 12 equal dashboard widgets (no hierarchy)  
- Fixed 240px rail that never collapses on mid widths  
