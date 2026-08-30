---
name: verify-done
description: >
  No completion claims without a command run this turn. Use when about to say
  it works / tests pass / bug fixed / ready / LGTM / /verify-done / before a PR.
---

# verify-done

Status: **GATE before any done/fixed/ship claim**

## Job

No completion claims without a command run this turn.

## Gate

1. Name the proving command
2. Run it now (not an old log)
3. Quote exit code or fail count
4. If you cannot run it, say what the user must click — do not invent the result

Bug fix = re-check the original symptom. New regression test = prove it would have failed without the fix when you can.

## Refuse

Should pass now · looks correct · last session's output

## Mobile extra

If the surface has a text field or sheet, done means a phone-width check **with the keyboard open**. Desktop DevTools alone does not count. A green `xcodebuild` or `linux-hammer` is not a launch pass. Do not ship Internal TestFlight without Mini sim-confirm this turn.
