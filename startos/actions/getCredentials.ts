import { i18n } from '../i18n'
import { sdk } from '../sdk'

/**
 * Action: Connection Info
 * Displays connection details for the qBittorrent Web UI.
 */
export const connectionInfo = sdk.Action.withoutInput(
  'connection-info',

  async ({ effects }) => ({
    name: i18n('Connection Info'),
    description: i18n('View connection details for the qBittorrent Web UI'),
    warning: null,
    allowedStatuses: 'any' as const,
    group: null,
    visibility: 'enabled' as const,
  }),

  async ({ effects }) => {
    return {
      version: '1' as const,
      title: i18n('Connection Info'),
      message: i18n('Authentication is disabled. No login is required.'),
      result: {
        type: 'group' as const,
        value: [
          {
            type: 'single' as const,
            name: i18n('Authentication'),
            description: null,
            value: 'Disabled — no login required',
            masked: false,
            copyable: false,
            qr: false,
          },
        ],
      },
    }
  },
)
