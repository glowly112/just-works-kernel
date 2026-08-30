---
name: grok-bot-efficiency
description: >
  Standing law for long one-agent chats. Short replies, Mini-only iOS ship,
  update matching Notion skill page the same turn. Use when: Grok Bot, Mini,
  long chat, /grok-bot-efficiency.
---

# grok-bot-efficiency

Standing law for long one-agent chats.

## Every turn

- Short replies. No filler status. No tool-call play-by-play.
- Ack once if the work is real, then the result.
- User-memory stays a few pointer lines.
- Repo implement/fix/refactor: CloudAgent. Same agent for follow-ups.
- iOS ship / Mini: **sim-confirm** on the Mini this turn, then **prototype-to-testflight**. `linux-hammer` is not a launch pass. One desktop (Mini). Archive is the checkpoint. Do not live-`xcodebuild` from chat.
- **Skill write or rewrite: update the matching Notion skill page the same turn.**

## Mini (cheap)

- One Grok Bot desktop when shipping: Mini only. Laptop + Mini flaps local-exec.
- If ListMachines shows Mini connected but Shell rejects the Mini UUID: stop. One line. Do not retry five times.
- Do not re-archive after a good `.xcarchive` exists.

## Don’t

- Don’t FORCE_NEW / start a new chat as the default.
- Don’t clone repos onto this computer or the Mac.
- Don’t dump a wiki, hook pack, or style pack.
- Don’t ship TestFlight from a CloudAgent worker or a unit pass alone.
