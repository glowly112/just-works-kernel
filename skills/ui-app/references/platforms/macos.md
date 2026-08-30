# DIALECT=macos — placement, flow, reference apps

**Success:** Mac citizen — menu bar commands, toolbar, sidebar source list, multiwindow-ready density.  
**Fail:** Phone bottom tabs as only nav; no keyboard path; touch-only hit targets; missing menu semantics.

## Region map (document / utility default)

```
[ menu bar — File Edit View … — system + app ]
[ traffic lights | title | toolbar ]
[ sidebar (leading) | main content | optional inspector (trailing) ]
[ optional status bar ]
```

**Settings-style:** sidebar categories + detail pane (post-Ventura Settings — use carefully; avoid buried IA).

## Navigation & back

| Rule | Required behaviour |
|------|-------------------|
| Peers | **Sidebar** source list or toolbar segments — not bottom tabs |
| Hierarchy | Selection in sidebar replaces content; **rarely “Back”** |
| Commands | **Menu bar** for full command set; toolbar for frequent |
| Keyboard | Full tab order; ⌘ shortcuts; optional ⌘K palette (Raycast/Linear class) |
| Preferences | Separate Settings scene (⌘,) |
| Sheets | AppKit/SwiftUI sheet equivalents — modal for focused edit |
| Multiwindow | Document model: multiple windows OK; state per window |

## Chrome & materials

- Denser than iOS; pointer precision (can use 28–32px secondary; primary still ≥24, prefer 28+)  
- Vibrancy/sidebar materials OK; keep text contrast  
- SF Pro / system; sidebar labels always visible when expanded  
- Collapse sidebar with keyboard toggle  

## Flow recipes

| Flow | Placement |
|------|-----------|
| Browse library | Sidebar sections → list → detail |
| Edit document | Main canvas + inspector on selection |
| Quick action | Toolbar button + menu command + shortcut |
| Search | Toolbar field or palette |
| Preferences | Dedicated window/pane |

## Reference apps

### First-party
| App | Steal |
|-----|--------|
| **Finder** | Sidebar + columns + toolbar + Quick Look |
| **Mail** | 3-pane triage |
| **Notes / Reminders** | Sidebar + list + detail |
| **Music** | Source list + content + miniplayer |
| **Safari** | Tabs + toolbar + sidebar |
| **System Settings** | Sidebar+detail — **also study IA complaints** (don’t bury keys) |

### Craft / consensus
| App | Steal |
|-----|--------|
| **Things 3** | Reference Mac restraint |
| **Fantastical** | Cal + NL input |
| **iA Writer / Bear / Craft** | Writing split |
| **Raycast** | Command layer |
| **Linear** desktop | Keyboard-first product |
| **Sketch / Figma** | Canvas + inspectors |
| **Blippo+** (ADA 2026) | World-building Mac entertainment UI |

## BAN

- `DIALECT_MAC_BOTTOM_TABS` — iOS tab bar as sole Mac nav  
- `DIALECT_MAC_NO_MENU` — no menu/command story on desktop-native-like  
- `DIALECT_MAC_TOUCH_ONLY` — no keyboard path  
- `DIALECT_MAC_PHONE_DENSITY` — oversized mobile padding everywhere  
- Missing focus rings  

## IMPL must

`keyboard-nav` · `focus-visible` · optional `command-palette` · resizable sidebar · min pane widths · menu or `role="menubar"` equivalent when claiming Mac fidelity · reduced-motion  

## Checklist add-on (macos)

- [ ] DIALECT=macos + REFERENCE_APPS  
- [ ] Sidebar or equivalent peer nav (not phone tabs alone)  
- [ ] Keyboard completes primary job  
- [ ] Toolbar and/or menu commands for frequent actions  
- [ ] Density pointer-appropriate  
