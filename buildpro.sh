#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Cleaning previous install artifacts..."
rm -rf node_modules .next package-lock.json
rm -f tsconfig.tsbuildinfo

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required but not installed." >&2
  exit 1
fi

echo "Installing dependencies..."
pnpm install

echo "Building production bundle..."
pnpm build

echo "Build complete."
