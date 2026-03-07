export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting qBittorrent!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'qBittorrent Web Interface': 5,

  // actions/getCredentials.ts
  'Get Credentials': 6,
  'View login credentials for the qBittorrent Web UI': 7,
  'Admin Credentials': 8,
  'Use these credentials to log in to the qBittorrent Web UI.': 9,
  'Username': 10,
  'Password': 11,

  // interfaces.ts — P2P
  'BitTorrent P2P': 12,
  'BitTorrent peer-to-peer port for seeding and leeching': 13,

  // actions/setPassword.ts
  'Set Password': 14,
  'Change the admin password for the qBittorrent Web UI': 15,
  'Restart the service for the new password to take effect.': 16,
  'New Password': 17,
  'The new admin password': 18,
  'Password updated. Restart qBittorrent for the change to take effect.': 19,
  'Password Changed': 20,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
