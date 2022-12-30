import expressHttpContext from 'express-http-context'

import apiLogging from '../middlewares/apiLogging.mjs'
import extractHeaders from '../middlewares/extractHeaders.mjs'

import handleResponse from '../middlewares/handleResponse.mjs'
import handleError from '../middlewares/handleError.mjs'
import DEFAULT_ROUTES from '../middlewares/DEFAULT_ROUTES.mjs'

export default function routesInitializer (app, Routes) {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization Failed: app / app.use is undefined')
    return process.exit(1)
  }

  // Initial Route Pipeline
  app.use('*', apiLogging)
  app.use('*', expressHttpContext.middleware)
  app.use('*', extractHeaders)

  // Default Routes
  DEFAULT_ROUTES.forEach(route => app[route.method](route.path, ...route.routePipeline))

  // Custom Routes
  Routes.forEach(route => app.use(route.path, route.router))

  // Final Route Pipeline
  app.use('*', handleResponse)

  // Route Error Handler
  app.use(handleError)
}
