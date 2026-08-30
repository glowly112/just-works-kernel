# Navigation patterns — decision guide

Use with `app-axes.tsv` IDs. Pick **one primary NAV**; secondary overflow is allowed.

---

## Decision tree (short)

1. **Single task / auth / capture?** → `NAV-NONE-FOCUS` or `NAV-WIZARD`  
2. **3–5 equal peer jobs on phone?** → `NAV-BOTTOM-TABS` (+ `NAV-TAB+STACK` if each root has depth)  
3. **Hierarchy list→detail on phone?** → `NAV-STACK-PUSH`  
4. **Transient filter/compose over content?** → `NAV-BOTTOM-SHEET` / `NAV-MODAL-SHEET`  
5. **Secondary only overflow?** → `NAV-DRAWER` (never sole primary IA)  
6. **Browse + inspect on wide?** → `NAV-MASTER-DETAIL`  
7. **Many sections, flat-ish?** → `NAV-SIDE-RAIL`  
8. **Deep tree?** → `NAV-SIDE-TREE`  
9. **Document creation tool?** → `NAV-MENUBAR` + `NAV-TOOLBAR`  
10. **Large IA / power users?** → add `NAV-COMMAND-PALETTE`  
11. **Deep web paths?** → add `NAV-BREADCRUMB`  
12. **In-section peers?** → `NAV-TOP-TABS`

---

## Pairing NAV → default SHELL

| NAV | Default shell |
|-----|----------------|
| BOTTOM-TABS | SH-PHONE-TABS |
| TAB+STACK | SH-PHONE-TABS |
| STACK-PUSH | SH-PHONE-STACK |
| BOTTOM-SHEET / MODAL-SHEET | SH-PHONE-SHEET |
| NONE-FOCUS (capture) | SH-PHONE-CANVAS |
| MASTER-DETAIL | SH-TABLET-SPLIT / SH-RESPONSIVE-COLLAPSE |
| SIDE-RAIL | SH-DESK-RAIL-MAIN |
| SIDE-TREE | SH-DESK-RAIL-MAIN |
| MENUBAR | SH-DESK-DOCUMENT |
| TOOLBAR | SH-DESK-TOOL-CANVAS |
| COMMAND-PALETTE | overlays any desk shell |
| WIZARD | SH-PHONE-STACK or full-stage desk |

---

## Active, back, deep link

| Concern | Rule |
|---------|------|
| Active | Visual + `aria-current`; not colour alone |
| Back (mobile) | History stack; title back control mirrors system when possible |
| Escape (desktop) | Closes overlay; does not navigate root |
| Deep link | URL reflects root + entity id when web |
| Restore | Returning to tab restores prior stack position when using tab+stack |

---

## Anti-patterns

| Pattern | Why |
|---------|-----|
| 7+ bottom tabs | Overflow; recognition dies |
| Drawer for Home/Search/Profile only | Hides primary jobs |
| Breadcrumb as only nav | No lateral move |
| Palette only, no visible IA | Novices lost |
| Modal every detail | Breaks comparison and multitasking |
| Replacing stack with parallel roots silently | Users lose history |

---

## Bakeoff uniqueness

Two cells may share **STYLE_ID family** but not **NAV+SHELL** in the same wave. Prefer different depth models (tabs vs stack vs sheet vs split).
