import httpContext from 'express-http-context'
import {
  REQUEST_ID_HEADER_KEY,
  SESSION_ID_HEADER_KEY,
  CLIENT_ID_HEADER_KEY,
  ENCRYPTION_KEY_HEADER_KEY
} from '../CONSTANTS.mjs'

httpContext.getRequestId = getRequestId
httpContext.getSessionId = getSessionId
httpContext.getClientId = getClientId
httpContext.getEncryptionKey = getEncryptionKey

export default httpContext
export { getRequestId, getSessionId }

function getRequestId () {
  return httpContext.get(`headers.${REQUEST_ID_HEADER_KEY}`)
}

function getSessionId () {
  return httpContext.get(`headers.${SESSION_ID_HEADER_KEY}`)
}

function getClientId () {
  return httpContext.get(`headers.${CLIENT_ID_HEADER_KEY}`)
}

function getEncryptionKey () {
  return httpContext.get(`headers.${ENCRYPTION_KEY_HEADER_KEY}`)
}
