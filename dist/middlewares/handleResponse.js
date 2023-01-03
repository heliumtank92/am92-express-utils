"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleExpressResponse;
var _httpContext = _interopRequireDefault(require("../lib/httpContext.js"));
var _ResponseBody = _interopRequireDefault(require("../classes/ResponseBody.js"));
var _CONSTANTS = require("../CONSTANTS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function handleExpressResponse(request, response, next) {
  // Set Headers
  _setHeaders(request, response);

  // Handle Response for Error / No Route / Response
  var responseHandler = response.isError || request.isMatch ? _handleDataResponse : _handleNoRouteResponse;
  responseHandler(request, response, next);
}
function _setHeaders(request, response) {
  var requestId = _httpContext.default.get("headers.".concat(_CONSTANTS.REQUEST_ID_HEADER_KEY));
  var sessionId = _httpContext.default.get("headers.".concat(_CONSTANTS.SESSION_ID_HEADER_KEY));
  var currentExposeHeaders = response.get('Access-Control-Expose-Headers');
  var currentExposeHeadersArray = currentExposeHeaders && currentExposeHeaders.split(',') || [];
  var newExposeHeaders = [...currentExposeHeadersArray, _CONSTANTS.REQUEST_ID_HEADER_KEY, _CONSTANTS.SESSION_ID_HEADER_KEY].join();

  // Set Response Headers
  response.set(_CONSTANTS.REQUEST_ID_HEADER_KEY, requestId);
  response.set(_CONSTANTS.SESSION_ID_HEADER_KEY, sessionId);
  response.set('Access-Control-Expose-Headers', newExposeHeaders);
}
function _handleNoRouteResponse(request, response, next) {
  var {
    method,
    originalUrl
  } = request;
  var message = "Cannot ".concat(method, " ").concat(originalUrl);
  var resBody = new _ResponseBody.default(404, message);
  response.body = resBody;
  response.status(resBody.statusCode).json(resBody);
}
function _handleDataResponse(request, response, next) {
  var resBody = response.encryptedBody || response.body || {};
  var handler = [301, 302].indexOf(resBody.statusCode) > -1 ? _redirectResponse : _sendResponse;
  handler(request, response, next);
}
function _sendResponse(request, response, next) {
  var resBody = response.encryptedBody || response.body || {};
  if (!resBody.statusCode) {
    resBody = new _ResponseBody.default(500, 'Response Data Not Found!');
  }
  response.status(resBody.statusCode).json(resBody);
}
function _redirectResponse(request, response, next) {
  var resBody = response.encryptedBody || response.body || {};
  var {
    statusCode,
    data
  } = resBody;
  response.status(statusCode).redirect(data);
}