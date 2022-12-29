import _ from 'lodash'

export default function configureRouter (Router, masterConfig, customConfig) {
  const config = _.merge(masterConfig, customConfig)

  const {
    preMiddlewares = [],
    postMiddlewares = []
  } = config

  // Pre-route Middlewares
  preMiddlewares.forEach(Router.use)

  // Resource Route Building
  buildRoutes(Router, config)

  // Post-route Middlewares
  postMiddlewares.forEach(Router.use)

  return Router
}

function buildRoutes (Router, config) {
  const { routerName, routesConfig } = config
  const routes = _.keys(routesConfig)
  const disabledRouted = []

  routes.forEach(route => {
    const routeConfig = routesConfig[route]
    const { method, path, pipeline = [], enabled = false } = routeConfig || {}

    if (!method) {
      console.error(`[Error] Unable to Configure Route for Router '${routerName}':`, route)
      return
    }

    if (!enabled) {
      disabledRouted.push(route)
      return
    }

    Router[method](path, routeSanity, ...pipeline)
  })

  if (disabledRouted.length) {
    console.warn(`[Warn] Disabled Routes for Router '${routerName}':`, disabledRouted.join(', '))
  }
}

function routeSanity (request, response, next) {
  request.isMatch = true
  process.nextTick(next)
}
