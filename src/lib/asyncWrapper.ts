import { Request, Response, NextFunction } from 'express'
import { Middleware } from '../TYPES'

/**
 * A utility function to wrap asynchronous middleware functions.
 * This ensures that any errors thrown in the middleware are passed to the next error handling middleware.
 *
 * @export
 * @param {Middleware} middleware
 * @returns {Middleware}
 */
export default function asyncWrapper(middleware: Middleware): Middleware {
  return (request: Request, response: Response, next: NextFunction): void => {
    Promise.resolve(middleware(request, response, next)).catch(next)
  }
}
