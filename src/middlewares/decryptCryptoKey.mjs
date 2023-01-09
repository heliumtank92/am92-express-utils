import ApiCrypto from '@am92/api-crypto'
import httpContext from '../lib/httpContext.mjs'

export default async function decryptCryptoKey (request, response, next) {
  // Extract Headers
  const clientId = httpContext.getClientId()
  const ciphertextKey = httpContext.getEncryptionKey()

  // Decrypt Key
  const plainTextKey = await ApiCrypto.decryptKey(clientId, ciphertextKey)
  httpContext.setEncryptionKey(plainTextKey)

  next()
}
