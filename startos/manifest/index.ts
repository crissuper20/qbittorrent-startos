import { setupManifest } from '@start9labs/start-sdk'
import { short, long } from './i18n'

export const manifest = setupManifest({
  id: 'qbittorrent',
  title: 'qBittorrent',
  license: 'MIT',
  wrapperRepo: 'https://github.com/crissuper20/qbittorrent-startos',
  upstreamRepo: 'https://github.com/qbittorrent/qBittorrent',
  supportSite: 'https://github.com/crissuper20/qbittorrent-startos/issues',
  marketingSite: 'https://github.com/crissuper20/qbittorrent-startos',
  donationUrl: 'https://donate.start9.com/',
  docsUrl: 'https://github.com/crissuper20/qbittorrent-startos/blob/master/README.md',
  description: { short, long },
  volumes: ['main', 'downloads'],
  images: {
    'qbittorrent': {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64', 'riscv64'],
    },
  },
  alerts: {
    install:
      'qBittorrent WebUI authentication is disabled for the StartOS internal subnet (10.0.3.0/24). All access is proxied through StartOS, but ensure the P2P port (6881) is not inadvertently exposing the WebUI.',
    update: null,
    uninstall: null,
    restore:
      'Restoring qBittorrent will also restore the downloads volume, which can easily be several GBs in size. Ensure you have sufficient disk space before proceeding.',
    start: null,
    stop: null,
  },
  // No dependencies - qBittorrent is self-contained.
  // FileBrowser/Nextcloud can mount our 'downloads' volume from their side.
  dependencies: {},
})
