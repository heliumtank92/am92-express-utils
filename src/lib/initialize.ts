import { ApiCrypto, ClientValidator } from '@am92/api-crypto'
import { SERVICE } from '../CONFIG'

/**
 * Initializes the ApiCrypto module with a custom client validator.
 *
 * This function sets up the ApiCrypto module by passing a custom client validator.
 * It logs the initialization process for debugging and informational purposes.
 *
 * @export
 * @async
 * @param {?ClientValidator} customValidateClient - The custom client validator to use for initialization.
 * @returns {Promise<void>} - A promise that resolves when the initialization is complete.
 */
export default async function initialize(
  customValidateClient?: ClientValidator
): Promise<void> {
  console.trace(`[${SERVICE} ExpressUtils] Initialising...`)
  await ApiCrypto.initialize(customValidateClient)
  console.info(`[${SERVICE} ExpressUtils] Initialised`)
}
