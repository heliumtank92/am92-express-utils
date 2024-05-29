import { ApiCrypto } from '@am92/api-crypto'
import { Request, Response, NextFunction } from 'express'

import ResponseBody from '../classes/ResponseBody'
import httpContext from '../lib/httpContext'
import asyncWrapper from '../lib/asyncWrapper'
import routeSanity from './routeSanity'
import { ExpsRouteConfig } from '../TYPES'

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
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
function healthHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.body = new ResponseBody(200, 'Health Check Succesful')
  return process.nextTick(next)
}

/**
 * Handles the version check route.
 *
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
function versionHandler(
  request: Request,
  response: Response,
  next: NextFunction
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
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
async function handshakeHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const clientId = httpContext.getClientId()
  const publicKey = await ApiCrypto.getPublicKey(clientId || '')
  response.body = new ResponseBody(200, 'Handshake Succesful', { publicKey })
  next()
}
