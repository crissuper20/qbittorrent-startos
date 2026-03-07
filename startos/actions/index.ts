import { sdk } from '../sdk'
import { getCredentials } from './getCredentials'
import { setPassword } from './setPassword'

export const actions = sdk.Actions.of().addAction(getCredentials).addAction(setPassword)
