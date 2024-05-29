import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import { nanoid } from 'nanoid'
import httpContext from '../lib/httpContext'

/**
 * Middleware to extract headers from the request and set them in the httpContext.
 *
 * This middleware iterates over the request headers, converts them to lowercase,
 * and sets them in the httpContext. It also ensures that a request ID and session ID
 * are set in the context if they are not already present.
 *
 * @export
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export default function extractHeaders(
  request: Request,
  response: Response,
  next: NextFunction
): void {
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

  process.nextTick(next)
}
