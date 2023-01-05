import _ from 'lodash'
import logger from '@am92/api-logger'

import DEBUG from '../DEBUG.mjs'
import decryptCryptoKey from '../middlewares/decryptCryptoKey.mjs'
import decryptPayload from '../middlewares/decryptPayload.mjs'
import encryptPayload from '../middlewares/encryptPayload.mjs'
import routeSanity from '../middlewares/routeSanity.mjs'
import asyncWrapper from './asyncWrapper.mjs'

import { SERVICE } from '../CONFIG.mjs'

export default function configureRouter (Router, masterConfig, customConfig) {
  const config = _.merge(masterConfig, customConfig)

  const {
    preMiddlewares = [],
    postMiddlewares = []
  } = config

  // Pre-route Middlewares
  preMiddlewares.forEach(middleware => Router.use(asyncWrapper(middleware)))

  // Resource Route Building
  buildRoutes(Router, config)

  // Post-route Middlewares
  postMiddlewares.forEach(middleware => Router.use(asyncWrapper(middleware)))

  return Router
}

function buildRoutes (Router, config) {
  const { routerName, routesConfig } = config
  const routes = _.keys(routesConfig)
  const disabledRouted = []

  routes.forEach(route => {
    const routeConfig = routesConfig[route]
    const {
      method,
      path,

      prePipeline = [],
      pipeline = [],
      postPipeline = [],

      enabled = false,
      disableCrypto = false
    } = routeConfig || {}

    // Handle Missing 'path' or 'method'
    if (!path || !method) {
      logger.error(`[${SERVICE} ExpressUtils] Unable to Configure Route for Router '${routerName}': ${route}`)
      return
    }

    // Handle Disabled Routes
    if (!enabled) {
      disabledRouted.push(route)
      return
    }

    // Handle Crypto Pipeline
    let preCryptoPipeline = [decryptCryptoKey, decryptPayload]
    let postCryptoPipeline = [encryptPayload]
    if (disableCrypto || DEBUG.disableCrypto) {
      preCryptoPipeline = []
      postCryptoPipeline = []
    }

    // Configure Respective Pipelines
    Router[method](
      path,
      routeSanity,
      ..._.map(prePipeline, asyncWrapper),
      ..._.map(preCryptoPipeline, asyncWrapper),
      ..._.map(pipeline, asyncWrapper),
      ..._.map(postCryptoPipeline, asyncWrapper),
      ..._.map(postPipeline, asyncWrapper)
    )
  })

  if (disabledRouted.length) {
    logger.warn(`[${SERVICE} ExpressUtils] Disabled Routes for Router '${routerName}': ${disabledRouted.join(', ')}`)
  }
}
