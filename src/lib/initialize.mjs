import ApiCrypto from '@am92/api-crypto'
import { SERVICE } from '../CONFIG.mjs'

export default async function initialize (customValidateClient) {
  console.trace(`[${SERVICE} ExpressUtils] Initialising...`)
  await ApiCrypto.initialize(customValidateClient)
  console.info(`[${SERVICE} ExpressUtils] Initialised`)
}
