# Platform dialect packs (mandatory for product apps)

**Authority:** when user asks for iOS / Android / Mac / Windows / multi-platform app UI, lock **DIALECT** and load the matching file **before CSS**.

**Phone product default (2026-07-29):** user says mobile/phone/app design without naming OS → **`DIALECT=ios`** + **iPhone 17 Pro** device shell (`ios.md`). Not `web-neutral`.

**iOS placement GOLD_BAR (2026-07-29):** `/Users/jamie.matheson/.openvibe/templates/ios26-phone-shell/baseline.html` (+ `BASELINE.md`). Freeze chrome/nav/states; vary product FLAVOUR. Do not use `demo.html` as gold bar.

**Before CSS on Full team:** dual-track research (App Store best apps + platform BP) → then dialect pack — `ui-team` §1.

| DIALECT | File | Default PLATFORM |
|---------|------|------------------|
| `ios` | `ios.md` | mobile-phone (**default phone**) |
| `android` | `android.md` | mobile-phone |
| `macos` | `macos.md` | desktop-native-like |
| `windows` | `windows.md` | desktop-native-like |
| `web-neutral` | `web-neutral.md` | responsive-app or desktop-web |
| `demo` | *(none — use ui-craft only)* | n/a one-surface HTML |

**Research corpus:** `/Users/jamie.matheson/.openvibe/docs/research/best-ui-apps-by-platform-2026.md` + `platform-app-ui-vs-skills-2026-07.md`

**Rule:** style-pool may vary look **inside** one dialect. Do not replace dialect with STYLE_ID alone.

**Deliverable honesty:**
- `FIDELITY=native-faithful-web` — HTML/CSS/JS that passes dialect checklist (default for prototypes)
- `FIDELITY=native-handoff` — also map components to SwiftUI/Compose/WinUI/AppKit names (no binary required unless asked)
- Never claim "shipping App Store binary" from web-only build
