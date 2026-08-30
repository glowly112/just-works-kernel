# Style pool — large research set (hundreds → thousands)

## Scale (this generation)

| Asset | Count | Path |
|-------|------:|------|
| **Named styles** | **816** | `styles-named.tsv` |
| Skeleton genres | 50 | `styles-axes.tsv` |
| Type eras | 24 | axes |
| Controls | 10 | axes |
| Materials | 103 | axes |
| Colour strategies | 20 | axes |
| Chrome budgets | 6 | axes |
| **Named × skeleton** (theoretical pairs) | **40,800** | |
| **Named × skeleton × colour × chrome** | **4,896,000** | |
| Axes-only (sk×type×control×colour×chrome) | **1,440,000** | |
| Prebuilt combo sample TSV | ~2,448 | `styles-combo-2k.tsv` (may be 4k) |
| Random 10k ready locks | 10,000 | `styles-combo-10k.jsonl` |

Theoretical full space if every named style can pair with every skeleton and every colour/chrome: **4,896,000** distinct brief locks — well into the **tens to hundreds of thousands**, without inventing empty nonsense (each lock still maps to real axes).

## How to use in a bakeoff

1. Sample unique rows from `styles-combo-10k.jsonl` (or TSV) — **one combo_id per cell**.
2. Paste `brief_lock` into the cell brief as hard locks.
3. **Batch uniqueness:** no repeated `skeleton` within a wave of 24 if possible; no more than 2× same `style_id` family cluster.
4. Still enforce ui-bp floor (states, AA). Style never wins over a11y.
5. Ban free default: `SK-RAIL-DOCK` + Plex + zero-radius across >15% of a batch.

## Families in named set

See `style_id` / `family` columns. Includes:
- Historical design movements (Bauhaus, Swiss, Memphis, Deco, …)
- Architecture & spatial languages
- Print / editorial cultures
- Internet aesthetics (vaporwave, academia, cottagecore, liminal, …) — large expansion
- Music / subcultures
- Industry / product UI worlds (100s of verticals)
- Regional graphic traditions (use with care; not costume)
- Craft & material languages
- Digital product micro-styles

## Research basis (summary)

- **Graphic design history:** Arts & Crafts → Art Nouveau → modernist schools (Bauhaus, De Stijl, Constructivism) → Art Deco → Swiss/International Typographic Style → Pop/Postmodern/Memphis → digital ages.
- **UI surface languages:** skeuomorphism, flat, Material, glass/neu/clay, neo-brutalism, bento, kinetic type.
- **Internet aesthetics culture:** large folk taxonomy (Aesthetics Wiki-class names) adapted to **UI locks** (skeleton/type/control/material), not fashion-only moodboards.
- **Industry verticals:** product worlds force different chrome and density.

## Not a finished visual for each of 100k

Named styles + axes are **locks for agents**. The model still builds product-specific UI. Diversity comes from **forced different silhouettes and surface languages**, not from shipping 100k static templates.

## Sampling command

```bash
# 24 unique combos for a triad
shuf -n 24 ~/.grok/skills/ui-bp/references/styles-combo-10k.jsonl > /tmp/triad-styles.jsonl

# or TSV
shuf -n 24 ~/.grok/skills/ui-bp/references/styles-combo-2k.tsv | tail -n +1
```

## Parent docs

- `style-pool.md` — axes explanation + brief template (human-readable)
- `flavour.md` — CONTROL families
- `anti-slop.md` (ui-craft) — medians to refuse
