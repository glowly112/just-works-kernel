---
name: brief
description: "Draft a Layer-1 delegation brief for an implementer subagent. Forces Goal / Inventory / Acceptance Criteria / Constraints / Cadence / Stop-if-improvising / Verify before dispatch."
---

# Delegation Brief

Generate a structured brief for an implementer subagent. The brief must include every section below — that's the contract Layer 2 (enforce-agent-routing.sh) injects as a pre-flight checklist, and Layer 3 (check-subagent-output.sh) checks for in the agent's return.

## When to use

Use `/brief <task description>` for every SUBSTANTIVE source change. The Driver (GLM-5.2) may make **cosmetic-only** direct edits (text / comments / docs / formatting / typos) — but anything with control flow, arithmetic, money, contracts, or cross-box config goes through a brief. See [[feedback-verification-discipline]].

Dispatch targets:
- `gemini-implementer` (Gemini 3.5 Flash via `agy` — **DEFAULT** for non-visual code; free, gate every run with `codex-reviewer`)
- `codex-implementer` (GPT-5.6-Sol) — reserve for the hardest 15%, or when agy is down / OAuth stale
- `gemini-implementer` + `AGY_MODEL=Pro` (Gemini 3.1 Pro sees renders — sprite / render / layout / animation / render judgement. visual-implementer retired 2026-07-16)
- `codex-reviewer` (pre-impl plan critique, ~60s) — briefs touching >2 files or non-trivial logic
- `qa-adversary` (post-impl) for routine UI/refactor; add `gpt-reviewer` in parallel for money / settlement / deploy / security

Skip for: read-only research, Explore agents. `general-purpose` is FORBIDDEN — if no named agent fits, STOP and ask.

## Shared floor (§0 CORE) — when to inline it

The 5 always-on rules in `~/.claude/knowledge/product-best-practices-2026.md` §0 are the shared quality floor. How they reach the implementer depends on the path — do NOT pad every brief with them:

- **Visual / render work** (`.svelte` / `.css` / sprite / animation / layout / render vocab) is force-routed to `gemini-implementer` (with `AGY_MODEL=Pro`) by `enforce-routing.sh` + `enforce-agent-routing.sh` (the `VISUAL_TRIGGERS` gate fires for `codex-implementer`/plain `implementer`, and exempts `gemini-implementer`), and that agent holds the floor in its own definition. Nothing to do — the floor rides natively. The only escape is an explicit `NON-VISUAL:` line, which by definition means the work isn't design-bearing. (visual-implementer retired 2026-07-16.)
- **The codex / Sonnet path forwards your brief VERBATIM to GPT's sandbox** (refuse-on-sight #2) — the dispatcher's markdown can't carry the floor. So for **copy / content / user-facing-string** work on this path — which the render-keyed routing gate does NOT catch — paste the relevant §0 rules inline: the §4 anti-slop list and "cite a primary source or mark OPINION". Pure non-visual logic / types / server / refactor work doesn't need the design floor; don't bloat those briefs.

No lint gate enforces this last case on purpose: "produces user-facing copy" isn't reliably regex-detectable without false-positive noise on every brief that says "message" or "label". The discipline lives here, applied when you write the brief. (§12 Slice 1b — see [[knowledge-base-shared-floor-slice1]].)

## Template

```
<!-- dispatch tag (optional): if this brief is mechanical OR a same-workspace chain, add the codex effort/resume line as the literal FIRST line of the brief — see "Dispatch tuning tag" below; otherwise delete this comment -->

## Goal
<one sentence — what success looks like>

## Inventory (read these first, list them in your reply)
- <exact file paths the agent must read before doing anything>
- <relevant inventory.md or asset registry if applicable>
- <external tool flags / API fields / file formats — VERIFIED BY OPUS before writing this brief, not assumed>

## Acceptance Criteria (checklist — confirm each in your reply)
- [ ] <criterion 1 — observable / testable>
- [ ] <criterion 2>
- [ ] <SEMANTIC criterion — does it achieve the intent on real input, not just parse>

## Constraints
- Do not <thing that would break a different feature>
- Match existing patterns in <reference file>
- <domain rules / edge cases>

## Cadence
- After every <N> files changed, pause and verify before continuing.
- For visual work: take a screenshot after each meaningful change.

## Stop if you're improvising
If you can't find the exact asset/function/pattern named in Inventory, STOP and report back rather than picking the closest-looking alternative.

## Verify
Run: <exact command — pytest, npm run check, py_compile, etc.>
Report stdout + exit code in the VERIFICATION section of your reply.

**For safety-critical work** (gates, hooks, auth, settlement, deploy, money handling) the Verify section MUST include a LIVE SMOKE TEST against real input. Examples:
- pre-commit hook → run the hook against a real diff, confirm it blocks/allows correctly
- auth gate → POST a real (invalid) credential, confirm rejection
- settlement path → run one end-to-end transaction through the canonical function
`bash -n` and `--help` are necessary but NEVER sufficient for safety-critical work.

## Reply format
Return these sections verbatim: INVENTORY (what you read), CHECKLIST (each acceptance criterion + status), FILES CHANGED (path list), VERIFICATION (command + result).
```

