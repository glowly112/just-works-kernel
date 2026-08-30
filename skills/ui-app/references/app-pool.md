# App pool — navigation, shell & interaction diversity

**Purpose:** stop product UIs collapsing into one “ops beige” app shell (left rail + top bar + table) or one “mobile beige” shell (5 tabs + card stack) regardless of job.  
**Use:** pick **one APP_ID or combo_id per cell** and lock **PLATFORM + NAV + SHELL + DENSITY + IX (+ IMPL)**. Visual style is **style-pool**, not this file.

**Large pool:**

| File | What |
|------|------|
| `APP_SYSTEM_LARGE.md` | Scale stats + sampling |
| `app-patterns-named.tsv` | **251** named (248 sampleable; nav + ix_default + platform IDs) |
| `app-axes.tsv` | Platform, nav, shell, interaction, density, input |
| `app-impl-techniques.tsv` | **61** implementation techniques |
| `app-combo-3k.tsv` | **2251** ready brief locks (**compat-validated**) |
| `app-combo-5k.jsonl` | **5000** random ready locks (**compat-validated**) |
| `../scripts/validate_catalogs.py` | Exit 0 required after catalog edits |

**Authority:** ui-bp floor still wins (WCAG, states, labels). App locks never remove focus rings or shrink targets below floor.  
**Not:** finished screens. Agents still invent product content inside the locked structure.

---

## 0) Why app UIs feel samey

| Lever used alone | Effect |
|------------------|--------|
| “Make it an app” | Defaults to rail or bottom tabs |
| Density words only | Same chrome, tighter padding |
| Material/iOS name-drop | Motif, not navigation model |
| Style-pool only | Different paint, same IA |

**Fix:** force **orthogonal structure axes** so two cells cannot share NAV+SHELL without looking twin.

---

## 1) Six diversity axes (lock all six)

| Axis | IDs live in | Twin risk |
|------|-------------|-----------|
| **PLATFORM** | `app-axes.tsv` | Vague “responsive” for all |
| **NAV** | `NAV-*` | Highest |
| **SHELL** | `SH-*` | Highest |
| **DENSITY** | `D-*` | All compact desktop |
| **IX** | `IX-*` | Swipe-only / keyboard-only mismatch |
| **IMPL** | `app-impl-techniques.tsv` | Locks not implemented |

**Batch rule:** wave of N ≤ 12 → unique `SHELL` preferred; no `NAV+SHELL` pair more than twice in N ≤ 24.

---

## 2) Navigation IDs (quick map)

| ID | Silhouette | Primary platforms |
|----|------------|-------------------|
| `NAV-BOTTOM-TABS` | 3–5 peer roots, thumb | mobile |
| `NAV-TOP-TABS` | Segment in section | mobile \| desktop |
| `NAV-SIDE-RAIL` | Icon rail → labels | desktop \| tablet |
| `NAV-SIDE-TREE` | Hierarchy tree + content | desktop |
| `NAV-STACK-PUSH` | Push depth + back | mobile |
| `NAV-MODAL-SHEET` | Modal/sheet task | mobile |
| `NAV-BOTTOM-SHEET` | Partial sheet over content | mobile |
| `NAV-DRAWER` | Secondary overflow | mobile \| tablet |
| `NAV-COMMAND-PALETTE` | ⌘K jump | desktop |
| `NAV-MENUBAR` | File/Edit app menu | desktop |
| `NAV-TOOLBAR` | Selection actions | desktop |
| `NAV-BREADCRUMB` | Deep path | desktop \| tablet |
| `NAV-WIZARD` | Linear steps | any |
| `NAV-MASTER-DETAIL` | List \| detail | tablet \| desktop |
| `NAV-TAB+STACK` | Tab roots each with stack | mobile |
| `NAV-NONE-FOCUS` | Single task, no chrome | any |

Full notes: `navigation.md`.

---

## 3) Shell IDs (region maps)

| ID | Regions (one line) |
|----|--------------------|
| `SH-PHONE-TABS` | optional header \| content \| bottom tabs |
| `SH-PHONE-STACK` | nav bar + back \| content \| optional toolbar |
| `SH-PHONE-SHEET` | dimmed root \| sheet job |
| `SH-PHONE-FEED` | top bar \| infinite list \| FAB/sheet |
| `SH-PHONE-CANVAS` | minimal chrome \| canvas \| tool dock |
| `SH-TABLET-SPLIT` | list ~1/3 \| detail ~2/3 |
| `SH-TABLET-RAIL` | rail \| main \| optional inspector |
| `SH-DESK-RAIL-MAIN` | side rail \| main stage |
| `SH-DESK-RAIL-MAIN-INSP` | rail \| main \| inspector (**cap**) |
| `SH-DESK-TOOL-CANVAS` | toolbar \| canvas \| panels on demand |
| `SH-DESK-DATAGRID` | filters \| dense table \| row actions |
| `SH-DESK-DASH` | kpi strip \| primary viz \| secondary list |
| `SH-DESK-DOCUMENT` | menubar/toolbar \| document \| outline optional |
| `SH-DESK-IDE-LITE` | activity \| editor \| util **on demand only** |
| `SH-RESPONSIVE-COLLAPSE` | desktop split → mobile stack (document breakpoint) |

---

## 4) Density & input

| Density | Use |
|---------|-----|
| `D-COMFORTABLE` | Marketing-adjacent, large type, onboarding |
| `D-DEFAULT` | Balanced product app |
| `D-COMPACT` | Power user, tables, short rows |
| `D-TOUCH-COMFORT` | Mobile large targets, more padding |

