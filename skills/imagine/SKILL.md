---
name: imagine
description: >
  Split Imagine tools. No consolidated imagine_image. Path in → path out.
  Named real people: reference-first. Use when: image_gen, image_edit, video,
  sprite, Imagine, /imagine.
---

# imagine

Status: **PLATFORM** · Split Imagine tools. No consolidated `imagine_image`.

## Tools

| Call | When |
| --- | --- |
| `imagine_text_to_image` | New still |
| `imagine_image_to_image` | Edit one path |
| `imagine_reference_to_image` | 2+ refs |
| `imagine_text_to_video` | New clip |
| `imagine_image_to_video` | Animate one still |
| `imagine_reference_to_video` | Video from refs |
| `render_file` | Show the user |

Path in → path out. Exact text/numbers/charts: **code**, not Imagine. Named real people: reference-first, never text-to-image. Sprites/maps: `generate2dsprite` / `generate2dmap` / `video2dsprite`.
