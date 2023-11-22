import { SERVICE } from '../CONFIG.mjs'

const DEFAULT_ERROR_MSG = 'Unhandled Error'
const DEFAULT_ERROR_STATUS_CODE = 500
const DEFAULT_ERROR_CODE = 'GENERIC_ERROR_CODE'

export default class CustomError extends Error {
  constructor(e = {}, eMap) {
    if (e._isCustomError && !eMap) {
      return e
    }

    super()

    this._isCustomError = true
    this.service = SERVICE
    this.message = eMap?.message || e?.message || DEFAULT_ERROR_MSG
    this.statusCode =
      eMap?.statusCode || e?.statusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode =
      eMap?.errorCode || e?.errorCode || e?.code || DEFAULT_ERROR_CODE
    this.error = e
    this.data = eMap?.data || e?.data || undefined
  }
}
