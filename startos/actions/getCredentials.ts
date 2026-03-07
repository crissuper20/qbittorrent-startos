import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'

/**
 * Action: Get Admin Credentials
 * Displays the login credentials for the qBittorrent Web UI.
 */
export const getCredentials = sdk.Action.withoutInput(
  'get-credentials',

  async ({ effects }) => ({
    name: i18n('Get Credentials'),
    description: i18n('View login credentials for the qBittorrent Web UI'),
    warning: null,
    allowedStatuses: 'any' as const,
    group: null,
    visibility: 'enabled' as const,
  }),

  async ({ effects }) => {
    const password =
      (await storeJson.read((s) => s.password).once()) ?? 'adminadmin'

    return {
      version: '1' as const,
      title: i18n('Admin Credentials'),
      message: i18n('Use these credentials to log in to the qBittorrent Web UI.'),
      result: {
        type: 'group' as const,
        value: [
          {
            type: 'single' as const,
            name: i18n('Username'),
            description: null,
            value: 'admin',
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single' as const,
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
