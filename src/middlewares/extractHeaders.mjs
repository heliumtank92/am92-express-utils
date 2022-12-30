import _ from 'lodash'
import { nanoid } from 'nanoid'
import httpContext from '../lib/httpContext.mjs'
import { REQUEST_ID_HEADER_KEY, SESSION_ID_HEADER_KEY } from '../CONSTANTS.mjs'

export default function extractHeaders (request, response, next) {
  const { headers = {} } = request
  let requestId, sessionId

  _.forEach(headers, (value = '', header) => {
    const key = header.toLowerCase()

    if (key === REQUEST_ID_HEADER_KEY) {
      requestId = value
      value = value || nanoid()
    }

    if (key === SESSION_ID_HEADER_KEY) {
      sessionId = value
      value = value || nanoid()
    }

    httpContext.set(`headers.${key}`, value)
  })

  if (!requestId) {
    httpContext.set(`headers.${REQUEST_ID_HEADER_KEY}`, nanoid())
  }

  if (!sessionId) {
    httpContext.set(`headers.${SESSION_ID_HEADER_KEY}`, nanoid())
  }

  return process.nextTick(next)
}
