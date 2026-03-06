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

  // actions
  'Connection Info': 6,
  'View connection details for the qBittorrent Web UI': 7,
  'Authentication is disabled. No login is required.': 8,
  'Authentication': 9,

  // interfaces.ts — P2P
  'BitTorrent P2P': 10,
  'BitTorrent peer-to-peer port for seeding and leeching': 11,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
