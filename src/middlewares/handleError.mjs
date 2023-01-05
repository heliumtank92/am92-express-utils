import ApiCrypto from '@am92/api-crypto'
import httpContext from '../lib/httpContext.mjs'
import handleResponse from './handleResponse.mjs'

import ResponseBody from '../classes/ResponseBody.mjs'
import CustomError from '../classes/CustomError.mjs'
import { ENCRYPTION_KEY_HEADER_KEY } from '../CONSTANTS.mjs'

export default function handleError (piplelineError, request, response, next) {
  if (!piplelineError) { return process.nextTick(next) }

  // Handle ResponseBody
  if (piplelineError.constructor.name === ResponseBody.name) {
    response.body = piplelineError
    response.isError = true
  } else {
    // Handle Any Other Error
    const customError = new CustomError(piplelineError)
    const { statusCode, message, data, error, errorCode } = customError
    response.body = new ResponseBody(statusCode, message, data, error, errorCode)
    response.isError = true
  }

  // Encrypt if Key Encryption Key Exists
  const plaintextKey = httpContext.get(`headers.${ENCRYPTION_KEY_HEADER_KEY}`)
  if (plaintextKey) {
    const bodyString = JSON.stringify(response.body)
    const encryptedPayload = ApiCrypto.encryptData(bodyString, plaintextKey)
    response.encryptedBody = { payload: encryptedPayload }
  }

  handleResponse(request, response, next)
}
