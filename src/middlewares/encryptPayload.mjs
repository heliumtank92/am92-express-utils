import ApiCrypto from '@am92/api-crypto'
import httpContext from '../lib/httpContext.mjs'

import { ENCRYPTION_KEY_HEADER_KEY } from '../CONSTANTS.mjs'

export default function encryptPayload (request, response, next) {
  const { body } = response

  const plaintextKey = httpContext.get(`headers.${ENCRYPTION_KEY_HEADER_KEY}`)

  const bodyString = JSON.stringify(body)
  const encryptedPayload = ApiCrypto.encryptData(bodyString, plaintextKey)
  response.encryptedBody = { payload: encryptedPayload }

  process.nextTick(next)
}
