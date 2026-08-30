---
name: skill-sync
description: >
  Sync skills across local filesystem, Notion Multivibe Wiki, and GitHub repo.
  Use when creating, updating, or syncing agent skills.
---

# skill-sync

Status: **SKILL SYNCHRONIZATION**

Three copies. Same turn. Fail if any is missing.

## When
A skill is created or rewritten. User says update skills / Notion / GitHub. Also loaded from Grok Bot efficiency on every skill write.

## Where
- **Local**: `/Users/jamie.matheson/src/multivibe-gui/skills/<slug>/SKILL.md` (and symlinked to `~/.cursor/skills-cursor/<slug>`)
- **Notion**: Multivibe Wiki, page titled `Skill — <slug>`. Parent: Multivibe Wiki.
- **GitHub**: `glowly112/works` at `.grok/skills/<slug>/SKILL.md`.

## Loop
1. Write or rewrite the local skill in `multivibe-gui/skills/<slug>/SKILL.md`.
2. Fetch or update the Notion page by title `Skill — <slug>`.
3. Update GitHub repo if applicable.
4. Run cursor-sync-setup to refresh `~/.cursor/skills-cursor/`.
