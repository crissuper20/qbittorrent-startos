import { VersionInfo } from '@start9labs/start-sdk'

export const v_5_1_4_0_4_alpha = VersionInfo.of({
  version: '5.1.4:0.4-alpha',
  releaseNotes: {
    en_US: 'Revamped for StartOS 0.4.0',
    es_ES: 'Renovado para StartOS 0.4.0',
    de_DE: 'Überarbeitet für StartOS 0.4.0',
    pl_PL: 'Przeprojektowany dla StartOS 0.4.0',
    fr_FR: 'Refait pour StartOS 0.4.0',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
