---
name: prototype-to-testflight
description: >
  Internal TestFlight of a web prototype on the Mini. Companion to ios-publish.
  Use when: TestFlight, ipa, archive, put this prototype on my phone, /prototype-to-testflight.
---

# prototype-to-testflight

Companion to **ios-publish** (listing / Review). This one is Internal TestFlight of a web prototype.

Load when they say TestFlight, ipa, archive, or “put this prototype on my phone.”

## Locks

- Internal TestFlight only. Do not submit App Review.
- Do not wrap a login-walled Vercel URL. Bundle a local production build (Capacitor / WKWebView) or a native editor.
- Do not put keychain passwords, `.p8` contents, or issuer secrets in this page, memory, or chat.
- Do not force-push `main`. iOS work goes on a branch + PR.
- CloudAgent writes the iOS project. The Mini archives / exports / uploads.
- Never use `pk_vnext` / `ci` / `devbuild` keychains. Dist certs there hang codesign. Use **login** only.
- Mini local-exec: ListMachines UUID, never the label `Homes-Mac-mini`.
- After a ship (or a hard fail), update that product’s Notion page the same turn.
- Skill edits: update this page the same turn.

## Gate before archive (29 Aug 2026 miss)

Do not archive or upload until sim-confirm passed on the Mini **this turn**. `linux-hammer` and a green CloudAgent are not a launch pass.

If the model gained a field (SwiftData / Core Data), prove an **old store** opens. Existing pages must survive. Fail code: `STORE_MIGRATE`. `fatalError` on `ModelContainer` is a crash, not a log.

If they locked a store name, the home-screen display name (`CFBundleDisplayName`) goes in the **same** ship. Listing-only is not the name change.

## Mini (cheap)

- One Grok Bot desktop when shipping: Mini only. Laptop + Mini flaps local-exec.
- Mini does archive, export, upload, sim shot. Not the coding loop.
- One script: `~/bin/testflight-deploy.sh <ios-dir>`. `PATH` starts `/usr/bin`.
- Archive first. The `.xcarchive` is the checkpoint. If Mini drops, resume export. Do not re-archive.
- Export hung >2 min: kill it. Unsearch `pk_vnext`. Manual Dist from **login** + the existing App Store profile. Do not pick the pk_vnext hash.
- If ListMachines shows Mini connected but Shell rejects the Mini UUID: stop. One line to Jamie. Do not retry five times.
- `simctl`: `SIMCTL_CHILD_FOO=1 xcrun simctl launch`. Never `launch --setenv`.
- Do not hang on `simctl help`, `find`, or `spawn launchctl`.
- Shots go under `/Users/homecomputer/Developer/vellum-shots/` then CopyToBox. `/tmp` is not CopyToBox-readable.

## Machines

Xcode lives on the **Mac Mini**, not in every coding session.

This chat does not drive Organizer. Mini does archive / export / upload.

If SwiftPM hangs on Resolve Package Graph, reuse an existing `.xcarchive`. Do not sit on a live `xcodebuild`.

If export hangs on an `Apple Distribution` hash in `pk_vnext`, mint a new Dist cert into **login** and re-export the existing archive.

## After it ships

Do not ship from linux-hammer or “the PR looks right.”
Update the product Notion page (status, bundle ID, SKU, build, internal group, display name). Tell Jamie version, build, TestFlight state.
