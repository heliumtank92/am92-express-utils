import { Express, Router, Request, Response, NextFunction } from 'express'
import expressHttpContext from 'express-http-context'
import { ParamsDictionary, ParamsArray, Query } from 'express-serve-static-core'
import ResponseBody from './classes/ResponseBody'

/**
 * Type definition for the Express application instance.
 *
 * @export
 * @typedef {ExpsApp}
 */
export type ExpsApp = Express

/**
 * Type definition for the Express router instance.
 *
 * @export
 * @typedef {ExpsRouter}
 */
export type ExpsRouter = Router

/**
 * Type definition for a dictionary of parameters.
 *
 * @export
 * @typedef {ExpsParamsDictionary}
 */
export type ExpsParamsDictionary = ParamsDictionary

/**
 * Type definition for an array of parameters.
 *
 * @export
 * @typedef {ExpsParamsArray}
 */
export type ExpsParamsArray = ParamsArray

/**
 * Type definition for parameters which can be either a dictionary or an array.
 *
 * @export
 * @typedef {ExpsParams}
 */
export type ExpsParams = ExpsParamsDictionary | ExpsParamsArray

/**
 * Type definition for the request query object.
 *
 * @export
 * @typedef {ExpsQuery}
 */
export type ExpsQuery = Query

/**
 * Type definition for the Express request object.
 *
 * @export
 * @typedef {ExpsRequest}
 * @template [ReqBody=any]
 * @template [ReqParams=ExpsParamsDictionary | any]
 * @template [ReqQuery=ExpsQuery]
 * @template [ResBody=ResponseBody]
 * @template {Record<string, any>} [Locals=Record<string, any>]
 */
export type ExpsRequest<
  ReqBody = any,
  ReqParams = ExpsParamsDictionary | any,
  ReqQuery = ExpsQuery,
  ResBody = ResponseBody,
  Locals extends Record<string, any> = Record<string, any>
> = Request<ReqParams, ResBody, ReqBody, ReqQuery, Locals>

/**
 * Type definition for the Express response object.
 *
 * @export
 * @typedef {ExpsResponse}
 * @template [ResBody=ResponseBody]
 * @template {Record<string, any>} [Locals=Record<string, any>]
 */
export type ExpsResponse<
  ResBody = ResponseBody,
  Locals extends Record<string, any> = Record<string, any>
> = Response<ResBody, Locals>

/**
 * Type definition for the Express next function.
 *
 * @export
 * @typedef {ExpsNextFunction}
 */
export type ExpsNextFunction = NextFunction

/**
 * Interface for defining constants used in the Express application.
 *
 * @export
 * @interface ExpsConstants
 * @typedef {ExpsConstants}
 */
export interface ExpsConstants {
  /**
   * Header key for the request ID.
   *
   * @type {string}
   */
  REQUEST_ID_HEADER_KEY: string
  /**
   * Header key for the session ID.
   *
   * @type {string}
   */
  SESSION_ID_HEADER_KEY: string
  /**
   * Header key for the client ID.
   *
   * @type {string}
   */
  CLIENT_ID_HEADER_KEY: string
  /**
   * Header key for the encryption key.
   *
   * @type {string}
   */
  ENCRYPTION_KEY_HEADER_KEY: string
  /**
   * Key for the plaintext encryption key.
   *
   * @type {string}
   */
  PLAINTEXT_ENCRYPTION_KEY: string

  /**
   * Event name for the response completed event.
   *
   * @type {string}
   */
  RESPONSE_COMPLETED_EVENT: string
}

/**
 * Interface for managing HTTP context in the Express application.
 *
 * @export
 * @interface HttpContext
 * @typedef {HttpContext}
 */
export interface HttpContext {
  /**
   * Get a value from the HTTP context.
   *
   * @type {typeof expressHttpContext.get}
   */
  get: typeof expressHttpContext.get
  /**
   * Set a value in the HTTP context.
   *
   * @type {typeof expressHttpContext.set}
   */
  set: typeof expressHttpContext.set
  /**
   * Get the request ID from the HTTP context.
   *
   * @returns {(string | undefined)}
   */
  getRequestId(): string | undefined
  /**
   * Set the request ID in the HTTP context.
   *
   * @param {string} requestId
   */
  setRequestId(requestId: string): void
  /**
   * Get the session ID from the HTTP context.
   *
   * @returns {(string | undefined)}
   */
  getSessionId(): string | undefined
  /**
   * Set the session ID in the HTTP context.
   *
   * @param {string} sessionId
   */
  setSessionId(sessionId: string): void
  /**
   * Get the client ID from the HTTP context.
   *
   * @returns {(string | undefined)}
   */
  getClientId(): string | undefined
  /**
   * Set the client ID in the HTTP context.
   *
   * @param {string} clientId
   */
  setClientId(clientId: string): void
  /**
   * Get the encryption key from the HTTP context.
   *
   * @returns {(string | undefined)}
   */
  getEncryptionKey(): string | undefined
  /**
   * Set the encryption key in the HTTP context.
   *
   * @param {string} encryptionKey
   */
  setEncryptionKey(encryptionKey: string): void
  /**
   * Get the plaintext encryption key from the HTTP context.
   *
   * @returns {(string | undefined)}
   */
  getPlaintextEncryptionKey(): string | undefined
  /**
   * Set the plaintext encryption key in the HTTP context.
   *
   * @param {string} encryptionKey
   */
  setPlaintextEncryptionKey(encryptionKey: string): void
}

