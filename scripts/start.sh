#!/usr/bin/env bash
# Run production server (requires build first)
set -euo pipefail

source "$(dirname "$0")/lib/common.sh"

ensure_node
ensure_pnpm
cd_root

if [[ ! -d "${ROOT_DIR}/.next" ]]; then
  log_error "No production build found. Run: ./scripts/build.sh"
  exit 1
fi

log_info "Starting production server on port ${PORT:-3000}..."
exec pnpm start
