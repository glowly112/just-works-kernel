#!/usr/bin/env bash
set -euo pipefail

# Cursor Cloud Agent Bootstrap — short Just works path
# Installs skills/just-works/SKILL.md (next gate only, done bar, talk like a person).
# Not a 12-gate FEATURE / SOT overlay. After pull/clone, runs install.sh.
# Usage:
#   bash <(curl -fsSL https://raw.githubusercontent.com/glowly112/just-works-kernel/main/scripts/cloud-install.sh)
#   or directly: ./scripts/cloud-install.sh

REPO_URL="https://github.com/glowly112/just-works-kernel.git"
INSTALL_TARGET="${HOME}/.just-works-kernel"
CURSOR_HOME="${CURSOR_HOME:-${HOME}/.cursor}"

echo "==> [cloud-install] Bootstrapping short Just works path for Cursor Cloud Agent..."

# If executed from inside an existing checkout of just-works-kernel, use it
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "")"
if [[ -n "${SCRIPT_DIR}" && -f "${SCRIPT_DIR}/install.sh" ]]; then
  LOCAL_REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
  echo "    Using local repository at ${LOCAL_REPO_DIR}"
  CURSOR_HOME="${CURSOR_HOME}" bash "${LOCAL_REPO_DIR}/scripts/install.sh"
  exit 0
fi

# Otherwise clone or update standalone checkout
if [[ -d "${INSTALL_TARGET}/.git" ]]; then
  echo "    Updating existing clone at ${INSTALL_TARGET}..."
  git -C "${INSTALL_TARGET}" pull --ff-only || true
else
  echo "    Cloning ${REPO_URL} into ${INSTALL_TARGET}..."
  rm -rf "${INSTALL_TARGET}"
  git clone --depth 1 "${REPO_URL}" "${INSTALL_TARGET}"
fi

CURSOR_HOME="${CURSOR_HOME}" bash "${INSTALL_TARGET}/scripts/install.sh"
echo "==> [cloud-install] Cloud agent bootstrap completed successfully."
