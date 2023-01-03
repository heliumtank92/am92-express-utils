"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractHeaders;
var _lodash = _interopRequireDefault(require("lodash"));
var _nanoid = require("nanoid");
var _httpContext = _interopRequireDefault(require("../lib/httpContext.js"));
var _CONSTANTS = require("../CONSTANTS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function extractHeaders(request, response, next) {
  var {
    headers = {}
  } = request;
  var requestId, sessionId;
  _lodash.default.forEach(headers, function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var header = arguments.length > 1 ? arguments[1] : undefined;
    var key = header.toLowerCase();
    if (key === _CONSTANTS.REQUEST_ID_HEADER_KEY) {
      requestId = value;
      value = value || (0, _nanoid.nanoid)();
    }
    if (key === _CONSTANTS.SESSION_ID_HEADER_KEY) {
      sessionId = value;
      value = value || (0, _nanoid.nanoid)();
    }
    _httpContext.default.set("headers.".concat(key), value);
  });
  if (!requestId) {
    _httpContext.default.set("headers.".concat(_CONSTANTS.REQUEST_ID_HEADER_KEY), (0, _nanoid.nanoid)());
  }
  if (!sessionId) {
    _httpContext.default.set("headers.".concat(_CONSTANTS.SESSION_ID_HEADER_KEY), (0, _nanoid.nanoid)());
  }
  return process.nextTick(next);
}