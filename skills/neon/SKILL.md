---
name: neon
description: >
  PLATFORM opt-in. Neon Postgres when deployed; PGLite in preview. Database only
  when data must outlive the tab. Use when: Postgres, Neon, persist, /neon.
---

# neon

Status: **PLATFORM · opt-in**

## Owns

Neon Postgres when deployed; PGLite in preview. Same API via `@/lib/db` `getSql()`.

## Turning it on

Set `deploy.database: true` in `.grok/app-env.json`. Schema lives in `migrations/*.sql` (start at `0002`). Never write `.env`. Call `getSql()` only from server functions.

## Per-user

Once auth is on, every query scopes to `context.userId`. Without auth, no `user_id` / no personal data. Keep `user_id` as TEXT.

Companion: **auth**.
