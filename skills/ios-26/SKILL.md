---
name: ios-26
description: >
  just-works when the surface is iPhone. Stock iOS 26 chrome + product charm.
  Use when: iPhone, iOS 26, SwiftUI chrome, large title, sheet, /ios-26.
---

# ios-26

**Grok** `~/.grok/skills/ios-26/` · just-works when the surface is iPhone.

Two jobs: (1) **web prototype looks like iOS 26/27** so a later SwiftUI port is not a different app. (2) **native** uses real system chrome.

## Split

- **Chrome** (this skill): large title, toolbar, searchable, sheet, share, tab bar, Liquid Glass *on bars only*. Steal from Notes / Journal / Settings.
- **Charm** (ui-thrift): paper, type, ink, greeting. Do not Notes-ify the product.

## Prototype (web / Vellum desk)

Build the HTML so it could be redrawn in SwiftUI without a new look.

- Top: large title + system trailing buttons (share, compose). Not a custom website header.
- Sheets from the bottom, detents. Not a desktop modal.
- 44pt hit targets. `env(safe-area-inset-*)`. Keyboard: caret and sheet actions stay visible (`visualViewport`).
- Bars may use thin system-like material. **No** fake CSS glassmorphism on the paper.
- Lists: inset grouped or plain — pick one and keep it.
- Do not invent chrome SwiftUI cannot match (floating HTML docks, extra sidebars, web tabs).

## Native

- iOS 26 SDK (27 when Xcode has it). SwiftUI `NavigationStack`, `.toolbar`, `.searchable`, `.sheet`, `safeAreaInset` for word-count.
- Stock controls. No hidden nav + homemade buttons.
- No WKWebView wrap unless they ask.
- Green `xcodebuild` is not a visual pass. Keyboard on a phone is.

## Port rule

Web and Swift should share: structure, spacing, type scale, paper catalogue. If the proto needs a control that does not exist in SwiftUI, do not ship it on the web either.

Companions: ui-thrift · prototype-to-testflight · ios-publish.

Placements: ios-swift-ref. Do not guess inset numbers.

## Writing surface

Library = small cards on the desk. Editor = the whole screen is paper, edge to edge. Date / title / body stay where they are. Do not ship a condensed card on a desk. Widget-on-a-table = fail.

Keyboard-open is required. Do not call the editor done from a closed-keyboard shot.
Paper fills **beside** the keyboard too. White / system gutters at the left or right of the keys fail `KB_COVER`.
Text and paper must travel with the keyboard. A snap to the new scroll position the moment the keyboard starts moving is a fail.

Word-count inset stays above the keyboard. A Page / style sheet keeps its last type and size rows reachable (scroll, not clip).

Ruled / dotted paper: type baseline sits on the rule. Line height matches rule pitch. Floating type is a fail.
