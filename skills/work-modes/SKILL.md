---
name: work-modes
description: >
  Universal thrift routing for classic Vibe. Maps task stakes to
  micro/pair/ui-thrift/money/edge-team/plan/research/demo/clarify. Use when
  starting work, deciding how hard, or before multi-agent. The pure classifier
  hooks/helpers/work_mode.py auto-picks a mode from the brief at board record.
  Not a substitute for the ui-thrift, ui-team escalation, or edge-team skill bodies.
user-invocable: true
version: 2026-07-28-a4
---

# work-modes — thrift + task→mode (classic Vibe)

product=`vibe` (classic). **Success:** the right mode and seat — not maximum
thinking in-seat. Wrong mode wastes more time than a low-effort hop.

Ported from OpenVibe `~/.openvibe/skills/work-modes/SKILL.md` (ideas + ladder);
mode ids match the **classifier** in `/Users/jamie.matheson/.openvibe/hooks/helpers/work_mode.py`,
itself a port of OV `classifyMode`.

## Modes (ids match the classifier cascade)

| mode | When | Seats |
|------|------|-------|
| **micro** | Clear tiny fix / status / one-line copy | Driver or 1× implement |
| **pair** | Normal code after shape is known | `@implement` ± post-review |
| **ui-thrift** | Any UI/UX/layout/prototype/product UI | mandatory ui-thrift → ui-lock + kit/stack → Grok implements on: in-pane; else implement/probe-deepseek → optional design-review |
| **ui-team** | Explicit full-team/brand-critical escalation, or thrift failed two deltas | ui-team full pack → `@ui` → design-review |
| **research** | Online best-practice / how apps do X | web first |
| **plan** | Multi-phase control-plane / architecture overhaul | `@plan` → approve; **if ≥2 worktree lanes → `mv-campaign run`** (auto-lanes) |
| **money** | Money / odds / auth / deploy / settlement / secrets | review → hard → post → judge |
| **edge-team** | Edge discovery / why red | `skills/edge-team/SKILL.md` |
| **demo** | One-shot HTML toy (solar system, canvas demo) | implement; no fake OS dialect |
| **clarify** | Shape unclear ("build something", "idk") | questions only |

### Auto-lanes (GrokVibe / Multi Vibe · default for multi-step)

**Default, not opt-in:** when the ask is **multi-step** and independent
desks/worktrees have ROI (independent packages/trees, ordered `dependsOn`
programme, named campaign, “parallel lanes”), the Driver opens lanes by
default — **do not** serialise N independent lanes in one pane, **do not**
send the human to Settings as the only start, and do not treat lanes as an
optional “if you feel like it”.

The classifier stamps `wf.auto_lanes` (bool) from the ask (rails `classifyAutoLanes`), and PreToolUse denies serial Driver DIY / calling-cwd `gv run implement` while auto-lanes apply — route via `mv-campaign`, never bulk-DIY in one pane.

```bash
"${MULTIVIBE_ROOT:-$HOME/src/multivibe}/tools/mv-campaign" run <plan.json|name>
```

SOT: `$MULTIVIBE_ROOT/law/AUTO_LANES.md` · live speech: `$GROKVIBE_HOME/DRIVER.md` § Auto-lanes.  
Cap maxParallel 2–3 (≤6). Still off: micro / one sequential hop / HARD FLOW /
money unless `requireHuman` → no auto-lanes.

> The OV skill also lists a `ui-craft` polish mode. In classic Vibe the
> classifier routes production UI to design/ui-thrift. `ui-team` is the named
> full-pack escalation, not the ordinary classifier destination.

## Ladder thrift

Solo ≈ micro · Pair ≈ pair · Team-lite ≤ 3 peers · Full pack = a named pipeline
only (`ui-team`, `edge-team`, `design-review`). Do **not** spin a full multi-agent
pack for a spinner.

## Driver auto-pick (mandatory)

Every brief is classified at board-record time by
`hooks/helpers/work_mode.py::classify_mode(text)`, and the result is stamped onto
the session board as `last_mode` (Phase A4). Cascade order (highest precedence
first — do not reorder):

```
money / deploy / auth / odds / settlement → money
production UI / multi-app / prototypes     → design / ui-thrift
research / look online / best practice     → research
control-plane / multi-phase / productise   → plan
edge-team / why red                        → edge-team
solar system / canvas demo / one-shot HTML → demo
spinner / typo / status only               → micro
"build something" / idk / not sure         → clarify
fix / implement / bug / refactor           → pair
build / code / make                        → pair
else                                       → micro
```

Classify silently: never print `mode=` / `effort=` / `seat=` in normal chat. The
user override always wins (`/edge-team`, "solo only", `/hard`, an explicit mode in
the brief).

### Pure classifier (no network, no model)

```bash
python3 /Users/jamie.matheson/.openvibe/hooks/helpers/work_mode.py classify "fix flaky test"
python3 /Users/jamie.matheson/.openvibe/hooks/helpers/work_mode.py selftest   # OV corpus, exit 0
```

The same function sets `last_mode` on the board via
`session_board.py last-mode --from-text <brief>` (best-effort, never fails a hop).

## Illegal

- Full multi-agent pack on a spinner / micro task.
- Starting full ui-team or `@ui` before the mandatory thrift path without an escalation reason.
- Driver doing money arithmetic in chat — money mode → review→hard→post→judge.
- Skipping ui-thrift/ui-lock then dumping freehand HTML.
- Hand-pasting N worktree briefs into panes when `mv-campaign` exists and auto-lanes apply.
- Treating Settings → Campaigns as the only way to start a multi-lane run.
