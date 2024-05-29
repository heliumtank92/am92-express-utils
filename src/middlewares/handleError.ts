import { ApiCrypto } from '@am92/api-crypto'
import { Request, Response, NextFunction } from 'express'

import httpContext from '../lib/httpContext'
import handleResponse from './handleResponse'
import ResponseBody from '../classes/ResponseBody'
import CustomError from '../classes/CustomError'

/**
 * Middleware to handle errors in the request pipeline.
 *
 * This middleware function processes errors that occur during the request pipeline.
 * It distinguishes between custom errors and other errors, formats the response body accordingly,
 * and optionally encrypts the response if an encryption key is available.
 *
 * @export
 * @param {Error} piplelineError - The error object caught in the pipeline.
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export default function handleError(
  piplelineError: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  if (!piplelineError) {
    process.nextTick(next)
    return
  }

  // Handle ResponseBody
  if (piplelineError.constructor.name === ResponseBody.name) {
    response.body = piplelineError
    response.isError = true
  } else {
    // Handle Any Other Error
    const customError = new CustomError(piplelineError)
    const { statusCode, message, data, error, errorCode } = customError
    response.body = new ResponseBody(
      statusCode,
      message,
      data,
      error,
      errorCode
    )
    response.isError = true
  }

  // Encrypt if Key Encryption Key Exists
  const plaintextKey = httpContext.getPlaintextEncryptionKey()
  if (plaintextKey) {
    const bodyString = JSON.stringify(response.body)
    const encryptedPayload = ApiCrypto.encryptData(bodyString, plaintextKey)
    const data = { payload: encryptedPayload }
    response.encryptedBody = new ResponseBody(200, 'Success', data)
  }

  handleResponse(request, response, next)
}
