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

The 18-skill product pack is vendored here for cloud/offline use; its provenance is
in `.agents/just-works-source.json`. No machine-local paths or setup-time downloads
are required. Source: https://github.com/glowly112/works (`.grok/skills`).
<!-- just-works:managed:end -->
