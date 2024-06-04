import { ApiCrypto } from '@am92/api-crypto'
import httpContext from '../lib/httpContext'
import { ExpsRequest, ExpsResponse, ExpsNextFunction } from '../TYPES'

/**
 * Middleware to decrypt the encryption key from the request context.
 *
 * This middleware retrieves the client ID and the encrypted encryption key from the request context,
 * decrypts the encryption key using the ApiCrypto module, and then sets the decrypted key back into the context.
 * It ensures that the decrypted key is available for subsequent middleware or request handlers.
 *
 * @export
 * @async
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
export default async function decryptCryptoKey(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
): Promise<void> {
  // Extract Headers
  const clientId = httpContext.getClientId()
  const ciphertextKey = httpContext.getEncryptionKey()

  // Decrypt Key
  const plainTextKey = await ApiCrypto.decryptKey(clientId, ciphertextKey)
  httpContext.setPlaintextEncryptionKey(plainTextKey)

  next()
}
