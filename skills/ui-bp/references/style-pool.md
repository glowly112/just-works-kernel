# Style pool — look & feel diversity (not just flavour knobs)

**Purpose:** stop one-shot UIs collapsing into “craft ops beige” (mast + rail + form + zero-radius Plex).  
**Use:** pick **one STYLE_ID per cell** and lock **SKELETON genre + TYPE era + MATERIAL language + CHROME**. CONTROL alone is not enough.

**Large pool (100s–1000s+):** see sibling files — do not rely on the short tables below alone:

| File | What |
|------|------|
| `STYLE_POOL_LARGE.md` | Scale stats + how to sample |
| `styles-named.tsv` | **800+** named styles (movements, internet aesthetics, industries…) |
| `styles-axes.tsv` | Skeletons, type eras, materials, colour, chrome |
| `styles-combo-2k.tsv` | ~2.4k ready brief locks |
| `styles-combo-10k.jsonl` | **10,000** random ready locks |
| Theoretical named×skeleton×colour×chrome | **~4.9 million** distinct locks |

**Authority:** floor still wins (WCAG 2.2 AA, states, labels). Style never removes focus rings or shrinks targets below floor.  
**Not:** a catalogue of finished pages. Agents still invent product-specific content inside the locked style.

---

## 0) Why the last triad felt samey

| Lever we used | Effect |
|---------------|--------|
| CONTROL families (~6) | Button shape only |
| TYPE_PAIR names | Surface, often re-landed on IBM Plex |
| Subject materials | Palette/texture, not silhouette |
| Same Hard Contract | Same IA: mast → work surface → states → footer |

**Fix:** assign **orthogonal axes** so two cells cannot share more than ~1 axis without looking twin.

---

## 1) Six diversity axes (lock all six per cell)

| Axis | What it changes | Twin risk if free |
|------|-----------------|-------------------|
| **A · SKELETON genre** | Region map / silhouette | **Highest** — main sameness driver |
| **B · Type era / pairing** | Century, contrast, display vs UI | High if all “serif H1 + sans body” |
| **C · Control geometry** | Primary action shape | Medium (chunk ≈ sharp visually) |
| **D · Material language** | Surfaces, edges, atmosphere | Medium if only hex swap |
| **E · Density & chrome** | Marketing air vs ops density; chrome amount | High if all “dense app” |
| **F · Colour strategy** | How colour is used (not which brand hex) | Medium |

**Batch rule:** in a run of N cells, no **SKELETON genre** reused more than `ceil(N/12)` times. Prefer unique skeleton per cell when N ≤ 24.

---

## 2) SKELETON genres (layout pool — use these IDs)

These are **structures**, not motifs. Blur test must fail against other genres.

