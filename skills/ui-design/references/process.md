# Designer process map (one critical surface)

Grounded in industry practice: Design Council **Double Diamond** (Discover → Define → Develop → Deliver), with visual-design emphasis from hierarchy craft (e.g. NN/g squint / contrast / scale / grouping).  
This file is a **map**, not a research methodology bible. Stay thin.

## Phase goals

### 1. Discover (diverge on the problem)
- Who is the user in one line?  
- What job are they trying to finish **now**?  
- What constraints (device, density, brand, legal, time)?  
- What “default AI UI” would we get if we skipped design? List it so we can refuse it.  

**Agent substitute for real research:** explicit assumptions + competitive/genre refs in words.  
If user provides research, use it; do not invent fake interview quotes.

### 2. Define (converge on the problem)
Write one **problem statement**:

> [User] needs to [job] because [insight]. Success looks like [outcome].

Not: “Build a dashboard with cards.”  
Yes: “Duty manager must assign one open berth before the next ferry sails without scanning three panels.”

### 3. Develop (diverge solutions, then converge)
1. Sketch **2–3** SKELETON options in one line each (regions only).  
2. Pick one; state why the others die (job, hierarchy, or sameness).  
3. Lock art direction: VOICE, TYPE_PAIR, CONTROL, MATERIAL, BAN_THIS_RUN  
   (align with ui-bp `flavour.md`).  
4. Lock HIERARCHY: what the eye must see 1st / 2nd / 3rd.  

No component styling yet.

### 4. Critique (convergent quality gate)
Run `critique.md`. REVISE skeleton or flavour until PASS.

### 5. Deliver (production)
ui-bp Hard Contract: tokens, states, WCAG, NN/g, anti-slop, flavour implementation.  
Hierarchy from the packet must survive into layout (scale, contrast, grouping — not colour alone).

## Depth by ask

| User says | Depth |
|-----------|--------|
| quick / mock / one screen | Discover lite (assumptions) → Define → one skeleton → critique → ui-bp |
| production / ship | Full packet + full ui-bp states |
| research / users / discovery | Expand Discover; do not fake data; may stop at packet |
| full product | Multi-surface only if user says full; else one critical path |

## Relationship to other skills

| Skill | Role |
|-------|------|
| **ui-design** (this) | Problem + voice + structure + critique |
| **ui-bp** | Production build + flavour locks + ship checklist |
| **ui-craft** | SIGN/silhouette/anti-slop floor (via ui-bp) |
| **frontend-design** | Extra visual boldness after locks — never replaces Define/Critique |
