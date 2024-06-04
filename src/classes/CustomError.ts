import { SERVICE } from '../CONFIG'
import { CustomErrorMap } from '../TYPES'

/** @ignore */
const DEFAULT_ERROR_MSG = 'Unhandled Error'
/** @ignore */
const DEFAULT_ERROR_STATUS_CODE = 500
/** @ignore */
const DEFAULT_ERROR_CODE = 'ExpsUtls::GENERIC'

/**
 * Error class whose instance is thrown in case of any error.
 *
 * @class
 * @typedef {CustomError}
 * @extends {Error}
 */
export default class CustomError extends Error {
  /**
   * Flag to identify if error is a custom error.
   */
  readonly _isCustomError = true
  /**
   * Node project from which Error is thrown.
   */
  readonly service: string = SERVICE
  /**
   * Error's message string.
   */
  message: string = DEFAULT_ERROR_MSG
  /**
   * HTTP status code associated with the error.
   */
  statusCode: number = DEFAULT_ERROR_STATUS_CODE
  /**
   * Error Code.
   */
  errorCode: string = DEFAULT_ERROR_CODE
  /**
   * Error object.
   */
  error?: any
  /**
   * Data object.
   */
  data?: any
  /**
   * Creates an instance of CustomError.
   *
   * @constructor
   * @param [e] Any Error instance to wrap with CustomError.
   * @param [eMap] CustomErrorMap to rewrap error for better understanding.
   */
  constructor(e?: any, eMap?: CustomErrorMap) {
    if (e._isCustomError && !eMap) {
      return e
    }

    super()

    this.message = eMap?.message || e?.message || DEFAULT_ERROR_MSG
    this.statusCode =
      eMap?.statusCode || e?.statusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode =
      eMap?.errorCode || e?.errorCode || e?.code || DEFAULT_ERROR_CODE
    this.error = e
    this.data = eMap?.data || e?.data || undefined
  }
}
