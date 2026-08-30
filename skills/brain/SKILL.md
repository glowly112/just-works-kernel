---
name: brain
description: Manage model profiles and Driver seats via dual path (OAuth seats vs API models).
user-invocable: true
---

# Brain

Manage Vibe Driver seats and custom API model profiles.

## Usage

When the user runs `/brain` or `/brain <subcmd>` (`list`, `show`, `auth`, `set <id>`):

1. Shell out directly to `bash "/Users/jamie.matheson/.openvibe/grokcode" model <subcmd>`.
2. Output the result cleanly to the user.

## Dual-Path Model

- **OAuth CLI seats** (`grok`, `claude`, `codex`, `kimi`): Primary Driver seats using CLI subscription login credentials (`grok login`, `claude login`, `codex login`, `kimi login`).
- **API Model profiles** (e.g. `vibe-deepseek`): Optional secondary paths using provider API keys (`DEEPSEEK_API_KEY`).
- **Worker execution**: Stays handled via `ov-dispatch` regardless of Driver seat/model choice.
