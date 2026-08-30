---
name: uk-copy
description: >
  en-GB copy + R1–R6 self-review before ship. Companion to ui-thrift when the
  screen has words. Use when: copy, labels, UK English, en-GB, strings, /uk-copy.
---

# uk-copy

Status: **HARD with ui-thrift** when the screen has words

## Job

Copy that reads like a UK desk operator wrote it — not a model pitching. en-GB spelling. Short labels. Glanceable numbers. **Self-review R1–R6 until happy to ship**.

## Voice

| Do | Don't |
| --- | --- |
| en-GB: organise, colour, realise, favour | US spelling as default |
| Short labels: “Paper only”, “Fuse off” | Mid-dot poetry chains |
| Concrete numbers in the label | Essay under every number |
| One clause per line | Unlock / seamlessly / delight / journey |

**Mad Crack Lab register:** terse floor notes. Prefer “Geo invent held” over long mid-dot title stacks.

## Density (fail-closed)

First viewport / main board pane:

1. Brand or title (chrome)
2. **One number** (day score)
3. **One short line** (≤8 words) — optional; skip if the number is enough
4. **One primary visual** (chart / strip / table)
5. Optional compact list — **no paragraphs**

**Too much writing test:** if removing half the sentences does not lose a number or a decision, cut them.

Do **not** put internal aim targets on the main Floor if the operator already knows them — show **performance** only.

## AI tells (BAN)

- Pitch verbs: unlock, seamlessly, supercharge, empower, elevate, delight
- Soft padding / explaining the UI (“Tap a row for…”)
- Mid-dot stacks longer than 3 tokens
- Fake warmth; decorative em dashes

## Self-review gate (required before ship)

Run after P5. If any fail → **fix yourself**. Max 2 deltas then stamp.

| Check | Fail if |
| --- | --- |
| **R1 density** | Main pane has >1 paragraph or >3 explanatory sentences above the fold |
| **R2 en-GB** | US spelling in user-facing copy |
| **R3 AI tone** | BAN verb / mid-dot poetry / ChatGPT pitch |
| **R4 artifacts** | Overlap, clipped text, double scroll, orphan icons, empty walls, broken chart |
| **R5 numbers** | Day / board performance not glanceable without prose |
| **R6 happy** | Would not ship to Home without apology — keep fixing |

```text
uk-copy: loaded
R1–R6: pass|fail — <one line if fail + delta done>
```

**Saying “looks good” without R1–R6 = not reviewed.**

## With ui-thrift

- After P4 memo → voice + density in ANTI
- During P5 → strings under Density + Voice
- Before P6 claim → run R1–R6; fix; then P6
