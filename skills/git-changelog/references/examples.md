# Git Changelog Examples

## Complete Session Changelog Entry

```markdown
### [14:32] Fix token refresh on network timeout
**Type**: fix
**Scope**: auth
**Files**:
- `src/auth/tokenService.ts` — added retry logic with exponential backoff
- `src/auth/tokenService.test.ts` — added timeout test cases

**Description**:
Previously, token refresh would fail immediately on network timeout.
Now retries 3 times with 1s, 2s, 4s delays before failing.

**Verification**:
- `pnpm test` — PASS

**Commit**: `a1b2c3d`

---
```

## Uncommitted Entry (No Git Repo)

```markdown
### [15:45] Add user preferences modal
**Type**: feat
**Scope**: ui
**Files**:
- `src/components/PreferencesModal.tsx` — new component
- `src/components/PreferencesModal.test.tsx` — unit tests
- `src/hooks/usePreferences.ts` — preferences hook

**Description**:
New modal for user preferences with theme, language, and notification settings.

**Verification**:
- `pnpm test` — PASS

**Commit**: UNCOMMITTED

**Proposed commit**:
```bash
git add src/components/PreferencesModal.tsx src/components/PreferencesModal.test.tsx src/hooks/usePreferences.ts
git commit -m "feat(ui): add user preferences modal"
```

---
```

## Verification Ladder Examples

### With pnpm
```markdown
**Verification**:
- `pnpm test` — PASS (42 tests, 0 failures)
```

### With pytest
```markdown
**Verification**:
- `pytest tests/auth/` — PASS (12 passed in 1.24s)
```

### No Tests Available
```markdown
**Verification**:
- SKIPPED (DEFAULTED DECISION: no standard test command found)
```

### Test Failed
```markdown
**Verification**:
- `npm test` — FAIL (1 failure: tokenService.test.ts:45)
- Not committing until fixed

**Commit**: UNCOMMITTED
```

## Conventional Commit Examples

### Feature
```
feat(auth): add OAuth2 login with Google

Implement Google OAuth provider with PKCE flow.
Store refresh tokens in encrypted local storage.

Refs #123
```

### Bug Fix
```
fix(parser): handle null dates in API response

Return null instead of throwing when date field is missing.

Fixes #456
```

### Breaking Change
```
feat(api)!: change response format to JSON:API

BREAKING CHANGE: All endpoints now return JSON:API format.
See docs/migration.md for upgrade guide.
```

### Refactor with Defaulted Scope
```
refactor(core): extract validation to shared utils

DEFAULTED DECISION: scope = core (changes span multiple domains)
```

## Scope Selection Examples

| Files Changed | Scope | Rationale |
|---------------|-------|-----------|
| `src/auth/login.ts`, `src/auth/logout.ts` | `auth` | Isolated to auth folder |
| `src/components/Button.tsx` | `ui` | UI system |
| `.github/workflows/ci.yml` | `tooling` | Infrastructure |
| `src/auth/login.ts`, `src/api/users.ts` | `core` | Spans domains |

## Anti-Pattern Fixes

| ❌ Bad | ✅ Fixed |
|--------|----------|
| `git commit -m "fix"` | `fix(auth): handle expired refresh token` |
| `git commit -m "updates"` | `refactor(api): extract error handling` |
| `git add .` | `git add src/auth/tokenService.ts src/auth/tokenService.test.ts` |
| No verification | `pnpm test` — PASS |
