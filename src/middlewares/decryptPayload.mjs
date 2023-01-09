import ApiCrypto from '@am92/api-crypto'
import httpContext from '../lib/httpContext.mjs'

export default function decryptPayload (request, response, next) {
  const { body = {} } = request
  const { payload = '' } = body

  const plaintextKey = httpContext.getEncryptionKey()

  if (plaintextKey) {
    if (payload) {
      const plaintextPayload = ApiCrypto.decryptData(payload, plaintextKey)
      request.body = JSON.parse(plaintextPayload)
    } else {
      request.body = {}
    }
  }

  process.nextTick(next)
}
