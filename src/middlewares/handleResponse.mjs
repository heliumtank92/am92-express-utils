import ResponseBody from '../classes/ResponseBody.mjs'

export default function handleExpressResponse (request, response, next) {
  let responseHandler

  // Handle Response for No Route
  const { isMatch } = request
  responseHandler = !isMatch && _handleNoRouteResponse

  // Handle Response for EncryptedBody / PlaintextBody
  responseHandler = responseHandler || _handleDataResponse

  responseHandler(request, response, next)
}

function _handleNoRouteResponse (request, response, next) {
  const { method, originalUrl } = request
  const message = `Cannot ${method} ${originalUrl}`
  const error = new ResponseBody(404, message)
  response.status(error.statusCode).json(error)
}

function _handleDataResponse (request, response, next) {
  const resBody = response.encryptedBody || response.body || {}
  const { statusCode } = resBody

  const handler = ([301, 302].indexOf(statusCode) > -1)
    ? _redirectResponse
    : _sendResponse

  handler(request, response, next)
}

function _sendResponse (request, response, next) {
  let resBody = response.encryptedBody || response.body || {}
  const { statusCode } = resBody

  if (!resBody || !statusCode) {
    resBody = new ResponseBody(500, 'Response Data Not Found!')
  }

  response.status(resBody.statusCode).json(resBody)
}

function _redirectResponse (request, response, next) {
  const resBody = response.encryptedBody || response.body || {}
  const { statusCode, data } = resBody
  response.status(statusCode).redirect(data)
}
