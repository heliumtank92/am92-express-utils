import httpContext from '../lib/httpContext.mjs'
import ApiCrypto from '@am92/api-crypto'

import asyncWrapper from '../lib/asyncWrapper.mjs'
import routeSanity from './routeSanity.mjs'
import ResponseBody from '../classes/ResponseBody.mjs'

const DEFAULT_ROUTES = [
  {
    path: '/health',
    method: 'get',
    routePipeline: [routeSanity, asyncWrapper(healthHandler)]
  },
  {
    path: '/version',
    method: 'get',
    routePipeline: [routeSanity, asyncWrapper(versionHandler)]
  },
  {
    path: '/handshake',
    method: 'get',
    routePipeline: [routeSanity, asyncWrapper(handshakeHandler)]
  }
]

export default DEFAULT_ROUTES

function healthHandler (request, response, next) {
  response.body = new ResponseBody(200, 'Health Check Succesful')
  return process.nextTick(next)
}

function versionHandler (request, response, next) {
  const {
    npm_package_name: name = '',
    npm_package_version: version = ''
  } = process.env

  response.body = new ResponseBody(200, 'Version Check Succesful', { name, version })
  return process.nextTick(next)
}

async function handshakeHandler (request, response, next) {
  const clientId = httpContext.getClientId()
  const publicKey = await ApiCrypto.getPublicKey(clientId)
  response.body = new ResponseBody(200, 'Handshake Succesful', { publicKey })
  next()
}
