---
name: feature-plan
description: >
  Plan the feature before any implementation. Code is the last step. Default for
  non-trivial features. Use when: build, add, ship, implement, change a feature,
  fuzzy scope, /feature-plan, more than one file would change.
---

# feature-plan

Status: **DEFAULT for non-trivial features**

Companion to **ui-thrift** for pixels and **repo-memory** for persistence.

## Job

Plan the feature before any implementation. Code is the last step.

Exempt: typo, rename, one-line copy fix.

UI chrome still goes through **ui-thrift**. This skill owns scope and sequencing, not layout.

## Load

1. Read the skill.
2. Read `STATE.md` / `CONCEPTS.md` / `LEARNINGS.md` if they exist.
3. Ask only what is still missing. One question when the answer changes the plan.

## Interview until the stamp can be filled

- **Job** — what becomes true when this ships
- **Non-goals** — not this pass
- **Touched** — files / modules / screens
- **Reuse** — existing pattern, no parallel stack
- **Risk** — the rewrite-maker
- **Done** — one test, one check, or one visible state
- **SOT** — only if this sits on an existing system: the **one number** that must not be invented; what **must not be summed**; what **OFF** looks like. Print `sot:` in the just-works RESULT. Skip on toys with no live system.

Stupidly simple first projects: Job + Non-goals + Done only.

## Stamp (`FEATURE.md`)

```text
# Feature
Job:
Non-goals:
Touched:
Reuse:
Risk:
SOT: (the number that must not be invented, or n/a)
Done:
Steps:
1.
2.
3.
Status: draft | accepted
```

Under ~40 lines. Split if it needs a novel. **No implementation until Status is accepted** (or the user says just build it *after* seeing the plan).

## After accept

Follow the steps. No sneaky architecture. After ship, hand off to repo-memory.

## Refuse

- Code before accepted plan
- Scope creep without updating the stamp
- Planning pixels here
- `/ce-plan` or other Claude plugin commands
