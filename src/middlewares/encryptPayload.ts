import { ApiCrypto } from '@am92/api-crypto'
import ResponseBody from '../classes/ResponseBody'
import httpContext from '../lib/httpContext'
import { ExpsNextFunction, ExpsRequest, ExpsResponse } from '../TYPES'

/**
 * Middleware to encrypt the payload from the request body.
 *
 * This middleware retrieves the plaintext encryption key from the context,
 * encrypts the payload using the ApiCrypto module, and then sets the encrypted payload
 * back into the response body.
 *
 * @export
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
export default function encryptPayload(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
) {
  const { body } = response
  const plaintextKey = httpContext.getPlaintextEncryptionKey()

  if (body && plaintextKey) {
    const encryptedPayload = ApiCrypto.encryptData(body, plaintextKey)
    const data = { payload: encryptedPayload }
    response.encryptedBody = new ResponseBody(200, 'Success', data)
  }

  process.nextTick(next)
}