| ID | Silhouette (one line) | Best density | Ban if peers already own |
|----|----------------------|--------------|--------------------------|
| `SK-HERO-SPLIT` | 50/50 or 60/40: thesis left / action right; no bottom form card | marketing | classic mast→hero→form |
| `SK-SINGLE-STICKY` | One column; CTA sticky bottom or side strip only | marketing / mobile | multi-section essay |
| `SK-EDITORIAL-LONG` | Magazine: display type, pull quotes, wide measure, late form | marketing | app desk |
| `SK-BENTO` | Asymmetric card mosaic; one dominant tile is the job | marketing / app | equal 3-col feature grid |
| `SK-TABLE-FIRST` | Data table/list owns viewport; action in row or inspector | app | hero marketing |
| `SK-TIMELINE` | Vertical or horizontal process spine is the SIGN | app / mobile | card grid |
| `SK-MAP-STAGE` | Map/spatial canvas dominant; sheet/drawer for job | app / mobile | form-first |
| `SK-BOARD-KANBAN` | Columns/lanes as primary structure | app | list+aside only |
| `SK-TICKET-STUB` | Perforated / stub geometry as whole page, not decoration | marketing / mobile | soft card stack |
| `SK-LEDGER` | Ruled lines, register headband, columns like paper books | app | glass dashboard |
| `SK-TERMINAL` | Monospace stage, prompt/command, log stream | app | marketing hero |
| `SK-POSTER` | Full-bleed type poster; minimal chrome; one action | marketing | multi-panel app |
| `SK-BOTTOM-SHEET` | Phone: content + persistent sheet for primary job | mobile | desktop dual-pane |
| `SK-TAB-DECK` | Top or bottom tabs as only chrome; one pane | mobile / app | left rail |
| `SK-WIZARD-STEPS` | Horizontal/vertical steps; one step visible | app / mobile | all-fields-one-page |
| `SK-SPLIT-INSPECTOR` | List master + detail inspector (no third utility col) | app | AI triple desk |
| `SK-DASH-METRIC` | KPI strip + one chart/list (not 12 widgets) | app | settings card farm |
| `SK-GALLERY-INDEX` | Image/index grid; detail on select | marketing / app | form hero |
| `SK-ZINE-COLLAGE` | Overlap, stickers, rotated labels, DIY print | marketing | swiss quiet grid |
| `SK-BRUTAL-BLOCKS` | Raw stacks, thick rules, no soft cards, system type bias | any | glass/neumorph |
| `SK-RAIL-DOCK` | Persistent side dock for job only (must differ from peers) | app | **cap use** — overused last triad |
| `SK-CENTER-STAGE` | Single focal object (product/device) + orbiting meta | marketing | multi-section |
| `SK-NEWS-RIVER` | Chronological river / stack; filters as chips | app / marketing | bento |
| `SK-CALENDAR-SPINE` | Calendar or week ruler is the SIGN | app | table-first without dates |

**Hard batch bans (from recent medians):** free default `SK-RAIL-DOCK` + zero-radius + IBM Plex; free default mast→hero→form→footer.

---

## 3) Named styles (look & feel pool)

Each style = **STYLE_ID** + default axis locks. Override only when subject fights the style (then document why).

Format fields for briefs:
`STYLE · SKELETON · TYPE · CONTROL · MATERIAL · CHROME · COLOUR · MOTION · BAN · A11Y_WATCH`

### A. Modernist / grid (historical clarity)

| STYLE_ID | Feel | Default skeleton | Type direction | Control | Material / colour | Motion |
|----------|------|------------------|----------------|---------|-------------------|--------|
| `swiss-international` | Objective, quiet, grid | `SK-EDITORIAL-LONG` or poster asymmetric | Single grotesque family (not Inter); flush-left rag | ink-underline or sharp-0 | White/grey, red accent sparingly; photo not illustration | Almost none |
| `bauhaus` | Primary geometry, workshop modern | `SK-BENTO` or `SK-POSTER` | Geometric sans + slab optional | sharp-0 | Red/yellow/blue blocks, black rules | Snappy cuts |
| `constructivist` | Propaganda diagonals, bars | `SK-POSTER` | Heavy grotesque / condensed | chunk-border | Red/black, bars, photomontage feel (CSS shapes) | Diagonal reveals |
| `de-stijl` | Strict H/V only | `SK-BENTO` (orthogonal only) | Neutral grotesque | sharp-0 | Primary rects, no diagonals | None |
| `new-typography` | Type as image, asymmetry | `SK-POSTER` | Extreme scale contrast | ink-underline | Black type on white/kraft | Type-led only |

### B. Decorative / period graphic

