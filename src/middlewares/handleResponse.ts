import httpContext from '../lib/httpContext'
import ResponseBody from '../classes/ResponseBody'
import CONSTANTS from '../CONSTANTS'
import { ExpsRequest, ExpsResponse, ExpsNextFunction } from '../TYPES'

/**
 * Middleware to handle the response for the request.
 *
 * This middleware function sets the necessary headers and determines the appropriate response handler
 * based on whether the response is an error or if the request matches a route. It then invokes the
 * selected response handler to process the response.
 *
 * @export
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
export default function handleResponse(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
): void {
  // Set Headers
  _setHeaders(request, response)

  // Handle Response for Error / No Route / Response
  const responseHandler =
    response.isError || request.isMatch
      ? _handleDataResponse
      : _handleNoRouteResponse

  responseHandler(request, response, next)
}

/** @ignore */
function _setHeaders(request: ExpsRequest, response: ExpsResponse) {
  const requestId = httpContext.getRequestId()
  const sessionId = httpContext.getSessionId()

  const currentExposeHeaders = response.get('Access-Control-Expose-Headers')
  const currentExposeHeadersArray =
    (currentExposeHeaders && currentExposeHeaders.split(',')) || []
  const newExposeHeaders = [
    ...currentExposeHeadersArray,
    CONSTANTS.REQUEST_ID_HEADER_KEY,
    CONSTANTS.SESSION_ID_HEADER_KEY
  ].join()

  // Set Response Headers
  response.set(CONSTANTS.REQUEST_ID_HEADER_KEY, requestId)
  response.set(CONSTANTS.SESSION_ID_HEADER_KEY, sessionId)
  response.set('Access-Control-Expose-Headers', newExposeHeaders)
}

/** @ignore */
function _handleNoRouteResponse(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
) {
  const { method, originalUrl } = request
  const message = `Cannot ${method} ${originalUrl}`
  const resBody = new ResponseBody(404, message)
  response.body = resBody
  response.status(resBody.statusCode).json(resBody)
}

/** @ignore */
function _handleDataResponse(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
) {
  const resBody = response.encryptedBody || response.body || {}
  const handler =
    [301, 302].indexOf(resBody.statusCode) > -1
      ? _redirectResponse
      : _sendResponse

  handler(request, response, next)
}

/** @ignore */
function _sendResponse(request: ExpsRequest, response: ExpsResponse) {
  let resBody = response.encryptedBody || response.body || {}

  if (!resBody.statusCode) {
    resBody = new ResponseBody(500, 'Response Data Not Found!')
  }

  response.status(resBody.statusCode).json(resBody)
}

/** @ignore */
function _redirectResponse(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
) {
  const resBody = response.encryptedBody || response.body || {}
  const { statusCode, data } = resBody
  response.status(statusCode).redirect(data)
}
