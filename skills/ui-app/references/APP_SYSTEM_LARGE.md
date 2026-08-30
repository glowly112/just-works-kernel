# App design system — large research set

## Scope reminder

**Mobile and desktop web apps** share this pool. Lock PLATFORM first, then NAV/SHELL.  
Visual look remains **style-pool** (orthogonal).

## Scale

| Asset | Count | Path |
|------:|------:|------|
| Named app patterns | **251** | `app-patterns-named.tsv` |
| Sampleable (`quarantine=0`) | **248** | named |
| Quarantine brief-only | **3** | watch / TV / car |
| Navigation patterns | 16 | `app-axes.tsv` |
| App shells | 15 | axes |
| Interactions | 26 | axes |
| Densities | 4 | axes |
| Platforms | 5 | axes |
| Implementation techniques | **61** | `app-impl-techniques.tsv` |
| Combo TSV | **2251** | `app-combo-3k.tsv` |
| Combo JSONL | **5000** | `app-combo-5k.jsonl` |

## Named schema (post-fix)

```
pattern_id · family · title · feel · nav · ix_default · shell · density · platform · quarantine · notes
```

- `platform` is always one of the five platform IDs (not free prose).  
- `nav` is always `NAV-*`; interactions live in `ix_default` / combo `interaction`.  
- `quarantine=1` → do not sample into combos or ship builds.

## Integrity

```bash
python3 ~/.grok/skills/ui-app/scripts/validate_catalogs.py
# must print PASS and exit 0
```

Rules enforced:

1. No `IX-*` in NAV  
2. PLATFORM×NAV (axes meta) compatible  
3. PLATFORM×SHELL family compatible (no desktop + `SH-PHONE-*`)  
4. `brief_lock` matches structured fields  
5. Quarantined patterns absent from combo pools  

## Families

| Family | Role |
|--------|------|
| mobile-structure / touch-a11y / content | Phone IA |
| desktop-structure / density-keyboard | Desk IA |
| cross-platform-app | Collapse / shared |
| industry-app | Vertical shells |
| os-patterns | HIG/Material/WinUI-**shaped** web locks (not native) |

## Sampling

```bash
python3 -c "
import random, pathlib
p = pathlib.Path.home() / '.grok/skills/ui-app/references/app-combo-5k.jsonl'
for line in random.sample(p.read_text().splitlines(), 12):
    print(line)
"
```

## Use with ui-bp / ui-design

1. Job + Design Packet / micro-brief  
2. **ui-app** locks PLATFORM + NAV + SHELL + density + IX + IMPL  
3. Optional pool sample for bakeoffs  
4. **ui-bp** production states / a11y / flavour  
5. **style-pool** visual diversity  

## Parent docs

- `app-pool.md` · `mobile.md` · `desktop.md` · `shared.md` · `navigation.md` · `implementation.md`  
- `checklist.md` · `SOURCES.md` · `../SKILL.md`  
