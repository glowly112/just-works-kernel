#!/usr/bin/env python3
"""Route tasks between Claude Code (Opus), Sonnet (via claude CLI), OpenAI (via AIRelay), and Gemini.

Architecture:
  - Opus (this session): reads code, forms ideas, writes briefs, reviews, decides
  - Sonnet 4.6 (via claude CLI): implementation/execution — fast, cheap, follows instructions
  - GPT-5.3 Codex (via AIRelay): post-implementation review for edge cases, bugs, misses
  - Gemini (via CLI): visual/multimodal tasks
"""

from __future__ import annotations

import argparse
import json
import os
import shlex
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List

CLAUDE_LABEL = "claude"
SONNET_LABEL = "sonnet"
OPENAI_LABEL = "openai"
GEMINI_LABEL = "gemini"

AIRELAY_BASE = "http://127.0.0.1:4010"
AIRELAY_HEALTH = f"{AIRELAY_BASE}/health"
AIRELAY_CHAT = f"{AIRELAY_BASE}/v1/chat/completions"

DEFAULT_OPENAI_MODEL = "gpt-5.5"
DEFAULT_REASONING_EFFORT = "medium"
DEFAULT_SONNET_MODEL = "sonnet"


@dataclass(frozen=True)
class Candidate:
    name: str
    score: int
    reasons: List[str]


_FILE_FORMAT_RULES = (
    "CRITICAL OUTPUT FORMAT: For each file you modify or create, output it in this exact format:\n"
    "===FILE: path/to/file.ext===\n"
    "(complete file contents)\n"
    "===END_FILE===\n\n"
    "Rules:\n"
    "- Output the COMPLETE file contents, not diffs or snippets.\n"
    "- Use the exact file path from the context provided.\n"
    "- Include ALL existing code in the file, not just the changed parts.\n"
    "- Do not add any explanation text outside of ===FILE=== blocks.\n"
    "- If you only modify one file, output just that one file.\n"
    "- Do NOT use markdown code fences. Use ===FILE:=== and ===END_FILE=== only.\n"
)

_FORMAT_REMINDER = (
    "\n\nREMINDER: You MUST wrap every file in ===FILE: path=== ... ===END_FILE=== blocks. "
    "No markdown fences. No explanation text outside the blocks."
)

_DOCS_SUFFIX = ""  # checkpoint + changelog handled by Claude directly

_IMPLEMENT_TEMPLATE = (
    "You are a senior software engineer. Implement the following task precisely.\n\n"
    + _FILE_FORMAT_RULES
    + _DOCS_SUFFIX
    + "\n\nTask: {task}"
    + _FORMAT_REMINDER
)

_RESEARCH_IMPLEMENT_TEMPLATE = (
    "You are a senior software engineer and technical analyst. You have been given source files "
    "as context. Your job is to:\n\n"
    "1. ANALYSE the provided source files to understand the codebase, architecture, and patterns.\n"
    "2. PLAN the implementation — identify what needs to change, what files to modify, and any risks.\n"
    "3. IMPLEMENT the changes precisely.\n\n"
    "Output your plan as a brief comment block at the top, then output all files.\n\n"
    + _FILE_FORMAT_RULES
    + _DOCS_SUFFIX
    + "\n\nTask: {task}"
    + _FORMAT_REMINDER
)

_REVIEW_TEMPLATE = (
    "You are a senior software engineer doing a code review. You have been given source files "
    "that were just implemented. Your job is to:\n\n"
    "1. Check for bugs, edge cases, and logic errors\n"
    "2. Check for security issues (injection, leakage, hardcoded secrets)\n"
    "3. Check for missing error handling at system boundaries\n"
    "4. Check for correctness against the stated goal\n"
    "5. Flag anything that looks wrong or risky\n\n"
    "Be specific. Reference file paths and line numbers. Only flag real issues, not style nits.\n"
    "If everything looks correct, say so briefly.\n\n"
    "Task/goal context: {task}"
)

