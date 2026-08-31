---
name: ui-thrift
description: >
  HARD DEFAULT for every UI ask. Loading = LOAD L0–L6 then PROCESS P0–P6 before
  any CSS. Leaves (ui-craft / ui-bp / ui-design / ui-app / ui-team) are
  escalate-only. Use when: UI, UX, design, layout, CSS, HTML, landing, dashboard,
  desk, board, prototype, app shell, redesign, polish, visual screen, /ui-thrift.
---

# ui-thrift — LOAD + PROCESS

Status: **HARD DEFAULT** for every UI ask

This page **replaces** the leaf thrift stack as hard default. `ui-craft` / `ui-bp` / `ui-design` / `ui-app` / `ui-team` are not the load path. Those stay escalate-only after two thrift fails or an explicit user ask.

**AI skill.** Loading ≠ naming. Loading = LOAD L0–L6 then PROCESS P0–P6 before any CSS. If Home has to say “did you load the skill?”, that is `THRIFT_NO_LOAD`.

Owner: Home (Designer) · agents auto-detect UI — no `/ui-thrift` required

## When this fires

Any ask that touches: UI · UX · design · layout · CSS · HTML · landing · dashboard · desk · board · prototype · app shell · redesign · “look like X” · Mobbin · “not AI slop” · polish · visual screen.

**Do not wait for the user to invoke the skill.** Detect → LOAD.

## Architecture (do not mega-merge)

| Piece | Role |
| --- | --- |
| **ui-thrift** | Orchestrator — LOAD + PROCESS |
| **anti-slop** | Always — BAN list before CSS |
| **mobbin-research** | P2 when visual / named look / desk / board |
| **uk-copy** | en-GB strings + R1–R6 self-review before ship |
| Heavy leaves (`ui-team`, `@ui`) | Escalate only after 2 thrift fails or user asks |

## LOAD (what “load” means)

**Loading ≠ saying the skill name.** First tool calls on a UI ask = **Read** tools, not Write CSS.

| Step | Action | Done when |
| --- | --- | --- |
| **L0** | Classify UI → mode `ui-thrift` | No freehand |
| **L1** | Read `ui-thrift/SKILL.md` | File opened this turn |
| **L2** | Read `references/PROCESS.md` | File opened this turn |
| **L3** | Read `references/anti-slop.md` | BAN list in working memory |
| **L4** | Visual? Read `mobbin-research` · run P2 | Keepers or REFS_SKIP reason |
| **L5** | Write stamp `thrift-process.md` / DESIGN.md **before first CSS edit** | File on disk with P0–P4 |
| **L6** | Implement → self-check | `self_check: pass` |

### Proof of load (required in RESULT — never user chat)

`load:` yaml is **not** a load. Load = this turn **Read** L1–L3 files (and L4 when P2 applies). Stamping `thrift-process.md` / DESIGN.md without those Reads is `THRIFT_NO_LOAD`. Do not paste this block into the human reply.

```yaml
load:
  L1_skill: read
  L2_process: read
  L3_anti_slop: read
  L4_mobbin: read|skipped:<reason>
  L5_stamp: <absolute-path>
  L6_self_check: pass|fail:<codes>
```

Missing Reads this turn → treat as unloaded → `THRIFT_SKIP` / `THRIFT_NO_LOAD`. A yaml stamp with no matching Read calls is the same miss.

## PROCESS (craft after load)

**Do not write layout/CSS until P0–P4 are stamped.**

```text
PROCESS
P0 ui-thrift: loaded
P1 anti-slop: loaded · BAN: <3–8 bullets>
P2 refs: mobbin:<n>|user:<n>|n/a-typo · keepers: <urls or "n/a">
P3 ui-lock: <path> · CRAFT: anti-slop[ · mobbin]
P4 memo: SUBJECT/JOB/SIGN/SKELETON/ANTI/REFUSE
P5 implement: only after P0–P4
P6 self-check: pass|fail — if fail, delta before claiming ship
```

### P2 default

Desks, dashboards, boards, landings, app shells, “like Fey/…”, redesigns, prototypes → **Mobbin required**. Skip only for typo / copy-only / no pixels.

### P6 self-check (fail-closed)

If any is true (and not an explicit Mobbin steal in DESIGN.md Elements) → **FAIL**, fix before ship:

1. Three+ equal bordered cards as main composition
2. Unicode/emoji glyphs as nav/icons
3. `backdrop-filter` / glass blur chrome
4. Coverage/status **pill farms**
5. Same radius+padding on every block (card wall)
6. Inter / Roboto / IBM Plex as primary when a named product face was in scope
7. Invented desk chrome with no keeper URL when P2 applied

## FAIL codes

| Code | Meaning |
| --- | --- |
| `THRIFT_SKIP` | No LOAD / no Reads / no lock / no stamp |
| `THRIFT_NO_LOAD` | Named skill or shipped UI without LOAD sequence |
| `THRIFT_NO_ANTISLOP` | No anti-slop read / no BAN stamp |
| `THRIFT_NO_MEMO` | No SIGN/SKELETON/ANTI memo |
| `REFS_SKIP` | Visual product without Mobbin/user refs |
| `REFS_UNREAD` | Listed screens, designed from titles only |
| `SLOP_SHIP` | P6 fail shipped / user had to flag median slop |

## Anti-patterns (not a load)

- “Following ui-thrift…” in prose with no Read tool calls
- Printing `load:` / `just_works:` / `P0 ui-thrift: loaded` in chat instead of opening files
- Opening only DESIGN.md and coding
- Stamping PROCESS after CSS already shipped
- Skipping anti-slop because “I know the bans”
- User reminder as the load trigger

## After pixels (just-works 3b)

**ui-marks** — load when icons, faces, or in-product motion are asked. Not a heavy leaf. Not `ship-motion` (git).

- No infinite pulse as “live”
- Tape / log overflow = mask or `from-bg` gradient, not `backdrop-filter` (P6 glass still fails)
