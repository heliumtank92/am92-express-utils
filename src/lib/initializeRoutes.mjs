import _ from 'lodash'
import { nanoid } from 'nanoid'
import httpContext from 'express-http-context'

import handleResponse from './handleResponse.mjs'
import handleError from './handleError.mjs'

import { REQUEST_ID_HEADER_KEY, SESSION_ID_HEADER_KEY } from '../CONSTANTS.mjs'

export default function routesInitializer (app, Routes) {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization Failed: app / app.use is undefined')
    return process.exit(1)
  }

  // Initial Route Pipeline
  app.use('*', httpContext.middleware)
  app.use('*', extractHeaders)

  // Custom Routes
  Routes.forEach(route => app.use(route.path, route.router))

  // Final Route Pipeline
  app.use('*', setHeaders)
  app.use('*', handleResponse)

  // Route Error Handler
  app.use(handleError)
}

function extractHeaders (request, response, next) {
  const { headers = {} } = request
  let requestId, sessionId

  _.forEach(headers, (value = '', header) => {
    const key = header.toLowerCase()

    if (key === 'authorization') {
      const values = value.split(' ')
      value = values[1] || values[0]
    }

    if (key === REQUEST_ID_HEADER_KEY.toLowerCase()) {
      requestId = value
      value = value || nanoid()
    }

    if (key === SESSION_ID_HEADER_KEY.toLowerCase()) {
      sessionId = value
      value = value || nanoid()
    }

    httpContext.set(`headers.${key}`, value)
  })

  if (!requestId) {
    httpContext.set(`headers.${REQUEST_ID_HEADER_KEY.toLowerCase()}`, nanoid())
  }

  if (!sessionId) {
    httpContext.set(`headers.${SESSION_ID_HEADER_KEY.toLowerCase()}`, nanoid())
  }

  return process.nextTick(next)
}

function setHeaders (request, response, next) {
  const requestId = httpContext.get(`headers.${REQUEST_ID_HEADER_KEY.toLowerCase()}`)
  const sessionId = httpContext.get(`headers.${SESSION_ID_HEADER_KEY.toLowerCase()}`)

  const currentExposeHeaders = response.get('Access-Control-Expose-Headers')
  const currentExposeHeadersArray = (currentExposeHeaders && currentExposeHeaders.split(',')) || []
  const newExposeHeaders = [...currentExposeHeadersArray, REQUEST_ID_HEADER_KEY, SESSION_ID_HEADER_KEY].join()

  // Set Response Headers
  response.set(REQUEST_ID_HEADER_KEY, requestId)
  response.set(SESSION_ID_HEADER_KEY, sessionId)
  response.set('Access-Control-Expose-Headers', newExposeHeaders)

  return process.nextTick(next)
}
