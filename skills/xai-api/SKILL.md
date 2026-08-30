---
name: xai-api
description: >
  PLATFORM. Server-only XAI_API_KEY. Chat, Imagine, TTS. Never expose the key.
  Use when: grok-4.5, xAI API, TTS, server AI, /xai-api.
---

# xai-api

Status: **PLATFORM** · Server-only. Spends the app owner’s quota.

## Owns

`XAI_API_KEY` injected by the platform. Chat (`grok-4.5`), Imagine image/video, TTS. OpenAI-compatible `https://api.x.ai/v1`.

## Rules

- Never expose the key (`VITE_` or client).
- If missing, degrade: “AI is not available”.
- User-initiated calls only. Cap tokens. Cache. No loops / keystroke / page-load.
- Runtime media in the *app* uses this API. Build-time art uses the **imagine** skill.

Docs: https://docs.x.ai
