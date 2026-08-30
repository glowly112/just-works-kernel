---
name: edge-team
description: >
  Edge discovery multi-agent pack for paper lanes (H1, boards, oracle).
  Fan-out board + autopsy + shadow counterfactual + judge merge. Driver MUST
  auto-load this skill when the ask is multi-cause edge diagnosis (why red/green,
  wipe, compare days, freeze candidate) — user need not say /edge-team. Also when
  user says edge team, /edge-team, long-thin shadow, bit-by-bit edge. Never
  changes H1 select filter unless user explicitly freezes and money path runs.
user-invocable: true
---

# edge-team — Vibe pack for edge discovery

product=`vibe`. Home `/Users/jamie.matheson/.openvibe` only.

**Success:** ranked drivers + counterfactual + GO/NO-GO freeze — from ledger evidence.  
**Not success:** three essays; silent dry-loop edit; Driver inventing P&L.

Inspired by Grok Heavy / team mode: **parallel hypotheses → one merge**. Not 8 permanent UX agents.

---

## 0) Modes + auto-fire (Driver owns the call)

| Mode | Auto-fire when (any) | Explicit | Depth |
|------|----------------------|----------|--------|
| **Full edge-team** | why/bad/terrible/wiped/compare days/what's driving/root cause/diagnose + H1/edge/oracle/paper; freeze/should we cut/filter | `/edge-team`, "edge team", "full" | Board → Autopsy → Shadow → Judge |
| **Board only** | how is H1 / check H1 / status / loops up (no why) | `board only` | Board seat only |
| **Shadow only** | what if / counterfactual / long-thin awareness only | `shadow only` | Shadow seat |
| **Freeze path** | after Judge FREEZE_CANDIDATE **and** user says yes implement | — | Money path if select/odds code |

**Do not auto full-team:** single mtime check, "regenerate board", pure scp, line ROI read with no diagnosis ask.

**Announce:** first tool-bearing reply starts with `mode=edge-team {full|board|shadow}`.

**Default date scope:** today oracle card + prior 2 settled days unless user sets dates.

---

## 1) Hard locks (fail-closed)

1. **Paper / FILL_UNPROVEN** until user says otherwise.  
2. **No place_h1 select edit** in this pack — no dry-loop filter changes. Shadows only.  
3. **Driver does no money/odds arithmetic** — seats compute from existing fields / board JSON.  
4. Prefer existing artifacts:  
   - `edge_day_board/YYYY-MM-DD/` including `long_thin_awareness_shadow.json`, `board.md`  
   - Oracle relay (project-specific): `oracle-relay` → `~/bbb/data/place_h1_runs/`  
5. **`no-shadow-analysis` skill must be loaded and respected** — never re-implement settlement/P&L logic. Use board helpers / dry_bets fields.  
6. UK English. Brand `product=vibe`.

---

## 2) Pipeline (Driver orchestrates)

Run seats **in parallel where independent**, then merge.

### Seat A — Board (read-only tally)

**Route:** Driver tools **or** `ov-dispatch` consult — prefer existing board artifacts before regenerating.

**Do:**
- loops alive? latest_summary mtime both lanes
- settled paper by lane for dates; open/void counts
- optional: regenerate board

**Emit:**
```
BOARD:
- dates:
- near: n_set / hit / paper £ / ROI / open
- morn: n_set / hit / paper £ / ROI / open
- combined £
- loops: up|down
- board_paths:
```

### Seat B — Autopsy (multi-hypothesis)

**Route:** `ov-dispatch review` or `ov-dispatch plan` — **read-only**.  
Use `ov-dispatch idea` for lightweight hypothesis generation.

**Brief must include** board numbers from Seat A (paste; don't re-invent).

**Hypotheses to score against ledger (pick top 3 drivers):**

1. Hit-rate collapse vs prior days  
2. long_thin (odds≥4.5 & thin) concentration  
3. Mix shift (mean odds, % stake ≥4.5)  
4. size_ok vs thin divergence  
5. Meeting/card concentration  
6. Incomplete card / open bets  
7. Code/filter change (only if mtimes/wrappers differ — verify)

**Emit:**
```
AUTOPSY:
- primary_driver:
- secondary:
- not_causes: (e.g. formula break if replay PASS)
- evidence: slice table
- confidence: high|med|low
```

### Seat C — Shadow counterfactual

**Route:** Driver reads existing `long_thin_awareness_shadow.json` **or** uses `ov-dispatch research` with shadow-only brief.

**Default shadow:** long_thin vs ex_long_thin vs baseline. Honest stake from board if present.

**Must respect `no-shadow-analysis`** — do not hand-roll P&L.

**Emit:**
```
SHADOW:
- rule: long_thin := odds≥4.5 AND not size_covers
- per_day: baseline | long_thin | ex_long_thin
- tradeoff_one_liner:
- loop_unchanged: true
```

### Seat D — Judge merge

**Route:** `ov-dispatch judge` (consult-only) **or** Driver merge if judge unavailable — must say so.

**Input:** BOARD + AUTOPSY + SHADOW.

**Emit GO/NO-GO:**

| Option | When |
|--------|------|
| **OBSERVE** | No freeze; keep shadows; sample thin |
| **BOARD_ONLY** | Improve reporting only (already have long-thin) |
| **FREEZE_CANDIDATE** | Propose exact rule text — **do not implement** until user yes + money path |
| **INVESTIGATE** | Missing data / replay / books |

**Never** auto-implement freeze from edge-team alone.

---

## 3) Parallelism map

```
        ┌─ A Board ──────────────┐
User ──►├─ B Autopsy (needs A) ──┼─► D Judge ─► user decide
        └─ C Shadow (∥ A ok) ────┘
```

- A ∥ C first wave  
- B after A numbers exist (or same wave if dates known and autopsy reads files itself)  
- D last  

Max **3** specialist seats + Driver. No fourth "also rewrite memo" agent.

---

## 4) User phrases → mode

| User says | Mode |
|-----------|------|
| `/edge-team` · edge team · full edge | Full |
| how is H1 / check oracle H1 | Board only (unless "why") |
| why so bad/good · what killed the day | Full (or Board+Autopsy) |
| long-thin what-if · counterfactual | Shadow only |
| freeze long-thin · change the bot | Full → FREEZE_CANDIDATE → ask → money path |

---

## 5) Final Driver RESULT (required)

```
RESULT:
- verdict: PASS|PARTIAL|FAIL
- mode: full|board|shadow|freeze-candidate
- files: board paths / none
- verify: board/classify commands → exit N
- evidence: combined £ + primary_driver + shadow one-liner
- residual risk: …
- next: OBSERVE|BOARD_ONLY|FREEZE_CANDIDATE|INVESTIGATE + step
- edge_team: board=… autopsy=… shadow=… judge=…
```

---

## 6) Test smoke (new session)

1. Driver loads edge-team or user says **edge team today**  
2. Expect fan-out, not single monologue  
3. Expect **no** place_h1 select edit  
4. Expect RESULT with `edge_team:` line

Oracle relay host (project-specific): `oracle-relay`. Paths under `/home/ubuntu/bbb/` — **not core Vibe law**.
