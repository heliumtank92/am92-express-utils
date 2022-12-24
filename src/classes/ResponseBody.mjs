import http from 'http'
import {
  DEFAULT_ERROR_MSG,
  DEFAULT_ERROR_STATUS_CODE,
  DEFAULT_ERROR_CODE
} from '../CONSTANTS.mjs'

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
