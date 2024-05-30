import { ApiCrypto } from '@am92/api-crypto'

import ResponseBody from '../classes/ResponseBody'
import httpContext from '../lib/httpContext'
import asyncWrapper from '../lib/asyncWrapper'
import routeSanity from './routeSanity'
import {
  ExpsNextFunction,
  ExpsRequest,
  ExpsResponse,
  ExpsRouteConfig
} from '../TYPES'

/**
 * Default routes configuration for the Express application.
 *
 * This array contains the default routes that are registered with the Express application.
 * Each route object specifies the path, HTTP method, and the middleware pipeline to be executed.
 *
 * @type {ExpsRouteConfig[]}
 */
const DEFAULT_ROUTES: ExpsRouteConfig[] = [
  {
    path: '/health',
    method: 'get',
    pipeline: [routeSanity, asyncWrapper(healthHandler)]
  },
  {
    path: '/version',
    method: 'get',
    pipeline: [routeSanity, asyncWrapper(versionHandler)]
  },
  {
    path: '/handshake',
    method: 'get',
    pipeline: [routeSanity, asyncWrapper(handshakeHandler)]
  }
]

export default DEFAULT_ROUTES

/**
 * Handles the health check route.
 *
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
function healthHandler(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
) {
  response.body = new ResponseBody(200, 'Health Check Succesful')
  return process.nextTick(next)
}

/**
 * Handles the version check route.
 *
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
function versionHandler(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
) {
  const { npm_package_name: name = '', npm_package_version: version = '' } =
    process.env

  response.body = new ResponseBody(200, 'Version Check Succesful', {
    name,
    version
  })
  return process.nextTick(next)
}

/**
 * Handles the handshake route.
 *
 * @param {ExpsRequest} request - The Express request object.
 * @param {ExpsResponse} response - The Express response object.
 * @param {ExpsNextFunction} next - The next middleware function in the stack.
 */
async function handshakeHandler(
  request: ExpsRequest,
  response: ExpsResponse,
  next: ExpsNextFunction
) {
  const clientId = httpContext.getClientId()
  const publicKey = await ApiCrypto.getPublicKey(clientId || '')
  response.body = new ResponseBody(200, 'Handshake Succesful', { publicKey })
  next()
}
