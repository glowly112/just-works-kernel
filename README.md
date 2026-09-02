# Just Works Kernel (`just-works-kernel`)

**Do not clone this repo to install Just works.** This is a specialist skill library, not the product path and not the installer for a new PC.

The product path is **[glowly112/works](https://github.com/glowly112/works)** (`.grok/skills` + `scripts/install-just-works.sh`). This kernel does not win on conflict. A 12-stage FEATURE packet is not Just works.

> **Stop.** If a Cursor or Grok CLI said "install just works" and landed here, leave. Clone `https://github.com/glowly112/works` and run `scripts/install-just-works.sh`. Do not run `./scripts/install.sh` from this repo. A 67-skill catalogue and a 12-stage FEATURE packet are not a Just works load.

---

## 🏛 Kernel Architecture

The `just-works-kernel` provides specialist skills, discipline rules, and an expert library install for autonomous AI agents. It is **not** the Just works product path.

**Just works SOT:** the short path in `skills/just-works/SKILL.md` is the product system. Kernel does not win on conflict. A 12-stage FEATURE packet or `FEATURE.yaml` stamp is not a load.

The install door is `glowly112/works`. This repo does not win that job. Specialist skills here stay a library; they are not always-on Just works.

```
just-works-kernel/
├── rules/                    # Cursor rule definitions (*.mdc)
│   ├── just-works-path.mdc   # always-on short path (library install only)
│   ├── driver-discipline.mdc
│   ├── mv-parity.mdc
│   ├── mv-seat-map.mdc
│   ├── session-freshness.mdc
│   └── works-app-builder.mdc # opt-in 12-gate overlay — never always-on
├── skills/                   # 67 Domain skills (specialist library)
│   ├── just-works/
│   ├── ui-thrift/
│   └── ... (67 total)
└── scripts/                  # Library tools (not the product installer)
    ├── install.sh            # Expert/library install — refuses unless KERNEL_LIBRARY_INSTALL=1
    ├── cloud-install.sh      # Same refusal unless KERNEL_LIBRARY_INSTALL=1
    └── verify.test.mjs       # Comprehensive verification test suite
```

---

## 📜 Rules Reference

The kernel ships these discipline rules:

| Rule File | Description & Scope |
|-----------|---------------------|
| `just-works-path.mdc` | **Always-on short path**: SOT is `skills/just-works/SKILL.md` (next gate only, done bar, talk like a person). Not a 12-stage FEATURE packet. Kernel does not win on conflict. |
| `driver-discipline.mdc` | **Multivibe Driver discipline**: Enforces the loop `Classify → silent rewrite → brief → one hop → read RESULT → decide`. Keeps driver lean, mandates concise briefs (≤12 lines), and requires fresh verification commands. |
| `mv-parity.mdc` | **Multivibe Parity**: Establishes single-boss principle (Cursor or CLI, never both on one task), Wax persistent memory patterns, isolated `.worktrees/lane-*` defaults, and RESULT shapes. |
| `mv-seat-map.mdc` | **Subagent Seat Map**: Maps Multivibe hop roles (`driver`, `implement`, `review`, `plan`, `judge`, `visual`, `ui`, `design-review`, `post-review`) to Cursor subagent models (`codex-implementer`, `qa-adversary`, `gpt-reviewer`, `gemini-implementer`). |
| `session-freshness.mdc` | **Session Freshness & Rotation**: Prevents context drift and rot in long chats. Employs soft refresh warnings (`⚠️ Session soft — please run /summarize`) and hard rotation gates (`⚠️ Session rotate — New Agent + paste HANDOFF`). |
| `works-app-builder.mdc` | **Works App Builder Pipeline** (opt-in): Defines triage before scaffolding (§0.5) and the overlay gate list. That list is **not** a Just works load — SOT is `skills/just-works/SKILL.md` (short path; FEATURE.yaml stamps are not a load). |

---

## 🧰 Skill Catalogue (67 Skills)

The kernel includes 67 domain-specific skills:

### 1. Core Discipline & Product Gates
- **`just-works`**: Short product path (next gate only). Finished, proof this turn, no stubs, user-facing result. A FEATURE.md / FEATURE.yaml stamp is not a load.
- **`read-me`**: Silent inbound translation from user phrases/screenshots to Goal, Artifact, Success, and Verify criteria.
- **`repo-memory`**: Session persistence via `STATE.md`, `CONCEPTS.md`, and `LEARNINGS.md`.
- **`feature-plan`**: Structured feature specification and acceptance criteria (`FEATURE.md`). Not a load of Just works.
- **`session-discipline`**: Session pacing, context protection, and focus guardrails.
- **`verify-done`**: Mandatory terminal/browser execution proof before marking tasks complete.
- **`verify-before-hedging`**: Fact verification prior to expressing uncertainty or assumptions.
- **`debug-once`**: Root cause analysis limiting patch iterations to 2 attempts.
- **`unlazy`**: Zero stubs, zero TODO placeholders, and first-paint optimization.
- **`ship-motion`**: Commit, remote push, deployment, and state update lifecycle.
- **`tdd-one`**: Minimal red-to-green test discipline for discrete steps.
- **`hammer`**: 5–8 adversarial edge and glare test cases.
- **`sim-confirm`**: Simulation checks and user confirmation workflows.
- **`work-modes`**: Mode switching (code, plan, design, research, clarify).
- **`controls`**: Interaction patterns and control mechanics.
- **`help`**: In-session guided assistance and skill lookups.
- **`seat` / `role`**: Role definition and seat responsibilities.
- **`no-shadow-analysis`**: Anti-hallucination analysis for dependencies and code.
- **`brief` / `brain`**: Concise task briefing and cognitive framing.
- **`auth`**: Authentication and session state guidelines.

### 2. UI & Design Craft
- **`ui-thrift`**: Mandatory gateway for all UI styling: L1–L6 pipeline, anti-slop rules, Mobbin references, and token compliance.
- **`ui-team`**: Full UI team escalation process.
- **`ui-app`**: Application-level shell, frame, and navigation layout.
- **`ui-bp`**: UI boilerplate, primitives, and standard components.
- **`ui-craft`**: Micro-interactions, visual hierarchy, and layout refinement.
- **`ui-design`**: Visual styling, typography, and palette application.
- **`ui-marks`**: Icons, custom SVGs, sprites, and entry animations.
- **`one-ui-factory`**: Unified cross-platform UI standards (anti-slop bans: no purple gradients, card walls, or emoji nav).
- **`design-ui`**: Design token implementation and layout structure.
- **`design-review`**: UI QA gate prior to release.
- **`uk-copy`**: Plain, direct, human-written copy (banning AI journal filler).

### 3. iOS & Native Engineering
- **`ios-26`**: Modern Swift & SwiftUI design patterns and architecture.
- **`ios-publish`**: App Store submission and release pipeline.
- **`ios-split-desk`**: Multi-window and iPadOS split screen workflows.
- **`ios-swift-ref`**: Swift reference patterns and API bindings.
- **`prototype-to-testflight`**: Rapid prototype packaging for TestFlight distribution.

### 4. Game & Interactive 2D/3D Development
- **`building-games`**: Game loop design and entity management.
- **`pack-games`**: Bundling and distributing game assets.
- **`threejs`**: 3D scene creation, WebGL shaders, and performance optimization.
- **`multiplayer-p2p`**: Peer-to-peer real-time networking.
- **`game-animation-frames`**: Frame-by-frame sprite animation timing.
- **`game-asset-core`**: Core game asset indexing and asset pipelines.
- **`game-character-consistency`**: Multi-directional character sprite consistency.
- **`game-tilesets`**: 2D tilemaps, autotiling, and collision grids.
- **`game-ui-icons`**: Pixel-perfect game UI icon design.
- **`generate2dmap`**: Procedural and authored 2D map generation.
- **`generate2dsprite`**: 2D sprite generation and format standardization.
- **`video2dsprite`**: Video-to-sprite conversion pipelines.

### 5. App Store & Market Strategy
- **`store-fit`**: Product-market fit criteria for store submissions.
- **`store-list`**: App Store listing copy, keywords, and screenshots.
- **`store-research`**: Competitor analysis and store trend research.
- **`aso-hammer`**: App Store Optimization keyword analysis and ranking checks.
- **`pack-store` / `pack-platform`**: Platform package bundling and store distribution.

### 6. Agent Infrastructure & Ecosystem
- **`model-router`**: Dynamic model routing and cost-performance balancing.
- **`xai-api`**: xAI / Grok API integration patterns.
- **`grok-bot-efficiency`**: Token-efficient prompt tuning for Grok bots.
- **`vibe-stack`**: Full vibe-coding environment configuration.
- **`neon`**: Serverless Postgres database integration.
- **`og`**: OpenGraph image generation and metadata.
- **`imagine`**: Visual asset ideation and concept generation.
- **`git-changelog`**: Conventional changelog generation.
- **`create-skill`**: Standardized skill authoring framework.
- **`skill-sync`**: Same-turn copies (local, Notion, works, this kernel). Short Just works path is SOT; kernel does not win on conflict.

---

## Install Just works (the product)

Do **not** use this repository. The install door is:

```bash
git clone https://github.com/glowly112/works.git
cd works
./scripts/install-just-works.sh
```

That loads `.grok/skills` from **glowly112/works**. A 12-stage FEATURE packet is not that load.

---

## ⚠️ Expert / library install (not Just works)

`./scripts/install.sh` and `./scripts/cloud-install.sh` **refuse** on a normal run. They print that this is not the Just works installer, point at `https://github.com/glowly112/works`, and exit non-zero. Nothing is linked.

Only set `KERNEL_LIBRARY_INSTALL=1` if you already know you want this 67-skill library, not the product path. That overlay does not win on conflict. `works-app-builder.mdc` stays opt-in (`alwaysApply: false`) so a library install does not force the 12-gate list.

```bash
KERNEL_LIBRARY_INSTALL=1 ./scripts/install.sh
```

With that flag, rules are linked into `~/.cursor/rules/` and skills into `~/.cursor/skills-cursor/` plus `~/.grok/user-skills/`. `~/.grok/skills` is only filled when it is already a real directory. A product symlink is left alone.

Custom destinations:

```bash
KERNEL_LIBRARY_INSTALL=1 CURSOR_HOME="/path/to/custom/cursor" GROK_HOME="/path/to/custom/grok" ./scripts/install.sh
```

Cloud Agents: do **not** curl `cloud-install.sh` to install Just works. Use `glowly112/works`. The kernel cloud script is the same expert path (`KERNEL_LIBRARY_INSTALL=1`) and still refuses without that flag.

---

## 🧪 Verification & Testing

The repository includes a comprehensive Node.js verification test suite that verifies rules, skills, script syntax, default install refusal, and mock library-install idempotency:

```bash
node scripts/verify.test.mjs
```

All 170+ assertions run and report status with zero external dependencies.
