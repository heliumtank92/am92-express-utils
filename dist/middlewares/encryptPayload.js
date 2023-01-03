"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encryptPayload;
var _apiCrypto = _interopRequireDefault(require("@am92/api-crypto"));
var _httpContext = _interopRequireDefault(require("../lib/httpContext.js"));
var _CONSTANTS = require("../CONSTANTS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function encryptPayload(request, response, next) {
  var {
    body
  } = response;
  var plaintextKey = _httpContext.default.get("headers.".concat(_CONSTANTS.ENCRYPTION_KEY_HEADER_KEY));
  var bodyString = JSON.stringify(body);
  var encryptedPayload = _apiCrypto.default.encryptData(bodyString, plaintextKey);
  response.encryptedBody = {
    payload: encryptedPayload
  };
  process.nextTick(next);
}