PRESET_CONFIG = {
    "ui-review": {
        "default_model": GEMINI_LABEL,
        "template": (
            "Act as a senior UI/UX reviewer. Review the following UI or dashboard task. "
            "Focus on hierarchy, layout, clarity, information density, interactions, and what feels off. "
            "Give specific improvements, not generic praise. Task: {task}"
        ),
    },
    "spec-pass": {
        "default_model": CLAUDE_LABEL,
        "template": (
            "Turn the following rough note into an implementation-ready spec for an agentic coder. "
            "Make it concrete, structured, and testable. Include assumptions, scope boundaries, "
            "acceptance criteria, and risks. Input: {task}"
        ),
    },
    "racing-challenge": {
        "default_model": CLAUDE_LABEL,
        "template": (
            "Challenge this horse-racing analytics or bot idea like a skeptical reviewer. "
            "Look for leakage risk, split dishonesty, weak evidence, hidden assumptions, "
            "and operational failure modes. Suggest the smallest honest validation plan. Task: {task}"
        ),
    },
    "implement": {
        "default_model": SONNET_LABEL,
        "template": _IMPLEMENT_TEMPLATE,
    },
    "research-implement": {
        "default_model": SONNET_LABEL,
        "template": _RESEARCH_IMPLEMENT_TEMPLATE,
    },
    "implement-careful": {
        "default_model": OPENAI_LABEL,
        "openai_model": "gpt-5.5",
        "reasoning_effort": "high",
        "template": _IMPLEMENT_TEMPLATE,
    },
    "review": {
        "default_model": OPENAI_LABEL,
        "openai_model": "gpt-5.5",
        "reasoning_effort": "medium",
        "template": _REVIEW_TEMPLATE,
    },
}


MAX_CONTEXT_BYTES = 100_000  # ~100KB cap to avoid blowing token limits


def load_context_files(paths: List[str]) -> str:
    """Read files and format them as a context block for the prompt."""
    if not paths:
        return ""
    sections: list[str] = []
    total_bytes = 0
    for raw_path in paths:
        p = Path(raw_path).expanduser()
        if not p.is_file():
            sections.append(f"--- {raw_path} (NOT FOUND) ---\n")
            continue
        try:
            content = p.read_text(encoding="utf-8", errors="replace")
        except OSError:
            sections.append(f"--- {raw_path} (READ ERROR) ---\n")
            continue
        if total_bytes + len(content.encode("utf-8")) > MAX_CONTEXT_BYTES:
            sections.append(f"--- {raw_path} (SKIPPED — context size limit reached) ---\n")
            break
        total_bytes += len(content.encode("utf-8"))
        sections.append(f"--- {raw_path} ---\n{content}\n")
    return "\n".join(sections)


def parse_file_blocks(output: str) -> List[Dict[str, str]]:
    """Parse ===FILE: path=== ... ===END_FILE=== blocks from model output.
    Falls back to markdown fences with filename comments if no ===FILE=== blocks found."""
    import re as _re
    blocks: list[dict[str, str]] = []
    pattern = _re.compile(
        r"===FILE:\s*(.+?)===\s*\n(.*?)===END_FILE===",
        _re.DOTALL,
    )
    for match in pattern.finditer(output):
        filepath = match.group(1).strip()
        content = match.group(2)
        if content.startswith("\n"):
            content = content[1:]
        if content.endswith("\n\n"):
            content = content[:-1]
        blocks.append({"path": filepath, "content": content})

    # Fallback: extract from markdown fences like ```python\n# path/to/file.py\n...```
    if not blocks:
        fence_pattern = _re.compile(
            r"```\w*\s*\n#\s*([\w/._-]+\.(?:py|js|ts|sh|yaml|yml|json|toml|cfg|ini|md))\s*\n(.*?)```",
            _re.DOTALL,
        )
        for match in fence_pattern.finditer(output):
            filepath = match.group(1).strip()
            content = match.group(2)
            if content.endswith("\n"):
                content = content[:-1]
            blocks.append({"path": filepath, "content": content})

    return blocks


