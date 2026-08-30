---
name: hammer
description: >
  5–8 glare cases before feature ship, not coverage theatre. Keyboard inset on
  mobile. Use when: ship, hammer, glare, keyboard covers, KB_COVER, /hammer.
---

# hammer

Status: **GATE before feature ship** · 5–8 glare cases, not coverage theatre

## Job

Tests that would have made the bug obvious in the first minute.

## Default glare list

1. Empty / missing input
2. Invalid shape
3. Double submit / retry / back
4. Stale / expired / hold timeout
5. Offline / 5xx
6. Empty list / first-run
7. Last LEARNINGS.md bug on this surface
8. FEATURE.md Done case

Cap 8. Pair with verify-done so the list actually ran.

## Mobile just-works (required when there is a field or sheet)

Keyboard height is not `safe-area-inset-bottom` and not `100vh`.

- Caret and the line being typed stay above the keyboard
- Word-count / composer inset stays above the keyboard, not flush or clipped
- Sheet last section reachable — height from visual viewport
- Composer / FAB uses visualViewport + safe-area, not a guessed 34px
- Dismiss / rotate does not leave stuck padding
- Ruled / dotted: type baseline sits on the rule

Fail code on ui-thrift P6: `KB_COVER`.
White or system background at the left / right of the keyboard is `KB_COVER` too. Paper must fill those gutters.
Text and paper must travel with the keyboard. A snap the moment the keyboard starts moving is a fail.

## Schema / store (required when a model field was added)

Open the app against a store from the previous build. Existing rows must load. A new required field without a default is a launch crash.

Fail code: `STORE_MIGRATE`.

## Name (required when they locked a store name)

Home-screen display name matches the locked listing name this ship. Listing-only is a miss.
