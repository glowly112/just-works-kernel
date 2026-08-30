---
name: verify-before-hedging
description: Use when about to make any factual claim about the codebase — both (a) hedged claims ("probably", "might", "could be", "I think", "likely", "I suspect", "should be") about whether something exists, is configured, or behaves a certain way, AND (b) confident claims that motivate an expensive action (retrain, refactor, deploy, multi-file edit, multi-hour work). Confident-but-unverified load-bearing claims are as bad as hedges — they steer the user toward costly actions on shaky ground. Triggers before any factual claim, hedged or not, when verification is one grep/read away.
---

# Verify Before Hedging

## Overview

Hedging language ("probably", "might", "I think") for facts that can be checked in seconds is laziness disguised as humility. The user can disprove "X probably exists at path Y" by typing `ls path/Y` — which means the hedge actively wastes their time relative to "X exists at Y" or "X doesn't exist; checked".

**Core rule:** Every caveat about repo state must be either (a) checked, in which case state the fact, or (b) flagged as unchecked, in which case say "I haven't checked but…".

## When to Use

You are about to write any of these phrases about repo state, config, or code behavior:

- "probably"
- "might"
- "should be"
- "I think"
- "likely"
- "I suspect"
- "presumably"
- "if I recall"
- "as far as I know"

Each one is a STOP signal. The next thing you do is verify, not write the hedge.

## The Rule

Three things can come out of your mouth/tool calls about a fact:

1. **Verified positive**: "X exists at Y" (after reading/grepping/listing).
2. **Verified negative**: "X does not exist at Y; I checked" (after the same).
3. **Explicit non-claim**: "I haven't checked Y, so I don't know if X is there."

There is no fourth option. "Probably X exists at Y" is not allowed.

## Red Flags — STOP

| Phrase you're about to type | What to do instead |
|------------------------|--------------------|
| "Probably defined in src/foo.py" | `grep -rn 'def foo' src/` then state the fact |
| "Might be a permission issue" | Check `ls -la` / read the error / run the command |
| "Should be configured already" | `cat .env` (or config file), then state what's there |
| "I think this function returns X" | Read the function, then state what it returns |
| "Likely the same pattern as elsewhere" | Find one example, cite file:line, state the pattern |
| "Presumably the test asserts Y" | Read the test, then state what it asserts |

**All of these mean: do the 5-second check, then state the verified fact.**

## Load-Bearing Confident Claims — Same Rule

Hedging isn't the only failure mode. A *confident* claim stated as fact — when it motivates an expensive action — is just as bad. The user can't tell which of your confident facts are verified and which are guesses.

A claim is **load-bearing** if acting on it costs >30 minutes, locks in a direction, or touches shared state:
- Triggering a retrain or sweep ("foldpilot trained against corrupted data → retrain")
- Refactoring multiple files based on a stated invariant ("this function is only called from X")
- Skipping work because "Y is already done" / "Z is already configured"
- Deploying based on "this dependency is already at version N"
- Choosing one architecture over another based on "Z behaves like W"

Before stating any load-bearing claim, verify it. Same three outcomes apply:
1. **Verified positive** — state with the file:line / command output that proved it.
2. **Verified negative** — state with the check that ruled it out.
3. **Explicit non-claim** — "I haven't verified this; would need to check before acting".

The cost-of-being-wrong sets the bar. A hedged claim about a comment style? Low bar. A confident claim about training data that motivates 4 hours of GPU time? Verify three different ways before stating.

### Red Flags — load-bearing version

| Pattern | Reality |
|---------|---------|
| "X was trained on Y data, so we should retrain" | Verify what training actually read. Check mtimes / spot-check values / read the training script's data loader. |
| "Z is already configured, skip that step" | Read the config. Don't trust prior context — re-verify on the spot. |
| "This function is only called from A and B" | `grep -rn 'funcName('` first. Callers add up faster than you remember. |
| "The fix landed in commit C, we're good" | `git show C` for the actual diff. "Landed" ≠ "shipped" ≠ "in the deployed branch". |
| "Tests cover this case already" | Read the test. "Cover" is a self-graded word. |
| "Same as last time" | Check what "last time" actually was. Sessions drift; assumptions stale faster than memory. |

The failure mode: state confidently → user trusts it → you both walk a path that turns out to rest on a wrong premise → walking back costs more than verifying would have.

### The Cheap Test

Before stating a confident claim that motivates an expensive action, ask yourself: **"If I'm wrong about this, how long does it take to recover?"** If the answer is more than the time to verify, verify first.

## When Hedging IS Appropriate

Hedging is fine for:
- **Predictions about runtime behavior you can't simulate** ("this might fail under high concurrency") — flag the prediction as such.
- **External-system behavior you can't inspect** ("the upstream API probably returns null on 404 but I'd need to test it").
- **Future state** ("if you add another writer, this will likely race").

The rule is: hedge when you genuinely cannot check; never when you can check in under a minute.

## Why This Matters

Hedged facts are noise the user has to filter. Worse, they camouflage real uncertainty: when you say "probably X" for things you should have checked, the user can no longer tell when "probably" means "I genuinely don't know". You burn your own credibility.

**Verified facts > flagged uncertainty > hedged guesses.**

## Real-World Impact

**Hedged-claim incident** (multiple sessions, 2026): user feedback "stop padding answers with 'probably' and 'might' for things you can grep in five seconds. Either check it or say you didn't check it."

**Load-bearing-claim incident** (bbb, 2026-05-23): assistant stated confidently that "foldpilot's 24-month training window includes ~20 poisoned days" based on a misread of which file the training script actually loads. That claim motivated a multi-hour retrain discussion. Verification gate fired at the cost gate (not before the claim), saving the retrain — but only after user pushback. Correct flow would have been: verify which file training reads + spot-check that file's feature values BEFORE stating the poisoning claim, not after the gate.

The fix is mechanical: feel a factual claim coming on (hedged or confident), classify the stakes, verify proportional to those stakes, then write.

Related: [[feedback-verify-before-hedging]]