def apply_file_blocks(blocks: List[Dict[str, str]], dry_run: bool = False) -> List[str]:
    """Write parsed file blocks to disk. Returns list of written paths."""
    written: list[str] = []
    for block in blocks:
        filepath = Path(block["path"])
        if dry_run:
            written.append(f"[dry-run] {filepath}")
            continue
        filepath.parent.mkdir(parents=True, exist_ok=True)
        filepath.write_text(block["content"], encoding="utf-8")
        written.append(str(filepath))
    return written


def _lower_join(parts: List[str]) -> str:
    return " ".join(parts).strip().lower()


def check_airelay() -> bool:
    """Check if AIRelay is running and healthy."""
    try:
        req = urllib.request.Request(AIRELAY_HEALTH, method="GET")
        with urllib.request.urlopen(req, timeout=3) as resp:
            return resp.status == 200
    except (urllib.error.URLError, OSError, TimeoutError):
        return False


def detect_tools() -> Dict[str, Dict[str, object]]:
    airelay_up = check_airelay()
    claude_cli = shutil.which("claude")
    return {
        CLAUDE_LABEL: {
            "installed": True,
            "note": "this session (Opus)",
        },
        SONNET_LABEL: {
            "installed": claude_cli is not None,
            "path": claude_cli,
            "note": "via claude CLI" if claude_cli else "claude CLI not found",
        },
        OPENAI_LABEL: {
            "installed": airelay_up,
            "path": AIRELAY_BASE if airelay_up else None,
            "note": "via AIRelay" if airelay_up else "AIRelay not running on localhost:4010",
        },
        GEMINI_LABEL: {
            "installed": shutil.which("gemini") is not None,
            "path": shutil.which("gemini"),
        },
    }


def classify_task(task: str) -> List[Candidate]:
    text = task.lower()
    scores: Dict[str, int] = {CLAUDE_LABEL: 0, SONNET_LABEL: 0, OPENAI_LABEL: 0, GEMINI_LABEL: 0}
    reasons: Dict[str, List[str]] = {CLAUDE_LABEL: [], SONNET_LABEL: [], OPENAI_LABEL: [], GEMINI_LABEL: []}

    def add(model: str, points: int, reason: str) -> None:
        scores[model] += points
        reasons[model].append(reason)

    # Visual / multimodal signals -> Gemini
    visual_terms = [
        "ui", "ux", "dashboard", "layout", "wireframe", "mockup",
        "screenshot", "figma", "visual", "design critique", "design review",
        "polish", "spec from screenshot",
    ]
    if any(term in text for term in visual_terms):
        add(GEMINI_LABEL, 4, "Task contains strong visual/UI signals.")

    # Planning / review / spec signals -> Claude (Opus)
    spec_terms = [
        "spec", "prd", "plan", "architecture", "critique",
        "tradeoff", "decision doc", "outline", "strategy",
        "analyse", "analyze", "evaluate", "compare",
    ]
    if any(term in text for term in spec_terms):
        add(CLAUDE_LABEL, 4, "Task looks like planning, review, or spec writing.")

    # Implementation signals -> Sonnet
    impl_terms = [
        "implement", "build", "create", "generate", "write the code",
        "write a", "write an", "add feature", "make the change",
        "boilerplate", "crud", "component", "endpoint", "handler",
        "service", "fix", "refactor", "edit", "test", "debug",
        "commit", "patch", "function", "class", "module", "script",
    ]
    if any(term in text for term in impl_terms):
        add(SONNET_LABEL, 5, "Implementation task — Sonnet is fast and follows instructions well.")
        add(OPENAI_LABEL, 1, "GPT can review Sonnet's output for edge cases.")

    # Review/audit signals -> GPT (post-implementation review)
    review_terms = ["review", "audit", "check for bugs", "edge cases", "misses", "security review"]
    if any(term in text for term in review_terms):
        add(OPENAI_LABEL, 5, "Review/audit task — GPT catches edge cases cheaply.")
        add(CLAUDE_LABEL, 2, "Opus can also review but costs more.")

    # Racing bot signals
    racing_terms = [
        "horse racing", "racing bot", "backtest", "dataset", "leakage",
        "calibration", "policy", "scorer", "oos", "paper-live", "forward test",
    ]
    if any(term in text for term in racing_terms):
        add(CLAUDE_LABEL, 4, "Racing-bot work benefits from Opus challenge-review.")
        add(SONNET_LABEL, 2, "Sonnet can implement validated racing designs.")

    # Image/document inputs -> Gemini
    if any(term in text for term in ["screenshot", "image", "pdf"]):
        add(GEMINI_LABEL, 3, "Task references image-like or document-like inputs.")

    # Default fallback
    if all(s == 0 for s in scores.values()):
        add(CLAUDE_LABEL, 2, "Default to Opus when no stronger signal exists.")

    candidates = [
        Candidate(name, scores[name], reasons[name])
        for name in [CLAUDE_LABEL, SONNET_LABEL, OPENAI_LABEL, GEMINI_LABEL]
    ]
    return sorted(candidates, key=lambda c: (-c.score, c.name))


