# Multivibe skills — single home (SOT)

**Editable source of truth (only):** `$MULTIVIBE_ROOT/skills/` (this dir — a
sibling of `law/`, not inside it). Live homes **shim** here;
they are never a second live copy.

| Path | Role |
|------|------|
| `$MULTIVIBE_ROOT/skills/` | **Editable SOT** — edit skills here |
| `~/.grok/skills` | Symlink → `$MULTIVIBE_ROOT/skills` (stock Grok TUI) |
| `~/.config/opencode/skills` | Symlink → `$MULTIVIBE_ROOT/skills` (stock OpenCode TUI) |
| `~/.openvibe/skills` | Symlink → `$MULTIVIBE_ROOT/skills` (via `mv-law-link`) |
| `~/.grokvibe/skills` | Symlink → `$MULTIVIBE_ROOT/skills` (hop overlay) |

## Law

1. **One place.** Product skills live in this tree. Do not maintain a second content tree under `~/.claude/skills`, `~/.agents/skills`, or `~/.config/opencode/skills`.
2. **Shims only:** live homes point here. If a link is broken, run `tools/mv-law-link --apply` (live → repo).
3. **Load:** Read `$OPENVIBE_HOME/skills/<name>/SKILL.md` (or `$GROKVIBE_HOME/skills/<name>/SKILL.md`), or Skill tool once the session indexes this path.
4. **Not law:** this is a sibling of `law/` — product skills are not law essays; do not move them under `law/`.
5. **Desk hops:** per-desk process notes stay in `$GROKVIBE_HOME/docs/` (e.g. `SPLIT_DESK_THIS_DESK.md`) — do not copy them here.
6. **Never** `~/.claude-grok` as skill home.

## Layout

```
$MULTIVIBE_ROOT/skills/
  ui-team/SKILL.md
  ui-app/SKILL.md
  …
  <name>/SKILL.md
```

Each skill: folder name = frontmatter `name`, file exactly `SKILL.md`.

## UI pipeline entry

Every UI ask → start at **`ui-thrift`** (mandatory) under this directory. Use
**`ui-team`** only for an explicit full-team escalation.
