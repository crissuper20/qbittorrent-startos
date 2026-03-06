import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort, torrentPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  // webui
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web UI'),
    id: 'ui',
    description: i18n('qBittorrent Web Interface'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })
  const uiReceipt = await uiMultiOrigin.export([ui])

  // BitTorrent P2P 
  const p2pMulti = sdk.MultiHost.of(effects, 'p2p-multi')
  const p2pOrigin = await p2pMulti.bindPort(torrentPort, {
    protocol: null,
    preferredExternalPort: torrentPort,
    addSsl: null,
    secure: { ssl:false },
  })
  const p2p = sdk.createInterface(effects, {
    name: i18n('BitTorrent P2P'),
    id: 'p2p',
    description: i18n('BitTorrent peer-to-peer port for seeding and leeching'),
    type: 'p2p',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })
  const p2pReceipt = await p2pOrigin.export([p2p])

  return [uiReceipt, p2pReceipt]
})
