"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = decryptCryptoKey;
var _apiCrypto = _interopRequireDefault(require("@am92/api-crypto"));
var _httpContext = _interopRequireDefault(require("../lib/httpContext.js"));
var _CONSTANTS = require("../CONSTANTS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function decryptCryptoKey(_x, _x2, _x3) {
  return _decryptCryptoKey.apply(this, arguments);
}
function _decryptCryptoKey() {
  _decryptCryptoKey = _asyncToGenerator(function* (request, response, next) {
    // Extract Headers
    var {
      headers = {}
    } = request;
    var clientId = _extractFromHeader(headers, _CONSTANTS.CLIENT_ID_HEADER_KEY);
    var ciphertextKey = _extractFromHeader(headers, _CONSTANTS.ENCRYPTION_KEY_HEADER_KEY);

    // Decrypt Key
    var plainTextKey = yield _apiCrypto.default.decryptKey(clientId, ciphertextKey);
    _httpContext.default.set("headers.".concat(_CONSTANTS.CLIENT_ID_HEADER_KEY), clientId);
    _httpContext.default.set("headers.".concat(_CONSTANTS.ENCRYPTION_KEY_HEADER_KEY), plainTextKey);
    next();
  });
  return _decryptCryptoKey.apply(this, arguments);
}
function _extractFromHeader() {
  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var value = headers[key] || '';
  value = value || headers[key.toLowerCase()] || '';
  return value;
}