#!/usr/bin/env bash
set -euo pipefail

cd /repo

export CULTURABUILDER_STATE_DIR="/tmp/culturabuilder-test"
export CULTURABUILDER_CONFIG_PATH="${CULTURABUILDER_STATE_DIR}/culturabuilder.json"

echo "==> Seed state"
mkdir -p "${CULTURABUILDER_STATE_DIR}/credentials"
mkdir -p "${CULTURABUILDER_STATE_DIR}/agents/main/sessions"
echo '{}' >"${CULTURABUILDER_CONFIG_PATH}"
echo 'creds' >"${CULTURABUILDER_STATE_DIR}/credentials/marker.txt"
echo 'session' >"${CULTURABUILDER_STATE_DIR}/agents/main/sessions/sessions.json"

echo "==> Reset (config+creds+sessions)"
pnpm culturabuilder reset --scope config+creds+sessions --yes --non-interactive

test ! -f "${CULTURABUILDER_CONFIG_PATH}"
test ! -d "${CULTURABUILDER_STATE_DIR}/credentials"
test ! -d "${CULTURABUILDER_STATE_DIR}/agents/main/sessions"

echo "==> Recreate minimal config"
mkdir -p "${CULTURABUILDER_STATE_DIR}/credentials"
echo '{}' >"${CULTURABUILDER_CONFIG_PATH}"

echo "==> Uninstall (state only)"
pnpm culturabuilder uninstall --state --yes --non-interactive

test ! -d "${CULTURABUILDER_STATE_DIR}"

echo "OK"
