---
name: sim-confirm
description: >
  Confirm an iOS app on Simulator via XcodeBuildMCP. Use when the user
  says confirm on the simulator, prove it works from MCP, take sim
  video or screenshots, exercise glance/scroll/taps, xcodebuildmcp UI
  automation, snapshot_ui, record_sim_video, or /sim-confirm. A green
  build is not proof.
user-invocable: true
metadata:
  short-description: "Prove iOS on Simulator via XcodeBuildMCP"
---

# sim-confirm

**Core rule:** Build success is not confirmation. Pixels + a user-shaped interaction + a looked-at screenshot after each step are.

Docs: https://www.xcodebuildmcp.com/docs · https://www.xcodebuildmcp.com/docs/troubleshooting

Prefer XcodeBuildMCP tools over raw `xcodebuild` / `simctl` when the MCP is connected.

## Intent first

Write 3–8 observable checks from the lock (ui-lock, Figma, user ask). Example: glance fruit visible; titled packs stay separate; no chip-bar overlay; stamp tap jumps.

When the store schema changed, one check is: app opens on an **old** data store (pages from the previous build).
When a store name was locked, one check is the home-screen / springboard label.
When the editor has a keyboard, one check is: paper (not white) beside the keys, and text travels with the keyboard (no snap).

Do not invent a pass from logs.

## Loop (required)

1. `xcodebuild__session_show_defaults` — never assume. Paths are **on the MCP host**, not this laptop.
2. If empty/wrong: `discover_projs` on the host tree → `session_set_defaults` (`projectPath` xor `workspacePath`, `scheme`, `simulatorName` or `simulatorId`, `bundleId`).
3. `list_sims` → boot/open the intended sim (`open_sim` if you need the window).
4. `build_run_sim`. Record bundle id + pid. A 10s “success” on a stale install is still not a visual pass.
5. Wait for first paint, then `screenshot` (`returnFormat: path`).
6. **Read the image.** MCP host paths (`/var/folders/…`, `/tmp/…`) are not local — `scp` then `Read` the file. Saying “screenshot captured” without looking is a fail.
7. `snapshot_ui`. If `elementRef` targets exist, `tap` / `swipe` / `wait_for_ui` those refs (refresh after navigation, scroll, sheets).
8. For motion (scroll, jump, failed collapse): `record_sim_video` start → act → stop → copy the MP4 locally → sample frames and look.
9. Act like a user against the intent list. After **every** gesture: new screenshot, read it, tick or fail that check.
10. PASS only if every intent check is evidenced by a looked-at frame. FAIL with the frame that breaks it.

## Empty tree fallback

SwiftUI often yields `snapshot_ui` with 0 targets / `describe-ui` application node only. That is **not** a pass and **not** a reason to stop.

Use, in order:

- MCP `gesture` presets (`scroll-up`, `scroll-down`, …). `delta` max 200.
- Bundled AXe on the MCP host (`xcodebuildmcp doctor` / `…/bundled/axe`): `axe tap -x -y --udid <UDID>` in **points** (iPhone 17 Pro = 402×874).
- `xcrun simctl io <UDID> screenshot /tmp/….png` when you need a stable path.

Do not claim semantic tap/swipe worked if you only used coordinates.

## MCP vs CLI

This Grok session may expose screenshot / snapshot_ui / record_sim_video / build_run_sim but hide `tap`/`swipe`/`gesture`. Then SSH/CLI on the **same host as the MCP**:

```text
xcodebuildmcp ui-automation gesture --simulator-id <UDID> --preset scroll-up --duration 0.55 --delta 200
xcodebuildmcp ui-automation swipe --within-element-ref e7 --direction up --distance 0.7
```

If UI automation is missing entirely: enable workflows (`simulator,ui-automation`) — https://www.xcodebuildmcp.com/docs/troubleshooting

## Illegal

- PASS from compile / install / pid alone
- PASS from `snapshot_ui` with 0 targets
- Screenshot captured but not opened
- Laptop paths in `session_set_defaults` when MCP runs on another Mac
- Stopping at glance — exercise the behaviour the user named (scroll, jump, tabs)
- Treating TestFlight / phone as a substitute for this sim loop (phone is extra)
- PASS from `linux-hammer` or a CloudAgent worker (it has no Simulator)
- Shipping TestFlight before this loop

## Evidence

Keep: lock checks, sim UDID, version, before/after shots, video path, `verify: <cmd> → exit N`.
