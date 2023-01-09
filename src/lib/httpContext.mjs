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
  return expressHttpContext.get(`headers.${REQUEST_ID_HEADER_KEY}`)
}

function setRequestId (requestId) {
  return expressHttpContext.set(`headers.${REQUEST_ID_HEADER_KEY}`, requestId)
}

function getSessionId () {
  return expressHttpContext.get(`headers.${SESSION_ID_HEADER_KEY}`)
}

function setSessionId (sessionId) {
  return expressHttpContext.set(`headers.${SESSION_ID_HEADER_KEY}`, sessionId)
}

function getClientId () {
  return expressHttpContext.get(`headers.${CLIENT_ID_HEADER_KEY}`)
}

function setClientId (clientId) {
  return expressHttpContext.set(`headers.${CLIENT_ID_HEADER_KEY}`, clientId)
}

function getEncryptionKey () {
  return expressHttpContext.get(`headers.${ENCRYPTION_KEY_HEADER_KEY}`)
}

function setEncryptionKey (encryptionKey) {
  return expressHttpContext.set(`headers.${ENCRYPTION_KEY_HEADER_KEY}`, encryptionKey)
}
