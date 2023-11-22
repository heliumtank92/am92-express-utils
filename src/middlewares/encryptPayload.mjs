import ApiCrypto from '@am92/api-crypto'
import ResponseBody from '../classes/ResponseBody.mjs'
import httpContext from '../lib/httpContext.mjs'

export default function encryptPayload(request, response, next) {
  const { body } = response
  const plaintextKey = httpContext.getPlaintextEncryptionKey()

  if (body && plaintextKey) {
    const encryptedPayload = ApiCrypto.encryptData(body, plaintextKey)
    const data = { payload: encryptedPayload }
    response.encryptedBody = new ResponseBody(200, 'Success', data)
  }

  process.nextTick(next)
}
