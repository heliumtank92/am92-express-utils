import { ApiCrypto } from '@am92/api-crypto'
import { Request, Response, NextFunction } from 'express'
import httpContext from '../lib/httpContext'

/**
 * Middleware to decrypt the payload from the request body.
 *
 * This middleware retrieves the encrypted payload from the request body,
 * decrypts it using the plaintext encryption key retrieved from the context,
 * and then sets the decrypted payload back into the request body.
 *
 * @export
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export default function decryptPayload(
  request: Request,
  response: Response,
  next: NextFunction
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
