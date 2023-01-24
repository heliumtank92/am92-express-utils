import _ from 'lodash'
import { nanoid } from 'nanoid'
import httpContext from '../lib/httpContext.mjs'

export default function extractHeaders (request, response, next) {
  const { headers = {} } = request

  // Set Headers in httpContext
  _.forEach(headers, (value = '', header) => {
    const key = header.toLowerCase()
    httpContext.set(`headers.${key}`, value)
  })

  // Handle Request ID Defaulting
  if (!httpContext.getRequestId()) {
    httpContext.setRequestId(nanoid())
  }

  // Handle Session ID Defaulting
  if (!httpContext.getSessionId()) {
    httpContext.setSessionId(nanoid())
  }

  return process.nextTick(next)
}
