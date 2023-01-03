"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureRouter;
var _lodash = _interopRequireDefault(require("lodash"));
var _apiLogger = _interopRequireDefault(require("@am92/api-logger"));
var _DEBUG = _interopRequireDefault(require("../DEBUG.js"));
var _decryptCryptoKey = _interopRequireDefault(require("../middlewares/decryptCryptoKey.js"));
var _decryptPayload = _interopRequireDefault(require("../middlewares/decryptPayload.js"));
var _encryptPayload = _interopRequireDefault(require("../middlewares/encryptPayload.js"));
var _routeSanity = _interopRequireDefault(require("../middlewares/routeSanity.js"));
var _asyncWrapper = _interopRequireDefault(require("./asyncWrapper.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function configureRouter(Router, masterConfig, customConfig) {
  var config = _lodash.default.merge(masterConfig, customConfig);
  var {
    preMiddlewares = [],
    postMiddlewares = []
  } = config;

  // Pre-route Middlewares
  preMiddlewares.forEach(middleware => Router.use((0, _asyncWrapper.default)(middleware)));

  // Resource Route Building
  buildRoutes(Router, config);

  // Post-route Middlewares
  postMiddlewares.forEach(middleware => Router.use((0, _asyncWrapper.default)(middleware)));
  return Router;
}
function buildRoutes(Router, config) {
  var {
    routerName,
    routesConfig
  } = config;
  var routes = _lodash.default.keys(routesConfig);
  var disabledRouted = [];
  routes.forEach(route => {
    var routeConfig = routesConfig[route];
    var {
      method,
      path,
      prePipeline = [],
      pipeline = [],
      postPipeline = [],
      enabled = false,
      disableCrypto = false
    } = routeConfig || {};

    // Handle Missing 'path' or 'method'
    if (!path || !method) {
      _apiLogger.default.error("Unable to Configure Route for Router '".concat(routerName, "': ").concat(route));
      return;
    }

    // Handle Disabled Routes
    if (!enabled) {
      disabledRouted.push(route);
      return;
    }

    // Handle Crypto Pipeline
    var preCryptoPipeline = [_decryptCryptoKey.default, _decryptPayload.default];
    var postCryptoPipeline = [_encryptPayload.default];
    if (disableCrypto || _DEBUG.default.disableCrypto) {
      preCryptoPipeline = [];
      postCryptoPipeline = [];
    }

    // Configure Respective Pipelines
    Router[method](path, _routeSanity.default, ..._lodash.default.map(prePipeline, _asyncWrapper.default), ..._lodash.default.map(preCryptoPipeline, _asyncWrapper.default), ..._lodash.default.map(pipeline, _asyncWrapper.default), ..._lodash.default.map(postCryptoPipeline, _asyncWrapper.default), ..._lodash.default.map(postPipeline, _asyncWrapper.default));
  });
  if (disabledRouted.length) {
    _apiLogger.default.warn("Disabled Routes for Router '".concat(routerName, "': ").concat(disabledRouted.join(', ')));
  }
}