import { Express } from 'express'
import expressHttpContext from 'express-http-context'

import apiLogging from '../middlewares/apiLogging'
import extractHeaders from '../middlewares/extractHeaders'
import handleResponse from '../middlewares/handleResponse'
import handleError from '../middlewares/handleError'
import DEFAULT_ROUTES from '../middlewares/DEFAULT_ROUTES'

import { SERVICE } from '../CONFIG'
import { AppRoute, ROUTE_METHODS } from '../TYPES'

/**
 * Configures the Express application with the necessary middlewares and routes.
 *
 * This function sets up the initial middleware pipeline, default routes, custom routes,
 * and the final middleware pipeline including error handling.
 *
 * @param {Express} app - The Express application instance to configure.
 * @param {AppRoute[]} [Routes=[]] - An optional array of custom routes to add to the application.
 */
export default function configureApp(
  app: Express,
  Routes: AppRoute[] = []
): void {
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
    app[route.method as ROUTE_METHODS](route.path, ...(route.pipeline || []))
  )

  // Custom Routes
  Routes.forEach(route => app.use(route.path, route.router))

  // Final Route Pipeline
  app.use('*', handleResponse)

  // Route Error Handler
  app.use(handleError)
}
