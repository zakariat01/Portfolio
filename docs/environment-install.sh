#!/usr/bin/env bash
set -euo pipefail
cd /workspace/Portfolio
npm ci --no-audit --no-fund
npm run build
