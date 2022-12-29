import _ from 'lodash'
import httpContext from 'express-http-context'
import { nanoid } from 'nanoid'
import { REQUEST_ID_HEADER_KEY, SESSION_ID_HEADER_KEY } from '../CONSTANTS.mjs'

export default function extractHeaders (request, response, next) {
  const { headers = {} } = request
  let requestId, sessionId

  _.forEach(headers, (value = '', header) => {
    const key = header.toLowerCase()

    if (key === 'authorization') {
      const values = value.split(' ')
      value = values[1] || values[0]
    }

    if (key === REQUEST_ID_HEADER_KEY.toLowerCase()) {
      requestId = value
      value = value || nanoid()
    }

    if (key === SESSION_ID_HEADER_KEY.toLowerCase()) {
      sessionId = value
      value = value || nanoid()
    }

    httpContext.set(`headers.${key}`, value)
  })

  if (!requestId) {
    httpContext.set(`headers.${REQUEST_ID_HEADER_KEY.toLowerCase()}`, nanoid())
  }

  if (!sessionId) {
    httpContext.set(`headers.${SESSION_ID_HEADER_KEY.toLowerCase()}`, nanoid())
  }

  return process.nextTick(next)
}
