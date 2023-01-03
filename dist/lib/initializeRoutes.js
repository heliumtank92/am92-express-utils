"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routesInitializer;
var _expressHttpContext = _interopRequireDefault(require("express-http-context"));
var _apiLogging = _interopRequireDefault(require("../middlewares/apiLogging.js"));
var _extractHeaders = _interopRequireDefault(require("../middlewares/extractHeaders.js"));
var _handleResponse = _interopRequireDefault(require("../middlewares/handleResponse.js"));
var _handleError = _interopRequireDefault(require("../middlewares/handleError.js"));
var _DEFAULT_ROUTES = _interopRequireDefault(require("../middlewares/DEFAULT_ROUTES.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function routesInitializer(app, Routes) {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization Failed: app / app.use is undefined');
    return process.exit(1);
  }

  // Initial Route Pipeline
  app.use('*', _apiLogging.default);
  app.use('*', _expressHttpContext.default.middleware);
  app.use('*', _extractHeaders.default);

  // Default Routes
  _DEFAULT_ROUTES.default.forEach(route => app[route.method](route.path, ...route.routePipeline));

  // Custom Routes
  Routes.forEach(route => app.use(route.path, route.router));

  // Final Route Pipeline
  app.use('*', _handleResponse.default);

  // Route Error Handler
  app.use(_handleError.default);
}