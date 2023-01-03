"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = decryptPayload;
var _apiCrypto = _interopRequireDefault(require("@am92/api-crypto"));
var _httpContext = _interopRequireDefault(require("../lib/httpContext.js"));
var _CONSTANTS = require("../CONSTANTS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function decryptPayload(request, response, next) {
  var {
    body = {}
  } = request;
  var {
    payload = ''
  } = body;
  var plaintextKey = _httpContext.default.get("headers.".concat(_CONSTANTS.ENCRYPTION_KEY_HEADER_KEY));
  var plaintextPayload = _apiCrypto.default.decryptData(payload, plaintextKey);
  request.body = JSON.parse(plaintextPayload);
  process.nextTick(next);
}