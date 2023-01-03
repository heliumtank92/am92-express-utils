"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getClientId = getClientId;
exports.getEncryptionKey = getEncryptionKey;
exports.getRequestId = getRequestId;
exports.getSessionId = getSessionId;
var _expressHttpContext = _interopRequireDefault(require("express-http-context"));
var _CONSTANTS = require("../CONSTANTS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var httpContext = {
  get: _expressHttpContext.default.get,
  set: _expressHttpContext.default.set,
  getRequestId,
  getSessionId,
  getClientId,
  getEncryptionKey
};
var _default = httpContext;
exports.default = _default;
function getRequestId() {
  return _expressHttpContext.default.get("headers.".concat(_CONSTANTS.REQUEST_ID_HEADER_KEY));
}
function getSessionId() {
  return _expressHttpContext.default.get("headers.".concat(_CONSTANTS.SESSION_ID_HEADER_KEY));
}
function getClientId() {
  return _expressHttpContext.default.get("headers.".concat(_CONSTANTS.CLIENT_ID_HEADER_KEY));
}
function getEncryptionKey() {
  return _expressHttpContext.default.get("headers.".concat(_CONSTANTS.ENCRYPTION_KEY_HEADER_KEY));
}