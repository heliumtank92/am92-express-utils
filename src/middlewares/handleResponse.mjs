import httpContext from '../lib/httpContext.mjs'
import ResponseBody from '../classes/ResponseBody.mjs'
import EXPS_CONST from '../EXPS_CONST.mjs'

export default function handleResponse(request, response, next) {
  // Set Headers
  _setHeaders(request, response)

  // Handle Response for Error / No Route / Response
  const responseHandler =
    response.isError || request.isMatch
      ? _handleDataResponse
      : _handleNoRouteResponse

  responseHandler(request, response, next)
}

function _setHeaders(request, response) {
  const requestId = httpContext.getRequestId()
  const sessionId = httpContext.getSessionId()

  const currentExposeHeaders = response.get('Access-Control-Expose-Headers')
  const currentExposeHeadersArray =
    (currentExposeHeaders && currentExposeHeaders.split(',')) || []
  const newExposeHeaders = [
    ...currentExposeHeadersArray,
    EXPS_CONST.REQUEST_ID_HEADER_KEY,
    EXPS_CONST.SESSION_ID_HEADER_KEY
  ].join()

  // Set Response Headers
  response.set(EXPS_CONST.REQUEST_ID_HEADER_KEY, requestId)
  response.set(EXPS_CONST.SESSION_ID_HEADER_KEY, sessionId)
  response.set('Access-Control-Expose-Headers', newExposeHeaders)
}

function _handleNoRouteResponse(request, response, next) {
  const { method, originalUrl } = request
  const message = `Cannot ${method} ${originalUrl}`
  const resBody = new ResponseBody(404, message)
  response.body = resBody
  response.status(resBody.statusCode).json(resBody)
}

function _handleDataResponse(request, response, next) {
  const resBody = response.encryptedBody || response.body || {}
  const handler =
    [301, 302].indexOf(resBody.statusCode) > -1
      ? _redirectResponse
      : _sendResponse

  handler(request, response, next)
}

function _sendResponse(request, response, next) {
  let resBody = response.encryptedBody || response.body || {}

  if (!resBody.statusCode) {
    resBody = new ResponseBody(500, 'Response Data Not Found!')
  }

  response.status(resBody.statusCode).json(resBody)
}

function _redirectResponse(request, response, next) {
  const resBody = response.encryptedBody || response.body || {}
  const { statusCode, data } = resBody
  response.status(statusCode).redirect(data)
}
