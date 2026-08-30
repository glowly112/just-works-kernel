---
name: video2dsprite
description: >
  Still → video → frames → magenta → sheet. Prefer generate2dsprite for crisp poses.
  Use when: video sprite, in-betweens, /video2dsprite.
---

# video2dsprite

Status: **ASSETS** · Still → video → frames → magenta → sheet.

`imagine_text_to_image` base → `imagine_image_to_video` (6s/10s run-in-place) → ffmpeg → chroma-key → dense strips/grids/GIFs. Prefer **generate2dsprite** for crisp key poses. Script: `video2dsprite.py`.

Refs: `pipeline.md`, `prompt-rules.md`.
