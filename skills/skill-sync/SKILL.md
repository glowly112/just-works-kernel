---
name: skill-sync
description: >
  Sync skills and rules across just-works-kernel (master SOT), Cursor, Grok, Multivibe, Notion, and GitHub.
  Use when creating, updating, or syncing agent skills.
---

# skill-sync

Status: **SKILL SYNCHRONIZATION**

Single Source of Truth (SOT) in `just-works-kernel`. Automated sync and zero-drift verification across all local and remote targets.

## Canonical SOT
- **Master Repository**: `/Users/jamie.matheson/src/just-works-kernel`
  - Skills: `skills/<slug>/SKILL.md` (67 domain skills)
  - Rules: `rules/<slug>.mdc` (5 core discipline rules)
  - GitHub Remote: `glowly112/just-works-kernel`

## Targets
1. **Cursor Environment**:
   - Skills: `~/.cursor/skills-cursor/<slug>` (symlinked to SOT)
   - Rules: `~/.cursor/rules/<slug>.mdc` (symlinked to SOT)
2. **Grok Skills**:
   - `~/.grok/skills/<slug>` (symlinked to SOT)
3. **Multivibe GUI**:
   - Skills: `/Users/jamie.matheson/src/multivibe-gui/skills/<slug>` (symlinked to SOT)
   - Rules: `/Users/jamie.matheson/src/multivibe-gui/docs/cursor-setup/rules/<slug>.mdc` (symlinked to SOT)
4. **Notion**: Multivibe Wiki, page titled `Skill — <slug>`. Parent: Multivibe Wiki.
5. **GitHub**: `glowly112/just-works-kernel` (master repo) and `glowly112/works` / `glowly112/multivibe-gui`.

## Automated Loop
1. **Edit/Create**: Author or update the skill in `just-works-kernel/skills/<slug>/SKILL.md`.
2. **Sync**: Run `node scripts/sync.mjs` in `just-works-kernel`.
   - Symlinks skills and rules into all targets.
   - Validates every target points to canonical SOT.
   - Verifies git status (clean & pushed).
3. **Drift Check**: Run `node scripts/drift-check.mjs`.
   - Compares skill files across all destinations.
   - Verifies zero hash mismatches, zero missing skills, zero orphans.
   - Exits 0 if clean.
4. **Remote Updates**:
   - Fetch or update Notion page by title `Skill — <slug>`.
   - Commit and push changes to `glowly112/just-works-kernel`.
