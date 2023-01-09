import _ from 'lodash'
import { nanoid } from 'nanoid'
import httpContext from '../lib/httpContext.mjs'

export default function extractHeaders (request, response, next) {
  const { headers = {} } = request

  _.forEach(headers, (value = '', header) => {
    const key = header.toLowerCase()
    httpContext.set(`headers.${key}`, value)
  })

  if (!httpContext.getRequestId()) {
    httpContext.setRequestId(nanoid())
  }

  if (!httpContext.getSessionId()) {
    httpContext.setSessionId(nanoid())
  }

  return process.nextTick(next)
}
