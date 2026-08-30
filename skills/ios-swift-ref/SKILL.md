---
name: ios-swift-ref
description: >
  Load before placing bars, sheets, or keyboard insets. Do not guess 34pt / 120pt.
  Live HIG + SwiftUI docs win. Use when: SwiftUI placement, keyboard inset, /ios-swift-ref.
---

# ios-swift-ref

Load `references/chrome.md` before placing bars, sheets, or keyboard insets.

Do not guess 34pt / 120pt. Do not invent chrome SwiftUI cannot draw.

Pairs with **ios-26**.

Live docs required: HIG + SwiftUI page for the control. Quote title + one rule. Wiki table is a hint. Docs win.

Editor is a `TextEditor` column plus `safeAreaInset` for word-count. The inset stays above the system keyboard.

A style `.sheet` last row (Typewriter / Size) must scroll into view.

Ruled paper: lock line height to the rule pitch so the baseline sits on the line.
