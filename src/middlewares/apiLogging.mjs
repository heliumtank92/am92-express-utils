import { httpLogger } from '@am92/api-logger'

export default function apiLogging (request, response, next) {
  request.timestamp = Date.now()

  response.on('finish', () => {
    const logMeta = _buildLogMeta(request, response)
    const logLevel = _getLogLevel(logMeta.res.statusCode)
    httpLogger[logLevel](logMeta)
  })

  process.nextTick(next)
}

function _buildLogMeta (req, res) {
  const {
    httpVersionMajor,
    httpVersionMinor,
    ipAddress,
    _remoteAddress,
    connection: { remoteAddress } = {},
    originalUrl,
    url,
    method,
    headers: reqHeaders,
    body: reqBody = {}
  } = req

  const httpVersion = `${httpVersionMajor}.${httpVersionMinor}`
  const requestIp = ipAddress || _remoteAddress || remoteAddress || ''
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
      headers: reqHeaders,
      body: reqBody
    },

    res: {
      statusCode,
      status,
      headers: resHeaders,
      body: resBody,
      responseMessage,
      responseTime
    }
  }

  return logMeta
}

function _getLogLevel (statusCode) {
  if (statusCode >= 200 && statusCode < 300) { return 'success' }
  if (statusCode >= 300 && statusCode < 400) { return 'info' }
  return 'error'
}
