#!/usr/bin/env bash
# First-time and repeat project setup for StadiumOS AI
set -euo pipefail

source "$(dirname "$0")/lib/common.sh"

log_info "StadiumOS AI — setup"
log_info "Repository: ${ROOT_DIR}"

ensure_node
ensure_pnpm
cd_root

log_info "Installing dependencies..."
pnpm install --frozen-lockfile 2>/dev/null || pnpm install

ensure_env_file

log_info "Running verification (typecheck + lint)..."
if pnpm typecheck && pnpm lint; then
  log_ok "Verification passed"
else
  log_warn "Verification reported issues — you can still run ./scripts/dev.sh"
fi

echo ""
log_ok "Setup complete."
echo ""
echo "  Next steps:"
echo "    1. Edit .env.local (optional GEMINI_API_KEY)"
echo "    2. ./scripts/dev.sh          — start development"
echo "    3. open http://localhost:3000"
echo ""
echo "  Docs: docs/README.md"
echo ""