| STYLE_ID | Feel | Default skeleton | Type direction | Control | Material / colour | Motion |
|----------|------|------------------|----------------|---------|-------------------|--------|
| `art-deco` | Glamour, verticals, fan/geo | `SK-HERO-SPLIT` | High-contrast display + elegant sans | ticket or sharp-0 | Gold/black/cream, stepped forms | Slow fade |
| `art-nouveau` | Organic curves, botanical | `SK-SINGLE-STICKY` | Decorative display (careful legibility) | soft-rect or pill (genre fit) | Cream, sage, vine lines (SVG spare) | Gentle |
| `memphis-80s` | Playful shapes, clash | `SK-ZINE-COLLAGE` or bento | Odd display + bold sans | pill / chunk | Pastel + black, terrazzo, squiggles | Bouncy (respect reduced-motion) |
| `mid-century` | Warm modern, atomic | `SK-HERO-SPLIT` | Humanist sans + soft serif | soft-rect | Teak, mustard, olive | Soft ease |
| `psychedelic-60s` | Vibrating type, dense | `SK-POSTER` | Warp/display (keep body readable) | chunk | Clashing neons on dark | Pulse **off** if reduce |
| `pop-art` | Ben-day, halftone, punch | `SK-POSTER` / bento | Bold sans | sharp-0 | CMYK primaries, dots | Comic cuts |

### C. Digital eras / web fashion

| STYLE_ID | Feel | Default skeleton | Type direction | Control | Material / colour | Motion |
|----------|------|------------------|----------------|---------|-------------------|--------|
| `web-1.0` | Table-ish, blue links, honest | `SK-TABLE-FIRST` or single | System / Georgia / Verdana | ink-underline (links) | Grey beveled, no fake 3D excess | None |
| `y2k-gloss` | Chrome, bubbles, stars | `SK-CENTER-STAGE` | Rounded display + tech sans | pill | Metallic gradients, ice blue/pink | Shiny hover (reduce) |
| `skeuomorph` | Real-world materials | `SK-CENTER-STAGE` or ticket | Humanist | soft-rect / physical | Leather, metal, stitching (restraint) | Press-in |
| `flat-2.0` | Color blocks, no shadow | `SK-BENTO` | Geometric sans | sharp-0 or soft-rect | Solid fills, high chroma | Instant |
| `material-you-lite` | Tonal surfaces, FAB | `SK-BOTTOM-SHEET` / tab | Product sans | pill | Tonal palette, elevation 1–2 | Standard ease |
| `glassmorphism` | Frosted panels | `SK-HERO-SPLIT` | Clean sans | soft-rect | Blur panels on rich photo (**contrast watch**) | Soft float |
| `neumorphism` | Soft extruded UI | `SK-CENTER-STAGE` | Soft sans | soft-rect | Monochrome emboss (**contrast watch**) | Soft |
| `brutalist-web` | Raw, system, anti-polish | `SK-BRUTAL-BLOCKS` | System UI / Courier / Arial Black | sharp-0 | Default blues, thick borders, exposed structure | None / harsh |
| `neo-brutalism` | Bold borders, offset shadow | `SK-BENTO` | Fat display + mono labels | chunk-border | Loud fills, 3–4px black border, hard shadow | Instant |
| `claymorphism` | Puffy 3D clay | `SK-BENTO` / mobile | Rounded sans | pill | Pastel inflated controls | Squish |
| `bento-apple` | Soft mosaic, large radius | `SK-BENTO` | SF-like / Inter **only if style is this** | soft-rect | Light grey cards, air | Subtle |
| `vercel-swiss-dark` | Dark product marketing | `SK-HERO-SPLIT` | Geist-like grotesque | sharp-0 | Near-black, white type, one accent | Fade |
| `stripe-gradient` | Mesh aurora, fintech calm | `SK-HERO-SPLIT` | Elegant grotesque | soft-rect | Soft mesh **once** (not every peer) | Slow gradient |
| `kinetic-type` | Motion typography first | `SK-POSTER` | Extreme display | ink-underline | Minimal colour | Type motion (**reduce path**) |
| `gen-z-maximal` | Dense stickers, chaos with hierarchy | `SK-ZINE-COLLAGE` | Mix 2 faces max still | chunk / pill | Stickers, stamps, high energy | Micro pops |

### D. Editorial / print cultures

