import { ApiCrypto } from '@am92/api-crypto'
import httpContext from '../lib/httpContext'
import { ExpsRequest, ExpsResponse, ExpsNextFunction } from '../TYPES'

/**
 * Middleware to decrypt the payload from the request body.
 *
 * This middleware retrieves the encrypted payload from the request body,
 * decrypts it using the plaintext encryption key retrieved from the context,
 * and then sets the decrypted payload back into the request body.
 *
 * @export
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
export default function decryptPayload(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
) {
  const { body = {} } = request
  const { payload = '' } = body

  const plaintextKey = httpContext.getPlaintextEncryptionKey()

  if (plaintextKey) {
    if (payload) {
      const decryptedBody = ApiCrypto.decryptData(payload, plaintextKey)
      request.body = decryptedBody
    } else {
      request.body = {}
    }
  }

  process.nextTick(next)
}
