import ApiCrypto from '@am92/api-crypto'
import { SERVICE } from './CONFIG.mjs'

import configureApp from './lib/configureApp.mjs'
import configureRouter from './lib/configureRouter.mjs'
import asyncWrapper from './lib/asyncWrapper.mjs'
import httpContext from './lib/httpContext.mjs'
import CustomError from './classes/CustomError.mjs'
import ResponseBody from './classes/ResponseBody.mjs'
import * as CONSTANTS from './CONSTANTS.mjs'

const ExpressUtils = {
  initialize
}

export default ExpressUtils

export {
  configureApp,
  configureRouter,
  asyncWrapper,
  httpContext,
  CustomError,
  ResponseBody,
  CONSTANTS
}

async function initialize (customValidateClient) {
  console.trace(`[${SERVICE} ExpressUtils] Initialising...`)
  await ApiCrypto.initialize(customValidateClient)
  console.info(`[${SERVICE} ExpressUtils] Initialised`)
}
