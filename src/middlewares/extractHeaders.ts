import crypto from 'crypto'
import _ from 'lodash'
import httpContext from '../lib/httpContext'
import { ExpsRequest, ExpsResponse, ExpsNextFunction } from '../TYPES'

/**
 * Middleware to extract headers from the request and set them in the httpContext.
 *
 * This middleware iterates over the request headers, converts them to lowercase,
 * and sets them in the httpContext. It also ensures that a request ID and session ID
 * are set in the context if they are not already present.
 *
 * @export
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
export default function extractHeaders(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
): void {
  const { headers = {} } = request

  // Set Headers in httpContext
  _.forEach(headers, (value = '', header) => {
    const key = header.toLowerCase()
    httpContext.set(`headers.${key}`, value)
  })

  // Handle Request ID Defaulting
  if (!httpContext.getRequestId()) {
    httpContext.setRequestId(crypto.randomUUID())
  }

  // Handle Session ID Defaulting
  if (!httpContext.getSessionId()) {
    httpContext.setSessionId(crypto.randomUUID())
  }

  process.nextTick(next)
}
