import http from 'http'

/** @ignore */
const DEFAULT_ERROR_MSG = 'Unhandled Error'
/** @ignore */
const DEFAULT_ERROR_STATUS_CODE = 500
/** @ignore */
const DEFAULT_ERROR_CODE = 'ExpsUtls::GENERIC'

/**
 * Class representing the response body.
 *
 * @export
 * @class ResponseBody
 * @typedef {ResponseBody}
 */
export default class ResponseBody {
  /**
   * The HTTP status code for the response.
   *
   * @type {number}
   */
  statusCode: number
  /**
   * The HTTP status message for the response.
   *
   * @type {string}
   */
  status: string
  /**
   * The message for the response.
   *
   * @type {string}
   */
  message: string
  /**
   * The data for the response.
   *
   * @type {*}
   */
  data: any
  /**
   * The error for the response.
   *
   * @type {*}
   */
  error: any
  /**
   * The error code for the response.
   *
   * @type {string}
   */
  errorCode: string

  /**
   * Creates an instance of ResponseBody.
   *
   * @constructor
   * @param {number} statusCode
   * @param {?string} [message]
   * @param {?*} [data]
   * @param {?*} [error]
   * @param {?string} [errorCode]
   */
  constructor(
    statusCode: number,
    message?: string,
    data?: any,
    error?: any,
    errorCode?: string
  ) {
    this.statusCode = statusCode || DEFAULT_ERROR_STATUS_CODE
    this.status = http.STATUS_CODES[statusCode] || 'Internal Server Error'
    this.message = message || statusCode ? this.status : DEFAULT_ERROR_MSG
    this.data = data
    this.error = error
    this.errorCode = error && (errorCode || DEFAULT_ERROR_CODE)
  }
}
