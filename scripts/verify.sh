#!/usr/bin/env bash
# Full quality gate: format check, lint, typecheck, build
set -euo pipefail

source "$(dirname "$0")/lib/common.sh"

ensure_node
ensure_pnpm
cd_root

log_info "Running verification pipeline..."

log_info "→ Prettier check"
pnpm format:check

log_info "→ ESLint"
pnpm lint

log_info "→ TypeScript"
pnpm typecheck

log_info "→ Production build"
pnpm build

log_ok "All checks passed. Ready to ship."
