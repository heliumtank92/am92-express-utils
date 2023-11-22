import ApiCrypto from '@am92/api-crypto'
import httpContext from '../lib/httpContext.mjs'

export default function decryptPayload(request, response, next) {
  const { body = {} } = request
  const { payload = '' } = body

  const plaintextKey = httpContext.getPlaintextEncryptionKey()

  if (plaintextKey) {
    if (payload) {
      const decryptedBody = ApiCrypto.decryptData(payload, plaintextKey)
      request.body = decryptedBody
    } else {
      request.body = {}
    }
  }

  process.nextTick(next)
}
