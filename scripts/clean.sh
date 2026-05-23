#!/usr/bin/env bash
# Remove build artifacts and caches
set -euo pipefail

source "$(dirname "$0")/lib/common.sh"

cd_root

log_info "Cleaning build artifacts..."

rm -rf .next out node_modules/.cache 2>/dev/null || true

if [[ "${1:-}" == "--all" ]]; then
  log_warn "Removing node_modules (full clean)..."
  rm -rf node_modules
  log_ok "Full clean complete. Run ./scripts/setup.sh"
else
  log_ok "Clean complete. Run ./scripts/dev.sh to rebuild."
fi
