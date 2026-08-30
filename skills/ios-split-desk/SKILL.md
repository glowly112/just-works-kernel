---
name: ios-split-desk
description: >
  Split-desk iOS protocol: build a real Figma component library, compose
  screens from instances, then implement SwiftUI on the compile desk in
  one visual shot. Auto-load when the user wants an iOS/SwiftUI/iPhone
  app, a Figma design lock, split desk, or says /ios-split-desk. Not for
  web-only UI (use ui-thrift). Figma-library-first.
user-invocable: true
---

# ios-split-desk

**SOT:** `$OPENVIBE_HOME/docs/SPLIT_DESK_IOS.md` — read it before acting.  
**This desk (if present):** `$GROKVIBE_HOME/docs/SPLIT_DESK_THIS_DESK.md` — compile hop only.  
**Library:** load `figma-generate-library` + `figma-use` before creating tokens or components.

## When

User is making (or continuing) an **iOS app**, or says lock in Figma / implement native / split desk.

## Gate

```text
Figma tokens + components (auto-layout, bound variables)
  → compose every named 402×874 screen from instances
  → lock (FIGMA url + library + screens/<name>.png + native-map.md)
  → handoff pack (SVG icons + orb PNG + place table)
  → one-shot Swift on the compile desk
```

Do not skip ahead unless the user says so.  
Do not start Swift while the library is missing or any named screen is `PENDING`.  
Do not treat `generate_figma_design` captures as the library (`CAPTURE_AS_LIBRARY`).

## Do

1. **Library** — Figma file first. Tokens, then components + variants. `ui-lock.md` + `native-map.md` (component → Swift).
2. **Screens** — compose from instances. No proto screenshot lock.
3. **Lock** — `FIGMA:` + component ids + a node id and `screens/<name>.png` for every named screen.
4. **Pack** — export icons / orbs / place table once. After lock, Figma library is look + structure SOT.
5. **Implement** — one visual hop. Swift from `native-map.md` + pack. Match Figma components, not an HTML proto.

## Don't

- Capture proto HTML into Figma and call that a library
- Locofy / dump a flattened capture tree as SwiftUI
- `WKWebView` a proto
- Paint island / home indicator
- Skip the lock (unless the user said skip)
- Start Swift on Cover-only or capture-only Figma
- Treat proto `screens/*.png` as a Figma lock
- One hop per layer
- Hop on a red recapture / stale sim PNG
- Review in an empty worktree

## Worked example

Citrus: `~/.openvibe/prototypes/health-citrus`  
Figma: https://www.figma.com/design/WoQ8f5SPI0DnarTEGEb1eS  
Library pages (`StampTile`, `CitrusWedge`, …) are the SOT. Legacy capture frames on Screens are archive if they are not instance-composed.
