---
name: repo-memory
description: >
  Keep project memory on disk so the next session does not re-brief from chat.
  STATE / CONCEPTS / LEARNINGS. Use when: session start on an existing repo,
  after a feature ships, after a nasty bug, “what is in flight”, /repo-memory.
---

# repo-memory

Status: **DEFAULT on existing projects**

Chat dies. Files do not.

## Job

Keep project memory on disk so the next session does not re-brief from chat.

Skip greenfield one-shot toys with no repo.

## The three files (repo root)

| File | Holds | When to write |
| --- | --- | --- |
| `STATE.md` | What is in flight right now | Start if stale; after ship / stop |
| `CONCEPTS.md` | Project nouns and distinctions | When a word means something special here |
| `LEARNINGS.md` | What broke / do not do again | After a bug, a bad approach, or a good pattern |

Do not invent a fourth memory file. Do not dump transcripts. Accept `docs/` only if they already live there.

## Rules

- **STATE** — present tense, next action in one line, shipped list stays short, parallel work named with branch / worktree
- **CONCEPTS** — glossary only, under ~30 terms
- **LEARNINGS** — dated, imperative, written while the failure is fresh

## After feature-plan ships

Update STATE. Add a noun if one appeared. Add a learning only if something surprised you.

## Git

Serious project → stop stacking unrelated work on main. Commit memory files with the work they describe.

## Refuse

- Re-briefing from chat when the files already answer it
- Learnings only in the reply, not on disk
- Replacing tests or git history with these files
