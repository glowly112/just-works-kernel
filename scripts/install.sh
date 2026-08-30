#!/usr/bin/env bash
set -euo pipefail

# Determine repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Support CURSOR_HOME overrides for testing and cloud agents (default: ~/.cursor)
CURSOR_HOME="${CURSOR_HOME:-${HOME}/.cursor}"
RULES_DEST="${CURSOR_HOME}/rules"
SKILLS_DEST="${CURSOR_HOME}/skills-cursor"

echo "==> Installing just-works-kernel to Cursor environment"
echo "    Repo root:   ${REPO_ROOT}"
echo "    Cursor home: ${CURSOR_HOME}"
echo "    Rules dest:  ${RULES_DEST}"
echo "    Skills dest: ${SKILLS_DEST}"

mkdir -p "${RULES_DEST}" "${SKILLS_DEST}"

# 1. Install / Link Rules (*.mdc)
echo "==> Linking rules..."
RULE_COUNT=0
for rule_file in "${REPO_ROOT}/rules/"*.mdc; do
  if [[ -f "${rule_file}" ]]; then
    rule_name="$(basename "${rule_file}")"
    ln -sfn "${rule_file}" "${RULES_DEST}/${rule_name}"
    RULE_COUNT=$((RULE_COUNT + 1))
  fi
done
echo "    Linked ${RULE_COUNT} rule(s) into ${RULES_DEST}"

# 2. Install / Link Skills
echo "==> Linking skills..."
SKILL_COUNT=0
for skill_path in "${REPO_ROOT}/skills/"*; do
  if [[ -d "${skill_path}" && -f "${skill_path}/SKILL.md" ]]; then
    skill_name="$(basename "${skill_path}")"
    ln -sfn "${skill_path}" "${SKILLS_DEST}/${skill_name}"
    SKILL_COUNT=$((SKILL_COUNT + 1))
  fi
done
echo "    Linked ${SKILL_COUNT} skill(s) into ${SKILLS_DEST}"

echo "==> Installation complete! (${RULE_COUNT} rules, ${SKILL_COUNT} skills)"
