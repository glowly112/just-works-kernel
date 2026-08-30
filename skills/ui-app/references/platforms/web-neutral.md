# DIALECT=web-neutral — cross-platform product web / PWA

**Success:** Excellent product web UI (Linear/Stripe/Notion class) without claiming iOS/Android/Mac/Win dialect.  
**Fail:** Claiming “iOS 27 app” while using this dialect; or ignoring desktop keyboard entirely on desktop-web.

## When to use

- User says web app, SaaS, dashboard, PWA without OS skin  
- Multi-platform single codebase with **responsive** shells  
- Explicit `web-neutral`

## Region maps (pick by PLATFORM)

**Desktop-web default**
```
[ top bar: brand | search/command | user ]
[ side rail OR top tabs ][ main ][ optional inspector on selection ]
```

**Mobile-web / PWA**
```
Use ios OR android pack for phone chrome — or simplified bottom tabs + stack
Document which phone grammar you lean toward
```

## Navigation & back

| Rule | Required behaviour |
|------|-------------------|
| Peers | Persistent side rail (desktop) collapsing to top tabs / drawer at mid width |
| Depth | Route-driven; **browser Back** maps to in-app back; no history traps |
| Deep link | Shareable views have URL/state; restorable on reload |
| Command | ⌘K / Ctrl+K palette when IA ≳ 7 destinations |
| Keyboard | Full Tab order + documented shortcuts on desktop breakpoints |
| Multi-view empty | Empty/loading/error **per view** (list empty ≠ auth empty ≠ network error) |

## Patterns from best web UI (consensus)

| Product | Steal |
|---------|--------|
| **Linear** | ⌘K, density, speed, restrained chrome |
| **Notion** | Sidebar + blocks + slash |
| **Figma** | Canvas + layers + inspector |
| **Stripe** | Tables, progressive disclosure, docs clarity |
| **Vercel** | Calm dark dashboard |
| **Superhuman** | Keyboard email triage |
| **Slack** | Channel list + thread |
| **Airtable** | Grid as database |

## Rules

- Command palette when IA deep  
- Excellent empty/loading/error **per view**  
- URL state for shareable views  
- Rail collapse on mid widths with labelled icon-only fallback  
- Style-pool OK; still lock NAV+SHELL **after** DIALECT=web-neutral  
- NN/g 10 heuristics always  
- Tables: Stripe-class density + progressive disclosure  
- Never claim ios/android/macos/windows without switching DIALECT file  

## BAN

- Claiming native iOS/Android/Mac/Win **without** switching DIALECT  
- AI triple desk default  
- Hover-only on touch breakpoints  

## Checklist

- [ ] DIALECT=web-neutral explicit  
- [ ] PLATFORM + responsive collapse  
- [ ] 1–2 web REFERENCE products named  
- [ ] Keyboard path on desktop breakpoints  