def build_command(
    model: str,
    task: str,
    openai_model: str = DEFAULT_OPENAI_MODEL,
    reasoning_effort: str = DEFAULT_REASONING_EFFORT,
) -> str | None:
    quoted = shlex.quote(task)
    if model == CLAUDE_LABEL:
        return None  # stays in this session
    if model == SONNET_LABEL:
        return f"claude -p --model sonnet --output-format text {quoted}"
    if model == OPENAI_LABEL:
        payload = json.dumps({
            "model": openai_model,
            "stream": True,
            "reasoning_effort": reasoning_effort,
            "messages": [{"role": "user", "content": task}],
        })
        return (
            f"curl -s -N {AIRELAY_CHAT} "
            f"-H 'Content-Type: application/json' "
            f"-d {shlex.quote(payload)}"
        )
    if model == GEMINI_LABEL:
        return f"gemini -p {quoted}"
    return None


def apply_preset(task: str, preset: str | None) -> Dict[str, str | None]:
    if not preset:
        return {"task": task, "default_model": None, "openai_model": None, "reasoning_effort": None}
    config = PRESET_CONFIG.get(preset)
    if not config:
        raise SystemExit(f"Unsupported preset: {preset}")
    from datetime import date as _date
    today = _date.today().isoformat()
    return {
        "task": config["template"].format(task=task, today=today),
        "default_model": config["default_model"],
        "openai_model": config.get("openai_model"),
        "reasoning_effort": config.get("reasoning_effort"),
    }


def choose_lane(
    task: str,
    force_model: str | None,
    preset: str | None,
    openai_model: str = DEFAULT_OPENAI_MODEL,
    reasoning_effort: str = DEFAULT_REASONING_EFFORT,
) -> Dict[str, object]:
    preset_result = apply_preset(task, preset)
    expanded_task = str(preset_result["task"])
    effective_force_model = force_model or preset_result["default_model"]
    tools = detect_tools()
    ranked = classify_task(expanded_task)
    winner = ranked[0]

    if effective_force_model:
        forced = next((c for c in ranked if c.name == effective_force_model), None)
        if forced is None:
            raise SystemExit(f"Unsupported model override: {effective_force_model}")
        winner = forced

    installed = bool(tools[winner.name]["installed"])
    fallback = CLAUDE_LABEL if winner.name != CLAUDE_LABEL else None

    result = {
        "recommended_model": winner.name,
        "status": "ok" if installed else "missing_tool",
        "reason_summary": winner.reasons[:3],
        "installed": tools,
        "fallback_model": fallback,
        "command": build_command(winner.name, expanded_task, openai_model, reasoning_effort),
        "task": task,
        "expanded_task": expanded_task,
        "preset": preset,
        "ranked_models": [
            {"name": c.name, "score": c.score, "reasons": c.reasons[:3]} for c in ranked
        ],
    }

    if not installed:
        tool_note = tools[winner.name].get("note", "")
        result["fallback_reason"] = (
            f"{winner.name} is not available ({tool_note}); "
            f"falling back to {fallback or 'Claude Code (this session)'}."
        )

    return result


