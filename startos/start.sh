#!/bin/sh
# StartOS wrapper startup script for qBittorrent
# Runs as root inside the subcontainer before handing off to the official entrypoint.
set -e

QBIT_CONF_DIR="/config/qBittorrent/config"
QBIT_CONF="${QBIT_CONF_DIR}/qBittorrent.conf"

# ── 1. Pre-seed qBittorrent config (first run) ───────────────────────────────
if [ ! -f "${QBIT_CONF}" ]; then
  echo "[startos] First run — writing initial qBittorrent config..."
  mkdir -p "${QBIT_CONF_DIR}"

  cat > "${QBIT_CONF}" << 'CONF'
[LegalNotice]
Accepted=true

[Preferences]
WebUI\AuthSubnetWhitelistEnabled=false
WebUI\LocalHostAuth=true
WebUI\CSRFProtection=false
WebUI\ClickjackingProtection=false
WebUI\SecureCookie=false 
WebUI\HostHeaderValidation=false # StartOS proxies requests, so host-header validation, and the other browser security flags must be disabled
WebUI\Username=admin
WebUI\Password_PBKDF2="@ByteArray(cqfruLkSNXvpIv5N6neJtA==:YhXepGGPPugdMLQxiCaF5sCdVPfw2wDEUb6srNbxioIC64HyCZ5yR9ROCPfWUTTFBzTYBqyua+eHFFJ78Fpunw==)"
Downloads\SavePath=/downloads/
CONF

  echo "[startos] Initial config written."
fi

# ── 2. Patch existing config for reverse-proxy compatibility ──────────────────
# StartOS proxies requests, so host-header validation and other browser
# security flags that assume direct access must be disabled.
echo "[startos] Ensuring reverse-proxy-safe WebUI settings..."
sed -i \
  -e 's/^WebUI\\HostHeaderValidation=.*/WebUI\\HostHeaderValidation=false/' \
  -e 's/^WebUI\\CSRFProtection=.*/WebUI\\CSRFProtection=false/' \
  -e 's/^WebUI\\ClickjackingProtection=.*/WebUI\\ClickjackingProtection=false/' \
  -e 's/^WebUI\\SecureCookie=.*/WebUI\\SecureCookie=false/' \
  "${QBIT_CONF}"

# ── 3. Apply password from store.json if set ──────────────────────────────────
STORE_JSON="/config/store.json"
if [ -f "${STORE_JSON}" ]; then
  PASSWORD=$(cat "${STORE_JSON}" | sed -n 's/.*"password" *: *"\([^"]*\)".*/\1/p')
  if [ -n "${PASSWORD}" ]; then
    echo "[startos] Applying password from store.json..."
    # Generate 16 random bytes for salt
    SALT=$(openssl rand -base64 16)
    # Hex-encode password and salt for openssl kdf
    HEX_PASS=$(printf '%s' "${PASSWORD}" | od -A n -t x1 | tr -d ' \n')
    HEX_SALT=$(printf '%s' "${SALT}" | base64 -d | od -A n -t x1 | tr -d ' \n')
    # Derive PBKDF2-HMAC-SHA512 hash (100000 iterations, 64-byte output)
    HASH=$(openssl kdf -keylen 64 -kdfopt digest:SHA512 -kdfopt hexpass:${HEX_PASS} -kdfopt hexsalt:${HEX_SALT} -kdfopt iter:100000 -binary PBKDF2 2>/dev/null | base64 -w0)
    if [ -n "${HASH}" ]; then
      PBKDF2="@ByteArray(${SALT}:${HASH})"
      sed -i "s|^WebUI\\\\Password_PBKDF2=.*|WebUI\\\\Password_PBKDF2=\"${PBKDF2}\"|" "${QBIT_CONF}"
      echo "[startos] Password updated in qBittorrent config."
    else
      echo "[startos] Warning: failed to generate PBKDF2 hash, password not changed."
    fi
  fi
fi

# ── 4. Hand off to the official qBittorrent entrypoint ────────────────────────
echo "[startos] Launching qBittorrent via official entrypoint..."
exec /entrypoint.sh
