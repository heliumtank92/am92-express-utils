import http from 'http'

const DEFAULT_ERROR_MSG = 'Unhandled Error'
const DEFAULT_ERROR_STATUS_CODE = 500
const DEFAULT_ERROR_CODE = 'GENERIC_ERROR_CODE'

export default class ResponseBody {
  constructor (statusCode, message, data, error, errorCode) {
    this.statusCode = statusCode || DEFAULT_ERROR_STATUS_CODE
    this.status = http.STATUS_CODES[statusCode]
    this.message = message || DEFAULT_ERROR_MSG
    this.data = data
    this.error = error
    this.errorCode = error && (errorCode || DEFAULT_ERROR_CODE)
  }
}
