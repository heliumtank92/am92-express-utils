import expressHttpContext from 'express-http-context'
import {
  REQUEST_ID_HEADER_KEY,
  SESSION_ID_HEADER_KEY,
  CLIENT_ID_HEADER_KEY,
  ENCRYPTION_KEY_HEADER_KEY
} from '../CONSTANTS.mjs'

const httpContext = {
  get: expressHttpContext.get,
  set: expressHttpContext.set,
  getRequestId,
  getSessionId,
  getClientId,
  getEncryptionKey
}

export default httpContext
export { getRequestId, getSessionId, getClientId, getEncryptionKey }

function getRequestId () {
  return expressHttpContext.get(`headers.${REQUEST_ID_HEADER_KEY}`)
}

function getSessionId () {
  return expressHttpContext.get(`headers.${SESSION_ID_HEADER_KEY}`)
}

function getClientId () {
  return expressHttpContext.get(`headers.${CLIENT_ID_HEADER_KEY}`)
}

function getEncryptionKey () {
  return expressHttpContext.get(`headers.${ENCRYPTION_KEY_HEADER_KEY}`)
}