## Dispatch tuning tag (effort / resume) — decide this when you write the brief

Optional FIRST line of the brief; `codex-impl-dispatch.sh` parses it to set codex's reasoning effort and warm-resume without an env var. The dispatcher can't make this call — it's a Claude judgement, so a mechanical brief left untagged silently runs at high effort. Decide per brief:

- **Mechanical** (rename, constant, version bump, doc/markdown edit, single-file mechanical refactor) → `effort=low`. Real logic / architecture / multi-file → omit (defaults to `high`; `xhigh` ≈ 3–5× medium tokens).
- **Same-workspace sequential chain** (brief N builds on brief N-1's tree, same repo) → `resume=last` to reuse the warm Responses-API cache (40–80% better than cold). First brief of a chain or unrelated one-off → omit. Resume can't cross profile/sandbox and can't grant a new `--add-dir`.

Form: the literal top line `<!-- codex: effort=low resume=last -->` (keys order-independent, both optional). It MUST be the brief's first line, before any blank line, or the parser won't see it. Env `CODEX_REASONING_EFFORT` / `CODEX_RESUME` override the tag when set. See [[delegation-mechanics]] → Dispatch knobs.

## Implementation

When `/brief <task>` is invoked:

1. **Read first** — do not generate the brief without first reading the files the task touches. The whole point of three-layer defense is that Claude understands before delegating.
2. **Verify empirical claims first** — if the brief will assert anything about external tool behavior (CLI flags, API responses, file formats, exit codes), RUN the one-liner to confirm BEFORE writing the brief. Don't infer from memory or documentation; run the tool. The pre-commit-hook brief shipped with the wrong severity vocabulary (`CRITICAL/P0/MUST FIX/BLOCKER` instead of Codex's actual `[P1]/[P2]/[P3]`) because nobody ran `codex review --uncommitted` first.
3. **Pick the subagent type** by file extension / path:
   - `.svelte | .vue | .css | .scss | */components/* | */sprites/* | *sprite* | *animation* | *layout*` → `gemini-implementer` (AGY_MODEL=Pro)
   - Everything else (non-visual code) → `codex-implementer` (DEFAULT) / `implementer` (fallback only when codex CLI unavailable)
4. **Inventory section** — list the exact files the agent should read. If `docs/agent/inventory.md` exists, reference it. For sprite/asset work, list the tileset directories the agent should restrict itself to. Include verified empirical facts about external tools used.
5. **Acceptance Criteria** — translate the user's request into observable checks (not steps). "Door opens when clicked" not "add click handler". At least one criterion must be SEMANTIC.
6. **Constraints** — surface domain rules from memory or CLAUDE.md that the agent wouldn't know from the code alone.
7. **Verify** — must be a real command that exists in this repo (check `package.json` scripts / `Makefile` / `pyproject.toml`). For safety-critical work, also include a live smoke test.
8. **Pre-impl review** — if brief touches >2 files OR involves non-trivial logic (state machines, concurrency, ordering, settlement, anything safety-critical), recommend dispatching `codex-reviewer` first before `codex-implementer`.
9. **Decide the dispatch tag** (see *Dispatch tuning tag* above) — if the brief is mechanical → `effort=low`; if it's the next in a same-workspace sequential chain → `resume=last`; else no tag. When tagging, the `<!-- codex: … -->` line must be the brief's FIRST line.
10. **Write the brief to `/tmp/brief_<slug>.md`** rather than outputting it inline whenever any of these are true: brief will be reviewed before implementation (codex-reviewer first), brief is >40 lines, OR brief will be revised more than once. Output a 2-line summary + the path. Dispatch with the shorthand below.

## Brief-by-reference dispatch (saves Opus context)

When the brief lives at `/tmp/brief_<slug>.md`, dispatch with a one-line prompt — the codex-* agents auto-read the file (their Workflow step 0):

- **Initial review**: `Agent(subagent_type: "codex-reviewer", prompt: "Review /tmp/brief_<slug>.md")`
- **Revise then re-review**: edit the file in place, then `Agent(subagent_type: "codex-reviewer", prompt: "Review /tmp/brief_<slug>.md — second pass, prior issues addressed")`
- **Approved → implement**: `Agent(subagent_type: "codex-implementer", prompt: "Implement /tmp/brief_<slug>.md\nREVIEWED-BY: <reviewer-session-id>")`

The `REVIEWED-BY:` line silences the `enforce-agent-routing.sh` advisory gate AND signals codex-implementer that a reviewer already vetted the brief.

**Why**: inlining a 60-line brief into the Agent prompt twice (review + implement) burns ~120 lines of Opus context per round-trip. The shorthand pattern keeps that brief text in the file system, where codex reads it directly. Audit of one 30-dispatch session found ~3,450 tokens of pure wrapper boilerplate from this pattern alone.

## Why this exists

Implementers (especially Sonnet) drift when given goal-only briefs in visual or asset-heavy contexts. The LimeZu sprite audit picked chalkboards, sleeping bags, and dining-room chairs from the wrong tilesets because the brief said "audit the office sprites" without naming which tileset to read or what counted as in-scope. The three-layer defense (CLAUDE.md template + hook injection + output gate) keeps this from recurring.
