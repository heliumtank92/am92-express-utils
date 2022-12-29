import ResponseBody from '../classes/ResponseBody.mjs'
import CustomError from '../classes/CustomError.mjs'
import handleResponse from './handleResponse.mjs'
import httpContext from '../httpContext.mjs'
import { ENCRYPTION_KEY_HEADER_KEY } from '../CONSTANTS.mjs'
import ApiCrypto from '@am92/api-crypto'

export default function handleError (piplelineError, request, response, next) {
  if (!piplelineError) { return process.nextTick(next) }

  let responseError

  // Handle ResponseBody
  if (piplelineError.constructor.name === ResponseBody.name) {
    responseError = piplelineError
  } else {
    // Handle Any Other Error
    const customError = new CustomError(piplelineError)
    const { statusCode, message, data, error, errorCode } = customError
    responseError = new ResponseBody(statusCode, message, data, error, errorCode)
  }

  // Encrypt if Key Encryption Key Exists
  const plaintextKey = httpContext.get(`headers.${ENCRYPTION_KEY_HEADER_KEY.toLowerCase()}`)
  if (plaintextKey) {
    const bodyString = JSON.stringify(responseError)
    const encryptedPayload = ApiCrypto.encryptData(bodyString, plaintextKey)
    responseError = { payload: encryptedPayload }
  }

  response.encryptedBody = responseError
  handleResponse(request, response, next)
}
