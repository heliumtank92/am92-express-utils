import { API_LOGGER_TRACKING_ID, namespace } from '@am92/api-logger'
import httpContext from '../lib/httpContext.mjs'

export default function apiLogging (request, response, next) {
  request.timestamp = Date.now()

  response.on('finish', () => {
    const logMeta = _buildLogMeta(request, response)
    const logFunc = _getLogFunc(logMeta.res.statusCode)
    logFunc(logMeta)
  })

  namespace.run(() => _setTrackingId(next))
}

export function logManager (disableBodyLog) {
  return function (request, response, next) {
    request.disableBodyLog = disableBodyLog
    process.nextTick(next)
  }
}

function _buildLogMeta (req, res) {
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
  const responseTime = req.timestamp ? (timestamp - req.timestamp) : -1

  const {
    statusCode,
    statusMessage: status,
    body: resBody = {}
  } = res

  const responseMessage = resBody.message || ''
  const resHeaders = res.getHeaders()

  const message = `[HTTP/${httpVersion}] ${method} ${requestUrl} | ${statusCode} ${status} | ${responseMessage} ${responseTime}ms`

  const logMeta = {
    type: 'REQ_RES_LOG',
    message,

    req: {
      httpVersion,
      ipAddress: requestIp,
      url: requestUrl,
      method,
      headers: { ...reqHeaders },
      body: disableBodyLog ? null : reqBody
    },

    res: {
      statusCode,
      status,
      headers: { ...resHeaders },
      body: disableBodyLog ? null : resBody,
      responseMessage,
      responseTime
    }
  }

  return logMeta
}

function _getLogFunc (statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return console.httpSuccess || console.info
  }

  if (statusCode >= 300 && statusCode < 400) {
    return console.httpInfo || console.info
  }

  return console.httpError || console.error
}

function _setTrackingId (next) {
  if (namespace.active) {
    const sessionId = httpContext.getSessionId()
    const requestId = httpContext.getRequestId()
    const trackingId = `${sessionId}.${requestId}`
    namespace.set(API_LOGGER_TRACKING_ID, trackingId)
  }

  process.nextTick(next)
}
