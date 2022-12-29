import ResponseBody from '../classes/ResponseBody.mjs'
import CustomError from '../classes/CustomError.mjs'
import handleResponse from './handleResponse.mjs'

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

  response.body = responseError
  handleResponse(request, response, next)
}