| STYLE_ID | Feel | Default skeleton | Type direction | Control | Material / colour | Motion |
|----------|------|------------------|----------------|---------|-------------------|--------|
| `broadsheet` | Newspaper authority | `SK-NEWS-RIVER` | News text + condensed headline | ink-underline | Newsprint grey, column rules | None |
| `magazine-vogue` | Fashion luxury whitespace | `SK-EDITORIAL-LONG` | High fashion serif + thin sans | ink-underline | Black/white, full-bleed photo | Slow |
| `zine-diy` | Photocopy, cut-up | `SK-ZINE-COLLAGE` | Mix mono + rough display | stamp/ticket | Toner, tape, misalign (keep contrast) | None |
| `swiss-poster` | Big type, one idea | `SK-POSTER` | Monumental sans | sharp-0 | 1–2 colours | None |
| `japanese-editorial` | Vertical rhythm, quiet gaps | `SK-EDITORIAL-LONG` or single | Mincho-like serif + gothic sans | ink-underline | Ink black, vermillion seal accent | Subtle |
| `scandi-minimal` | Air, pale wood, honest | `SK-SINGLE-STICKY` | Humanist sans | soft-rect | Birch, soft grey, muted | Soft |
| `brutalist-architecture` | Concrete mass, voids | `SK-BRUTAL-BLOCKS` | Grotesque wide | sharp-0 | Concrete grey, deep shadow planes | None |

### E. Subcultures / product worlds (strong subject fit)

| STYLE_ID | Feel | Default skeleton | Type direction | Control | Material / colour | Motion |
|----------|------|------------------|----------------|---------|-------------------|--------|
| `terminal-hacker` | CLI, phosphor | `SK-TERMINAL` | Mono only | sharp-0 | Black + green/amber | Cursor blink (reduce) |
| `retro-arcade` | Pixel, cabinet | `SK-CENTER-STAGE` | Pixel / display | sharp-0 | CRT dark, neon | Scanline optional |
| `rpg-parchment` | Quest log fantasy | `SK-LEDGER` / ticket | Blackletter **sparingly** + readable body | ticket | Parchment, wax seals | Fade |
| `sports-broadcast` | Live scores, urgency | `SK-DASH-METRIC` + timeline | Condensed gothic | sharp-0 | Team colours, LED black | Live pulse |
| `wayfinding` | Transit, airport | `SK-TIMELINE` / map | Frutiger-like / clear grotesque | chunk / sharp | Safety yellow/blue, pictograms | None |
| `laboratory` | Clinical, precise | `SK-TABLE-FIRST` | Mono + neutral sans | sharp-0 | White, sterile blue, hairlines | None |
| `workshop-hardware` | Tool wall, enamel | `SK-SPLIT-INSPECTOR` | Condensed industrial | chunk-border | Enamel, steel, caution stripes | None |
| `maritime-signal` | Flags, tide, rope | `SK-TIMELINE` or board | Stencil / grotesque | chunk | Navy, signal red/yellow | Slow |
| `botanical-field` | Field guide | `SK-GALLERY-INDEX` | Serif captions + sans UI | ink-underline | Specimen paper, leaf ink | None |
| `nightlife` | Club flyer energy | `SK-POSTER` | Condensed display | pill | Black, UV neon | Strobe **off** if reduce |
| `civic-gov` | Trust, plain language | `SK-WIZARD-STEPS` or single | Highly legible sans | soft-rect | GOV.UK-like blues/blacks | None |
| `fintech-ledger` | Trust numbers | `SK-TABLE-FIRST` | Tabular nums + grotesque | sharp-0 | Cool grey, one trust blue | None |
| `health-calm` | Soft clinical | `SK-BOTTOM-SHEET` / wizard | Humanist | pill | Soft mint/white, no red panic | Soft |
| `kids-playful` | Large targets, joy | `SK-TAB-DECK` / bento | Rounded display | pill | Bright but not neon chaos | Fun (reduce) |
| `luxury-quiet` | Restraint, materials | `SK-SINGLE-STICKY` | Refined serif + thin sans | ink-underline | Stone, silk, sparse gold | Slow |
| `industrial-print` | Press marks, CMYK | `SK-HERO-SPLIT` | Grotesque + mono registration | sharp-0 | Registration black, crop marks | None |
| `folk-craft` | Handmade, textile | `SK-SINGLE-STICKY` | Soft serif + simple sans | chunk | Wool, dye, stitch line | None |
| `documentary-photo` | Photo essay | `SK-EDITORIAL-LONG` | Quiet sans | ink-underline | Full-bleed photo, thin captions | None |

