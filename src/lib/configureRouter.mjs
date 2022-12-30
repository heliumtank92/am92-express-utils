import _ from 'lodash'
import logger from '@am92/api-logger'

import DEBUG from '../DEBUG.mjs'
import decryptCryptoKey from '../middlewares/decryptCryptoKey.mjs'
import decryptPayload from '../middlewares/decryptPayload.mjs'
import encryptPayload from '../middlewares/encryptPayload.mjs'
import routeSanity from '../middlewares/routeSanity.mjs'
import asyncWrapper from './asyncWrapper.mjs'

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

    if (!method) {
      logger.error(`Unable to Configure Route for Router '${routerName}': ${route}`)
      return
    }

    if (!enabled) {
      disabledRouted.push(route)
      return
    }

    let preCryptoPipeline = [decryptCryptoKey, decryptPayload]
    let postCryptoPipeline = [encryptPayload]
    if (disableCrypto || DEBUG.disableCrypto) {
      preCryptoPipeline = []
      postCryptoPipeline = []
    }

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
    logger.warn(`Disabled Routes for Router '${routerName}': ${disabledRouted.join(', ')}`)
  }
}
