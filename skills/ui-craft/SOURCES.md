# ui-craft — research sources (finalized 2026-07-23)

Grok-native web UI skill. Citations only; procedures live in `SKILL.md` + `references/`.

## Standards & platforms
| Source | Use |
|--------|-----|
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Normative a11y |
| [1.4.3 Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Text 4.5:1 / large 3:1 |
| [1.4.11 Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | UI chrome 3:1 |
| [2.5.8 Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | 24×24 CSS px AA |
| [2.4.11 Focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Sticky chrome |
| [Soueidan — focus](https://www.sarasoueidan.com/blog/focus-indicators/) | Practical focus |
| [NN/g 10 heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | Interaction UX |
| [M3 type](https://m3.material.io/styles/typography/type-scale-tokens) | Type roles |
| [M3 spacing](https://m3.material.io/styles/spacing) | 8-based space |
| [Apple HIG typography](https://developer.apple.com/design/human-interface-guidelines/typography) | Legibility |
| [Apple HIG layout](https://developer.apple.com/design/human-interface-guidelines/layout) | Touch / adaptive |

## Anti-slop
| Source | Use |
|--------|-----|
| [prg.sh purple gradient](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website) | Median AI look; constraint prompts |
| [DEV purple problem](https://dev.to/jaainil/ai-purple-problem-make-your-ui-unmistakable-3ono) | Tokens; OKLCH; brand-first |
| [Anthropic frontend aesthetics cookbook](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb) | Positive + negative aesthetics |

## Research / assets
| Source | Use |
|--------|-----|
| [Baymard research](https://baymard.com/research) | Forms clarity patterns |
| [Recraft](https://www.recraft.ai/) | Non-LLM images/vectors |

## Explicit non-authority
- Codex `frontend-design` compliance-ledger process  
- Native iOS/Android full HIG (out of skill scope until sibling skills)

## Practice note (not a web citation)
Helm A/B 2026-07: “craft” rebuild cloned a peer’s `sessions | stream | instruments` shell under new names. Skill response: SKELETON + REFUSE + silhouette/rename tests + layout medians in `anti-slop.md` (see `SKILL.md` §0, §1, §7).

## Skill layout
```
ui-craft/
  SKILL.md                 # always-on procedures
  SOURCES.md               # this file
  references/
    wcag-floor.md
    anti-slop.md
    type-layout.md
```