def execute_sonnet(task: str, timeout: int) -> Dict[str, object]:
    """Call Sonnet via claude CLI in print mode."""
    try:
        completed = subprocess.run(
            ["claude", "-p", "--model", "sonnet", "--output-format", "text",
             "--no-session-persistence"],
            input=task,
            text=True,
            capture_output=True,
            timeout=timeout,
        )
        ok = completed.returncode == 0
        return {
            "status": "executed",
            "message": f"Sonnet 4.6 {'completed' if ok else 'completed with errors'}.",
            "command": "claude -p --model sonnet",
            "exit_code": completed.returncode,
            "stdout": completed.stdout,
            "stderr": completed.stderr,
            "model_used": "claude-sonnet-4-6",
        }
    except subprocess.TimeoutExpired:
        return {
            "status": "timeout",
            "message": f"Sonnet timed out after {timeout}s.",
            "command": "claude -p --model sonnet",
            "exit_code": 124,
            "stdout": "",
            "stderr": f"Timeout after {timeout}s",
        }


def execute_openai(
    task: str,
    openai_model: str,
    reasoning_effort: str,
    timeout: int,
) -> Dict[str, object]:
    """Call AIRelay for OpenAI execution using streaming (required by AIRelay)."""
    payload = json.dumps({
        "model": openai_model,
        "stream": True,
        "reasoning_effort": reasoning_effort,
        "messages": [{"role": "user", "content": task}],
    })
    data = payload.encode("utf-8")
    req = urllib.request.Request(
        AIRELAY_CHAT,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            content_parts: list[str] = []
            model_used = openai_model
            raw = resp.read().decode("utf-8")
            for line in raw.split("\n"):
                line = line.strip()
                if not line.startswith("data: "):
                    continue
                data_str = line[6:]
                if data_str == "[DONE]":
                    break
                try:
                    chunk = json.loads(data_str)
                    model_used = chunk.get("model", model_used)
                    choices = chunk.get("choices", [])
                    if choices:
                        delta = choices[0].get("delta", {})
                        if "content" in delta and delta["content"]:
                            content_parts.append(delta["content"])
                except json.JSONDecodeError:
                    continue
            content = "".join(content_parts)
            return {
                "status": "executed",
                "message": f"OpenAI ({model_used}, reasoning_effort={reasoning_effort}) via AIRelay responded.",
                "command": f"POST {AIRELAY_CHAT}",
                "exit_code": 0,
                "stdout": content,
                "stderr": "",
                "model_used": model_used,
            }
    except (urllib.error.URLError, OSError, TimeoutError) as exc:
        return {
            "status": "error",
            "message": f"AIRelay call failed: {exc}",
            "command": f"POST {AIRELAY_CHAT}",
            "exit_code": 1,
            "stdout": "",
            "stderr": str(exc),
        }


def execute_cli(command: str, model_name: str, timeout: int) -> Dict[str, object]:
    """Execute a CLI command for Gemini."""
    try:
        completed = subprocess.run(
            command,
            shell=True,
            text=True,
            capture_output=True,
            timeout=timeout,
        )
        ok = completed.returncode == 0
        return {
            "status": "executed",
            "message": f"{model_name} completed {'successfully' if ok else 'with errors'}.",
            "command": command,
            "exit_code": completed.returncode,
            "stdout": completed.stdout,
            "stderr": completed.stderr,
        }
    except subprocess.TimeoutExpired:
        return {
            "status": "timeout",
            "message": f"{model_name} timed out after {timeout}s.",
            "command": command,
            "exit_code": 124,
            "stdout": "",
            "stderr": f"Timeout after {timeout}s",
        }


def execute_model(
    result: Dict[str, object],
    timeout_seconds: int,
    openai_model: str = DEFAULT_OPENAI_MODEL,
    reasoning_effort: str = DEFAULT_REASONING_EFFORT,
) -> Dict[str, object]:
    recommended = result["recommended_model"]
    command = result.get("command")

    if recommended == CLAUDE_LABEL:
        return {
            "status": "claude_self",
            "message": "Task stays in Claude Code (this session). No external execution needed.",
            "command": None,
            "exit_code": None,
            "stdout": "",
            "stderr": "",
        }

    if result["status"] == "missing_tool":
        return {
            "status": "missing_tool",
            "message": result.get("fallback_reason", "Tool not available."),
            "command": command,
            "exit_code": None,
            "stdout": "",
            "stderr": "",
        }

    if recommended == SONNET_LABEL:
        return execute_sonnet(str(result["expanded_task"]), timeout_seconds)

    if recommended == OPENAI_LABEL:
        return execute_openai(
            str(result["expanded_task"]),
            openai_model,
            reasoning_effort,
            timeout_seconds,
        )

    if recommended == GEMINI_LABEL and command:
        return execute_cli(command, recommended, timeout_seconds)

    return {
        "status": "no_command",
        "message": "No executable command available for this lane.",
        "command": None,
        "exit_code": None,
        "stdout": "",
        "stderr": "",
    }


def print_human(result: Dict[str, object], mode: str) -> int:
    recommended = result["recommended_model"]
    status = result["status"]
    print(f"recommended_model: {recommended}")
    print(f"status: {status}")
    if result.get("reason_summary"):
        print("reasons:")
        for reason in result["reason_summary"]:
            print(f"  - {reason}")
    if result.get("preset"):
        print(f"preset: {result['preset']}")

    if status == "missing_tool":
        print(f"fallback_model: {result['fallback_model']}")
        print(f"fallback_reason: {result['fallback_reason']}")

    if mode == "command":
        command = result.get("command")
        if command:
            print(f"command: {command}")
        else:
            print("command: none (keep work in Claude Code)")
    else:
        print("ranked_models:")
        for item in result["ranked_models"]:
            print(f"  - {item['name']}: {item['score']}")
    return 0


def parse_args(argv: List[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Route a task between Opus, Sonnet, OpenAI (AIRelay), and Gemini."
    )
    parser.add_argument("task", nargs="+", help="Natural language description of the task.")
    parser.add_argument(
        "--mode",
        choices=["plan", "command", "json", "execute"],
        default="plan",
        help="Output planning text, a command preview, JSON, or execute the selected model.",
    )
    parser.add_argument(
        "--force-model",
        choices=[CLAUDE_LABEL, SONNET_LABEL, OPENAI_LABEL, GEMINI_LABEL],
        default=None,
        help="Override the recommended lane.",
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_OPENAI_MODEL,
        help=f"OpenAI model name for AIRelay (default: {DEFAULT_OPENAI_MODEL}).",
    )
    parser.add_argument(
        "--reasoning-effort",
        choices=["low", "medium", "high"],
        default=DEFAULT_REASONING_EFFORT,
        help=f"Reasoning effort for OpenAI models (default: {DEFAULT_REASONING_EFFORT}).",
    )
    parser.add_argument(
        "--preset",
        choices=sorted(PRESET_CONFIG.keys()),
        default=None,
        help="Apply a preset wrapper prompt and default lane.",
    )
    parser.add_argument(
        "--timeout-seconds",
        type=int,
        default=180,
        help="Timeout for execute mode (default: 180s / 3 minutes).",
    )
    parser.add_argument(
        "--context-files",
        type=str,
        default="",
        help="Comma-separated file paths to include as context in the prompt.",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        default=False,
        help="Auto-apply ===FILE:=== blocks from output to disk.",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        default=False,
        help="Compact output: status, applied files, errors only.",
    )
    parser.add_argument(
        "--verify",
        type=str,
        default="",
        help="Command to run after applying files. Reports PASS/FAIL.",
    )
    return parser.parse_args(argv)


def main(argv: List[str]) -> int:
    args = parse_args(argv)
    task = _lower_join(args.task)

    # Append file contents to the task if --context-files provided
    context_file_list = [f.strip() for f in args.context_files.split(",") if f.strip()] if args.context_files else []
    context_block = load_context_files(context_file_list)
    if context_block:
        task = f"{task}\n\nHere are the relevant source files:\n\n{context_block}"

    # Resolve effective model/effort: preset overrides defaults, explicit CLI flags override preset
    preset_result = apply_preset(task, args.preset)
    cli_model_explicit = args.model != DEFAULT_OPENAI_MODEL
    cli_effort_explicit = args.reasoning_effort != DEFAULT_REASONING_EFFORT
    effective_model = args.model if cli_model_explicit else (preset_result.get("openai_model") or args.model)
    effective_effort = args.reasoning_effort if cli_effort_explicit else (preset_result.get("reasoning_effort") or args.reasoning_effort)

    result = choose_lane(task, args.force_model, args.preset, effective_model, effective_effort)

    if args.mode == "execute":
        execution = execute_model(result, args.timeout_seconds, effective_model, effective_effort)

        # Auto-apply file blocks if --apply is set
        if args.apply and execution.get("status") == "executed":
            stdout = execution.get("stdout", "")
            blocks = parse_file_blocks(stdout)
            if blocks:
                written = apply_file_blocks(blocks)
                execution["applied_files"] = written
                execution["applied_count"] = len(written)
            else:
                execution["applied_files"] = []
                execution["applied_count"] = 0
                execution["apply_warning"] = "No ===FILE:=== blocks found in output. Code may need manual extraction."

        # Run verification command if --verify is set
        verify_result = None
        if args.verify and execution.get("status") == "executed":
            try:
                vr = subprocess.run(
                    args.verify, shell=True, text=True,
                    capture_output=True, timeout=120,
                )
                verify_result = {
                    "status": "PASS" if vr.returncode == 0 else "FAIL",
                    "exit_code": vr.returncode,
                    "stdout_tail": vr.stdout[-500:] if vr.stdout else "",
                    "stderr_tail": vr.stderr[-500:] if vr.stderr else "",
                }
            except subprocess.TimeoutExpired:
                verify_result = {"status": "TIMEOUT", "exit_code": 124}

        if args.quiet:
            status = execution.get("status", "unknown")
            model_used = execution.get("model_used", effective_model)
            applied = execution.get("applied_files", [])
            warning = execution.get("apply_warning", "")
            lines = [f"status: {status}", f"model: {model_used}"]
            if applied:
                lines.append(f"applied_files: {', '.join(applied)}")
            if warning:
                lines.append(f"warning: {warning}")
            if status == "error":
                lines.append(f"error: {execution.get('stderr', execution.get('message', ''))}")
            if verify_result:
                lines.append(f"verify: {verify_result['status']}")
                if verify_result["status"] != "PASS" and verify_result.get("stderr_tail"):
                    lines.append(f"verify_stderr: {verify_result['stderr_tail']}")
            print("\n".join(lines))
            exit_code = execution.get("exit_code")
            return 0 if exit_code in (0, None) else int(exit_code)

        combined = dict(result)
        combined["execution"] = execution
        if verify_result:
            combined["verify"] = verify_result
        json.dump(combined, sys.stdout, indent=2)
        sys.stdout.write("\n")
        exit_code = execution.get("exit_code")
        return 0 if exit_code in (0, None) else int(exit_code)

    if args.mode == "json":
        json.dump(result, sys.stdout, indent=2)
        sys.stdout.write("\n")
        return 0

    return print_human(result, args.mode)


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
