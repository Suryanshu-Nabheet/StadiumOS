#!/usr/bin/env bash
# Production build
set -euo pipefail

source "$(dirname "$0")/lib/common.sh"

ensure_node
ensure_pnpm
cd_root

log_info "Building StadiumOS AI for production..."
pnpm build
log_ok "Build complete. Run: pnpm start  or  ./scripts/start.sh"
