---
name: auth
description: >
  PLATFORM opt-in. Better Auth at /api/auth/* — Google, X, email/password only.
  Sign-in is OFF until the ask needs accounts. Use when: login, Google, X, auth, /auth.
---

# auth

Status: **PLATFORM · opt-in** · Sign-in is OFF until the ask needs accounts.

## Owns

Better Auth at `/api/auth/*` via the Grok broker. **Only Google, X, and email/password.** Real sign-in in preview — no mock users.

## Turning it on

1. Delete `VITE_AUTH_ENABLED` from `.grok/app-env.json` and restart.
2. Copy `migrations/auth/0001_auth.sql` → `migrations/0001_auth.sql`.
3. Add `src/routes/api/auth/$.ts` + `login.tsx` from `references/wiring.md`.
4. Render `<UserButton />`. Scope every per-user query to `context.userId`.

## Do not

Edit files under `src/lib/auth/` except `email-password.ts`. Do not create `src/routes/auth/popup.tsx`. Do not write `.env`.

Refs: `sign-in-methods.md`, `grok-identity.md`, `prewired-and-env.md`, `session-ui.md`, `per-user-data.md`, `wiring.md`.
