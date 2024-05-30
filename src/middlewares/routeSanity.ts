import { ExpsRequest, ExpsResponse, ExpsNextFunction } from '../TYPES'

/**
 * Middleware to sanity check the request and response objects.
 *
 * This middleware function sets the necessary headers and determines the appropriate response handler
 * based on whether the response is an error or if the request matches a route. It then invokes the
 * selected response handler to process the response.
 *
 * @export
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
export default function routeSanity(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
): void {
  request.isMatch = true
  process.nextTick(next)
}
