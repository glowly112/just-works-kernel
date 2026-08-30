---
name: session-discipline
description: Session boundary rules for checkpoints, memory, changelogs, and commits. Auto-invoked at session start/end.
triggers:
  - session start
  - session end
  - checkpoint
  - commit
  - memory
  - changelog
---

# Session Discipline

## Checkpoints (`docs/agent/CHECKPOINT.md`)
- Read at task start; use it as the authoritative resume source.
- **Your job is the live head only** — a TERSE snapshot of what just resolved, what's next, and open decisions. Update at task start/end, plus one midpoint if the plan materially changes. You author this because it needs the session's reasoning context; a background agent would fabricate it (and has, here).
- **Superseding a prior head = a one-line marker** (`↳ superseded by <new> (date)`), NOT an inline rewrite or re-annotation of the old body. Archiving/demoting resolved sections + dedup is the `memory-admin` worker's conditioning duty (it runs at SessionStart, before you touch the file, so no collision). Don't restructure the checkpoint by hand mid-session.
- **No verification churn.** Don't `git status` / `diff --stat` / `ls` / re-run a scan to "confirm" a number you already computed this session. One check only when you genuinely lack the value — the bookkeeping *around* the head is what bloats turns, not the head itself.
- **Output budget — status/handoff/checkpoint reports ≤6 lines.** A resume/status/checkpoint report is a HEAD, not a transcript: judgment, next step, and open decisions only. Drop what the work-log + git already capture (file lists, command echoes, step-by-step narration). If it reads like a diary, cut it. The same budget governs any **agent-return summary you relay** — distil the verdict and the one fact the user needs, don't paste the subagent's prose. (This is the in-house version of output-compression tools like `caveman`: semantic terseness, never syntactic mangling that forces a re-ask.)

## Memory (persistent cross-session context) — ONE_HOME only
- **SOT:** `/Users/jamie.matheson/.openvibe/memory/` (global `MEMORY.md` + `projects/<slug>/`). Not vendor app stores.
- Read `/Users/jamie.matheson/.openvibe/memory/MEMORY.md` at session start alongside the checkpoint (and project slice under `memory/projects/` when relevant).
- At session end: save non-obvious learnings there — **never** invent a second brain under `~/.grok` / `~/.codex` / `/tmp`.
- Before acting on a memory, verify it against current repo/data state — memories go stale
- Update or delete stale memories rather than leaving them
- Do not duplicate checkpoint or changelog content
- Types: `user` (preferences, role), `feedback` (corrections, confirmed approaches), `project` (active state, decisions), `reference` (external system pointers)
- Map: `/Users/jamie.matheson/.openvibe/HOME.md`

## Commit discipline
- Stage only current-task files
- Sessions that changed tracked repo files should end with a real commit
- Maintain `.changelog/session-YYYY-MM-DD.md`

## Verification at session end
- After each meaningful change, verify it works — don't batch all testing to the end
- Before declaring any task done, one self-review pass (no recursion)
- Do not wait for the user to ask "does it work?"

## End-of-session retro → promote (EVERY session)
Before finishing, list every issue the **user** had to flag this session — a correction, a re-asked request, a "you didn't do X", a "that's wrong". For each:
- **One-off** → note it, move on.
- **Recurring** (happened before — check memory + the `*-quirks.md` files) → it must become a **gate**, not another passive memory:
  - Mechanically checkable → write or strengthen a hook / QA check (brief to codex-implementer).
  - Not mechanically checkable → a CLAUDE.md or SKILL.md rule.
  - Neither yet → log it as a tracked recurrence so the count is visible next time.
Passive memory is recall-based, lossy, and has itself been fabricated — a recurring lesson left only as memory will recur. The point is **promotion**: the user should not have to flag the same class of mistake twice. New gates are **advisory-first** (warn, don't block) — a blunt blocker that false-fires becomes its own recurring complaint.
