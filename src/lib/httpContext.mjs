import expressHttpContext from 'express-http-context'
import EXPS_CONST from '../EXPS_CONST.mjs'

const httpContext = {
  get: expressHttpContext.get,
  set: expressHttpContext.set,
  getRequestId,
  setRequestId,
  getSessionId,
  setSessionId,
  getClientId,
  setClientId,
  getEncryptionKey,
  setEncryptionKey
}

export default httpContext

function getRequestId () {
  return expressHttpContext.get(`headers.${EXPS_CONST.REQUEST_ID_HEADER_KEY}`)
}

function setRequestId (requestId) {
  return expressHttpContext.set(`headers.${EXPS_CONST.REQUEST_ID_HEADER_KEY}`, requestId)
}

function getSessionId () {
  return expressHttpContext.get(`headers.${EXPS_CONST.SESSION_ID_HEADER_KEY}`)
}

function setSessionId (sessionId) {
  return expressHttpContext.set(`headers.${EXPS_CONST.SESSION_ID_HEADER_KEY}`, sessionId)
}

function getClientId () {
  return expressHttpContext.get(`headers.${EXPS_CONST.CLIENT_ID_HEADER_KEY}`)
}

function setClientId (clientId) {
  return expressHttpContext.set(`headers.${EXPS_CONST.CLIENT_ID_HEADER_KEY}`, clientId)
}

function getEncryptionKey () {
  return expressHttpContext.get(`headers.${EXPS_CONST.ENCRYPTION_KEY_HEADER_KEY}`)
}

function setEncryptionKey (encryptionKey) {
  return expressHttpContext.set(`headers.${EXPS_CONST.ENCRYPTION_KEY_HEADER_KEY}`, encryptionKey)
}
