---
name: git-changelog
description: Document changes and create structured commits as you work. Use when making code changes that should be tracked, committed, or documented. Maintains a session changelog, creates atomic commits with conventional commit messages, and updates project documentation. Triggers include "commit this", "save my progress", "document what we did", "create a changelog", or any code modification task.
---

# Git Changelog

Document and commit changes systematically as you work.

## Hard Contract (Non-Negotiable)

1. Maintain a session changelog at `.changelog/session-YYYY-MM-DD.md`
2. Every logical change MUST create a changelog entry (even if not committed)
3. Commits MUST be atomic: one commit per logical change
4. Commits MUST use Conventional Commits: `type(scope): description`
5. Committed entries MUST include the commit hash
6. If git unavailable: write changelog + output exact commands

## Commit Gate

### Commit immediately if ANY true:
- User explicitly asked: `commit this`, `save my progress`, `stage and commit`, `ship this`
- Logical change complete AND verification passes (if tests exist)

### Do NOT commit (log only) if ANY true:
- Changes are exploratory/WIP or span unrelated concerns
- Verification fails (unless user explicitly accepts)
- No git repo / git unavailable

When not committing: write changelog entry with `Commit: UNCOMMITTED` and include "Proposed commit" with exact commands.

## Repo Detection (Required)

Before staging/committing:
```bash
git rev-parse --is-inside-work-tree
```

If fails:
- Create/update `.changelog/session-YYYY-MM-DD.md`
- Mark entry `Commit: UNCOMMITTED`
- Output exact commands for later

## Session Changelog

**Location**: `.changelog/session-YYYY-MM-DD.md`

### Initialize
```bash
mkdir -p .changelog
cat > .changelog/session-$(date +%F).md << 'EOF'
# Session: $(date +%F)

## Summary

## Changes
EOF
```

### Entry Format (Required)
```markdown
### [HH:MM] Change Title
**Type**: feat | fix | refactor | docs | test | chore | perf | style
**Scope**: <scope>
**Files**:
- `path/to/file.ext` — <what changed>

**Description**:
<what was done and why>

**Verification**:
- `<command>` — PASS | FAIL | SKIPPED (<reason>)

**Commit**: `<hash>` | `UNCOMMITTED`

**Proposed commit** (if uncommitted):
```bash
git add <files>
git commit -m "type(scope): description"
```

---
```

### Entry Rules
- Change Title: imperative, ≤72 chars
- Files: exhaustive list for the change
- Verification: MUST be present

## Conventional Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
| Type | When |
|------|------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change (no new feature/fix) |
| `docs` | Documentation only |
| `test` | Adding/fixing tests |
| `chore` | Build/deps/config/tooling |
| `perf` | Performance improvement |
| `style` | Formatting only |

### Message Rules
- Description: imperative, lowercase, no period, ≤50 chars
- Body: wrap at 72 chars, explain what/why
- Footer: `BREAKING CHANGE:`, `Fixes #123`, `Refs #456`

## Scope Selection (Deterministic)

Choose in order:
1. Isolated to domain folder (`src/auth/*`) → `auth`
2. Isolated to UI system → `ui`
3. Isolated to infra/tooling → `tooling`
4. Otherwise → `core` with `DEFAULTED DECISION: scope = core`

## Staging Rules (Deterministic)

**Include** (for current logical change only):
- Modified source files
- Related tests
- Required docs

**Exclude** (unless explicitly required):
- Lockfiles (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`)
- Generated artifacts (`dist/`, `build/`)
- Large snapshots

**Mixed changes**:
- Use patch staging: `git add -p`
- Or split into separate commits

## Verification Ladder (Deterministic)

Run first applicable:

| Condition | Command |
|-----------|---------|
| `pnpm-lock.yaml` + `test` script | `pnpm test` |
| `yarn.lock` + `test` script | `yarn test` |
| `package-lock.json` + `test` script | `npm test` |
| `Makefile` has `test:` | `make test` |
| Python + pytest present | `pytest` |
| None match | `SKIPPED (no standard test command)` |

Record result in changelog entry.

## Workflow

After each logical change:

1. **Update changelog** — create entry with all fields
2. **Evaluate Commit Gate** — commit or log-only?
3. **If committing**:
   - Stage using deterministic rules
   - Run Verification Ladder
   - Commit with conventional message
   - Write hash to changelog
4. **If not committing**:
   - Write `UNCOMMITTED` + proposed commands

## CHANGELOG.md Policy

Update only when:
- User explicitly requests (`update changelog`, `prepare release`)
- Release process executing

Format:
```markdown
## [Unreleased]
### Added
### Changed
### Fixed
### Removed
```

## AGENTS.md Integration

```markdown
## Commit Practices
- Atomic commits after each logical change
- Conventional commits: `type(scope): description`
- Maintain `.changelog/session-YYYY-MM-DD.md`
- Log verification status for each change
- If no git repo, log + output commands
```

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| `git commit -m "changes"` | `fix(auth): handle expired token` |
| Commit everything at once | One commit per logical change |
| Skip changelog | Update changelog each change |
| Mix refactor + feature | Separate commits |
| Commit without verification | Run Verification Ladder |
| Assume git exists | Check with `git rev-parse` |
