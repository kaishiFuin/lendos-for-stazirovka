#!/usr/bin/env bash
set -euo pipefail

export PYTHONPATH="$(dirname "$0")/..:$PYTHONPATH"
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
