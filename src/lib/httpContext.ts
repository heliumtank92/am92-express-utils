import expressHttpContext from 'express-http-context'
import CONSTANTS from '../CONSTANTS'
import { HttpContext } from '../TYPES'

/**
 * This module provides a context for managing HTTP request-specific data.
 * It leverages the 'express-http-context' library to store and retrieve
 * various identifiers and keys associated with the HTTP request lifecycle.
 *
 * @type {HttpContext}
 */
const httpContext: HttpContext = {
  get: expressHttpContext.get,
  set: expressHttpContext.set,
  getRequestId,
  setRequestId,
  getSessionId,
  setSessionId,
  getClientId,
  setClientId,
  getEncryptionKey,
  setEncryptionKey,
  getPlaintextEncryptionKey,
  setPlaintextEncryptionKey
}

export default httpContext

/** @ignore */
function getRequestId(): string | undefined {
  return expressHttpContext.get(`headers.${CONSTANTS.REQUEST_ID_HEADER_KEY}`)
}

/** @ignore */
function setRequestId(requestId: string): void {
  return expressHttpContext.set(
    `headers.${CONSTANTS.REQUEST_ID_HEADER_KEY}`,
    requestId
  )
}

/** @ignore */
function getSessionId(): string | undefined {
  return expressHttpContext.get(`headers.${CONSTANTS.SESSION_ID_HEADER_KEY}`)
}

/** @ignore */
function setSessionId(sessionId: string): void {
  return expressHttpContext.set(
    `headers.${CONSTANTS.SESSION_ID_HEADER_KEY}`,
    sessionId
  )
}

/** @ignore */
function getClientId(): string | undefined {
  return expressHttpContext.get(`headers.${CONSTANTS.CLIENT_ID_HEADER_KEY}`)
}

/** @ignore */
function setClientId(clientId: string): void {
  return expressHttpContext.set(
    `headers.${CONSTANTS.CLIENT_ID_HEADER_KEY}`,
    clientId
  )
}

/** @ignore */
function getEncryptionKey(): string | undefined {
  return expressHttpContext.get(
    `headers.${CONSTANTS.ENCRYPTION_KEY_HEADER_KEY}`
  )
}

/** @ignore */
function setEncryptionKey(encryptionKey: string): void {
  return expressHttpContext.set(
    `headers.${CONSTANTS.ENCRYPTION_KEY_HEADER_KEY}`,
    encryptionKey
  )
}

/** @ignore */
function getPlaintextEncryptionKey(): string | undefined {
  return expressHttpContext.get(CONSTANTS.ENCRYPTION_KEY_HEADER_KEY)
}

/** @ignore */
function setPlaintextEncryptionKey(encryptionKey: string): void {
  return expressHttpContext.set(
    CONSTANTS.ENCRYPTION_KEY_HEADER_KEY,
    encryptionKey
  )
}
