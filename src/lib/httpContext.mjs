import httpContext from 'express-http-context'
import { REQUEST_ID_HEADER_KEY, SESSION_ID_HEADER_KEY } from '../CONSTANTS.mjs'

httpContext.getRequestId = getRequestId
httpContext.getSessionId = getSessionId

export default httpContext
export { getRequestId, getSessionId }

function getRequestId () {
  return httpContext.get(`headers.${REQUEST_ID_HEADER_KEY.toLowerCase()}`)
}

function getSessionId () {
  return httpContext.get(`headers.${SESSION_ID_HEADER_KEY.toLowerCase()}`)
}