| Input | Use |
|-------|-----|
| `IN-TOUCH` | Finger primary |
| `IN-POINTER` | Mouse/trackpad |
| `IN-KEYBOARD` | Keyboard primary |
| `IN-MIXED` | Tablet / 2-in-1 |

---

## 5) Interaction IDs (pick 1–3 primary)

Mobile-weighted: `IX-PRIMARY-THUMB`, `IX-FAB`, `IX-SWIPE-ACTIONS`, `IX-PULL-REFRESH`, `IX-LONG-PRESS`, `IX-EDGE-BACK`, `IX-STICKY-FOOTER-CTA`, `IX-OFFLINE-BANNER`, `IX-PERMISSION-RATIONALE`.

Desktop-weighted: `IX-KEYBOARD-SHORTCUTS`, `IX-MULTISELECT`, `IX-INLINE-EDIT`, `IX-CONTEXT-INSPECTOR`, `IX-SPLIT-RESIZE`, `IX-WINDOW-DENSITY`, `IX-PAGINATION`, `IX-COMMAND` via nav.

Shared: `IX-UNDO-TOAST`, `IX-AUTOSAVE`, `IX-SEARCH-FIRST`, `IX-FILTER-CHIPS`, `IX-INFINITE-SCROLL`, `IX-EMPTY-CTA`, `IX-SKELETON-LOAD`, `IX-OPTIMISTIC`, `IX-FORM-SECTIONED`, `IX-DRAG-REORDER`.

---

## 6) Named pattern families

| Family | Role |
|--------|------|
| `mobile-structure` | Canonical phone IA (tabs, stacks, sheets, feeds) |
| `mobile-touch-a11y` | Targets, safe-area, thumb, gestures+alt |
| `mobile-content-patterns` | Feed, chat, map, capture, checkout… |
| `desktop-structure` | Rail, master-detail, grid, dash, document |
| `desktop-density-keyboard` | Compact, shortcuts, multiselect, palette |
| `cross-platform-app` | Collapse rules, shared jobs across breakpoints |
| `industry-app` | Vertical shells (ops, health, fintech, MDM…) |
| `os-patterns` | HIG / Material / WinUI / macOS-shaped locks |

Open `app-patterns-named.tsv` for **pattern_id** + default NAV/SHELL/platform.  
Skip rows with `quarantine=1` (watch / TV / car — brief-only).  
Never place `IX-*` in the NAV field — use `ix_default` / combo `interaction`.

---

## 7) Brief lock template

```
APP_ID:     <pattern_id or combo_id>
PLATFORM:   <platform>
NAV:        <NAV-*>
SHELL:      <SH-*>
DENSITY:    <D-*>
IX:         <IX-*> [+ optional second]
INPUT:      <IN-*>
IMPL_MUST:  <comma tech_ids>
FEEL:       <one line from pattern>
BAN_THIS_RUN: <peer shells + AI triple + hamburger-for-primary>
STYLE_ID:   <optional visual lock from style-pool>
A11Y_WATCH: <hover | contrast | targets | focus trap>
```

**Agent rule:** implement locks as **real regions + behaviour**. If only CSS radius changes, **FAIL app structure**.

---

## 8) Example triad (max structure diversity)

| Cell | APP / feel | NAV | SHELL |
|------|------------|-----|-------|
| M1 | Bottom tabs 5 | NAV-BOTTOM-TABS | SH-PHONE-TABS |
| M2 | Map + sheet | NAV-BOTTOM-SHEET | SH-PHONE-SHEET |
| M3 | Chat thread | NAV-STACK-PUSH | SH-PHONE-STACK |
| M4 | Capture canvas | NAV-NONE-FOCUS | SH-PHONE-CANVAS |
| M5 | Checkout wizard | NAV-WIZARD | SH-PHONE-STACK |
| T1 | Master-detail mail | NAV-MASTER-DETAIL | SH-TABLET-SPLIT |
| D1 | Side rail ops | NAV-SIDE-RAIL | SH-DESK-RAIL-MAIN |
| D2 | Datagrid admin | NAV-SIDE-RAIL | SH-DESK-DATAGRID |
| D3 | Document editor | NAV-MENUBAR | SH-DESK-DOCUMENT |
| D4 | Canvas tool | NAV-TOOLBAR | SH-DESK-TOOL-CANVAS |
| D5 | Command-first | NAV-COMMAND-PALETTE | SH-DESK-RAIL-MAIN |
| R1 | Collapse split→stack | NAV-MASTER-DETAIL | SH-RESPONSIVE-COLLAPSE |

Pair each with a **different STYLE_ID** if the run is also a visual bakeoff.

---

## 9) A11y watches by structure

| Structure risk | Floor fix |
|----------------|-----------|
| Bottom tabs | Labels + icons; selected state not colour-only; safe-area |
| Swipe actions | Visible overflow menu alternative |
| Sheets/modals | Focus trap, Esc/back, restore focus |
| Side tree | Keyboard expand/collapse; aria-expanded |
| Datagrid | Row focus, sort announcements, not mouse-only |
| Infinite scroll | End state, error, preserve position; prefer pagination when total matters |
| Canvas tools | Keyboard equivalents for primary tools |
| Compact density | Targets still ≥ 24px (prefer 44 mobile) |

---

## 10) Expansion rule

When a new app pattern appears, add to `app-patterns-named.tsv`:

1. `pattern_id`  
2. `family`  
3. Default NAV + SHELL + density + platform  
4. One **BAN** (what it must not collapse into)  

Expand **SHELL** and **NAV** before adding more industry renames of the same rail+table.
