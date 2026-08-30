---
name: model-router
description: Route work between Grok (planner/reviewer), OpenAI via AIRelay (implementer), and Gemini (visual/multimodal). Use when deciding which model should handle a task, when you want to delegate implementation to OpenAI, or when work spans planning, implementation, and UI critique.
---

# Model Router

Grok orchestrates (minimal tokens). OpenAI does the heavy lifting. Gemini critiques visuals.

## Grok's job (token-minimal)

1. Read checkpoint + quick Glob/Grep to find relevant file paths (DO NOT read file contents)
2. Write a one-line task description
3. List the context files OpenAI needs
4. Call route_task.py — OpenAI reads the files, plans, and implements
5. Review with `git diff`, run tests, commit

**Do NOT**: read full source files to understand them, run Explore subagents, or build detailed plans. Send the files to OpenAI and let it do the thinking.

## Usage

```bash
# Simple task: fast codex model analyses + implements
python3 ~/.claude/skills/model-router/scripts/route_task.py \
  --mode execute --preset implement --apply \
  --context-files src/Foo.kt,src/Bar.kt \
  "add filtering to the history screen"

# Complex task: gpt-5.4 analyses the codebase, plans, and implements
python3 ~/.claude/skills/model-router/scripts/route_task.py \
  --mode execute --preset research-implement --apply \
  --context-files src/Strategy.py,src/Consumption.py,src/Config.py \
  "add Kelly staking mode to rank_quota consumption, keeping flat as default"

# When you already have a clear spec (skip analysis)
python3 ~/.claude/skills/model-router/scripts/route_task.py \
  --mode execute --preset implement-careful --apply \
  --context-files src/Foo.kt \
  "exact spec of what to change"
```

## Presets

| Preset | Model | Use for |
|---|---|---|
| `implement` | gpt-5.3-codex medium | Clear spec-following, CRUD, boilerplate |
| `implement-careful` | gpt-5.4 high | Complex logic with a clear spec |
| `research-implement` | gpt-5.4 high | Needs to read code + plan + implement (replaces Claude exploration) |
| `ui-review` | Gemini | Screenshot/mockup critique |
| `spec-pass` | Claude | Turning notes into specs |
| `racing-challenge` | Claude | Skeptical racing-bot review |

## Key flags

- `--apply`: Auto-write `===FILE:===` blocks to disk.
- `--quiet`: Compact output — just status, applied files, errors. Saves ~2k tokens vs full JSON.
- `--verify 'cmd'`: Run a command after applying (e.g. `'python3 -m pytest tests/ -x -q'`). Reports PASS/FAIL.
- `--context-files a.py,b.py`: Include source files in prompt (max ~100KB).
- `--model <name>`: Override OpenAI model.
- `--force-model claude|openai|gemini`: Force a specific lane.
- `--timeout-seconds <n>`: Default 300s. Set Bash tool timeout to 360000ms.

## Optimal invocation (minimum Claude tokens)

```bash
python3 ~/.claude/skills/model-router/scripts/route_task.py \
  --mode execute --preset implement --apply --quiet \
  --verify 'python3 -m pytest tests/ -x -q' \
  --context-files src/Foo.py,src/Bar.py \
  "task description"
```

Grok gets back ~5 lines: status, model, applied files, verify PASS/FAIL. No git diff needed if verify passes.

## Large files (>500 lines) — avoiding timeouts

Files over ~500 lines often timeout at 300s. Strategies in order of preference:

1. **Extract relevant functions only**: `sed -n '100,200p' big_file.py > /tmp/relevant_snippet.py` — send the snippet plus a description of where it fits in the full file. Include surrounding function signatures for context.

2. **Increase timeout**: `--timeout-seconds 600` (10 min). Set Bash tool timeout to match: `timeout: 600000`.

3. **Split into multiple calls**: if the change touches multiple independent functions in a large file, make separate route_task.py calls for each function with just that snippet as context.

4. **Two-pass approach**: first call with `research-implement` to get a plan from the full file, then a second `implement` call with just the target functions + the plan as the task description.

Never send multiple files totalling >100KB — the model will timeout or produce truncated output.

## Parallel multi-file workflow

For tasks touching multiple independent files, dispatch as parallel background subagents via Agent tool, each calling route_task.py. Grok reviews all outputs, then commits.

## AIRelay

`http://127.0.0.1:4010` — OpenAI-compatible, OAuth + account rotation, no API key. Always forces `stream: true`.
