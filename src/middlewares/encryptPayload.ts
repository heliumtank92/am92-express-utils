import { ApiCrypto } from '@am92/api-crypto'
import { Request, Response, NextFunction } from 'express'
import ResponseBody from '../classes/ResponseBody'
import httpContext from '../lib/httpContext'

/**
 * Middleware to encrypt the payload from the request body.
 *
 * This middleware retrieves the plaintext encryption key from the context,
 * encrypts the payload using the ApiCrypto module, and then sets the encrypted payload
 * back into the response body.
 *
 * @export
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export default function encryptPayload(
  request: Request,
  response: Response,
  next: NextFunction
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
