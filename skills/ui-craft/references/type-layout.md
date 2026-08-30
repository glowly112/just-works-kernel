# Type, spacing, layout

## Type roles (Material 3)
https://m3.material.io/styles/typography/type-scale-tokens  

Map content to roles, not random sizes:

**display → headline → title → body → label**

- Web body baseline ~**16px / 1rem**; line-height ~**1.4–1.6** for reading  
- Modular scale common ratios ~**1.2–1.25** between steps  
- Display face used with restraint — not every heading is display  
- Max **two** webfont families; optional mono only for code/data  
- Apple HIG: thin custom weights need larger sizes; layouts must tolerate larger text  
  https://developer.apple.com/design/human-interface-guidelines/typography  

## Spacing (Material 3)
https://m3.material.io/styles/spacing  

- **8-based** rhythm: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64  
- Section gaps > component gaps  
- No one-off 13px paddings  

## Layout
- Primary job visible in first screenful  
- Long copy measure ~**45–75ch**  
- Grid/flex with intentional negative space (NN/g #8 — extra chrome competes)  
- Responsive: no hover-only actions on mobile  
- Apple HIG layout: adaptive margins, comfortable touch, avoid edge-cramped controls  
  https://developer.apple.com/design/human-interface-guidelines/layout  

## Density by surface
| Surface | Bias |
|---------|------|
| Marketing / website | Bold thesis, fewer modules, larger type |
| Web app / dashboard | Higher density; tables > card farms; status color with meaning |
| Mobile web | Thumb reach, large targets, bottom-friendly primary actions |

## NN/g 10 (quick map)
https://www.nngroup.com/articles/ten-usability-heuristics/  

1 Status · 2 Real-world language · 3 Exit/undo · 4 Consistency · 5 Prevent errors  
6 Recognition · 7 Shortcuts for experts · 8 Minimal chrome · 9 Plain errors · 10 Help in context  
