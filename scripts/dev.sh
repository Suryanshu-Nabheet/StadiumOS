#!/usr/bin/env bash
# Start Next.js development server (Turbopack)
set -euo pipefail

source "$(dirname "$0")/lib/common.sh"

ensure_node
ensure_pnpm
ensure_env_file
cd_root

log_info "Starting development server..."
log_info "App: http://localhost:3000"
log_info "Dashboard: http://localhost:3000/dashboard"
echo ""

exec pnpm dev
