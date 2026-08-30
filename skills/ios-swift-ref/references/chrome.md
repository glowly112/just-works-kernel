# Swift / iOS chrome (from Notion wiki)

Reference. Do not guess placements.

**Live docs win.** Fetch HIG + the SwiftUI page this turn. If they disagree with this table, follow Apple.

- [HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [What’s new in design](https://developer.apple.com/design/whats-new/)

Official: Apple HIG + SwiftUI docs for the Xcode on the Mini (iOS 26 now, 27 when that SDK is on the machine).

## Web proto → SwiftUI

| Web | SwiftUI |
| --- | --- |
| Page header + back | `NavigationStack` · `.navigationTitle` · `.toolbar` |
| Search field under title | `.searchable` |
| Bottom sheet / Page style | `.sheet` · presentation detents |
| Word count / composer bar | `safeAreaInset(edge: .bottom)` — **not** `position: absolute` |
| Keyboard gap | System keyboard safe area. Do not hard-code 34 or 120. |
| Share / compose | `ShareLink` / toolbar `Button` with system image |
| List of pages | `List` inset grouped or plain — pick one |
| Paper fill | View background. Not `.toolbarBackground` hacks on the sheet. |

## Do not invent

- Custom nav that hides `NavigationStack`
- CSS glass on the paper (Liquid Glass = **bars only**)
- Extra sidebars / floating docks
- Hit targets under 44pt

## Vellum lock

Library → list. Editor → `TextEditor` in a column + inset bar. Style → sheet. Charm (paper/type/ink) stays product tokens, not Notes grey.
