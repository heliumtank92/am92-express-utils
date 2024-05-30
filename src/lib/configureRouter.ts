import { Router } from 'express'
import _ from 'lodash'

import decryptCryptoKey from '../middlewares/decryptCryptoKey'
import decryptPayload from '../middlewares/decryptPayload'
import encryptPayload from '../middlewares/encryptPayload'
import routeSanity from '../middlewares/routeSanity'
import asyncWrapper from './asyncWrapper'
import { logManager } from '../middlewares/apiLogging'
import handleResponse from '../middlewares/handleResponse'

import { SERVICE } from '../CONFIG'
import {
  ExpsRouteConfig,
  ExpsRouterConfig,
  ExpsMiddleware,
  ROUTE_METHODS,
  ExpsRouter
} from '../TYPES'

/**
 * Configures the router with the provided master and custom configurations.
 *
 * @export
 * @param {ExpsRouter} router - The Express router instance to configure.
 * @param {ExpsRouterConfig} masterConfig - The master configuration object.
 * @param {ExpsRouterConfig} customConfig - The custom configuration object.
 * @returns {Router} - The configured router instance.
 */
export default function configureRouter(
  router: ExpsRouter,
  masterConfig: ExpsRouterConfig,
  customConfig: ExpsRouterConfig
): Router {
  const config = _.merge(masterConfig, customConfig)

  // Resource Route Building
  _buildRoutes(router, config)

  return router
}

/** @ignore */
function _buildRoutes(router: ExpsRouter, config: ExpsRouterConfig): void {
  const {
    routerName = '',
    routesConfig,
    disableCrypto: routerDisableCrypto = false,
    disableBodyLog: routerDisableBodyLog = false,
    preMiddlewares = [],
    postMiddlewares = []
  } = config
  const routes = _.keys(routesConfig)
  const disabledRouted: string[] = []

  routes.forEach(route => {
    const routeConfig: ExpsRouteConfig = routesConfig[route]
    const {
      method,
      path,

      prePipeline = [],
      pipeline = [],
      postPipeline = [],

      enabled = false,
      disableCrypto = false,
      disableBodyLog = false
    } = routeConfig || {}

    // Handle Missing 'path' or 'method'
    if (!path || !method) {
      console.error(
        `[${SERVICE} ExpressUtils] Unable to Configure Route for Router '${routerName}': ${route}`
      )
      return
    }

    // Handle Disabled Routes
    if (!enabled) {
      disabledRouted.push(route)
      return
    }

    // Handle Crypto Pipeline
    let preCryptoPipeline: ExpsMiddleware[] = [decryptCryptoKey, decryptPayload]
    let postCryptoPipeline: ExpsMiddleware[] = [encryptPayload]
    if (disableCrypto || routerDisableCrypto) {
      preCryptoPipeline = []
      postCryptoPipeline = []
    }

    // Configure Respective Pipelines
    router[method.toLowerCase() as ROUTE_METHODS](
      path,
      routeSanity,
      logManager(disableBodyLog || routerDisableBodyLog),
      ..._.map(preMiddlewares, asyncWrapper),
      ..._.map(prePipeline, asyncWrapper),
      ..._.map(preCryptoPipeline, asyncWrapper),
      ..._.map(pipeline, asyncWrapper),
      ..._.map(postCryptoPipeline, asyncWrapper),
      ..._.map(postPipeline, asyncWrapper),
      ..._.map(postMiddlewares, asyncWrapper),
      asyncWrapper(handleResponse)
    )
  })

  if (disabledRouted.length) {
    console.warn(
      `[${SERVICE} ExpressUtils] Disabled Routes for Router '${routerName}': ${disabledRouted.join(
        ', '
      )}`
    )
  }
}
