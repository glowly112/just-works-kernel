---
name: role
description: Switch or inspect role bindings for brains (driver, implement, visual, review, post-review, judge, idea).
user-invocable: true
---

# Role

Manage and inspect role bindings for brains.

## Usage

When the user runs `/role` or `/role <subcmd>` (`list`, `show`, `set <role> <brain>`, or `<role> <brain>`):

1. **No arguments, `show`, or `list`**:
   - Execute `bash "/Users/jamie.matheson/.openvibe/grokcode" role show` (or `role list`).
   - Summarise the active role bindings (`driver`, `implement`, `visual`, `review`, `post-review`, `judge`, `idea`).

2. **`set <role> <brain>` or `<role> <brain>`** (e.g. `/role implement deepseek` or `/role set driver claude`):
   - Execute `bash "/Users/jamie.matheson/.openvibe/grokcode" role set <role> <brain>`.
   - If setting **`driver`**, mention that the user must relaunch `vibe` (exit TUI and run `vibe` again) to switch the active Driver host process.
   - If setting **`implement`** (or other worker roles), mention that the change takes effect immediately on the next `vibe do` / worker dispatch.

## Rules

- Brains: `grok`, `claude`, `codex`, `kimi`, `gemini`, `deepseek`, `reasonix`, `opencode`.
- Roles: `driver`, `implement`, `visual`, `review`, `post-review`, `judge`, `idea`.
- Default implement role binding stays cost-smart (`gemini`).
- `deepseek` / `reasonix` implement → `ov-dispatch reasonix` (Reasonix CLI + `DEEPSEEK_API_KEY` / Reasonix config).
