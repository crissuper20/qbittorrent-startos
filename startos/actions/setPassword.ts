import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  password: Value.text({
    name: i18n('New Password'),
    description: i18n('The new admin password'),
    required: true,
    default: null,
    masked: true,
    generate: { charset: 'a-z,A-Z,0-9', len: 22 },
    inputmode: 'text',
    patterns: [],
    placeholder: null,
  }),
})

export const setPassword = sdk.Action.withInput(
  'set-password',

  async ({ effects }) => ({
    name: i18n('Set Password'),
    description: i18n(
      'Change the admin password for the qBittorrent Web UI',
    ),
    warning: i18n(
      'Restart the service for the new password to take effect.',
    ),
    allowedStatuses: 'any' as const,
    group: null,
    visibility: 'enabled' as const,
  }),

  inputSpec,

  async ({ effects }) => {
    const password = await storeJson.read((s) => s.password).once()
    return { password: password ?? undefined }
  },

  async ({ effects, input }) => {
    await storeJson.merge(effects, { password: input.password })

    return {
      version: '1' as const,
      title: i18n('Password Changed'),
      message: i18n(
        'Password updated. Restart qBittorrent for the change to take effect.',
      ),
      result: null,
    }
  },
)