/**
 * Type definition for Express middleware functions.
 *
 * @export
 * @typedef {ExpsMiddleware}
 * @template [Req=ExpsRequest]
 * @template [Res=ExpsResponse]
 * @template [Next=NextFunction]
 */
export type ExpsMiddleware<
  Req = ExpsRequest,
  Res = ExpsResponse,
  Next = NextFunction
> = (req: Req, res: Res, next: Next) => void | Promise<void>

/**
 * Type definition for HTTP methods in lowercase.
 *
 * @export
 * @typedef {ROUTE_METHODS}
 */
export type ROUTE_METHODS =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head'

/**
 * Type definition for HTTP methods in uppercase.
 *
 * @export
 * @typedef {ROUTE_METHODS_CAPS}
 */
export type ROUTE_METHODS_CAPS =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD'

/**
 * Interface for defining a route or collection of routes with its associated router in the Express application.
 *
 * @export
 * @interface ExpsAppRoute
 * @typedef {ExpsAppRoute}
 */
export interface ExpsAppRoute {
  /**
   * The path of the route.
   *
   * @type {string}
   */
  path: string
  /**
   * The router associated with the route.
   *
   * @type {Router}
   */
  router: Router
}

/**
 * Interface for defining the configuration of a route in the Express application.
 *
 * @export
 * @interface ExpsRouteConfig
 * @typedef {ExpsRouteConfig}
 */
export interface ExpsRouteConfig {
  /**
   * Whether the route is enabled.
   *
   * @type {?boolean}
   */
  enabled?: boolean
  /**
   * The HTTP method for the route in a case insensitive manner.
   *
   * @type {?(ROUTE_METHODS | ROUTE_METHODS_CAPS)}
   */
  method?: ROUTE_METHODS | ROUTE_METHODS_CAPS
  /**
   * The path of the route.
   *
   * @type {?string}
   */
  path?: string
  /**
   * Middleware functions to be executed before the main pipeline.
   *
   * @type {?ExpsMiddleware[]}
   */
  prePipeline?: ExpsMiddleware[]
  /**
   * Middleware functions to be executed in the main pipeline.
   *
   * @type {?ExpsMiddleware[]}
   */
  pipeline?: ExpsMiddleware[]
  /**
   * Middleware functions to be executed after the main pipeline.
   *
   * @type {?ExpsMiddleware[]}
   */
  postPipeline?: ExpsMiddleware[]
  /**
   * Whether to disable encryption for the route.
   *
   * @type {?boolean}
   */
  disableCrypto?: boolean
  /**
   * Whether to disable logging of the request body.
   *
   * @type {?boolean}
   */
  disableBodyLog?: boolean
}

/**
 * Interface for defining the configuration of a router in the Express application.
 *
 * @export
 * @interface ExpsRouterConfig
 * @typedef {ExpsRouterConfig}
 * @template {string} [Routes=string]
 */
export interface ExpsRouterConfig<Routes extends string = string> {
  /**
   * The name of the router.
   *
   * @type {?string}
   */
  routerName?: string
  /**
   * Whether all routes in the router are enabled.
   *
   * @type {?boolean}
   */
  enabled?: boolean
  /**
   * Whether to disable encryption for all routes in the router.
   *
   * @type {?boolean}
   */
  disableCrypto?: boolean
  /**
   * Whether to disable logging of all the request bodies in the router.
   *
   * @type {?boolean}
   */
  disableBodyLog?: boolean
  /**
   * Middleware functions to be executed before the routes.
   *
   * @type {?ExpsMiddleware[]}
   */
  preMiddlewares?: ExpsMiddleware[]
  /**
   * Middleware functions to be executed after the routes.
   *
   * @type {?ExpsMiddleware[]}
   */
  postMiddlewares?: ExpsMiddleware[]
  /**
   * Configuration for the routes in the router.
   *
   * @type {?Record<string, ExpsRouteConfig>}
   */
  routesConfig?: Record<Routes, ExpsRouteConfig>
}

/**
 * Interface for defining an error map in the Express application.
 *
 * @export
 * @interface CustomErrorMap
 * @typedef {CustomErrorMap}
 */
export interface CustomErrorMap {
  /**
   * The error message.
   *
   * @type {?string}
   */
  message?: string
  /**
   * The HTTP status code for the error.
   *
   * @type {?number}
   */
  statusCode?: number
  /**
   * The error code.
   *
   * @type {?string}
   */
  errorCode?: string
  /**
   * The code associated with the error.
   *
   * @type {?string}
   */
  code?: string
  /**
   * Additional data related to the error.
   *
   * @type {?*}
   */
  data?: any
}

declare global {
  /** @ignore */
  interface Console {
    httpSuccess(...data: any[]): void
    httpInfo(...data: any[]): void
    httpError(...data: any[]): void
  }

  /** @ignore */
  namespace Express {
    /** @ignore */
    interface Request {
      isMatch?: boolean
      timestamp?: number
      disableBodyLog?: boolean
    }

    /** @ignore */
    interface Response {
      encryptedBody?: any
      isError?: boolean
      body?: any
    }
  }
}
