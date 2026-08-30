# Self-critique gate (before production code)

Run after Design Packet fields are filled. Honest REVISE is success; vanity PASS is failure.

## Tests

### 1. Squint / blur (hierarchy)
Mentally blur type to unreadable.  
- What mass dominates? Is that the **primary job**?  
- Are three equal-weight blocks fighting? → fix scale/grouping/contrast.  

(NN/g-style: hierarchy via contrast, scale, grouping — not colour alone.)

### 2. Logo-off (voice)
Hide product name.  
- Still recognisable product **world**?  
- Or generic SaaS cream + soft rect? → **production beige** → REVISE TYPE_PAIR / CONTROL / MATERIAL.

### 3. Job path
Can a stressed user complete JOB in one obvious path without hunting chrome?  
If primary CTA is unclear after 2 seconds → REVISE HIERARCHY / SKELETON.

### 4. Sameness
Would swapping the headline into another bakeoff cell still “fit”?  
If yes → skeleton or flavour is template → REVISE.

### 5. Motif vs structure
Is SIGN only a decorative stroke/icon on a median shell?  
If yes → redesign SKELETON (ui-craft rule).

### 6. Packet honesty
Every ART DIRECTION field must be implementable in CSS/HTML.  
“Warm and trustworthy” alone is not a lock — need TYPE + CONTROL + MATERIAL.

## Verdict

| Verdict | Meaning |
|---------|---------|
| **PASS** | Safe to hand off to ui-bp |
| **REVISE** | Change packet (not pixels yet); re-run tests |

Do not start component CSS on REVISE unless user explicitly overrides.
