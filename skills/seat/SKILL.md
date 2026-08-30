---
name: seat
description: Switch or inspect the Driver OAuth seat (grok, claude, codex, kimi). Run with list, show, or a seat name.
user-invocable: true
---

# Seat

Manage and inspect the active Driver OAuth seat.

## Usage

When the user runs `/seat` or `/seat <id>`:

1. **No arguments or `list`**:
   - Execute `bash "/Users/jamie.matheson/.openvibe/grokcode" model list` (or `driver list`).
   - Summarise the available OAuth seats (`grok`, `claude`, `codex`, `kimi`) and highlight the currently active seat.

2. **`show`**:
   - Execute `bash "/Users/jamie.matheson/.openvibe/grokcode" model show` (or `driver show`).
   - Output the active Driver seat, binary path, and authentication status.

3. **`<id>` (`grok` | `claude` | `codex` | `kimi`)**:
   - Execute `bash "/Users/jamie.matheson/.openvibe/grokcode" model set <id>`.
   - **Boldly tell user to exit TUI and run `vibe` again** to apply a non-current Driver binary host.

## Rules

- Never invent API keys or credentials.
- Never claim hot-swapping of the binary driver host without relaunching `vibe`.
