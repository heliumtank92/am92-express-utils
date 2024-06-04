import {
  API_LOGGER_CONSTANTS,
  ApiLoggerLogObject,
  namespace
} from '@am92/api-logger'
import httpContext from '../lib/httpContext'
import { ExpsRequest, ExpsResponse, ExpsNextFunction } from '../TYPES'

/**
 * Middleware to log API requests and responses.
 *
 * This middleware captures the timestamp when a request is received and logs
 * the request and response details once the response is finished.
 *
 * @export
 * @async
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
export default function apiLogging(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
): void {
  request.timestamp = Date.now()

  response.on('finish', () => {
    const logMeta = _buildLogMeta(request, response)
    const logFunc = _getLogFunc(logMeta.res?.statusCode || 500)
    logFunc(logMeta)
  })

  namespace.run(() => _setTrackingId(next))
}

/**
 * Middleware to manage logging configuration.
 *
 * This middleware allows enabling or disabling the logging of request bodies.
 *
 * @export
 * @param {boolean} disableBodyLog - Flag to disable logging of request bodies.
 */
export function logManager(disableBodyLog: boolean) {
  return function (
    request: ExpsRequest,
    response: ExpsResponse,
    next: ExpsNextFunction
  ): void {
    request.disableBodyLog = !!disableBodyLog
    process.nextTick(next)
  }
}

/** @ignore */
function _buildLogMeta(
  req: ExpsRequest,
  res: ExpsResponse
): ApiLoggerLogObject {
  const {
    httpVersionMajor,
    httpVersionMinor,
    originalUrl,
    url,
    method,
    headers: reqHeaders,
    body: reqBody = {},
    disableBodyLog
  } = req

  const httpVersion = `${httpVersionMajor}.${httpVersionMinor}`
  const requestIp = httpContext.get('headers.x-forwarded-for')
  const requestUrl = originalUrl || url

  const timestamp = Date.now()
  const responseTime = (req as any).timestamp
    ? timestamp - (req as any).timestamp
    : -1

  const { statusCode, statusMessage: status, body: resBody = {} } = res

  const responseMessage = resBody.message || ''
  const resHeaders = res.getHeaders()

  const message = `[HTTP/${httpVersion}] ${method} ${requestUrl} | ${statusCode} ${status} | ${responseMessage} ${responseTime}ms`

  const logMeta: ApiLoggerLogObject = {
    type: 'REQ_RES_LOG',
    message,

    req: {
      httpVersion,
      ipAddress: requestIp,
      url: requestUrl,
      method,
      headers: { ...reqHeaders },
      body: disableBodyLog ? {} : reqBody
    },

    res: {
      statusCode,
      status,
      headers: { ...resHeaders },
      body: disableBodyLog ? {} : resBody,
      responseMessage,
      responseTime
    }
  }

  return logMeta
}

/** @ignore */
function _getLogFunc(statusCode: number) {
  if (statusCode >= 200 && statusCode < 300) {
    return console.httpSuccess || console.info
  }

  if (statusCode >= 300 && statusCode < 400) {
    return console.httpInfo || console.info
  }

  return console.httpError || console.error
}

/** @ignore */
function _setTrackingId(next: ExpsNextFunction): void {
  if (namespace.active) {
    const sessionId = httpContext.getSessionId()
    const requestId = httpContext.getRequestId()
    const trackingId = `${sessionId}.${requestId}`
    namespace.set(API_LOGGER_CONSTANTS.TRACKING_ID, trackingId)
  }

  process.nextTick(next)
}
