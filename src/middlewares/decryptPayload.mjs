import ApiCrypto from '@am92/api-crypto'
import httpContext from '../lib/httpContext.mjs'

import { ENCRYPTION_KEY_HEADER_KEY } from '../CONSTANTS.mjs'

export default function decryptPayload (request, response, next) {
  const { body = {} } = request
  const { payload = '' } = body

  const plaintextKey = httpContext.get(`headers.${ENCRYPTION_KEY_HEADER_KEY}`)

  const plaintextPayload = ApiCrypto.decryptData(payload, plaintextKey)
  request.body = JSON.parse(plaintextPayload)

  process.nextTick(next)
}
