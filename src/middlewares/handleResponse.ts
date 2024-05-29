import { Request, Response, NextFunction } from 'express'
import httpContext from '../lib/httpContext'
import ResponseBody from '../classes/ResponseBody'
import CONSTANTS from '../CONSTANTS'

/**
 * Middleware to handle the response for the request.
 *
 * This middleware function sets the necessary headers and determines the appropriate response handler
 * based on whether the response is an error or if the request matches a route. It then invokes the
 * selected response handler to process the response.
 *
 * @export
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export default function handleResponse(
  request: Request,
  response: Response,
  next: NextFunction
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
function _setHeaders(request: Request, response: Response) {
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
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { method, originalUrl } = request
  const message = `Cannot ${method} ${originalUrl}`
  const resBody = new ResponseBody(404, message)
  response.body = resBody
  response.status(resBody.statusCode).json(resBody)
}

/** @ignore */
function _handleDataResponse(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const resBody = response.encryptedBody || response.body || {}
  const handler =
    [301, 302].indexOf(resBody.statusCode) > -1
      ? _redirectResponse
      : _sendResponse

  handler(request, response, next)
}

/** @ignore */
function _sendResponse(request: Request, response: Response) {
  let resBody = response.encryptedBody || response.body || {}

  if (!resBody.statusCode) {
    resBody = new ResponseBody(500, 'Response Data Not Found!')
  }

  response.status(resBody.statusCode).json(resBody)
}

/** @ignore */
function _redirectResponse(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const resBody = response.encryptedBody || response.body || {}
  const { statusCode, data } = resBody
  response.status(statusCode).redirect(data)
}
