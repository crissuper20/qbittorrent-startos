import { sdk } from '../sdk'
import { connectionInfo } from './getCredentials'

export const actions = sdk.Actions.of().addAction(connectionInfo)
