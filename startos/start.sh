#!/bin/sh
# StartOS wrapper startup script for qBittorrent
# Runs as root inside the subcontainer before handing off to the official entrypoint.
set -e

QBIT_CONF_DIR="/config/qBittorrent/config"
QBIT_CONF="${QBIT_CONF_DIR}/qBittorrent.conf"

# ── 1. Pre-seed qBittorrent config with authentication disabled (first run) ─
if [ ! -f "${QBIT_CONF}" ]; then
  echo "[startos] First run — writing initial qBittorrent config (auth disabled)..."
  mkdir -p "${QBIT_CONF_DIR}"

  cat > "${QBIT_CONF}" << 'CONF'
[LegalNotice]
Accepted=true

[Preferences]
WebUI\AuthSubnetWhitelistEnabled=true
WebUI\AuthSubnetWhitelist=10.0.3.0/24
WebUI\LocalHostAuth=false
WebUI\CSRFProtection=false
WebUI\ClickjackingProtection=true
WebUI\SecureCookie=true
WebUI\HostHeaderValidation=true
Downloads\SavePath=/downloads/
CONF

  echo "[startos] Initial config written."
fi

# ── 2. Hand off to the official qBittorrent entrypoint ────────────────────────
echo "[startos] Launching qBittorrent via official entrypoint..."
exec /entrypoint.sh
