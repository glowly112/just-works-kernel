#!/usr/bin/env bash
set -euo pipefail

# This is not the Just works installer. Product path: https://github.com/glowly112/works
# Expert/library install only when KERNEL_LIBRARY_INSTALL=1.

if [[ "${KERNEL_LIBRARY_INSTALL:-}" != "1" ]]; then
  cat >&2 <<'EOF'
This is not the Just works installer.

just-works-kernel is a specialist skill library. It is not the product path
and not the installer for a new PC.

Install Just works from:
  https://github.com/glowly112/works
  (.grok/skills + scripts/install-just-works.sh)

A 12-stage FEATURE packet is not Just works. This kernel does not win on conflict.

To install this kernel as an expert/library (67 specialist skills), set:
  KERNEL_LIBRARY_INSTALL=1
EOF
  exit 1
fi

# Determine repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Support CURSOR_HOME / GROK_HOME overrides for testing and cloud agents
CURSOR_HOME="${CURSOR_HOME:-${HOME}/.cursor}"
GROK_HOME="${GROK_HOME:-${HOME}/.grok}"
RULES_DEST="${CURSOR_HOME}/rules"
SKILLS_DEST="${CURSOR_HOME}/skills-cursor"
GROK_USER_SKILLS="${GROK_HOME}/user-skills"
GROK_SKILLS="${GROK_HOME}/skills"

echo "==> Installing just-works-kernel (short Just works path)"
echo "    Repo root:        ${REPO_ROOT}"
echo "    Cursor home:      ${CURSOR_HOME}"
echo "    Rules dest:       ${RULES_DEST}"
echo "    Cursor skills:    ${SKILLS_DEST}"
echo "    Grok user-skills: ${GROK_USER_SKILLS}"

mkdir -p "${RULES_DEST}" "${SKILLS_DEST}" "${GROK_USER_SKILLS}"

link_skills_into() {
  local dest="$1"
  local count=0
  local skill_path skill_name
  mkdir -p "${dest}"
  for skill_path in "${REPO_ROOT}/skills/"*; do
    if [[ -d "${skill_path}" && -f "${skill_path}/SKILL.md" ]]; then
      skill_name="$(basename "${skill_path}")"
      ln -sfn "${skill_path}" "${dest}/${skill_name}"
      count=$((count + 1))
    fi
  done
  echo "${count}"
}

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

# 2. Cursor CLI skills (~/.cursor/skills-cursor)
echo "==> Linking Cursor skills..."
SKILL_COUNT="$(link_skills_into "${SKILLS_DEST}")"
echo "    Linked ${SKILL_COUNT} skill(s) into ${SKILLS_DEST}"

# 3. Grok CLI extra path (config.toml [skills] paths = ["~/.grok/user-skills"])
echo "==> Linking Grok user-skills..."
GROK_USER_COUNT="$(link_skills_into "${GROK_USER_SKILLS}")"
echo "    Linked ${GROK_USER_COUNT} skill(s) into ${GROK_USER_SKILLS}"

# 4. ~/.grok/skills only when it is a real directory of per-skill links.
#    If it is a single symlink to another product (e.g. Multivibe GUI), skip it.
if [[ -L "${GROK_SKILLS}" ]]; then
  echo "==> Skipping ${GROK_SKILLS} (symlink to another product; will not replace)"
elif [[ -d "${GROK_SKILLS}" ]]; then
  echo "==> Linking Grok skills directory..."
  GROK_SKILLS_COUNT="$(link_skills_into "${GROK_SKILLS}")"
  echo "    Linked ${GROK_SKILLS_COUNT} skill(s) into ${GROK_SKILLS}"
else
  echo "==> Skipping ${GROK_SKILLS} (not a real directory; Grok CLI uses user-skills)"
fi

echo "==> Installation complete! (${RULE_COUNT} rules, ${SKILL_COUNT} skills)"
