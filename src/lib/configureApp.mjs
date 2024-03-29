import expressHttpContext from 'express-http-context'

import apiLogging from '../middlewares/apiLogging.mjs'
import extractHeaders from '../middlewares/extractHeaders.mjs'

import handleResponse from '../middlewares/handleResponse.mjs'
import handleError from '../middlewares/handleError.mjs'
import DEFAULT_ROUTES from '../middlewares/DEFAULT_ROUTES.mjs'

import { SERVICE } from '../CONFIG.mjs'

export default function configureApp(app, Routes = []) {
  if (!app || !app.use) {
    console.error(
      `[${SERVICE} ExpressUtils] Configuring App Failed: app / app.use is undefined`
    )
    process.exit(1)
  }

  // Initial Route Pipeline
  app.use('*', expressHttpContext.middleware)
  app.use('*', extractHeaders)
  app.use('*', apiLogging)

  // Default Routes
  DEFAULT_ROUTES.forEach(route =>
    app[route.method](route.path, ...route.routePipeline)
  )

  // Custom Routes
  Routes.forEach(route => app.use(route.path, route.router))

  // Final Route Pipeline
  app.use('*', handleResponse)

  // Route Error Handler
  app.use(handleError)
}
