import { getConfig } from './_utils'

export function getDomain() {
  return getConfig<string>('domain', '')
}
