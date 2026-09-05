<!-- just-works:managed:start -->
## Just Works — default agent workflow

Before accepted work, read `.agents/skills/just-works/SKILL.md` from this repository.
This applies to Codex cloud agents, local agents, and delegated agents. The official
short product recipe is the workflow authority; older kernel pipelines, FEATURE
packets, and workflow stamps do not replace it. Preserve the repository's concrete
product requirements, security constraints, build commands, and tests below.

- Load only the specialist needed for the next step. Resolve `sand-workflow:<slug>`
  references to `.agents/skills/<slug>/SKILL.md` when installed.
- Restate the job naturally. Carry existing user authorisation into delegated work;
  do not reopen settled approvals. Finish the accepted scope, with real error paths.
- Verify the result with evidence from the current run before claiming completion.
  UI work needs an inspected running screen. A Linux build is not iOS Simulator proof.
- Pass this recipe, relevant skill paths, constraints, and evidence requirements to
  every delegated agent. Review its evidence before accepting its result.
- Skills describe workflows, not tool availability. Grok Bot routing applies only
  to Grok Bot; use the current agent's available tools. If an optional specialist or
  helper is absent, report the gap instead of inventing a tool or completion result.

### Planning, workers, and long conversations

Prefer a long-lived Astra coordinator for planning, decisions, and final review
when available. This is a role preference; instructions cannot switch the host model.
The user authorises suitable subagents. Delegate substantial bounded implementation
and research when the runtime supports it and independent work permits. Select the
least expensive capable model and lowest reliable effort, considering retries and
latency per verified result. Escalate when evidence warrants it; avoid tiny delegations.

Give new assignments fresh worker context with a brief containing goal, owned scope,
constraints, relevant decisions, and verification requirements. Reuse workers for
related follow-up. Run independent work concurrently; keep dependencies serial and
avoid overlapping edits. Workers return outcome, changed files, observed verification
results, evidence paths, risks, and next action. Review targeted evidence without
repeating their work or importing entire transcripts and bulk logs into the coordinator.

Workers own scoped investigation, implementation, and focused verification; the lead
owns decisions and integration. Assign complete work with explicit finish criteria.
Collect results at milestones or blockers, avoiding repeated status requests, reminders,
and polling while workers progress. Review diffs and targeted evidence, expanding only
for concrete uncertainty or failure. Compare efficiency per verified outcome including
worker work and retries; cached tokens are not account allowance charges.

Keep a short current checkpoint in the repository's existing continuity lane (create
one lean checkpoint if needed). Preserve the objective, user constraints, decisions
and their rationale, verified facts separately from hypotheses, failed approaches,
proof commands/results, outstanding work, and next action. Refresh from actual state
at milestones, not recursive summaries. After compaction, consult the checkpoint and
current files before continuing. Use native compaction without arbitrary percentages
or reset counts. If forgetting, repetition, or contradictions appear, reconcile with
actual state and use a fresh worker where useful. Keep the user's conversation going;
do not automatically create a new top-level task or claim unsupported host controls.

### Shared memory

Wax is complementary shared memory for searchable, durable preferences, facts,
decisions, and lessons. The existing repository checkpoint and current repository
evidence remain authoritative for present state. Use available Wax tools only when
connected; never assume a Mac localhost, filesystem path, or remote Wax endpoint is
available in cloud. If Wax is unavailable, persist relevant non-secret project
learning and current state in the repository's existing continuity file and report
the gap plainly. Never fabricate recall or sync. Recall only relevant scoped memory,
write concise durable entries tagged with project and source, reconcile conflicts
against current repository evidence and explicit user instructions, and omit
transcripts, log dumps, and secrets. Pass available memory capabilities and context
to delegated workers.

The 18-skill product pack is vendored here for cloud/offline use; its provenance is
in `.agents/just-works-source.json`. No machine-local paths or setup-time downloads
are required. Source: https://github.com/glowly112/works (`.grok/skills`).
<!-- just-works:managed:end -->
