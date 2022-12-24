import _ from 'lodash'
import ResponseBody from '../classes/ResponseBody.mjs'
import CustomError from '../classes/CustomError.mjs'

const DEFAULT_OPTIONS = {
  bypassRouteMatch: false,
  bypassDataCheck: false,
  bypassErrorCheck: false
}

export default function asyncWrapper (middleware, options = {}) {
  return (request, response, next) => {
    const _options = _.merge(DEFAULT_OPTIONS, options)
    const { bypassRouteMatch, bypassDataCheck, bypassErrorCheck } = _options

    if (!bypassRouteMatch && !request.isMatch) { return process.nextTick(next) }
    if (!bypassDataCheck && response.body) { return process.nextTick(next) }
    if (!bypassErrorCheck && response.error) { return process.nextTick(next) }

    return Promise.resolve(middleware(request, response, next)).catch(middlewareError => {
      let responseError

      // Handle ResponseBody
      if (middlewareError.constructor.name === ResponseBody.name) {
        responseError = middlewareError
      } else {
        // Handle Any Other Error
        const customError = new CustomError(middlewareError)
        const { statusCode, message, data, error, errorCode } = customError
        responseError = new ResponseBody(statusCode, message, data, error, errorCode)
      }

      response.error = responseError
      next()
    })
  }
}
