---
name: multiplayer-p2p
description: >
  WebRTC data-channel mesh. Co-op / casual only, cap ~8 peers. Use when:
  multiplayer, WebRTC, P2P, co-op, /multiplayer-p2p.
---

# multiplayer-p2p

Status: **PLATFORM** · Co-op / casual only. Cap ~8 peers.

## Owns

WebRTC data-channel mesh. Server only brokers SDP/ICE at `/api/rtc`. `P2PRoom` from `@/lib/multiplayer`.

## Setup

Copy `signaling.server.ts` + `src/routes/api/rtc.ts` from `references/signaling-relay.md`.

## Trust

No server authority. Peers can lie. Peers learn IPs. Never for ranked / cheat-sensitive play. `broadcast()` = unreliable state; `send()` = reliable events.

Refs: `signaling-relay.md`, `react-binding.md`.
