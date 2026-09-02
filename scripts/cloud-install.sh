#!/usr/bin/env bash
set -euo pipefail

# This is not the Just works installer. Product path: https://github.com/glowly112/works
# Expert/library bootstrap only when KERNEL_LIBRARY_INSTALL=1.

if [[ "${KERNEL_LIBRARY_INSTALL:-}" != "1" ]]; then
  cat >&2 <<'EOF'
This is not the Just works installer.

just-works-kernel is a specialist skill library. It is not the product path
and not the installer for a new PC.

Install Just works from:
  https://github.com/glowly112/works
  (.grok/skills + scripts/install-just-works.sh)

A 12-stage FEATURE packet is not Just works. This kernel does not win on conflict.

To bootstrap this kernel as an expert/library, set:
  KERNEL_LIBRARY_INSTALL=1
EOF
  exit 1
fi

# Expert/library Cloud Agent bootstrap — 67 specialist skills.
# Not a 12-gate FEATURE / SOT overlay. After pull/clone, runs install.sh.
# Usage:
#   KERNEL_LIBRARY_INSTALL=1 bash <(curl -fsSL https://raw.githubusercontent.com/glowly112/just-works-kernel/main/scripts/cloud-install.sh)
#   or: KERNEL_LIBRARY_INSTALL=1 ./scripts/cloud-install.sh

REPO_URL="https://github.com/glowly112/just-works-kernel.git"
INSTALL_TARGET="${HOME}/.just-works-kernel"
CURSOR_HOME="${CURSOR_HOME:-${HOME}/.cursor}"

echo "==> [cloud-install] Expert/library bootstrap (not the Just works installer)..."

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