### F. Spatial / app patterns (structure-led)

| STYLE_ID | Feel | Default skeleton | Notes |
|----------|------|------------------|-------|
| `ops-board` | Live operations | `SK-BOARD-KANBAN` | Not triple AI desk |
| `master-detail` | Mail-like | `SK-SPLIT-INSPECTOR` | Two regions only |
| `map-ops` | GIS light | `SK-MAP-STAGE` | Sheet for form |
| `calendar-ops` | Scheduling | `SK-CALENDAR-SPINE` | |
| `checkout-focus` | Conversion tunnel | `SK-WIZARD-STEPS` | Kill nav chrome |
| `phone-sheet` | Mobile native-ish | `SK-BOTTOM-SHEET` | Thumb CTA |
| `command-palette` | Power user | `SK-TERMINAL` hybrid | Search is SIGN |

---

## 4) Colour strategies (axis F — pick one)

| ID | Rule |
|----|------|
| `CS-MONO-PLUS` | Near mono + one sharp accent only |
| `CS-DUOTONE` | Two inks only (e.g. navy + cream) |
| `CS-PRIMARY-TRIO` | Bauhaus/primaries — three solid blocks |
| `CS-TONAL` | One hue family, 5+ steps (Material-like) |
| `CS-PAPER-INK` | Paper ground + black ink + status colours only in states |
| `CS-DARK-STAGE` | Dark canvas, light type, neon or foil accent |
| `CS-PASTEL-POP` | Pastel grounds + one black structural rule |
| `CS-SIGNAL` | Safety / maritime / traffic colours as system |
| `CS-PHOTO-LED` | Colour comes from photography; UI chrome quiet |

---

## 5) Chrome budgets (axis E)

| ID | Chrome allowed |
|----|----------------|
| `CH-NONE` | No nav; one action only |
| `CH-MIN` | Wordmark + one link + CTA |
| `CH-STANDARD` | Header + footer + main |
| `CH-APP` | Header + optional one rail **or** tabs (not both) |
| `CH-DENSE` | Status strip + filters + main (still no triple desk) |

---

## 6) Type eras (axis B) — avoid one era for whole batch

| Era ID | Examples of direction |
|--------|----------------------|
| `TY-GROTESQUE` | Akzidenz/Helvetica-like; Swiss objectivity |
| `TY-GEOMETRIC` | Futura/Circular-like; Bauhaus |
| `TY-HUMANIST` | Frutiger/Gill-like; wayfinding/civic |
| `TY-INDUSTRIAL-COND` | Condensed goths; sports/broadcast |
| `TY-OLDSTYLE-SERIF` | Garamond-like; editorial/parish |
| `TY-SLAB` | Rockwell-like; workshop/Egyptienne |
| `TY-MONO-DATA` | Plex Mono / IBM / system mono as **identity** not just numbers |
| `TY-DISPLAY-EXTREME` | One poster face + quiet body |
| `TY-SYSTEM-RAW` | system-ui / Arial / Georgia on purpose (brutalist) |
| `TY-ROUNDED` | Soft geometric; kids/health/clay |

**Batch rule:** IBM Plex family in ≤ 25% of cells. No two adjacent cells share the same TYPE era + CONTROL.

---

## 7) A11y watches by style (do not skip)

| Style risk | Floor fix |
|------------|-----------|
| Glass / neomorphism / pastel | Raise text contrast; never grey-on-grey |
| Neon on black | Check 4.5:1 body; use larger type if accent fails |
| Kinetic / strobe | `prefers-reduced-motion: reduce` = static |
| Decorative display | Body stays readable face; don’t set long copy in display |
| Zine chaos | Hierarchy still clear; targets ≥ 24px |
| Pure mono terminal | Line length + focus visible on dark |

