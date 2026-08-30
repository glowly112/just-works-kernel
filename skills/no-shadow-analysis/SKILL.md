---
name: no-shadow-analysis
description: Use when about to load, parse, or aggregate data directly (pd.read_csv, sqlite3, requests.get, JSONL line-parsing, awk/jq/grep over logs, hand-rolled DB queries, /tmp/check_*.py or scripts/verify_*.py) to answer ANY analysis question — settlement, P&L, ROI, sweeps, hypothesis tests, hook metrics, log summaries, audit checks, historical results, "how many times did X happen". Triggers whenever you reach for a parallel data path before checking whether an existing helper (in the repo, ~/.claude/hooks/helpers/, scripts/, or production code) already does the aggregation.
---

# No Shadow Analysis

## Overview

A **shadow analysis** is any path that **re-implements** logic the production code already implements. It silently drops filters, hold-outs, edge cases, deduplication, timezone handling, settlement rules — and answers a different question than the user asked.

**The failure mode is logic duplication, not "didn't call the function".** Reading a production-generated CSV (one that already has `profit_gbp` / `roi` / `settled_status` columns populated by the canonical function) and summing those columns is FINE — you're consuming production output, not re-deriving it. Hand-rolling the dead-heat rule, void-runner adjustment, or timezone cutoff in `/tmp/check_*.py` is NOT fine — that's shadow analysis.

**Core rule:** Never re-implement settlement / ROI / P&L / aggregation logic that already exists in the codebase. Use it via (a) its outputs if pre-computed artifacts exist, or (b) its canonical entry points if you need a fresh run.

## When to Use

You are about to:
- Write `pd.read_csv(...)` to load results the production pipeline already loads
- Call `requests.get(api)` to fetch races/markets/odds the production fetcher already handles
- Open a sqlite DB directly to "just check" what got settled
- Create `/tmp/check_results.py` or `scripts/verify_*.py` that recomputes ROI/P&L
- Inline a numpy aggregation to "validate" what a settlement function already computes
- Parse a JSONL log line-by-line in a Python one-liner to count events ("how many blocks", "how many requests", "what was the top error")
- `awk` / `jq` / `grep -c` over a log file to compute frequencies
- Hand-roll a sqlite query against the harness state DB to "see what's in it"

All of these are shadow paths. **Especially the log/metrics case** — `~/.claude/hooks/helpers/metrics_summary.sh` and similar wrappers exist for exactly the questions you're trying to answer. Check there before parsing JSONL by hand.

## The Three-Tier Rule

Pick the highest tier your question allows:

**Tier 1 — Use existing production artifact** (preferred when it covers the question):
- A pre-computed CSV/parquet with the columns you need (`profit_gbp`, `roi`, `settled_status`) that was produced by the canonical pipeline.
- Reading and summing/filtering this is fine — you're trusting the production logic that wrote it.

**Tier 2 — Call the canonical function with custom inputs** (when no artifact exists or you need different parameters):
- `from core.settle import settle_selections` → call with your inputs.
- `from analysis.sweep import run_sweep` → invoke with your grid.
- This is the ONLY acceptable way to get "fresh" settlement numbers with non-standard parameters (e.g., custom commission, different stake size, different date range).

**Tier 3 — Hand-roll the logic from raw data** (FORBIDDEN):
- Loading raw `selections.parquet` + `outcomes.parquet` and writing your own win/loss accounting.
- Implementing dead-heat / void / timezone rules in a `/tmp/check_*.py`.
- Calling the upstream API directly and re-implementing the parsing/normalization.

**Tier 3 is what we mean by "shadow analysis".** The original BBB May 2026 incident was tier 3: hand-rolled API client + re-implemented settlement = 11% disagreement with production.

**If you need tier 2 but the canonical function can't be called from where you are:** STOP. Surface the blocker to the user. Do not drop to tier 3.

## Red Flags — STOP

| Thought | Reality |
|--------|---------|
| "It's just a quick sanity check" | Quick checks that disagree with production force a debug session to find which is wrong. Use production. |
| "The function takes too many params, I'll inline the math" | The params you skipped are the filters/edge cases that make the answer correct. |
| "I just want to see the raw numbers" | Then call the production loader, dump its output, and read raw numbers from there. |
| "It's a one-off" | One-off shadow code becomes the answer the user trusts. Then prod diverges. |
| "Production path is slow / has too many deps" | Then say so and ask. Don't silently substitute. |
| "I'll caveat that it's an approximation" | Approximation in numbers is a fact-shaped lie. The user can't tell which digits to trust. |

**All of these mean: stop, call the canonical function, or surface the blocker.**

## The Pattern

```
TIER 1 OK — use existing production output:
  df = pd.read_csv('outputs/.../detail.csv')   # detail.csv was produced by settle.py
  total_pnl = df['profit_gbp'].sum()            # summing a production-computed column
  → safe; numbers match production by construction

TIER 2 OK — call canonical function for fresh inputs:
  from core.settle import settle_selections
  result = settle_selections(selections, outcomes, bf_commission_rate=0.05)
  → safe; full production logic with your custom params

TIER 3 FORBIDDEN — hand-roll the logic:
  df = pd.read_parquet('raw/selections.parquet')
  df['won'] = df['finish_pos'] == 1                # re-implementing winner rule
  df['profit'] = df['won'] * df['stake'] * (df['odds'] - 1) * 0.98   # re-implementing commission, no dead-heat / void
  → wrong by construction; silently drops dead-heats, voids, timezone cutoffs
```

## Real-World Impact

**BBB May 2026**: assistant wrote `/tmp/check_results.py` using a hand-rolled racing API client to "verify" a settlement question. Answer disagreed with production by 11% because the script skipped the dead-heat rule, the void-runner adjustment, and the timezone-aware cutoff. User spent an hour reconciling two numbers before realizing the shadow path was wrong by construction.

## When You're Genuinely Stuck

If the canonical function truly can't be invoked from your context (wrong env, missing deps, requires a service you don't have):

1. **STOP.** Do not improvise.
2. Tell the user explicitly: "production function X exists but I can't call it from here because Y. Options: (a) run it via the proper entry point, (b) extract the pure logic into a helper, (c) accept that I can't answer this from this context."
3. Wait for the user's call.

**Never** silently substitute. The cost of asking is one message. The cost of a wrong number that looks right is the user's trust and an hour of reconciliation.

Related: [[feedback-no-shadow-analysis]]
