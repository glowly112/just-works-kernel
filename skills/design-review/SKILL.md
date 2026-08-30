---
name: design-review
description: Structured team design critique after UI implement (post-review with ui-* skills). Use when design review, UI review pass, craft gate, team discussion after screens, /design-review.
user-invocable: true
---

# design-review — team discussion as a craft gate

**Not** a multi-agent chatroom. **Yes** a structured critique loop after implement.  
It MUST honour `ui-thrift` for product, dashboard, and lab UI, and remains the
required studio crit after an escalated full `ui-team` production pass.

## When

- **Default:** after first production UI RESULT on Full **ui-team** / greenfield app UI (unless user says skip)
- UI / app shell / production web UI just implemented
- User asks for design review, craft gate, “team discussion”, or ship check on visuals
- After `ov-dispatch visual|gemini` on UI work before claiming ship

## Command (Driver)

```bash
# Auto brief from last RESULT + git diff + ui-* MUST-READ
ov-dispatch design-review

# Or explicit brief (template: /Users/jamie.matheson/.openvibe/templates/brief-design-review.md)
ov-dispatch design-review /tmp/brief_design_review.md

# Aliases
ov-dispatch ui-review
```

## Flow

```text
ui-team: research? → packet → app locks → implement (visual/gemini + ui-bp/ui-app) → RESULT
  → ov-dispatch design-review   # Codex post-review, UI craft bar
  → Driver reads RESULT / findings
  → ov-dispatch continue visual|gemini "fix residual only"   # one fix-pass if needed
```

## Skills the reviewer must honour

| Skill | Why |
|-------|-----|
| `ui-thrift` | Mandatory default process, ui-lock evidence, kit/stack, and thrift FAIL codes |
| `ui-team` | Pipeline context (what should already be locked) |
| `ui-craft` | Anti-slop + WCAG floor + craft judge |
| `ui-bp` | Production states / tokens / one-shot contract |
| `ui-app` | Shell / nav / **DIALECT** + `platforms/*.md` when app UI |
| `ui-design` | Packet / hierarchy intent when present |
| `design-review` | Dual-pass verdict (craft_pass + dialect_pass) + FAIL codes |

## Dialect gate (apps)

If brief or UI claims iOS/Android/Mac/Windows/app shell, score **two verdicts**:

1. **craft_pass** — ui-craft / ui-bp
2. **dialect_pass** — `ui-app/references/platforms/<dialect>.md` + checklist §H

**iOS phone placement (GOLD_BAR):** structure should match kit `baseline.html` / `BASELINE.md` (tabs, stacks, search mode, floating glass, states) unless brief names an exception. **FAIL** silent drift to pre-26 flat chrome or treating `demo.html` as the standard. **Do not FAIL** product FLAVOUR that differs from Vaulted colours/type — personality may vary.

**FAIL codes (emit if true):**
`DIALECT_IOS_FAB` · `DIALECT_IOS_NO_TAB_STACK` · `DIALECT_ANDROID_NO_BACK` · `DIALECT_MAC_BOTTOM_TABS` · `DIALECT_MAC_NO_MENU` · `DIALECT_WIN_NO_BASE_LAYER` · `DIALECT_WIN_PHONE_TABS_ONLY` · `BACK_STACK_LIE` · `SAFE_AREA_MISS` · `REFS_MISSING` · `DIALECT_COSPLAY` · `STYLE_BEFORE_DIALECT` · `DIALECT_IOS26_FLAT_TAB` · `DIALECT_IOS26_SEARCH_TAB_SCOPED`

**Operator chrome FAIL codes** (product / dashboard / lab UI — SOT `docs/UI_OPERATOR_CHROME.md`):  
`CHROME_REDUNDANT_SOURCE` · `CHROME_DISPLAY_ONLY_ESSAY` · `CHROME_DUP_METRIC` · `CHROME_DEAD_ZERO` · `CHROME_ISO_NOISE` · `CHROME_BOILERPLATE_BANNER`  
Score as craft findings; open `CHROME_*` on critical path → craft_pass FAIL unless user ACCEPT residual.

**Thrift process FAIL codes:**  
`THRIFT_SKIP` · `THRIFT_OPUS_FIRST` · `THRIFT_NO_KIT`

- Every thrift ship review requires an absolute `ui_lock` path in the build RESULT.
- Missing skill/lock evidence is `THRIFT_SKIP`.
- `@ui` as first hop without a named escalation reason is `THRIFT_OPUS_FIRST`.
- App-shaped work without a named kit or stack in the lock is `THRIFT_NO_KIT`.

Overall ship UI PASS only if both craft_pass and dialect_pass PASS (demos without OS claim: dialect n/a).

## Success

- Findings packet (or clean PASS + residual risk) including dialect codes
- No file edits from the review seat
- Fix via **one** implement continue, not re-debate loops (#37)

## Illegal

- Freehand multi-agent chat without RESULT
- Design review used as implement
- Skipping skill paths on UI work (#39)
- Passing a thrift ship with no absolute `ui_lock` path
- Passing "iOS-class" UI that fails ios.md checklist