---

## 8) Brief lock template (paste into each cell)

```
STYLE_ID:     <from §3>
SKELETON:     <SK-* from §2 — unique vs peers>
TYPE_ERA:     <TY-*>
TYPE_PAIR:    <two named faces matching era>
CONTROL:      <sharp-0 | pill | ink-underline | chunk-border | ticket | soft-rect if genre>
MATERIAL:     <subject-true>
CHROME:       <CH-*>
COLOUR_STRAT: <CS-*>
MOTION:       <none | one family>
BAN_THIS_RUN: <peer skeletons + median shells + fonts>
A11Y_WATCH:   <from §7>
```

**Agent rule:** implement STYLE as **structure + type + control + material**. If only hex and copy change, **FAIL flavour**.

---

## 9) Example triad assignment (24 cells — maximum diversity)

Rotate so each **STYLE_ID** and **SK-*** appears at most once when possible.

| Cell | STYLE_ID | SKELETON | Notes |
|------|----------|----------|-------|
| W01 | neo-brutalism | SK-BENTO | Loud borders |
| W02 | swiss-poster | SK-POSTER | One idea |
| W03 | art-deco | SK-HERO-SPLIT | Glamour |
| W04 | brutalist-web | SK-BRUTAL-BLOCKS | System raw |
| W05 | magazine-vogue | SK-EDITORIAL-LONG | Luxury air |
| W06 | memphis-80s | SK-ZINE-COLLAGE | Play clash |
| W07 | wayfinding | SK-TIMELINE | Transit clarity |
| W08 | industrial-print | SK-HERO-SPLIT | Press marks |
| W09 | japanese-editorial | SK-SINGLE-STICKY | Quiet gaps |
| A01 | terminal-hacker | SK-TERMINAL | Mono stage |
| A02 | master-detail | SK-SPLIT-INSPECTOR | Two panes only |
| A03 | ops-board | SK-BOARD-KANBAN | Lanes |
| A04 | laboratory | SK-TABLE-FIRST | Hairline data |
| A05 | ledger (broadsheet hybrid) | SK-LEDGER | Ruled paper |
| A06 | map-ops | SK-MAP-STAGE | Canvas+sheet |
| A07 | sports-broadcast | SK-DASH-METRIC | Live urgency |
| A08 | civic-gov | SK-WIZARD-STEPS | Plain language |
| A09 | workshop-hardware | SK-SPLIT-INSPECTOR | Enamel (≠ A02 layout detail) |
| M01 | phone-sheet | SK-BOTTOM-SHEET | Thumb job |
| M02 | y2k-gloss | SK-CENTER-STAGE | Gloss mobile |
| M03 | health-calm | SK-TAB-DECK | Soft clinical |
| M04 | ticket-stub event | SK-TICKET-STUB | Whole page stub |
| M05 | scandi-minimal | SK-SINGLE-STICKY | Air |
| M06 | retro-arcade | SK-CENTER-STAGE | Pixel (≠ M02) |

---

## 10) Sources / further reading (style literacy)

Movements and web eras (non-exhaustive): International Typographic Style / Swiss grid; Bauhaus, Constructivism, De Stijl; Art Deco / Nouveau; Memphis; flat vs skeuomorphism vs Material; glassmorphism / neumorphism / claymorphism / neo-brutalism; bento grids; editorial and poster traditions.

Skill floor still applies: `anti-slop.md`, `flavour.md`, `one-shot.md`.

---

## 11) Expansion rule

When a new aesthetic appears in culture, add a row to §3 with:
1. STYLE_ID  
2. Default SK-*  
3. Type era  
4. Control  
5. A11y watch  
6. One **BAN** (what it must not collapse into)

Do **not** expand CONTROL families alone — expand **SKELETON genres** first.
