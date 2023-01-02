import httpContext from '../lib/httpContext.mjs'
import ResponseBody from '../classes/ResponseBody.mjs'
import { REQUEST_ID_HEADER_KEY, SESSION_ID_HEADER_KEY } from '../CONSTANTS.mjs'

export default function handleExpressResponse (request, response, next) {
  // Set Headers
  _setHeaders(request, response)

  // Handle Response for Error / No Route / Response
  const responseHandler = (response.isError || request.isMatch)
    ? _handleDataResponse
    : _handleNoRouteResponse

  responseHandler(request, response, next)
}

function _setHeaders (request, response) {
  const requestId = httpContext.get(`headers.${REQUEST_ID_HEADER_KEY}`)
  const sessionId = httpContext.get(`headers.${SESSION_ID_HEADER_KEY}`)

  const currentExposeHeaders = response.get('Access-Control-Expose-Headers')
  const currentExposeHeadersArray = (currentExposeHeaders && currentExposeHeaders.split(',')) || []
  const newExposeHeaders = [...currentExposeHeadersArray, REQUEST_ID_HEADER_KEY, SESSION_ID_HEADER_KEY].join()

  // Set Response Headers
  response.set(REQUEST_ID_HEADER_KEY, requestId)
  response.set(SESSION_ID_HEADER_KEY, sessionId)
  response.set('Access-Control-Expose-Headers', newExposeHeaders)
}

function _handleNoRouteResponse (request, response, next) {
  const { method, originalUrl } = request
  const message = `Cannot ${method} ${originalUrl}`
  const resBody = new ResponseBody(404, message)
  response.body = resBody
  response.status(resBody.statusCode).json(resBody)
}

function _handleDataResponse (request, response, next) {
  const resBody = response.encryptedBody || response.body || {}
  const handler = ([301, 302].indexOf(resBody.statusCode) > -1)
    ? _redirectResponse
    : _sendResponse

  handler(request, response, next)
}

function _sendResponse (request, response, next) {
  let resBody = response.encryptedBody || response.body || {}

  if (!resBody.statusCode) {
    resBody = new ResponseBody(500, 'Response Data Not Found!')
  }

  response.status(resBody.statusCode).json(resBody)
}

function _redirectResponse (request, response, next) {
  const resBody = response.encryptedBody || response.body || {}
  const { statusCode, data } = resBody
  response.status(statusCode).redirect(data)
}
