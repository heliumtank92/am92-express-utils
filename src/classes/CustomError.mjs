import { SERVICE } from '../CONFIG.mjs'

const DEFAULT_ERROR_MSG = 'Unhandled Error'
const DEFAULT_ERROR_STATUS_CODE = 500
const DEFAULT_ERROR_CODE = 'GENERIC_ERROR_CODE'

export default class CustomError extends Error {
  constructor (e = {}, eMap) {
    if (e._isCustomError && !eMap) { return e }

    super()

    const { message, statusCode, errorCode } = eMap || {}
    const {
      message: eMessage,
      msg: eMsg,
      statusCode: eStatusCode,
      errorCode: eErrorCode,
      code: eCode
    } = e

    this._isCustomError = true
    this.service = SERVICE
    this.message = message || eMessage || eMsg || DEFAULT_ERROR_MSG
    this.errorMessage = eMessage || eMsg || DEFAULT_ERROR_MSG
    this.statusCode = statusCode || eStatusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = errorCode || eErrorCode || eCode || DEFAULT_ERROR_CODE
    this.error = e
    this.data = (e._isCustomError && e.data) || undefined
  }
}
