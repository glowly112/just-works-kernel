# Just Works Kernel (`just-works-kernel`)

Standalone execution kernel, discipline rules, and skill catalogue for **Cursor**, **Cursor Cloud Agents**, and **Multivibe** AI workflows.

---

## 🏛 Kernel Architecture

The `just-works-kernel` provides the foundational execution layer for autonomous AI agents and interactive development sessions.

**Just works SOT:** the short path in `skills/just-works/SKILL.md` is the product system. Kernel does not win on conflict. A 12-stage FEATURE packet or `FEATURE.yaml` stamp is not a load.

```
just-works-kernel/
├── rules/                    # Cursor rule definitions (*.mdc)
│   ├── driver-discipline.mdc
│   ├── mv-parity.mdc
│   ├── mv-seat-map.mdc
│   ├── session-freshness.mdc
│   └── works-app-builder.mdc
├── skills/                   # 67 Domain skills (Single Source of Truth)
│   ├── just-works/
│   ├── ui-thrift/
│   └── ... (67 total)
└── scripts/                  # Automated installers and verification
    ├── install.sh            # Idempotent local/custom installer
    ├── cloud-install.sh      # Cloud Agent bootstrap script
    └── verify.test.mjs       # Comprehensive verification test suite
```

---

## 📜 Rules Reference

The kernel enforces 5 core discipline rules:

| Rule File | Description & Scope |
|-----------|---------------------|
| `driver-discipline.mdc` | **Multivibe Driver discipline**: Enforces the loop `Classify → silent rewrite → brief → one hop → read RESULT → decide`. Keeps driver lean, mandates concise briefs (≤12 lines), and requires fresh verification commands. |
| `mv-parity.mdc` | **Multivibe Parity**: Establishes single-boss principle (Cursor or CLI, never both on one task), Wax persistent memory patterns, isolated `.worktrees/lane-*` defaults, and RESULT shapes. |
| `mv-seat-map.mdc` | **Subagent Seat Map**: Maps Multivibe hop roles (`driver`, `implement`, `review`, `plan`, `judge`, `visual`, `ui`, `design-review`, `post-review`) to Cursor subagent models (`codex-implementer`, `qa-adversary`, `gpt-reviewer`, `gemini-implementer`). |
| `session-freshness.mdc` | **Session Freshness & Rotation**: Prevents context drift and rot in long chats. Employs soft refresh warnings (`⚠️ Session soft — please run /summarize`) and hard rotation gates (`⚠️ Session rotate — New Agent + paste HANDOFF`). |
| `works-app-builder.mdc` | **Works App Builder Pipeline**: Defines triage before scaffolding (§0.5) and the overlay gate list. That list is **not** a Just works load — SOT is `skills/just-works/SKILL.md` (short path; FEATURE.yaml stamps are not a load). |

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

## 🚀 Installation

### Local Installation
Clone the repository and run the idempotent installer:

```bash
git clone https://github.com/glowly112/just-works-kernel.git
cd just-works-kernel
./scripts/install.sh
```

By default, rules are linked into `~/.cursor/rules/` and skills into `~/.cursor/skills-cursor/`.

To install to a custom directory or test environment:
```bash
CURSOR_HOME="/path/to/custom/cursor" ./scripts/install.sh
```

---

## ☁️ Cursor Cloud Agent Setup Guide

### 1. One-Line Bootstrap
In any Cursor Cloud Agent terminal or bootstrap step:

```bash
curl -fsSL https://raw.githubusercontent.com/glowly112/just-works-kernel/main/scripts/cloud-install.sh | bash
```

### 2. Environment Configuration (`.cursor/environment.json`)
Add the bootstrap command to `.cursor/environment.json` in your repository to automatically configure every Cloud Agent VM:

```json
{
  "install": "curl -fsSL https://raw.githubusercontent.com/glowly112/just-works-kernel/main/scripts/cloud-install.sh | bash"
}
```

Or reference it directly from a workspace script:
```json
{
  "install": "bash scripts/cloud-agent-install.sh"
}
```

---

## 🧪 Verification & Testing

The repository includes a comprehensive Node.js verification test suite that verifies rules, skills, script syntax, and mock installation idempotency:

```bash
node scripts/verify.test.mjs
```

All 170+ assertions run and report status with zero external dependencies.
