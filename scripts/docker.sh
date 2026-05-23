#!/usr/bin/env bash
# Docker build and run helpers
set -euo pipefail

source "$(dirname "$0")/lib/common.sh"

ACTION="${1:-up}"
IMAGE_NAME="${IMAGE_NAME:-stadiumos-ai}"

cd_root

case "${ACTION}" in
  build)
    log_info "Building Docker image: ${IMAGE_NAME}"
    docker build -f Dockerfile -t "${IMAGE_NAME}" .
    log_ok "Image built: ${IMAGE_NAME}"
    ;;
  up)
    log_info "Starting Docker Compose..."
    docker compose up --build
    ;;
  down)
    docker compose down
    log_ok "Containers stopped"
    ;;
  *)
    echo "Usage: ./scripts/docker.sh [build|up|down]"
    exit 1
    ;;
esac
