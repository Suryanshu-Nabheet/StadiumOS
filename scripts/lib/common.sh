#!/usr/bin/env bash
# Shared helpers for StadiumOS AI scripts

set -euo pipefail

# Resolve repo root (scripts/lib -> scripts -> root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"

export ROOT_DIR
export PNPM_VERSION="10.12.1"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info()  { echo -e "${CYAN}[stadiumos]${NC} $*"; }
log_ok()    { echo -e "${GREEN}[stadiumos]${NC} $*"; }
log_warn()  { echo -e "${YELLOW}[stadiumos]${NC} $*"; }
log_error() { echo -e "${RED}[stadiumos]${NC} $*" >&2; }

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    log_error "Required command not found: $1"
    exit 1
  fi
}

cd_root() {
  cd "${ROOT_DIR}"
}

ensure_node() {
  require_command node
  local major
  major="$(node -p "process.versions.node.split('.')[0]")"
  if [[ "${major}" -lt 20 ]]; then
    log_error "Node.js 20+ required (found $(node -v))"
    exit 1
  fi
}

ensure_pnpm() {
  if command -v pnpm >/dev/null 2>&1; then
    return 0
  fi
  log_info "Enabling Corepack for pnpm ${PNPM_VERSION}..."
  require_command corepack
  corepack enable
  corepack prepare "pnpm@${PNPM_VERSION}" --activate
}

ensure_env_file() {
  if [[ ! -f "${ROOT_DIR}/.env.local" ]]; then
    if [[ -f "${ROOT_DIR}/.env.example" ]]; then
      cp "${ROOT_DIR}/.env.example" "${ROOT_DIR}/.env.local"
      log_ok "Created .env.local from .env.example"
    else
      log_warn "No .env.example found — skipping env bootstrap"
    fi
  else
    log_info ".env.local already exists"
  fi
}

run_pnpm() {
  cd_root
  pnpm "$@"
}
