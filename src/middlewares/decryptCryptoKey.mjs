import ApiCrypto from '@am92/api-crypto'
import httpContext from '../httpContext.mjs'

import { CLIENT_ID_HEADER_KEY, ENCRYPTION_KEY_HEADER_KEY } from '../CONSTANTS.mjs'

export default async function decryptCryptoKey (request, response, next) {
  // Extract Headers
  const { headers = {} } = request
  const clientId = _extractFromHeader(headers, CLIENT_ID_HEADER_KEY)
  const ciphertextKey = _extractFromHeader(headers, ENCRYPTION_KEY_HEADER_KEY)

  // Decrypt Key
  const plainTextKey = await ApiCrypto.decryptKey(clientId, ciphertextKey)

  httpContext.set(`headers.${CLIENT_ID_HEADER_KEY.toLowerCase()}`, clientId)
  httpContext.set(`headers.${ENCRYPTION_KEY_HEADER_KEY.toLowerCase()}`, plainTextKey)
  next()
}

function _extractFromHeader (headers = {}, key = '') {
  let value = headers[key] || ''
  value = value || headers[key.toLowerCase()] || ''
  return value
}
