# Anti-slop art direction

Models converge on training medians (Tailwind indigo demos, Inter, three icon cards). That is **average**, not good.

## Sources
- https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website  
- https://dev.to/jaainil/ai-purple-problem-make-your-ui-unmistakable-3ono  
- https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb  

## Hallmarks of AI slop
- Inter / Roboto / Open Sans / Lato as sole type personality  
- Purple / indigo gradients on white or dark glass heroes  
- Centered hero + three equal feature cards with circle icons  
- Soft multi-stop mesh as decoration  
- Fake “Trusted by” logo rows  
- Pitch verbs: unlock, seamlessly, supercharge, delight  
- Cookie-cutter rounded cards + 0.1 shadow everywhere  

## Layout medians (same severity as purple glass)
Recoloring or renaming these is still slop:

| Median shell | Why it converges |
|--------------|------------------|
| Left icon rail + top bar + single chat column | Default “AI coding IDE” silhouette |
| **Sessions \| transcript \| utility** three-column desk | 2024–26 multi-agent console median |
| Settings card farm + rainbow left borders / candy Manual·Auto pills | Dashboard kit aesthetics |
| Segmented Chat/Do/Review/Judge composer chips when product is single-seat | Fake power-user chrome |
| Floating pet + heavy glass composer both competing for focus | Ornament over job |

**Clone tells:** same region count and placement; only tokens, radii, or region names differ (`session-rail` → `ledger`). That is a **twin**, not craft.

**Silhouette test:** blur logos/wordmarks. If two builds still match, redesign **SKELETON** (see parent `SKILL.md` §1), not the accent hex.

## New medians to refuse as free defaults
- Cream `#F4F1EA` + terracotta + big serif (unless brief is print/editorial)  
- Near-black + single acid green/cyan as the entire brand (unless product is that world)  

## Second-wave medians (“production beige”)
Competent, a11y-safe, still slop when free defaults:

- **Soft 6–12px rectangle CTAs** on every product (no control-geometry choice)  
- **Fraunces + Source Sans 3** (or **Georgia + Trebuchet**) as automatic “tasteful production” type  
- Cream/paper surface + one accent + serif H1 + rounded form card with only the headline swapped  
- Mast → hero thesis → form → footer shell reused across unrelated products  

**Fix:** lock TYPE_PAIR + CONTROL family + MATERIAL before CSS (ui-bp `references/flavour.md`). Production floor stays; beige is not flavour.

## Positive constraints (Anthropic cookbook pattern)
1. **Typography** — distinctive faces; high contrast pairings; state choices before code  
2. **Color** — CSS variables; dominant + sharp accent; not timid even rainbow  
3. **Motion** — one orchestrated load/hover family, not scatter  
4. **Background** — atmosphere from subject materials, not obligatory mesh  
5. **Negation** — explicitly list fonts/colors/**layouts** to avoid  
6. **Skeleton first** — region map unique vs peers before any component CSS  

## Workflow that breaks the loop
1. Write SKELETON + REFUSE (peer paths) before tokens  
2. Tokens before components (`--brand` not `indigo-600`)  
3. Subject-true palette (product world materials)  
4. One signature move **including structure**; quiet the rest  
5. Never prompt yourself with only “modern / clean / premium” or “merge best of A and B”  
6. Optional: Recraft for heroes/vectors so pixels aren’t pure LLM taste  
7. Silhouette re-check against peers before claiming PASS
